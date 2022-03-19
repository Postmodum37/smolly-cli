import dateFormat from 'dateformat';

export function fullDate(date) {
  return dateFormat(date, 'ddd, d mmm yyyy HH:MM:ss');
}
