import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import main from '../src/main'

describe('[ADMIN BOARD ACCOUNT] Testing main', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists and define router, reducer and dependencies', () => {
    assert.isDefined(main)
    assert.isDefined(main.accountsReducer)
    assert.isDefined(main.accountsRouter)
    assert.isDefined(main.accountsDependencies)
  })
})
