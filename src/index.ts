/**
 * Abstract class.
 * Helpers abstracts test execution backends.
 *
 * Methods of Helper class will be available in tests in `I` object.
 * They provide user-friendly abstracted actions over NodeJS libraries.
 *
 * Hooks (methods starting with `_`) can be used to setup/teardown,
 * or handle execution flow.
 *
 * Methods are expected to return a value in order to be wrapped in promise.
 */

class Helper {
  private config: any;
  private options: any;
  /**
   *
   * @param {*} config
   */
  constructor(config: any) {
    this.config = config;
  }

  /**
   * Abstract method to provide required config options
   * @return {*}
   * @protected
   */
  static _config() {

  }

  /**
   * Abstract method to validate config
   * @param {*} config
   * @returns {*}
   * @protected
   */
  _validateConfig(config: any) {
    return config;
  }

  /**
   * Sets config for current test
   * @param {*} opts
   * @protected
   */
  _setConfig(opts: any) {
    this.options = this._validateConfig(opts);
  }

  /**
   * Hook executed before all tests
   * @protected
   */
  _init() {

  }

  /**
   * Hook executed before each test.
   * @param {Mocha.Test} [test]
   * @protected
   */
  _before(test = null) {

  }

  /**
   * Hook executed after each test
   * @param {Mocha.Test} [test]
   * @protected
   */
  _after(test = null) {

  }

  /**
   * Hook provides a test details
   * Executed in the very beginning of a test
   *
   * @param {Mocha.Test} test
   * @protected
   */
  /* eslint-disable */
  _test(test: any) {

  }

  /**
   * Hook executed after each passed test
   *
   * @param {Mocha.Test} test
   * @protected
   */
  _passed(test: any) {

  }

  /**
   * Hook executed after each failed test
   *
   * @param {Mocha.Test} test
   * @protected
   */
  _failed(test: any) {

  }

  /**
   * Hook executed before each step
   *
   * @param {CodeceptJS.Step} step
   * @protected
   */
  _beforeStep(step: any) {

  }

  /**
   * Hook executed after each step
   *
   * @param {CodeceptJS.Step} step
   * @protected
   */
  _afterStep(step: any) {

  }

  /**
   * Hook executed before each suite
   *
   * @param {Mocha.Suite} suite
   * @protected
   */
  _beforeSuite(suite: any) {

  }

  /**
   * Hook executed after each suite
   *
   * @param {Mocha.Suite} suite
   * @protected
   */
  _afterSuite(suite: any) {

  }

  /**
   * Hook executed after all tests are executed
   *
   * @param {Mocha.Suite} suite
   * @protected
   */
  _finishTest(suite: any) {

  }

  /**
  * Abstract method to provide common interface to accessing helpers internals inside a test.
  */
  _useTo(description: string, fn: any) {
    if (!description || !fn) throw new Error('useTo requires "description:string" and "fn:async function" as arguments');
    //@ts-ignore
    if (fn[Symbol.toStringTag] !== 'AsyncFunction') throw new Error(`Not async function!\n${fn}\nNative helpers API is asynchronous, please update this function be async`);
    fn.toString = () => 'fn()';
    return fn(this);
  }

  /**
   * Access another configured helper: `this.helpers['AnotherHelper']`
   *
   * @readonly
   * @type {*}
   */
  get helpers() {
    // @ts-ignore
    const { container } = global.codeceptjs || require('codeceptjs');
    return container.default ? container.default.helpers() :container.helpers();
  }

  /**
   * Print debug message to console (outputs only in debug mode)
   *
   * @param {string} msg
   */
  debug(msg: string) {
    // @ts-ignore
    const { output } = global.codeceptjs || require('codeceptjs');
    output.output ? output.output.debug(msg) : output.debug(msg);
  }

  /**
   * @param {string}  section
   * @param {string}  msg
   */
  debugSection(section: any, msg: string) {
    // @ts-ignore
    const { output } = global.codeceptjs || require('codeceptjs');
    output.output ? output.output.debug(`[${section}] ${msg}`) : output.debug(`[${section}] ${msg}`);
  }
}

export = Helper;
