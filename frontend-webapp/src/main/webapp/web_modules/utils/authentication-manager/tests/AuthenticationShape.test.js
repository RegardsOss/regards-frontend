/**
 * Created by lmieulet on 05/12/16.
 */
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import AuthenticateShape from '../src/AuthenticateShape'

describe('[AUTH UTILS] Testing AuthShape', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AuthenticateShape)
  })
})
