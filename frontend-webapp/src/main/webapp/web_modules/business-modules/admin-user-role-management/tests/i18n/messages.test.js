import { assert } from 'chai'
import keys from 'lodash/keys'
import MessagesFr from '../../src/i18n/messages.fr.i18n'
import MessagesEn from '../../src/i18n/messages.en.i18n'

describe('[ADMIN USER ROLE MANAGEMENT] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(MessagesFr)
    assert.isDefined(MessagesEn)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(MessagesFr), keys(MessagesEn))
  })
})
