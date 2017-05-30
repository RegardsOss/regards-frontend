/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import keys from 'lodash/keys'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import MessagesFr from '../../src/i18n/messages.fr.i18n'
import MessagesEn from '../../src/i18n/messages.en.i18n'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing i18n', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(MessagesFr)
    assert.isDefined(MessagesEn)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(MessagesFr), keys(MessagesEn))
  })
})
