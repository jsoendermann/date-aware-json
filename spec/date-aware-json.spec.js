/* global describe, it, expect */
/* eslint prefer-arrow-callback:0, func-names:0, global-require:0, import/no-extraneous-dependencies:0 */
import install from 'jasmine-es6';

install();


describe('date-aware-json', function () {
  const {
    parse,
    stringify,
    monkeypatchJSON,
    restoreJSON,
  } = require('../lib/date-aware-json');

  it('should serialize & deserialize dates', async function () {
    const json = stringify({ a: { b: new Date(), c: '2000-01-01' } });
    const objWithDateObjects = parse(json);
    const objWithoutDateObjects = JSON.parse(json);

    expect(objWithDateObjects.a.b instanceof Date).toBeTruthy();
    expect(objWithDateObjects.a.c).toEqual('2000-01-01');
    expect(objWithoutDateObjects.a.b instanceof Date).toBeFalsy();
    expect(objWithoutDateObjects.a.c).toEqual('2000-01-01');
  });

  it('should monkeypath JSON.parse', function () {
    const obj = { date: new Date() };

    expect(JSON.parse(JSON.stringify(obj)).date instanceof Date).toBeFalsy();
    monkeypatchJSON();
    expect(JSON.parse(JSON.stringify(obj)).date instanceof Date).toBeTruthy();
    restoreJSON();
    expect(JSON.parse(JSON.stringify(obj)).date instanceof Date).toBeFalsy();
  })
});
