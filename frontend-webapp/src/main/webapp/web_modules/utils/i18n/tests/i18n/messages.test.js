import { assert } from 'chai'
import LocalesEn from '../../src/i18n/messages.en.i18n'
import LocalesFr from '../../src/i18n/messages.fr.i18n'

describe('[i18n UTILS] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(LocalesEn)
    assert.isDefined(LocalesFr)
  })
})
