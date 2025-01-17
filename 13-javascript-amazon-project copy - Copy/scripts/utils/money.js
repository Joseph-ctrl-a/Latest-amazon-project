export function formatCurrency (priceCents, fixedAmount = 2) {
  return (Math.round(priceCents) / 100).toFixed(fixedAmount);
 }