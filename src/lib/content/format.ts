const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

/** Editorial dates are calendar dates, never visitor-local timestamps. */
export function formatArticleDate(value: string): string {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}
