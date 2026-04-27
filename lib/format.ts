function groupDigits(price: number): string {
  return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatPrice(price: number): string {
  return groupDigits(price) + " so'm";
}

export function formatPriceRaw(price: number): string {
  return groupDigits(price);
}

export function generateOrderId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ZJ-${dateStr}-${rand}`;
}
