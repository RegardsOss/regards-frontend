/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ItemTypes from '../../src/components/ItemTypes'

describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ItemTypes', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should be defined', () => {
    assert.isDefined(ItemTypes)
    assert.isObject(ItemTypes)
  })
})

