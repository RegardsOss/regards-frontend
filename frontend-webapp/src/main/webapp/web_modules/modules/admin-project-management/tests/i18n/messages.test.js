/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import { keys } from 'lodash'
import MessagesFr from '../../src/i18n/messages.fr.i18n'
import MessagesEn from '../../src/i18n/messages.en.i18n'

describe('[ADMIN PROJECT MANAGEMENT] Testing i18n', () => {
  it('should exist', () => {
    assert.isNotNull(MessagesFr)
    assert.isNotNull(MessagesEn)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(MessagesFr), keys(MessagesEn))
  })
})
