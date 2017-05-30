import keys from 'lodash/keys'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Locales from '../../src/i18n/Locales'

describe('[FORM UTILS] Testing i18n', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(Locales)
    assert.isDefined(Locales.en)
    assert.isDefined(Locales.fr)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(Locales.fr), keys(Locales.en))
  })
})
