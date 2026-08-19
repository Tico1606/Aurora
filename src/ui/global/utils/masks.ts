const DIGITS_ONLY_REGEX = /\D+/g

export function digitsOnly(value: string) {
  return String(value ?? '').replace(DIGITS_ONLY_REGEX, '')
}

function clampDigits(value: string, maxDigits: number) {
  return digitsOnly(value).slice(0, Math.max(0, maxDigits))
}

export function maskCpf(rawValue: string) {
  const value = clampDigits(rawValue, 11)

  const part1 = value.slice(0, 3)
  const part2 = value.slice(3, 6)
  const part3 = value.slice(6, 9)
  const part4 = value.slice(9, 11)

  if (!part2) return part1
  if (!part3) return `${part1}.${part2}`
  if (!part4) return `${part1}.${part2}.${part3}`
  return `${part1}.${part2}.${part3}-${part4}`
}

export function maskCnpj(rawValue: string) {
  const value = clampDigits(rawValue, 14)

  const part1 = value.slice(0, 2)
  const part2 = value.slice(2, 5)
  const part3 = value.slice(5, 8)
  const part4 = value.slice(8, 12)
  const part5 = value.slice(12, 14)

  if (!part2) return part1
  if (!part3) return `${part1}.${part2}`
  if (!part4) return `${part1}.${part2}.${part3}`
  if (!part5) return `${part1}.${part2}.${part3}/${part4}`
  return `${part1}.${part2}.${part3}/${part4}-${part5}`
}

export function maskCpfCnpj(rawValue: string) {
  const value = digitsOnly(rawValue)
  if (value.length <= 11) return maskCpf(value)
  return maskCnpj(value)
}

export function maskCep(rawValue: string) {
  const value = clampDigits(rawValue, 8)
  const part1 = value.slice(0, 5)
  const part2 = value.slice(5, 8)

  if (!part2) return part1
  return `${part1}-${part2}`
}

export function maskPhone(rawValue: string) {
  const value = clampDigits(rawValue, 11)
  const ddd = value.slice(0, 2)
  const rest = value.slice(2)

  if (!ddd) return ''
  if (!rest) return `(${ddd}`

  const isMobile = rest.length > 8
  const first = rest.slice(0, isMobile ? 5 : 4)
  const second = rest.slice(isMobile ? 5 : 4, isMobile ? 9 : 8)

  if (!first) return `(${ddd})`
  if (!second) return `(${ddd}) ${first}`
  return `(${ddd}) ${first}-${second}`
}
