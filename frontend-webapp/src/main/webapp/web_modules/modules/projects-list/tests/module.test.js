/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Module from '../src/main'

describe('[PROJECT LIST MODULE] Testing module interface', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should supply valid module interface', () => {
    assert.isDefined(Module.moduleContainer, 'ProjectList module should define a main container')
    assert.isDefined(Module.styles, 'ProjectList module should define a styles file')
    assert.isDefined(Module.reducer, 'ProjectList module should define his reducers')
    assert.isDefined(Module.messagesDir, 'ProjectList module should define his internationalization messages dir')
  })
})
