const iso8601DatesRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const isISO8601DateString = (str: string): boolean => iso8601DatesRegex.test(str);

const pad = (number: number): string => {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

const dateToISO8601 = (date: Date): string =>
  date.getUTCFullYear() +
  '-' + pad(date.getUTCMonth() + 1) +
  '-' + pad(date.getUTCDate()) +
  'T' + pad(date.getUTCHours()) +
  ':' + pad(date.getUTCMinutes()) +
  ':' + pad(date.getUTCSeconds()) +
  '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
  'Z';

export const parse = (str: string) =>
  JSON.parse(str, (key, value) => {
    if (isISO8601DateString(value)) {
      return new Date(value);
    }
    return value;
  })

export const stringify = (obj: any) =>
  JSON.stringify(obj, (key, value) => {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      return dateToISO8601(value);
    }
    return value;
  });
