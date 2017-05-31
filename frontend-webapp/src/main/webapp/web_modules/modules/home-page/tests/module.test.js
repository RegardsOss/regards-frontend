/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Module from '../src/main'

describe('[HOME PAGE] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(Module.moduleContainer, 'Home page module should define a main container')
    assert.isDefined(Module.styles, 'Home page module should define a styles file')
    assert.isDefined(Module.messagesDir, 'Home page module should define his internationalization messages dir')
  })
})
