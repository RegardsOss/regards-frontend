/**
 * LICENSE_PLACEHOLDER
 **/
import { assert } from 'chai'
import ItemTypes from '../../src/components/ItemTypes'

describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ItemTypes', () => {
  it('should be defined', () => {
    assert.isDefined(ItemTypes)
    assert.isObject(ItemTypes)
  })
})

