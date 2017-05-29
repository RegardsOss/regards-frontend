/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers} from '@regardsoss/tests-helpers'
import ErrorTypes from '../src/ErrorTypes'

// Test a components rendering
describe('[FORM UTILS] Testing error types', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ErrorTypes)
    assert.isDefined(ErrorTypes.REQUIRED)
    assert.isDefined(ErrorTypes.EMAIL)
  })
})
