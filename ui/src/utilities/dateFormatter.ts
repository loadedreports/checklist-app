const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
})

export function formatDate(date: string) {
  const dateObject = new Date(date)
  return formatter.format(dateObject)
}