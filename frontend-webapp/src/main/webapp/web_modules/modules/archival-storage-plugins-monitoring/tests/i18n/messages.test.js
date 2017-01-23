/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import LocaleEN from '../../src/i18n/messages.en.i18n'
import LocaleFR from '../../src/i18n/messages.fr.i18n'

describe('[STORAGE PLUGINS MONITORING] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(LocaleEN)
    assert.isDefined(LocaleFR)
  })
})
