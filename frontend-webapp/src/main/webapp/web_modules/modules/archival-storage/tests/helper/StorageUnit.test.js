import { assert } from 'chai'
import { findMatchingUnit, bitsScale, bitsSIPrefixScale, bytesScale, bytesSIPrefixScale } from '../../src/helper/StorageUnit'

// Test unit functions
describe('[Archival storage] Testing unit object', () => {
  it('should parse correctly standard units, case insensitve', () => {
    assert.equal(findMatchingUnit('b').symbol, 'b')
    assert.equal(findMatchingUnit('o').symbol, 'o')
    assert.equal(findMatchingUnit('mo').symbol, 'Mo')
    assert.equal(findMatchingUnit('gb').symbol, 'Gb')
    assert.equal(findMatchingUnit('Tib').symbol, 'Tib')
    assert.equal(findMatchingUnit('Zio').symbol, 'Zio')
  })
  it('should retrieve the right unit scale', () => {
    assert.equal(findMatchingUnit('b').scaleFamily, bitsScale)
    assert.equal(findMatchingUnit('Gb').scaleFamily, bitsScale)
    assert.equal(findMatchingUnit('Yio').scaleFamily, bytesSIPrefixScale)
    assert.equal(findMatchingUnit('Zo').scaleFamily, bytesScale)
    assert.equal(findMatchingUnit('o').scaleFamily, bytesScale)
    assert.equal(findMatchingUnit('Mib').scaleFamily, bitsSIPrefixScale)
  })
  it('should not invent units...', () => {
    assert.isUndefined(findMatchingUnit('bg'))
    assert.isUndefined(findMatchingUnit('kobs'))
  })
})
