/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import keys from 'lodash/keys'
import MessagesEN from '../../src/i18n/messages.en.i18n'
import MessagesFR from '../../src/i18n/messages.fr.i18n'

describe('[NEWS MODULE] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(MessagesEN)
    assert.isDefined(MessagesFR)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(MessagesFR), keys(MessagesEN))
  })
})
