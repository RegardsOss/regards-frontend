/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import { keys } from 'lodash'
import MessagesEN from '../../src/i18n/messages.en.i18n'
import MessagesFR from '../../src/i18n/messages.fr.i18n'
import StorageUnitScale from '../../src/helper/StorageUnit'

describe('[STORAGE PLUGINS MONITORING] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(MessagesEN)
    assert.isDefined(MessagesFR)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(MessagesFR), keys(MessagesEN))
  })
  it('should define keys for each unit and scale unit', () => {
    // as there is equality between FR and EN messages, test above, no need to test it twice here
    const messagesKeys = keys(MessagesEN)
    StorageUnitScale.all.forEach((scale) => {
      assert.include(messagesKeys, scale.messageKey, `Missing scale key in messages : ${scale.messageKey}`)
      scale.units.forEach((unit) => {
        assert.include(messagesKeys, unit.messageKey, `Missing unit key in messages : ${unit.messageKey}`)
      })
    })
  })
})
