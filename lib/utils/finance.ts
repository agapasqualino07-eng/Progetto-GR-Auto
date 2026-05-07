/**
 * Calcolo rata mensile con formula del mutuo francese.
 *  M = P * (i / (1 - (1 + i)^-n))
 * Dove i = TAN mensile, n = mesi, P = capitale.
 */
export function monthlyPayment({
  principal,
  annualRatePercent,
  months,
}: {
  principal: number
  annualRatePercent: number
  months: number
}): number {
  if (principal <= 0 || months <= 0) return 0
  const monthlyRate = annualRatePercent / 100 / 12
  if (monthlyRate === 0) return principal / months
  return (
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
  )
}
