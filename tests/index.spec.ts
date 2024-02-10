import Helper from '../src';

let _Helper;
let _CustomHelper;

class CustomHelper extends Helper {
  _validateConfig (config: any): any {
    super._validateConfig (config);
    if (!config.hello) throw Error('your config is not valid!');
  }
}

describe('Abstract helper',  () => {

  beforeAll(() => {
    _Helper = new Helper({ hello: 'world'});
  })

  test('create new helper successfully', () => {
    expect(_Helper.constructor.name).toEqual('Helper');
  });

  test('get the passed config', () => {
    expect(_Helper.config).toEqual({ hello: 'world'});
  });

  test('get the options from passed config', () => {
    _Helper._setConfig({ another: 'value' });
    expect(_Helper.config).toEqual({ hello: 'world'});
    expect(_Helper.options).toEqual({ another: 'value'});
  });

  test('throws error when nothing is passed to _useTo', () => {
    try {
      _Helper._useTo();
    } catch (e) {
      expect(e.message).toContain('useTo requires "description:string" and "fn:async function" as arguments');
    }
  });

  test('throws error when fn is not passed to _useTo', () => {
    try {
      _Helper._useTo('hello');
    } catch (e) {
      expect(e.message).toContain('useTo requires "description:string" and "fn:async function" as arguments');
    }
  });

  test('throws error when description is not passed to _useTo', () => {
    try {
      _Helper._useTo(undefined, function () {});
    } catch (e) {
      expect(e.message).toContain('useTo requires "description:string" and "fn:async function" as arguments');
    }
  });

  test('throws error when non async fn is passed to _useTo', () => {
    try {
      _Helper._useTo('hello', function () {});
    } catch (e) {
      expect(e.message).toContain('Not async function!');
    }
  });

  test('no error when all valid args passed to _useTo', async () => {
      const res = _Helper._useTo('hello', async function hello () { return 'hi' });
      expect(await res).toEqual('hi');
  });

  test('validate config of custom helper', async () => {
    try {
      _CustomHelper = new CustomHelper({ });
      _CustomHelper._validateConfig(_CustomHelper.config)
    } catch (e) {
      expect(e.message).toEqual('your config is not valid!');
    }
  });
})
