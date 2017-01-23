/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import * as StorageUnit from '../../src/helper/StorageUnit'

// Test unit functions
describe('[STORAGE PLUGINS MONITORING] Testing unit object', () => {
  it('should parse correctly standard units, case insensitve', () => {
    assert.equal(StorageUnit.findMatchingUnit('b').symbol, 'b')
    assert.equal(StorageUnit.findMatchingUnit('o').symbol, 'o')
    assert.equal(StorageUnit.findMatchingUnit('mo').symbol, 'Mo')
    assert.equal(StorageUnit.findMatchingUnit('gb').symbol, 'Gb')
    assert.equal(StorageUnit.findMatchingUnit('Tib').symbol, 'Tib')
    assert.equal(StorageUnit.findMatchingUnit('Zio').symbol, 'Zio')
  })
  it('should retrieve the right unit scale', () => {
    assert.include(StorageUnit.findMatchingUnit('b').scaleFamilies, StorageUnit.bitsScale)
    assert.include(StorageUnit.findMatchingUnit('Gb').scaleFamilies, StorageUnit.bitsScale)
    assert.include(StorageUnit.findMatchingUnit('Yio').scaleFamilies, StorageUnit.bytesSIPrefixScale)
    assert.include(StorageUnit.findMatchingUnit('Zo').scaleFamilies, StorageUnit.bytesScale)
    assert.include(StorageUnit.findMatchingUnit('o').scaleFamilies, StorageUnit.bytesScale)
    assert.include(StorageUnit.findMatchingUnit('Mib').scaleFamilies, StorageUnit.bitsSIPrefixScale)
  })
  it('should not invent units...', () => {
    assert.isUndefined(StorageUnit.findMatchingUnit('bg'))
    assert.isUndefined(StorageUnit.findMatchingUnit('kobs'))
  })
  it('should be storing units in allUnits, for a given scale family, ordered from small to big', () => {
    // make ordered partition by family scale
    StorageUnit.allUnitScales.forEach((scale) => {
      const scaleUnits = StorageUnit.getOrderedUnitsInScale(scale)
      scaleUnits.reduce((previousUnit, unit) => {
        assert.isAbove(unit.toBits, previousUnit.toBits,
          `${unit.symbol} has lower to bit factor (x${unit.toBits}) factor 
          than previous unit! ${previousUnit.symbol}, x${previousUnit.toBits}`)
        return unit
      })
    })
  })
})
