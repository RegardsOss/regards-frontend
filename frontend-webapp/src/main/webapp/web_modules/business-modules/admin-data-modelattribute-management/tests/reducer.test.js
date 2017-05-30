/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Reducer from '../src/reducer'

describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing reducer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should be defined', () => {
    assert.isDefined(Reducer)
  })
})

