import { assert } from 'chai'
import Locales from '../../src/i18n/Locales'

describe('[FORM UTILS] Testing i18n', () => {
  it('should exist', () => {
    assert.isDefined(Locales)
    assert.isDefined(Locales.en)
    assert.isDefined(Locales.fr)
  })
})
