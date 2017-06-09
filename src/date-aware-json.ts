const iso8601DatesRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
const isISO8601DateString = (str: string) => iso8601DatesRegex.test(str);

const pad = (number: number): string => {
  const int = Math.round(number)

  if (number < 10) {
    return `0${int}`;
  }
  return `${int}`;
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

const nativeParse = JSON.parse;
const nativeStringify = JSON.stringify;

export const parse = (str: string) =>
  nativeParse(str, (key, value) => {
    if (isISO8601DateString(value)) {
      return new Date(value);
    }
    return value;
  })

export const stringify = (obj: any) =>
  nativeStringify(obj, (key, value) => {
    if (Object.prototype.toString.call(value) === '[object Date]') {
      return dateToISO8601(value);
    }
    return value;
  });

export const monkeypatchJSON = () => {
  JSON.parse = parse;
  JSON.stringify = stringify;
}

export const restoreJSON = () => {
  JSON.parse = nativeParse;
  JSON.stringify = nativeStringify;
}
