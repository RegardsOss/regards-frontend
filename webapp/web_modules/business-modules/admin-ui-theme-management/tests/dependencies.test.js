import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import dependencies from '../src/dependencies'

describe('[ADMIN UI THEME MANAGEMENT] Testing dependencies', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists and define the list of dependencies', () => {
    assert.isDefined(dependencies)
    assert.isDefined(dependencies.boardAddRequiredDependencies)
    assert.isNotEmpty(dependencies.boardAddRequiredDependencies)
    assert.isDefined(dependencies.boardListRequiredDependencies)
    assert.isNotEmpty(dependencies.boardListRequiredDependencies)
  })
})
