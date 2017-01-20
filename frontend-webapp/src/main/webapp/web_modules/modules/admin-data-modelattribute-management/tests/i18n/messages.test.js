/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import MessagesFr from '../../src/i18n/messages.fr.i18n'
import MessagesEn from '../../src/i18n/messages.en.i18n'

describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(MessagesFr)
    assert.isDefined(MessagesEn)
  })
})
