import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import main from '../src/main'

describe('[ADMIN UI THEME MANAGEMENT] Testing main', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists and define router and dependencies', () => {
    assert.isDefined(main)
    assert.isDefined(main.themeUIRouter)
    assert.isDefined(main.themeUIDependencies)
  })
})
