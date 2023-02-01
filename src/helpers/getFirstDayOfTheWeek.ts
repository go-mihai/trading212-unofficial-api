export default function getFirstDayOfTheWeek(date: Date) {
  const iDayOfWeek = date.getDay()
  const iDifference = date.getDate() - iDayOfWeek + (iDayOfWeek === 0 ? -6 : 1)

  const firstDayOfTheWeek = new Date(date.setDate(iDifference))
  firstDayOfTheWeek.setHours(0, 0, 0, 0)

  return firstDayOfTheWeek
}
