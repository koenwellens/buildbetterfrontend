export function editorialDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (name: Intl.DateTimeFormatPartTypes): string => parts.find((item) => item.type === name)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

