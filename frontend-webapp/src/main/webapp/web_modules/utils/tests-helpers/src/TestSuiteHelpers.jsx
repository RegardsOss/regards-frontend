/**
* LICENSE_PLACEHOLDER
**/
import forEach from 'lodash/forEach'
import { assert } from 'chai'
import { stub } from 'sinon'

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
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  },
  /**
   * Clears after tests
   */
  after() {
    console.error.restore()
  },

  /**
   * Asserts a actual propety bag contains all expected properties
   * @param {*} actualProperties actual properties
   * @param {*} expectedProperties expected properties
   */
  assertAllProperties(actualProperties, expectedProperties) {
    forEach(expectedProperties, (value, key) => {
      const actualValue = actualProperties[key]
      assert.deepEqual(actualValue, value, `Invalid property "${key}" value`)
    })
  },

  /**
   * Asserts a wrapper contains all expected properties
   * @param {*} enzymeWrapper enzyme wrapper
   * @param {*} expectedProperties expected properties
   */
  assertWrapperProperties(enzymeWrapper, expectedProperties) {
    this.assertAllProperties(enzymeWrapper.props(), expectedProperties)
  },

}

