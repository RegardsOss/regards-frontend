import { assert } from 'chai'
import LocaleEN from '../../src/i18n/messages.en.i18n'
import LocaleFR from '../../src/i18n/messages.fr.i18n'

describe('[FORM UTILS] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(LocaleEN)
    assert.isDefined(LocaleFR)
  })
})
