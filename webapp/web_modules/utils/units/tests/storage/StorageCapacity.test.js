/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { StorageUnitScale } from '../../src/storage/StorageUnitScale'
import { StorageCapacity } from '../../src/storage/StorageCapacity'

// Test capacity functions a components rendering
describe('[Storage Monitoring] Testing capacity object', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should parse correctly capacities, with or without space', () => {
    const toParse = [{
      input: ' 10   b',
      expected: {
        value: 10,
        unitSymbol: 'b',
      },
    }, {
      input: ' 0bits',
      expected: {
        value: 0,
        unitSymbol: 'b',
      },
    }, {
      input: '500Mo',
      expected: {
        value: 500,
        unitSymbol: 'MB',
      },
    }, {
      input: '500MB',
      expected: {
        value: 500,
        unitSymbol: 'MB',
      },
    }, {
      input: '500Tio',
      expected: {
        value: 500,
        unitSymbol: 'TiB',
      },
    }, {
      input: '0.25gib',
      expected: {
        value: 0.25,
        unitSymbol: 'gib',
      },
    }]
    toParse.forEach(({ input, expected: { value, unitSymbol } }) => {
      const actualCapacity = StorageCapacity.fromValue(input)
      assert.isNotNull(actualCapacity, `Failed parsing ${input}`)
      assert.equal(actualCapacity.value, value)
      assert.equal(actualCapacity.unit.symbol, unitSymbol)
    })
  })
  it('should not parse capactities with invalid formats/units', () => {
    const toNotParse = [' 10 gigo ', 'n go', '10go go', '15.4.3 o', '10 10 go']
    toNotParse.forEach((input) => assert.isNull(StorageCapacity.fromValue(input), `This input should not be parsed as valid capacity: '${input}'`))
  })
  it('should be able to convert into other units', () => {
    // 0.5 To => 500 000 000 000 x 8 bits
    const halfTo = new StorageCapacity(0.5, StorageUnitScale.getMatchingUnit('TB'))
    let converted = halfTo.convert(StorageUnitScale.getMatchingUnit('b'))
    assert.equal(converted.value, 8 * 0.5 * (10 ** 12))
    assert.equal(converted.unit.symbol, 'b')

    // 0.5 To => 500 Go
    converted = halfTo.convert(StorageUnitScale.getMatchingUnit('GB'))
    assert.equal(converted.value, 500)
    assert.equal(converted.unit.symbol, 'GB')

    // 1 KiB => 1024B => 1,024 KB
    converted = new StorageCapacity(1, StorageUnitScale.getMatchingUnit('KiB')).convert(StorageUnitScale.getMatchingUnit('Ko'))
    assert.equal(converted.value, 1.024)
    assert.equal(converted.unit.symbol, 'KB')
  })
  it('should be able to find the best matching unit in a unit scale', () => {
    // 0.5To should be shown as
    const halfTo = new StorageCapacity(0.5, StorageUnitScale.getMatchingUnit('TB'))
    // 500Go
    const inBytes = halfTo.scaleAndConvert(StorageUnitScale.bytesScale)
    assert.equal(inBytes.value, 500)
    assert.equal(inBytes.unit.symbol, 'GB')
    // 4Tb
    const inBits = halfTo.scaleAndConvert(StorageUnitScale.bitsScale)
    assert.equal(inBits.value, 4)
    assert.equal(inBits.unit.symbol, 'tb')
  })
  it('should be able to do basic arithmetic operations with other capacities', () => {
    const oneMo = new StorageCapacity(1, StorageUnitScale.getMatchingUnit('Mo'))
    const fiveHundredKo = new StorageCapacity(500, StorageUnitScale.getMatchingUnit('Ko'))
    // add
    assert.deepEqual(oneMo.add(fiveHundredKo), new StorageCapacity(1.5, StorageUnitScale.getMatchingUnit('Mo')), 'Add capacity fails')
    // substract
    assert.deepEqual(oneMo.subtract(fiveHundredKo), new StorageCapacity(0.5, StorageUnitScale.getMatchingUnit('Mo')), 'Subtract capacity fails')
    // multiply (also it is very useless as operation)
    assert.deepEqual(oneMo.multiply(fiveHundredKo), new StorageCapacity(0.5, StorageUnitScale.getMatchingUnit('Mo')), 'Multiply capacity fails')
    // divide
    assert.deepEqual(oneMo.divide(fiveHundredKo), new StorageCapacity(2, StorageUnitScale.getMatchingUnit('Mo')), 'Divide capacity fails')
  })
  it('should be able to do basic arithmetic operations with numbers', () => {
    const oneMo = new StorageCapacity(1, StorageUnitScale.getMatchingUnit('Mo'))
    // add
    assert.deepEqual(oneMo.add(1), new StorageCapacity(2, StorageUnitScale.getMatchingUnit('Mo')), 'Add number fails')
    // substract
    assert.deepEqual(oneMo.subtract(0.5), new StorageCapacity(0.5, StorageUnitScale.getMatchingUnit('Mo')), 'Subtract number fails')
    // multiply
    assert.deepEqual(oneMo.multiply(5), new StorageCapacity(5, StorageUnitScale.getMatchingUnit('Mo')), 'Multiply number fails')
    // divide
    assert.deepEqual(oneMo.divide(4), new StorageCapacity(0.25, StorageUnitScale.getMatchingUnit('Mo')), 'Divide number fails')
  })
})
