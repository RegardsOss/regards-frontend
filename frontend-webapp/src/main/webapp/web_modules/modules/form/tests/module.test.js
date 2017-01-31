/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import Module from '../src/main'

describe('[FORM MODULE] Testing module interface', () => {
  it('Should supply valid module interface', () => {
    assert.isDefined(Module.adminContainer, 'Form module should define a main container for administration page')
    assert.isDefined(Module.moduleContainer, 'Form module should define a main container')
    assert.isDefined(Module.styles, 'Form module should define a styles file')
    assert.isDefined(Module.reducer, 'Form module should define his reducers')
    assert.isDefined(Module.messagesDir, 'Form module should define his internationalization messages dir')
  })
})
