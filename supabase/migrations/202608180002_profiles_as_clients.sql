update public.profiles
set role = 'client'
where role = 'user';

alter table public.profiles alter column role set default 'client';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profiles_count integer;
  next_role public.user_role;
begin
  select count(*) into profiles_count from public.profiles;
  next_role := case when profiles_count = 0 then 'admin'::public.user_role else 'client'::public.user_role end;

  insert into public.profiles (id, name, email, phone, role, email_verified, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    case
      when new.raw_user_meta_data ->> 'role' = 'admin' then 'admin'::public.user_role
      when new.raw_user_meta_data ->> 'role' in ('client', 'user') then 'client'::public.user_role
      else next_role
    end,
    false,
    'pending'
  )
  on conflict (id) do update set
    name = excluded.name,
    email = excluded.email,
    phone = excluded.phone,
    role = excluded.role;

  return new;
end;
$$;

drop policy if exists "Admins can manage customers" on public.customers;
drop trigger if exists customers_set_updated_at on public.customers;
drop table if exists public.customers;

do $$
begin
  if exists (select 1 from pg_type where typname = 'customer_status') then
    drop type public.customer_status;
  end if;
end $$;
