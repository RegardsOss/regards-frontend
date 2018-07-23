import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import reducer from '../src/reducer'

describe('[ADMIN BOARD ACCOUNT] Testing reducer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(reducer)
  })
})
