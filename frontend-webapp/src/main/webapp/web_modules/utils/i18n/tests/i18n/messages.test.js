import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import LocalesEn from '../../src/i18n/messages.en.i18n'
import LocalesFr from '../../src/i18n/messages.fr.i18n'

describe('[i18n UTILS] Testing i18n', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(LocalesEn)
    assert.isDefined(LocalesFr)
  })
})
