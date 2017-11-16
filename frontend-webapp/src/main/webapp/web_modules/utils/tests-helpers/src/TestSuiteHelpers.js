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
export default {
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

}

