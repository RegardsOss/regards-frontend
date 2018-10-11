/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
**/
import { assert } from 'chai'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import NumberRangeHelper from '../../src/utils/NumberRangeHelper'

describe('[PLUGINS API] Testing NumberRangeHelper', () => {
  it('should correctly convert ranges', () => {
    // A - Equal
    let converted = NumberRangeHelper.convertToRange(-3.2, EnumNumericalComparator.EQ)
    assert.equal(converted.lowerBound, -3.2, 'EQ -3.2: Lower should worth -3.2')
    assert.equal(converted.upperBound, -3.2, 'EQ -3.2: Upper should worth -3.2')

    // B - Greater than or equal to
    converted = NumberRangeHelper.convertToRange(42, EnumNumericalComparator.GE)
    assert.equal(converted.lowerBound, 42, 'GE 42: Lower bound should be 42')
    assert.equal(converted.upperBound, Number.POSITIVE_INFINITY, 'GE 42: Upper bound should be infinity')

    // C - Lower than or equal to
    converted = NumberRangeHelper.convertToRange(-2.4, EnumNumericalComparator.LE)
    assert.equal(converted.lowerBound, Number.NEGATIVE_INFINITY, 'LE -2.4: Lower bound should be infinity')
    assert.equal(converted.upperBound, -2.4, 'LE -2.4: Upper bound should be -2.4')

    // D - NaN / undefined / null should default return no range
    converted = NumberRangeHelper.convertToRange(Number.NaN, EnumNumericalComparator.LE)
    assert.isNotOk(converted, 'LE NaN: no range should be converted')
    converted = NumberRangeHelper.convertToRange(null, EnumNumericalComparator.GE)
    assert.isNotOk(converted, 'GE null: no range should be converted')
    converted = NumberRangeHelper.convertToRange(undefined, EnumNumericalComparator.EQ)
    assert.isNotOk(converted, 'EQ undefined: no range should be converted')
  })
  it('should correctly check valid numbers', () => {
    // A - numbers
    assert.isTrue(NumberRangeHelper.isValidNumber(0.125), '0.125 should be a valid number')
    assert.isTrue(NumberRangeHelper.isValidNumber(-53.53), '-53.53 should be a valid number')
    assert.isTrue(NumberRangeHelper.isValidNumber(0), '0 should be a valid number')
    assert.isTrue(NumberRangeHelper.isValidNumber(-1), '-1 should be a valid number')
    // B - invalid constants
    assert.isFalse(NumberRangeHelper.isValidNumber(null), 'Null should be considered invalid')
    assert.isFalse(NumberRangeHelper.isValidNumber(undefined), 'Undefined should be considered invalid')
    assert.isFalse(NumberRangeHelper.isValidNumber(Number.NaN), 'NaN should be considered invalid')
    // C - some other invalid things
    assert.isFalse(NumberRangeHelper.isValidNumber('a'), '"a" should be considered invalid')
    assert.isFalse(NumberRangeHelper.isValidNumber({}), '{} should be considered invalid')
    assert.isFalse(NumberRangeHelper.isValidNumber(new Date()), 'Date should be considered invalid')
  })
  it('should correctly generate query parts for numbers', () => {
    // 1 - It should not return query without attribute name, range or with infinity range
    assert.isNotOk(NumberRangeHelper.getNumberAttributeQueryPart(null, new NumberRangeHelper.NumberRange(5, null)), 'It should not return query without attribute name')
    assert.isNotOk(NumberRangeHelper.getNumberAttributeQueryPart('my.attr', null), 'It should not return query without range')
    assert.isNotOk(NumberRangeHelper.getNumberAttributeQueryPart('my.attr', new NumberRangeHelper.NumberRange()),
      'It should not return query with infinite range (no constraint on values)')
    // 2 - It should return valid requests URL for all ranges types, escaping negative values for opensearch parser
    assert.equal(NumberRangeHelper.getNumberAttributeQueryPart('my.attr', new NumberRangeHelper.NumberRange(-0.125, -0.125)),
      'my.attr:\\-0.125')
    assert.equal(NumberRangeHelper.getNumberAttributeQueryPart('my.attr', new NumberRangeHelper.NumberRange(-5, 88)),
      'my.attr:[\\-5 TO 88]')
    assert.equal(NumberRangeHelper.getNumberAttributeQueryPart('other.attr', new NumberRangeHelper.NumberRange(null, 4)),
      'other.attr:[* TO 4]')
    assert.equal(NumberRangeHelper.getNumberAttributeQueryPart('other.attr', new NumberRangeHelper.NumberRange(-1.25, null)),
      'other.attr:[\\-1.25 TO *]')
  })
  it('should correctly define number ranges', () => {
    // A - single value range
    const singleValueRange = new NumberRangeHelper.NumberRange(1.25, 1.25)
    assert.equal(singleValueRange.lowerBound, 1.25, 'single value range lower bound should worth 1.25')
    assert.equal(singleValueRange.upperBound, 1.25, 'single value range upper bound should worth 1.25')
    assert.isFalse(singleValueRange.isInfiniteLowerBound(), 'single value range lower bound should not be computed infinite')
    assert.isFalse(singleValueRange.isInfiniteUpperBound(), 'single value range upper bound should not be computed infinite')
    assert.isFalse(singleValueRange.isFullyInifiniteRange(), 'single value range should not be computed fully infinite')
    assert.isTrue(singleValueRange.isSingleValueRange(), 'single value range should be computed single value')
    // B - N to +inf
    const lowerToInfinityRange = new NumberRangeHelper.NumberRange(1.25, null)
    assert.equal(lowerToInfinityRange.lowerBound, 1.25, 'lower to infinity range lower bound should worth 1.25')
    assert.equal(lowerToInfinityRange.upperBound, Number.POSITIVE_INFINITY, 'lower to infinity range upper bound should worth +inf')
    assert.isFalse(lowerToInfinityRange.isInfiniteLowerBound(), 'lower to infinity range lower bound should not be computed infinite')
    assert.isTrue(lowerToInfinityRange.isInfiniteUpperBound(), 'lower to infinity range upper bound should be computed infinite')
    assert.isFalse(lowerToInfinityRange.isFullyInifiniteRange(), 'lower to infinity range should not be computed fully infinite')
    assert.isFalse(lowerToInfinityRange.isSingleValueRange(), 'lower to infinity range should not be computed single value')
    // C - -inf to N
    const infiniteToUpperRange = new NumberRangeHelper.NumberRange(undefined, -2.2)
    assert.equal(infiniteToUpperRange.lowerBound, Number.NEGATIVE_INFINITY, 'infinity to lower range upper bound should worth -inf')
    assert.equal(infiniteToUpperRange.upperBound, -2.2, 'infinity to upper range lower bound should worth -2.2')
    assert.isTrue(infiniteToUpperRange.isInfiniteLowerBound(), 'infinity to upper range lower bound should be computed infinite')
    assert.isFalse(infiniteToUpperRange.isInfiniteUpperBound(), 'infinity to upper range upper bound should not be computed infinite')
    assert.isFalse(infiniteToUpperRange.isFullyInifiniteRange(), 'infinity to upper range should not be computed fully infinite')
    assert.isFalse(infiniteToUpperRange.isSingleValueRange(), 'infinity to upper range should not be computed single value')
    // D - M to N
    const mToNRange = new NumberRangeHelper.NumberRange(-5.6, 25.42)
    assert.equal(mToNRange.lowerBound, -5.6, 'fully defined range lower bound should worth -5.6')
    assert.equal(mToNRange.upperBound, 25.42, 'fully defined range upper bound should worth 25.42')
    assert.isFalse(mToNRange.isInfiniteLowerBound(), 'fully defined range lower bound should not be computed infinite')
    assert.isFalse(mToNRange.isInfiniteUpperBound(), 'fully defined range upper bound should not be computed infinite')
    assert.isFalse(mToNRange.isFullyInifiniteRange(), 'fully defined range should not be computed fully infinite')
    assert.isFalse(mToNRange.isSingleValueRange(), 'fully defined range should not be computed single value')
    // D - infinite range
    const infiniteRange = new NumberRangeHelper.NumberRange()
    assert.equal(infiniteRange.lowerBound, Number.NEGATIVE_INFINITY, 'infinite range upper bound should worth -inf')
    assert.equal(infiniteRange.upperBound, Number.POSITIVE_INFINITY, 'infinite range upper bound should worth +inf')
    assert.isTrue(infiniteRange.isInfiniteLowerBound(), 'infinite range lower bound should be computed infinite')
    assert.isTrue(infiniteRange.isInfiniteUpperBound(), 'infinite range upper bound should be computed infinite')
    assert.isTrue(infiniteRange.isFullyInifiniteRange(), 'infinite range should be computed fully infinite')
    assert.isFalse(infiniteRange.isSingleValueRange(), 'infinite range should not be computed single value')
  })
  it('should correctly parse ranges', () => {
    // 1 - fully defined ranges with and without negative escaping
    let parsed = NumberRangeHelper.parseRange('[\\-1 TO \\-0.54321]')
    assert.equal(parsed.lowerBound, -1)
    assert.equal(parsed.upperBound, -0.54321)
    parsed = NumberRangeHelper.parseRange('[0.4321 TO 42]')
    assert.equal(parsed.lowerBound, 0.4321)
    assert.equal(parsed.upperBound, 42)
    // 2 - lower bound range
    parsed = NumberRangeHelper.parseRange('[\\-0.321 TO *]')
    assert.equal(parsed.lowerBound, -0.321)
    assert.equal(parsed.upperBound, Number.POSITIVE_INFINITY)
    // 3 - upper bound range
    parsed = NumberRangeHelper.parseRange('[\\* TO -0.21]')
    assert.equal(parsed.lowerBound, Number.NEGATIVE_INFINITY)
    assert.equal(parsed.upperBound, -0.21)
    // 4 - Single value range
    parsed = NumberRangeHelper.parseRange('0.1')
    assert.equal(parsed.lowerBound, 0.1)
    assert.equal(parsed.upperBound, 0.1)
    // 5 - Parsable infinite range
    parsed = NumberRangeHelper.parseRange('[* TO *]')
    assert.equal(parsed.lowerBound, Number.NEGATIVE_INFINITY)
    assert.equal(parsed.upperBound, Number.POSITIVE_INFINITY)
    // 6 - Not parsable (should also be infinity range)
    parsed = NumberRangeHelper.parseRange('[AZX TO XYZ]')
    assert.equal(parsed.lowerBound, Number.NEGATIVE_INFINITY)
    assert.equal(parsed.upperBound, Number.POSITIVE_INFINITY)
    parsed = NumberRangeHelper.parseRange('ARG')
    assert.equal(parsed.lowerBound, Number.NEGATIVE_INFINITY)
    assert.equal(parsed.upperBound, Number.POSITIVE_INFINITY)
  })
})