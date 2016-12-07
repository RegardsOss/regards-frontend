import { assert } from 'chai'
import MessagesFr from '../../src/i18n/messages.fr.i18n'
import MessagesEn from '../../src/i18n/messages.en.i18n'
import Locales from '../../src/i18n/Locales'

describe('[FORM UTILS] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(Locales)
    assert.isDefined(Locales.en)
    assert.isDefined(Locales.fr)
  })
})
