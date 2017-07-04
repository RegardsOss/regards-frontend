/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Module from '../src/main'

/**
 * Tests for menu module interfaces
 * @author <%= author %>
 */
describe('[Menu] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(Module.adminContainer, 'Menu module should define a main container for administration page')
    assert.isDefined(Module.moduleContainer, 'Menu module should define a main container')
    assert.isDefined(Module.styles, 'Menu module should define a styles file')
    assert.isDefined(Module.messagesDir, 'Form module should define his internationalization messages dir')
  })
})
