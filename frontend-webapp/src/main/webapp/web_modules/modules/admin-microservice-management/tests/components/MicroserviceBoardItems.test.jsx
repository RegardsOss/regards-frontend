import { assert } from 'chai'
import MicroserviceBoardItems from '../../src/components/MicroserviceBoardItems'

describe('[ADMIN PROJECT MANAGEMENT] Testing plugin board item generator', () => {
  it('should generator items properly', () => {
    assert.isDefined(MicroserviceBoardItems)
  })
})
