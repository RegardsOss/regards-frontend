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
 * Provides a stub that reproduce the behavior of a React Container dispatchable method
 * Usually used by Container that fetches data on their componentDidMount, componentWillMount and user actions
 * The sideEffects function let you manipulate attributes passed to the dispatched functions, run spy, ...
 * @param returnValue promise value returned on promise resolution
 * @param sideEffects function called before promise resolution
 * @return {function} stub dispatch method returing a resolved promise
 */
function getDispatchStub(returnValue = { error: false, payload: {} }, sideEffects) {
  return (...providedArgs) => new Promise((resolve) => {
    if (sideEffects) {
      sideEffects(providedArgs)
    }
    resolve(returnValue)
  })
}


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
   * Provides a stub that reproduce the behavior of a React Container dispatchable method that retrieve data without issue
   * Usually used by Container that fetches data on their componentDidMount, componentWillMount and user actions
   * The sideEffects function let you manipulate attributes passed to the dispatched functions, run spy, ...
   * @param payloadContent the payload data
   * @param sideEffects function called before promise resolution
   * @return {function} stub dispatch method returing a resolved promise
   */
  getSuccessDispatchStub(payloadContent = {}, sideEffects) {
    return getDispatchStub({
      error: false,
      payload: {
        ...payloadContent,
      },
    }, sideEffects)
  },

  /**
   * Provides a stub that reproduce the behavior of a React Container dispatchable method that fails to retrieve data
   * Usually used by Container that fetches data on their componentDidMount, componentWillMount and user actions
   * The sideEffects function let you manipulate attributes passed to the dispatched functions, run spy, ...
   * @param sideEffects function called before promise resolution
   * @return {function} stub dispatch method returing a resolved promise
   */
  getFailingDispatchStub(sideEffects) {
    return getDispatchStub({
      error: true,
    }, sideEffects)
  },
}
