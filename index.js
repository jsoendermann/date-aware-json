const iso8601DatesRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
const isISO8601DateString = str => iso8601DatesRegex.test(str);

const nativeParse = JSON.parse;

const parse = str =>
  nativeParse(str, (key, value) => {
    if (isISO8601DateString(value)) {
      return new Date(value);
    }
    return value;
  });

const monkeypatchJSON = () => {
  JSON.parse = parse;
};

const restoreJSON = () => {
  JSON.parse = nativeParse;
};

module.exports = {
  parse,
  monkeypatchJSON,
  restoreJSON,
};
