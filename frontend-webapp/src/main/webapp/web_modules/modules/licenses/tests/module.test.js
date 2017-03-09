/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import module from '../src/main'

describe('[LICENSE MODULE] Testing module interface', () => {
  it('Should supply valid module interface', () => {
    assert.isDefined(module.moduleContainer, 'License module should define a main container')
    assert.isDefined(module.styles, 'License module should define a styles file')
    assert.isDefined(module.messagesDir, 'License module should define his internationalization messages dir')
  })
})
