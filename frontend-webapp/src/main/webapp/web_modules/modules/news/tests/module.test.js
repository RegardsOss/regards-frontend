/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Module from '../src/main'

describe('[MENU MODULE] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(Module.moduleContainer, 'News module should define a main container')
    assert.isDefined(Module.styles, 'News module should define a styles file')
    assert.isDefined(Module.messagesDir, 'News module should define his internationalization messages dir')
  })
})
