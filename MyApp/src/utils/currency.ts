const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function formatCompactCurrency(value: number) {
  if (Math.abs(value) >= 1_000_000) {
    const amount = value / 1_000_000;
    return `${Number.isInteger(amount) ? amount : amount.toFixed(1)} triệu`;
  }

  return formatCurrency(value);
}
