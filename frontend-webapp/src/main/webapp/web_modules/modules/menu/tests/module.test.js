/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import Module from '../src/main'

describe('[MENU MODULE] Testing module interface', () => {
  it('Should supply valid module interface', () => {
    assert.isDefined(Module.adminContainer, 'Menu module should define a main container for administration page')
    assert.isDefined(Module.moduleContainer, 'Menu module should define a main container')
    assert.isDefined(Module.styles, 'Menu module should define a styles file')
    assert.isDefined(Module.messagesDir, 'Form module should define his internationalization messages dir')
  })
})
