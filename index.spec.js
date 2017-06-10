/* global describe, it, expect */
/* eslint global-require:0 */

describe('date-aware-json', () => {
  const {
    parse,
    monkeypatchJSON,
    restoreJSON,
  } = require('.');

  it('should serialize & deserialize dates', async () => {
    const json = JSON.stringify({ a: { b: new Date(), c: '2000-01-01' } });
    const objWithDateObjects = parse(json);
    const objWithoutDateObjects = JSON.parse(json);

    expect(objWithDateObjects.a.b instanceof Date).toBeTruthy();
    expect(objWithDateObjects.a.c).toEqual('2000-01-01');
    expect(objWithoutDateObjects.a.b instanceof Date).toBeFalsy();
    expect(objWithoutDateObjects.a.c).toEqual('2000-01-01');
  });

  it('should monkeypath JSON.parse', () => {
    const obj = { date: new Date() };

    expect(JSON.parse(JSON.stringify(obj)).date instanceof Date).toBeFalsy();
    monkeypatchJSON();
    expect(JSON.parse(JSON.stringify(obj)).date instanceof Date).toBeTruthy();
    restoreJSON();
    expect(JSON.parse(JSON.stringify(obj)).date instanceof Date).toBeFalsy();
  });
});
