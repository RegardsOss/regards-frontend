/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import styles from '../../src/styles/styles'

describe('[ADMIN UI SERVICE MANAGEMENT] Testing styles', () => {
  it('should return the correct value', () => {
    assert.isNotNull(styles)
    assert.isFunction(styles)
  })
})

