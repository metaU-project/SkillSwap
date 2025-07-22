/**
 * @param {*} dateString - date in format YYYY-MM-DD
 * @param {*} timeString - time in format HH:MM
 * @returns unix timestamp
 */
export function toUnixTimestamp(dateString, timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date(dateString);
  date.setHours(hours, minutes, 0, 0);
  return Math.floor(date.getTime() / 1000);
}
