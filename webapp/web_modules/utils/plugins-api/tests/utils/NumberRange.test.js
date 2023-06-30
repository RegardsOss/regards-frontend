/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { NumberRange } from '../../src/utils/NumberRange'

describe('[PLUGINS API] Testing NumberRange', () => {
  it('should correctly convert ranges', () => {
    // A - Equal
    let converted = NumberRange.convertToRange(-3.2, EnumNumericalComparator.EQ)
    assert.equal(converted.lowerBound, -3.2, 'EQ -3.2: Lower should worth -3.2')
    assert.equal(converted.upperBound, -3.2, 'EQ -3.2: Upper should worth -3.2')

    // B - Greater than or equal to
    converted = NumberRange.convertToRange(42, EnumNumericalComparator.GE)
    assert.equal(converted.lowerBound, 42, 'GE 42: Lower bound should be 42')
    assert.equal(converted.upperBound, Number.POSITIVE_INFINITY, 'GE 42: Upper bound should be infinity')

    // C - Lower than or equal to
    converted = NumberRange.convertToRange(-2.4, EnumNumericalComparator.LE)
    assert.equal(converted.lowerBound, Number.NEGATIVE_INFINITY, 'LE -2.4: Lower bound should be infinity')
    assert.equal(converted.upperBound, -2.4, 'LE -2.4: Upper bound should be -2.4')

    // D - NaN / undefined / null should default return no range
    converted = NumberRange.convertToRange(Number.NaN, EnumNumericalComparator.LE)
    assert.isNotOk(converted, 'LE NaN: no range should be converted')
    converted = NumberRange.convertToRange(null, EnumNumericalComparator.GE)
    assert.isNotOk(converted, 'GE null: no range should be converted')
    converted = NumberRange.convertToRange(undefined, EnumNumericalComparator.EQ)
    assert.isNotOk(converted, 'EQ undefined: no range should be converted')
  })
  it('should correctly check valid numbers', () => {
    // A - numbers
    assert.isTrue(NumberRange.isValidNumber(0.125), '0.125 should be a valid number')
    assert.isTrue(NumberRange.isValidNumber(-53.53), '-53.53 should be a valid number')
    assert.isTrue(NumberRange.isValidNumber(0), '0 should be a valid number')
    assert.isTrue(NumberRange.isValidNumber(-1), '-1 should be a valid number')
    // B - invalid constants
    assert.isFalse(NumberRange.isValidNumber(null), 'Null should be considered invalid')
    assert.isFalse(NumberRange.isValidNumber(undefined), 'Undefined should be considered invalid')
    assert.isFalse(NumberRange.isValidNumber(Number.NaN), 'NaN should be considered invalid')
    // C - some other invalid things
    assert.isFalse(NumberRange.isValidNumber('a'), '"a" should be considered invalid')
    assert.isFalse(NumberRange.isValidNumber({}), '{} should be considered invalid')
    assert.isFalse(NumberRange.isValidNumber(new Date()), 'Date should be considered invalid')
  })
  it('should correctly generate query parts for numbers', () => {
    // 1 - It should not return query without attribute name, range or with infinity range
    assert.isNotOk(NumberRange.getNumberQueryParameter(null, new NumberRange(5, null)).toQueryString(), 'It should not return query without attribute name')
    assert.isNotOk(NumberRange.getNumberQueryParameter('my.attr', null).toQueryString(), 'It should not return query without range')
    assert.isNotOk(NumberRange.getNumberQueryParameter('my.attr', new NumberRange()).toQueryString(),
      'It should not return query with infinite range (no constraint on values)')
    // 2 - It should return valid requests URL for all ranges types, escaping negative values for opensearch parser
    assert.equal(NumberRange.getNumberQueryParameter('my.attr', new NumberRange(-0.125, -0.125)).toQueryString(),
      'my.attr:\\-0.125')
    assert.equal(NumberRange.getNumberQueryParameter('my.attr', new NumberRange(-5, 88)).toQueryString(),
      'my.attr:[\\-5 TO 88]')
    assert.equal(NumberRange.getNumberQueryParameter('other.attr', new NumberRange(null, 4)).toQueryString(),
      'other.attr:[* TO 4]')
    assert.equal(NumberRange.getNumberQueryParameter('other.attr', new NumberRange(-1.25, null)).toQueryString(),
      'other.attr:[\\-1.25 TO *]')
  })
  it('should correctly define number ranges', () => {
    // A - single value range
    const singleValueRange = new NumberRange(1.25, 1.25)
    assert.equal(singleValueRange.lowerBound, 1.25, 'single value range lower bound should worth 1.25')
    assert.equal(singleValueRange.upperBound, 1.25, 'single value range upper bound should worth 1.25')
    assert.isFalse(singleValueRange.isInfiniteLowerBound(), 'single value range lower bound should not be computed infinite')
    assert.isFalse(singleValueRange.isInfiniteUpperBound(), 'single value range upper bound should not be computed infinite')
    assert.isFalse(singleValueRange.isInfinite(), 'single value range should not be computed fully infinite')
    assert.isTrue(singleValueRange.isSingleValueRange(), 'single value range should be computed single value')
    // B - N to +inf
    const lowerToInfinityRange = new NumberRange(1.25, null)
    assert.equal(lowerToInfinityRange.lowerBound, 1.25, 'lower to infinity range lower bound should worth 1.25')
    assert.equal(lowerToInfinityRange.upperBound, Number.POSITIVE_INFINITY, 'lower to infinity range upper bound should worth +inf')
    assert.isFalse(lowerToInfinityRange.isInfiniteLowerBound(), 'lower to infinity range lower bound should not be computed infinite')
    assert.isTrue(lowerToInfinityRange.isInfiniteUpperBound(), 'lower to infinity range upper bound should be computed infinite')
    assert.isFalse(lowerToInfinityRange.isInfinite(), 'lower to infinity range should not be computed fully infinite')
    assert.isFalse(lowerToInfinityRange.isSingleValueRange(), 'lower to infinity range should not be computed single value')
    // C - -inf to N
    const infiniteToUpperRange = new NumberRange(undefined, -2.2)
    assert.equal(infiniteToUpperRange.lowerBound, Number.NEGATIVE_INFINITY, 'infinity to lower range upper bound should worth -inf')
    assert.equal(infiniteToUpperRange.upperBound, -2.2, 'infinity to upper range lower bound should worth -2.2')
    assert.isTrue(infiniteToUpperRange.isInfiniteLowerBound(), 'infinity to upper range lower bound should be computed infinite')
    assert.isFalse(infiniteToUpperRange.isInfiniteUpperBound(), 'infinity to upper range upper bound should not be computed infinite')
    assert.isFalse(infiniteToUpperRange.isInfinite(), 'infinity to upper range should not be computed fully infinite')
    assert.isFalse(infiniteToUpperRange.isSingleValueRange(), 'infinity to upper range should not be computed single value')
    // D - M to N
    const mToNRange = new NumberRange(-5.6, 25.42)
    assert.equal(mToNRange.lowerBound, -5.6, 'fully defined range lower bound should worth -5.6')
    assert.equal(mToNRange.upperBound, 25.42, 'fully defined range upper bound should worth 25.42')
    assert.isFalse(mToNRange.isInfiniteLowerBound(), 'fully defined range lower bound should not be computed infinite')
    assert.isFalse(mToNRange.isInfiniteUpperBound(), 'fully defined range upper bound should not be computed infinite')
    assert.isFalse(mToNRange.isInfinite(), 'fully defined range should not be computed fully infinite')
    assert.isFalse(mToNRange.isSingleValueRange(), 'fully defined range should not be computed single value')
    // D - infinite range
    const infiniteRange = new NumberRange()
    assert.equal(infiniteRange.lowerBound, Number.NEGATIVE_INFINITY, 'infinite range upper bound should worth -inf')
    assert.equal(infiniteRange.upperBound, Number.POSITIVE_INFINITY, 'infinite range upper bound should worth +inf')
    assert.isTrue(infiniteRange.isInfiniteLowerBound(), 'infinite range lower bound should be computed infinite')
    assert.isTrue(infiniteRange.isInfiniteUpperBound(), 'infinite range upper bound should be computed infinite')
    assert.isTrue(infiniteRange.isInfinite(), 'infinite range should be computed fully infinite')
    assert.isFalse(infiniteRange.isSingleValueRange(), 'infinite range should not be computed single value')
  })
  it('should compute correct intersection status', () => {
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(6, 6)))
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(5, 5)))
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(10, 10)))
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(6, 15)))
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(10, 15)))
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(-1, 6)))
    assert.isTrue(new NumberRange(5, 10).intersects(new NumberRange(-1, 5)))
    assert.isTrue(new NumberRange(null, 10).intersects(new NumberRange(10, null)))
    assert.isTrue(new NumberRange(null, null).intersects(new NumberRange(null, null)))
    assert.isTrue(new NumberRange(null, 10).intersects(new NumberRange(null, 5)))
    assert.isFalse(new NumberRange(5, 10).intersects(new NumberRange(11, 15)))
    assert.isFalse(new NumberRange(5, 10).intersects(new NumberRange(-1, 4)))
    assert.isFalse(new NumberRange(null, 5).intersects(new NumberRange(6, null)))
  })

  it('should compute correctly restriction validity on intersection', () => {
    const getAttrStub = (min, max) => criterionTestSuiteHelpers.getAttributeStub(
      DamDomain.MODEL_ATTR_TYPES.DOUBLE, null,
      criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, min, max))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(5, 10)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(10, 30)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(10, null)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(20, 30)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(20, null)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(null, 600)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(-20, -5)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(-20, null)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(null, -10)))
    assert.isTrue(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(null, null)))

    assert.isFalse(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(21, 210)))
    assert.isFalse(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(60, null)))
    assert.isFalse(NumberRange.isValidRestrictionOn(getAttrStub(-10, 20), new NumberRange(null, -11)))
  })

  it('should compute correctly isEmpty state', () => {
    assert.isTrue(new NumberRange(5, 4).isEmpty())
    assert.isTrue(new NumberRange(28, -10).isEmpty())
    assert.isFalse(new NumberRange(28, 28).isEmpty())
    assert.isFalse(new NumberRange(null, 10).isEmpty())
    assert.isFalse(new NumberRange(-55, null).isEmpty())
    assert.isFalse(new NumberRange(null, null).isEmpty())
  })
})
