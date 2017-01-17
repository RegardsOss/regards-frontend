import { assert } from 'chai'
import { findMatchingUnit, bitsScale, bytesScale } from '../../src/helper/StorageUnit'
import { StorageCapacity, capacityFromValue } from '../../src/helper/StorageCapacity'

// Test capacity functions a components rendering
describe('[Archival storage] Testing capacity object', () => {
  it('should parse correctly capacities, with or without space, case insensitive', () => {
    const toParse = [{
      input: ' 10   b',
      expected: {
        value: 10,
        unitSymbol: 'b',
      },
    }, {
      input: ' 0b',
      expected: {
        value: 0,
        unitSymbol: 'b',
      },
    }, {
      input: '500Mo',
      expected: {
        value: 500,
        unitSymbol: 'Mo',
      },
    }, {
      input: '500Tio',
      expected: {
        value: 500,
        unitSymbol: 'Tio',
      },
    }, {
      input: '0.25Gib',
      expected: {
        value: 0.25,
        unitSymbol: 'Gib',
      },
    }]
    toParse.forEach(({ input, expected: { value, unitSymbol } }) => {
      const actualCapacity = capacityFromValue(input)
      assert.isNotNull(actualCapacity, `Failed parsing ${input}`)
      assert.equal(actualCapacity.value, value)
      assert.equal(actualCapacity.unit.symbol, unitSymbol)
    })
  })
  it('should not parse capactities with invalid formats/units', () => {
    const toNotParse = [' 10 gigo ', 'n go', '10go go', '15.4.3 o', '10 10 go']
    toNotParse.forEach(input => assert.isNull(capacityFromValue(input), `This input should not be parsed as valid capacity: '${input}'`))
  })
  it('should be able to convert into other units', () => {
    // 0.5 To => 500 000 000 000 x 8 bits
    const halfTo = new StorageCapacity(0.5, findMatchingUnit('To'))
    let converted = halfTo.convert(findMatchingUnit('b'))
    assert.equal(converted.value, 8 * 0.5 * (10 ** 12))
    assert.equal(converted.unit.symbol, 'b')

    // 0.5 To => 500 Go
    converted = halfTo.convert(findMatchingUnit('Go'))
    assert.equal(converted.value, 500)
    assert.equal(converted.unit.symbol, 'Go')

    // 1 Kio => 1024 o => 1,024 Ko
    converted = new StorageCapacity(1, findMatchingUnit('Kio')).convert(findMatchingUnit('Ko'))
    assert.equal(converted.value, 1.024)
    assert.equal(converted.unit.symbol, 'Ko')
  })
  it('should be able to find the best matching unit in a unit scale', () => {
    // 0.5To should be shown as
    const halfTo = new StorageCapacity(0.5, findMatchingUnit('To'))
    // 500Go
    const inBytes = halfTo.scaleAndConvert(bytesScale)
    assert.equal(inBytes.value, 500)
    assert.equal(inBytes.unit.symbol, 'Go')
    // 4Tb
    const inBits = halfTo.scaleAndConvert(bitsScale)
    assert.equal(inBits.value, 4)
    assert.equal(inBits.unit.symbol, 'Tb')
  })
  it('should be able to do basic arithmetic operations with other capacities', () => {
    const oneMo = new StorageCapacity(1, findMatchingUnit('Mo'))
    const fiveHundredKo = new StorageCapacity(500, findMatchingUnit('Ko'))
    // add
    assert.deepEqual(oneMo.add(fiveHundredKo), new StorageCapacity(1.5, findMatchingUnit('Mo')), 'Add capacity fails')
    // substract
    assert.deepEqual(oneMo.subtract(fiveHundredKo), new StorageCapacity(0.5, findMatchingUnit('Mo')), 'Subtract capacity fails')
    // multiply (also it is very useless as operation)
    assert.deepEqual(oneMo.multiply(fiveHundredKo), new StorageCapacity(0.5, findMatchingUnit('Mo')), 'Multiply capacity fails')
    // divide
    assert.deepEqual(oneMo.divide(fiveHundredKo), new StorageCapacity(2, findMatchingUnit('Mo')), 'Divide capacity fails')
  })
  it('should be able to do basic arithmetic operations with numbers', () => {
    const oneMo = new StorageCapacity(1, findMatchingUnit('Mo'))
    // add
    assert.deepEqual(oneMo.add(1), new StorageCapacity(2, findMatchingUnit('Mo')), 'Add number fails')
    // substract
    assert.deepEqual(oneMo.subtract(0.5), new StorageCapacity(0.5, findMatchingUnit('Mo')), 'Subtract number fails')
    // multiply
    assert.deepEqual(oneMo.multiply(5), new StorageCapacity(5, findMatchingUnit('Mo')), 'Multiply number fails')
    // divide
    assert.deepEqual(oneMo.divide(4), new StorageCapacity(0.25, findMatchingUnit('Mo')), 'Divide number fails')
  })
})
