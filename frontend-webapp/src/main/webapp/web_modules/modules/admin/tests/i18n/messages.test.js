/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import MessagesFr from '../../src/i18n/messages.fr.i18n'
import MessagesEn from '../../src/i18n/messages.en.i18n'

describe('[ADMIN] Testing i18n', () => {
  it('should exist', () => {
    assert.isNotNull(MessagesFr)
    assert.isNotNull(MessagesEn)
  })
})
