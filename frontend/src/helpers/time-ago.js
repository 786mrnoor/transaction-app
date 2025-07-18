export default function timeAgo(time) {
  time = Date.parse(time);
  const now = Date.now();
  const seconds = Math.round((now - time) / 1000);

  if (seconds < 60) {
    return seconds + (seconds === 1 ? 'second' : 'seconds');
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return minutes + (minutes === 1 ? 'minute' : 'minutes');
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return hours + (hours === 1 ? 'hour' : 'hours');
  }

  const days = Math.round(hours / 24);
  if (days < 7) {
    return days + (days === 1 ? 'day' : 'days');
  }

  const weeks = Math.round(days / 7);
  if (weeks <= 4 || days < 30) {
    return weeks + (weeks === 1 ? 'week' : 'weeks');
  }

  const months = Math.round(days / 30);
  if (months < 12) {
    return months + (months === 1 ? 'month' : 'months');
  }

  const years = Math.round(months / 12);
  return years + (years === 1 ? 'year' : 'years');
}
