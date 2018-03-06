/**
* LICENSE_PLACEHOLDER
**/
import forEach from 'lodash/forEach'
import Enzyme from 'enzyme'
import { assert } from 'chai'
import Adapter from 'enzyme-adapter-react-16'

// Initialize enzyme: it will be run only once (when initially loading this file)
Enzyme.configure({ adapter: new Adapter() })


// Store real console.error method in order to reuse it later
const originalConsoleError = console.error

/**
 * Test suite helpers : initialize test suite and clears after run. Provides tools for tests
 */
module.exports = {
  /**
   * Initialize before tests
   */
  before() {
    // Since react will console.error propType warnings, that which we'd rather have
    // as errors, we use sinon.js to stub it into throwing these warning as errors
    // instead.
    console.error = (...args) => {
      throw new Error(args.join(' '))
    }
  },
  /**
   * Clears after tests
   */
  after() {
    console.error = originalConsoleError
  },

  /**
   * Asserts a actual propety bag contains all expected properties
   * @param {*} actualProperties actual properties
   * @param {*} expectedProperties expected properties
   * @param message assertion fail message (optional)
   */
  assertAllProperties(actualProperties, expectedProperties, message = 'Properties comparison failed') {
    forEach(expectedProperties, (value, key) => {
      const actualValue = actualProperties[key]
      assert.deepEqual(actualValue, value, `${message}: invalid value at "${key}"`)
    })
  },

  /**
   * Asserts a wrapper contains all expected properties
   * @param {*} enzymeWrapper enzyme wrapper
   * @param {*} expectedProperties expected properties
   * @param message assertion fail message (optional)
   */
  assertWrapperProperties(enzymeWrapper, expectedProperties, message = 'Wrapper properties match failed') {
    this.assertAllProperties(enzymeWrapper.props(), expectedProperties, message)
  },

  /**
   * Provides stub dispatch method returning a Promise that resolves with resolve value as parameter or rejects with
   * reject value as parameter. Note that when reject value is provided, it will reject promise. It will resolve it otherwise
   * @param resolveValue promise resolution value
   * @param rejectValue promise rejection value (promise is reject when this parameter is not undefined nor null)
   * @return {function} stub dispatch method returing a resolved or rejected promise
   */
  getStubDispatchMethod(resolveValue = { error: false, payload: {} }, rejectValue) {
    return () => new Promise((resolve, reject) => {
      if (rejectValue) {
        reject(rejectValue)
      } else {
        resolveValue(resolveValue)
      }
    })
  },
}
