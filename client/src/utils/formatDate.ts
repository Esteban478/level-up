export const formatDatelongMonthYear = (date: Date) => {
  const options = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions;
  return date.toLocaleDateString('en-US', options);
}