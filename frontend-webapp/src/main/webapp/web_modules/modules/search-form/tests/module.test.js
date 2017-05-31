/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Module from '../src/main'

/**
 * Tests for search-form module interfaces
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(Module.adminContainer, 'Form module should define a main container for administration page')
    assert.isDefined(Module.moduleContainer, 'Form module should define a main container')
    assert.isDefined(Module.styles, 'Form module should define a styles file')
    assert.isDefined(Module.reducer, 'Form module should define his reducers')
    assert.isDefined(Module.messagesDir, 'Form module should define his internationalization messages dir')
    assert.isDefined(Module.dependencies, 'Form module should define his dependencies')
    assert.isDefined(Module.dependencies.user, 'Form module should define his user dependencies')
    assert.isDefined(Module.dependencies.admin, 'Form module should define his admin dependencies')
  })
})
