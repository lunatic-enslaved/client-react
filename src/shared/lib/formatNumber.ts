export function formatNumber(number: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits }).format(number);
}
