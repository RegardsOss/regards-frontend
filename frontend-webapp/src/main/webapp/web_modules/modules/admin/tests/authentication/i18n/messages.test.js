import { assert } from 'chai'
import MessagesFr from '../../../src/authentication/i18n/messages.fr.i18n'
import MessagesEn from '../../../src/authentication/i18n/messages.en.i18n'

describe('[ADMIN MANAGEMENT] Testing auth i18n', () => {
  it('should exist', () => {
    assert.isNotNull(MessagesFr)
    assert.isNotNull(MessagesEn)
  })
})
