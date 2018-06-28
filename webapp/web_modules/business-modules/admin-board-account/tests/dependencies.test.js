import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import dependencies from '../src/dependencies'

describe('[ADMIN BOARD ACCOUNT] Testing dependencies', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists and define the list of dependencies', () => {
    assert.isDefined(dependencies)
    assert.isArray(dependencies)
    assert.isTrue(dependencies.length > 0)
  })
})
