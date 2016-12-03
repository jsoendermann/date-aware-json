/* global describe, it, expect */
/* eslint prefer-arrow-callback:0, func-names:0, global-require:0, import/no-extraneous-dependencies:0 */
import install from 'jasmine-es6';

install();


describe('date-aware-json', function () {
  const { parse, stringify } = require('../lib/date-aware-json');

  it('should serialize & deserialize dates', async function () {
    const o = parse(stringify({ a: { b: new Date(), c: '2000-01-01' } }));

    expect(o.a.b instanceof Date).toBeTruthy();
    expect(o.a.c).toEqual('2000-01-01');
  });
});
