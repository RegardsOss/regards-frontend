/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import MicroserviceBoardItems from '../../src/components/MicroserviceBoardItems'

/**
 * Microservices configuration tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing plugin board item generator', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should generator items properly', () => {
    assert.isDefined(MicroserviceBoardItems)
  })
})
