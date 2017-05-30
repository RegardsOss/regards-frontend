/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import styles from '../../src/styles/styles'

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing styles', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isNotNull(styles)
    assert.isFunction(styles)
  })
})

