/**
 * LICENSE_PLACEHOLDER
 */
import { assert } from 'chai'
import StorageUnitScale from '../../src/helper/StorageUnit'

// Test unit functions
describe('[STORAGE PLUGINS MONITORING] Testing units', () => {

  const tests = [ // bits scale
    {
      // general failure case: should not allow text representing a unit and some more characters
      test: 'mbs',
      expectedScale: null,
    }, {
      // simple bit
      test: 'b',
      expectedScale: StorageUnitScale.bitsScale,
      expectedSymbol: 'b',
    }, {
      // mega bit
      test: 'mb',
      expectedScale: StorageUnitScale.bitsScale,
      expectedSymbol: 'mb',
    }, {
      // singular
      test: 'gbit',
      expectedScale: StorageUnitScale.bitsScale,
      expectedSymbol: 'gb',
    }, {
      // plural
      test: 'tbits',
      expectedScale: StorageUnitScale.bitsScale,
      expectedSymbol: 'tb',
    }, {
      // case insensitive (long unit)
      test: 'ZbIT',
      expectedScale: StorageUnitScale.bitsScale,
      expectedSymbol: 'zb',
    }, {
      // leading and trailing spaces allowed
      test: '   kb ',
      expectedScale: StorageUnitScale.bitsScale,
      expectedSymbol: 'kb',
    }, {
      // failure case: Capital marker with standard system
      test: 'Tb',
      expectedScale: null,
    }, {
      // simple byte
      test: 'B',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'B',
    }, {
      // mega byte
      test: 'MB',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'MB',
    }, {
      // singular
      test: 'Gbyte',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'GB',
    }, {
      // plural
      test: 'Tbytes',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'TB',
    }, {
      // case insensitive (long unit)
      test: 'zbYtE',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'ZB',
    }, {
      // leading and trailing spaces allowed
      test: '   KB ',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'KB',
    }, {
      // failure : lower letter marker with standard system
      test: 'tB',
      expectedScale: null,
    }, {
      // special case: parse also french units
      test: 'ko',
      expectedScale: StorageUnitScale.bytesScale,
      expectedSymbol: 'KB',
    }, {
      // kilo bit with SI prefix
      test: 'kib',
      expectedScale: StorageUnitScale.bitsSIPrefixScale,
      expectedSymbol: 'kib',
    }, {
      // mega bit with SI prefix
      test: 'MiB',
      expectedScale: StorageUnitScale.bytesSIPrefixScale,
      expectedSymbol: 'MiB',
    }, {
      // failure case : mixed capital lettes in standard system with SI prefix
      test: 'miB',
      expectedScale: null,
    }, {
      // bits SI prefix singular, case insensitive
      test: 'GIbIt',
      expectedScale: StorageUnitScale.bitsSIPrefixScale,
      expectedSymbol: 'gib',
    }, {
      // bits SI prefix plural, case insensitive
      test: 'tiBiTs',
      expectedScale: StorageUnitScale.bitsSIPrefixScale,
      expectedSymbol: 'tib',
    }, {
      // bytes SI prefix singular, case insensitive
      test: 'gibyte',
      expectedScale: StorageUnitScale.bytesSIPrefixScale,
      expectedSymbol: 'GiB',
    }, {
      // bytes  SI prefix plural, case insensitive
      test: 'TIByTes',
      expectedScale: StorageUnitScale.bytesSIPrefixScale,
      expectedSymbol: 'TiB',
    }]
  it('should parse correctly scales and units', () => {
    tests.forEach(({ test, expectedScale, expectedSymbol }) => {
      const u = StorageUnitScale.getMatchingUnit(test)
      if (expectedScale && expectedSymbol) {
        assert.isNotNull(u, `Text '${test}' was not parsed into a unit`)
        assert.equal(u.symbol, expectedSymbol, `Text '${test}' should be resolved as '${expectedSymbol}', but '${u.unit}' was found`)
        assert.equal(u.scale, expectedScale, `Text '${test}' should be resolved in scale '${expectedScale.id}', but '${u.scale.id}' was found`)
      } else {
        assert.isNull(u, `${test} parsing should return null, but was resolved into ${u}`)
      }
    })
  })
  it('should be storing units in scales, ordered from small to big', () => {
    StorageUnitScale.all.forEach(unitScale => unitScale.units.reduce((previousUnit, currentUnit) => {
      if (previousUnit) {
        assert.isAbove(currentUnit.toBits, previousUnit.toBits, `Inversed order in all units, between ${previousUnit.symbol} and ${currentUnit.symbol}`)
      }
      return currentUnit
    }, null))
  })
})
