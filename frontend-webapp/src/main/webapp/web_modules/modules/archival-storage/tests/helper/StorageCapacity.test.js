import { assert } from 'chai'
import { findMatchingUnit } from '../../src/helper/StorageUnit'
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
    toNotParse.forEach(input =>
      assert.isNull(capacityFromValue(input), `This input should not be parsed as valid capacity: '${input}'`))
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
})
