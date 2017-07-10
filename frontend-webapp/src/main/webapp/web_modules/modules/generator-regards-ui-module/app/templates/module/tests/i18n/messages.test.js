/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import keys from 'lodash/keys'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import MessagesEN from '../../src/i18n/messages.en.i18n'
import MessagesFR from '../../src/i18n/messages.fr.i18n'

/**
 * Tests for i18n messages of menu module
 * @author <%= author %>
 */
describe('[Menu] Testing i18n', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(MessagesEN)
    assert.isDefined(MessagesFR)
  })
  it('should define same sentences', () => {
    assert.deepEqual(keys(MessagesFR), keys(MessagesEN))
  })
})