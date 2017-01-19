import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import MicroserviceBoardItems from '../../src/components/MicroserviceBoardItems'

describe('[ADMIN PROJECT MANAGEMENT] Testing plugin board item generator', () => {
  it('should generator items properly', () => {
    assert.isDefined(MicroserviceBoardItems)
  })
})
