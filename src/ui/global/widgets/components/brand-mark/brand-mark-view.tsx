export const BRAND_NAME = 'Aurora'
export const BRAND_PRIMARY = '#0073C3'
export const BRAND_ACCENT = '#F5A438'

export const BrandMarkView = ({ className = 'size-9' }: { className?: string }) => (
  <svg viewBox='0 0 40 40' role='img' aria-label={BRAND_NAME} className={className}>
    <title>{BRAND_NAME}</title>
    <defs>
      <linearGradient id='brand-mark-gradient' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stopColor={BRAND_PRIMARY} />
        <stop offset='100%' stopColor={BRAND_ACCENT} />
      </linearGradient>
    </defs>
    <rect width='40' height='40' rx='11' fill='url(#brand-mark-gradient)' />
    <path
      d='M20 9.5 L29 29.5 H24.6 L22.7 25 H17.3 L15.4 29.5 H11 Z M20 15.8 L18 21.6 H22 Z'
      fill='#FFFFFF'
    />
  </svg>
)
