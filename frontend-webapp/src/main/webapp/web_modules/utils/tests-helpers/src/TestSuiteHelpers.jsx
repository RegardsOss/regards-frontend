/**
* LICENSE_PLACEHOLDER
**/
import { stub } from 'sinon'

/**
 * Test suite helpers : initialize test suite and clears after run
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
}

