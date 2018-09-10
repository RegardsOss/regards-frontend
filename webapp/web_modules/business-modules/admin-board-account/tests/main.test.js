import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { accountsReducer, accountsRouter, accountsDependencies } from '../src/main'

describe('[ADMIN BOARD ACCOUNT] Testing main', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists and define router, reducer and dependencies', () => {
    assert.isDefined(accountsReducer)
    assert.isDefined(accountsRouter)
    assert.isDefined(accountsDependencies)
  })
})
