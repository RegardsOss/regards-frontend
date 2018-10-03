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
import values from 'lodash/values'
import { assert } from 'chai'
import { DamDomain } from '@regardsoss/domain'
import {
  formatNumberBound, formatDateBound, formatBoundValue, formatBoundsStateHint,
  formatAnyBoundHintText, formatLowerBoundHintText, formatUpperBoundHintText,
  formatHintText, BOUND_TYPE,
} from '../../src/utils/BoundsMessagesHelper'


/**
 * @return {*} self spying intl stub for tests
 */
function makeIntlStub() {
  const results = {
    formatMessage: { count: 0, id: [], parameters: [] },
    formatNumber: { count: 0, number: [] },
    formatDate: { count: 0, date: [] },
    formatTime: { count: 0, date: [] },
  }
  return {
    formatMessage: ({ id }, parameters = {}) => {
      results.formatMessage = {
        count: results.formatMessage.count + 1,
        id: [...results.formatMessage.id, id],
        parameters: [...results.formatMessage.parameters, parameters],
      }
      return id
    },
    formatNumber: (number) => {
      results.formatNumber = {
        count: results.formatNumber.count + 1,
        number: [...results.formatNumber.number, number],
      }
      return number.toString()
    },
    formatDate: (date) => {
      results.formatDate = {
        count: results.formatDate.count + 1,
        date: [...results.formatDate.date, date],
      }
      return date.toUTCString()
    },
    formatTime: (date) => {
      results.formatTime = {
        count: results.formatTime.count + 1,
        date: [...results.formatTime.date, date],
      }
      return date.toUTCString()
    },
    results,
  }
}

/**
 * @return minimal attribute stub for tests
 */
function makeAttributeStub(type, unit, boundsInformation) {
  return ({
    name: 'test', type, unit, boundsInformation,
  })
}

/**
 * @return built bounds information
 */
function makeBoundsInformationStub(exists, loading, error, lowerBound, upperBound) {
  return {
    exists,
    loading,
    error,
    lowerBound,
    upperBound,
  }
}

/** Types that can have bounds */
const typesWithBounds = [
  DamDomain.MODEL_ATTR_TYPES.DOUBLE,
  DamDomain.MODEL_ATTR_TYPES.INTEGER,
  DamDomain.MODEL_ATTR_TYPES.LONG,
  DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601,
  DamDomain.MODEL_ATTR_TYPES.BOOLEAN,
]
/** Types that cannot have bounds */
const typesWithoutBounds = [
  ...values(DamDomain.MODEL_ATTR_TYPES).filter(type => !typesWithBounds.includes(type)),
  'unknownType',
  null,
  undefined,
]
/** Some random values to use for tests */
const testValues = [
  null,
  undefined,
  '2018-09-27T13:15:42.726Z',
  -45,
  12.56,
]


describe('[PLUGINS API] Testing BoundsMessagesHelper', () => {
  it('should define expected members', () => {
    assert.isDefined(formatNumberBound, 'formatNumberBound should be exported')
    assert.isDefined(formatDateBound, 'formatDateBound should be exported')
    assert.isDefined(formatBoundValue, 'formatBoundValue should be exported')
    assert.isDefined(formatBoundsStateHint, 'formatBoundsStateHint should be exported')
    assert.isDefined(formatLowerBoundHintText, 'formatLowerBoundHintText should be exported')
    assert.isDefined(formatUpperBoundHintText, 'formatUpperBoundHintText should be exported')
    assert.isDefined(formatAnyBoundHintText, 'formatAnyBoundHintText should be exported')
    assert.isDefined(formatHintText, 'formatHintText should be exported')
    assert.isDefined(BOUND_TYPE, 'BOUND_TYPE should be exported')
  })
  it('should format correctly a number bound value', () => {
    const intlStub = makeIntlStub()
    // 1 - Without unit
    // a - zero
    const result1a = formatNumberBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER), 0)
    assert.equal(result1a, '0', '1a - Result should be correctly formatted')
    assert.equal(intlStub.results.formatNumber.count, 1, '1a - formatNumber should have been called 1 time')
    assert.include(intlStub.results.formatNumber.number, 0, '1a - formatNumber should have been called for 0')
    // b - small number
    const result1b = formatNumberBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER), 15)
    assert.equal(result1b, '15', '1b - Result should be correctly formatted')
    assert.equal(intlStub.results.formatNumber.count, 2, '1b - formatNumber should have been called 2 times')
    assert.include(intlStub.results.formatNumber.number, 15, '1b - formatNumber should have been called for 15')
    // c - big number
    const result1c = formatNumberBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG), 456789123456)
    assert.equal(result1c, '456789123456', '1c - Result should be correctly formatted')
    assert.equal(intlStub.results.formatNumber.count, 3, '1c - formatNumber should have been called 3 times')
    assert.include(intlStub.results.formatNumber.number, 456789123456, '1c - formatNumber should have been called for 456789123456')
    // d - negative floating number
    const result1d = formatNumberBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE), -45.25)
    assert.equal(result1d, '-45.25', '1d - Result should be correctly formatted')
    assert.equal(intlStub.results.formatNumber.count, 4, '1d - formatNumber should have been called 4 times')
    assert.include(intlStub.results.formatNumber.number, -45.25, '1d - formatNumber should have been called for -45.25')

    // 2 - With unit
    // a - any unit
    const result2a = formatNumberBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'dB'), 15)
    assert.equal(result2a, 'criterion.attribute.bounds.value.with.unit', '2a - Result should be correctly formatted')
    assert.equal(intlStub.results.formatNumber.count, 5, '2a - formatNumber should have been called 5 times')
    assert.include(intlStub.results.formatNumber.number, 15, '2a - formatNumber should have been called for 15')
    assert.equal(intlStub.results.formatMessage.count, 1, '2a - formatMessage should have been called 1 times')
    assert.deepInclude(intlStub.results.formatMessage.parameters, { value: '15', unit: 'dB' }, '2a - formatMessage should have been called with right parameters')
    // b - storage unit
    const result2b = formatNumberBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, 'o'), 15500000)
    assert.equal(result2b, 'storage.capacity.monitoring.capacity', '2b - Result should be correctly formatted')
    assert.equal(intlStub.results.formatNumber.count, 6, '2b - formatNumber should have been called 6 times')
    assert.include(intlStub.results.formatNumber.number, 15.5, '2b - formatNumber should have been called for 15.5')
    assert.equal(intlStub.results.formatMessage.count, 3, '2b - formatMessage should have been called 2 times')
    assert.deepInclude(intlStub.results.formatMessage.parameters, { valueLabel: '15.5', unitLabel: 'storage.capacity.monitoring.unit.MB' }, '2b - formatMessage should have been called with right parameters')
  })
  it('should format correctly a date bound value', () => {
    // 1 - Valid date
    const intlStub = makeIntlStub()
    const result1 = formatDateBound(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601), '2018-09-27T13:15:42.726Z')
    assert.equal(result1, 'criterion.attribute.bounds.value.date', '1 - Internationalized date should be returned')
    assert.equal(intlStub.results.formatDate.count, 1, '1 - formatDate should have been called 1 time')
    assert.deepInclude(intlStub.results.formatDate.date, new Date('2018-09-27T13:15:42.726Z'), '1 - formatDate should have been called with parsed date')
    assert.equal(intlStub.results.formatTime.count, 1, '1 - formatTime should have been called 1 time')
    assert.deepInclude(intlStub.results.formatTime.date, new Date('2018-09-27T13:15:42.726Z'), '1 - formatTime should have been called with parsed date')

    // Invalid date: expected exception
    assert.throws(formatDateBound.bind(null, intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601), 'invalid'))
  })
  it('should format correctly a bound value', () => {
    // 1 - Valid attributes (detailed tests above)
    const intlStub = makeIntlStub()
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER), 0),
      '0', '"0" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER), 15),
      '15', '"15" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG), 456789123456),
      '456789123456', '"456789123456" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE), -45.25),
      '-45.25', '"-45.25" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'dB'), 15),
      'criterion.attribute.bounds.value.with.unit', '"criterion.attribute.bounds.value.with.unit" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, 'o'), 15500000),
      'storage.capacity.monitoring.capacity', '"storage.capacity.monitoring.capacity" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601), '2018-09-27T13:15:42.726Z'),
      'criterion.attribute.bounds.value.date', '"criterion.attribute.bounds.value.date" should be returned by the date bound value formatter')
    // 2 - Invalid values or attribute types
    assert.throws(formatBoundValue.bind(null, intlStub, makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601), 'anything'))
    typesWithoutBounds.forEach((type) => {
      const typedAttr = makeAttributeStub(type)
      testValues.forEach((value) => {
        assert.throws(formatBoundValue.bind(null, intlStub, typedAttr, value))
      })
    })
  })
  it('should format correctly a lower bound field', () => {
    // 1 - Number
    // a - simple
    const intlStub1a = makeIntlStub()
    const attrStub1a = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null, {
      lowerBound: -564678,
    })
    const result1a = formatLowerBoundHintText(intlStub1a, attrStub1a, 'POTATOES')
    assert.equal(result1a, 'criterion.attribute.bounds.lower.bound.value', '1a - Bound should be internationalized with value')
    assert.equal(intlStub1a.results.formatNumber.count, 1, '1a - formatNumber should have been called to format bound value')
    assert.equal(intlStub1a.results.formatMessage.count, 1, '1a - formatMessage should have been called to format bound value')
    assert.deepInclude(intlStub1a.results.formatMessage.parameters, { typeText: 'POTATOES', lowerBoundText: '-564678' }, '1a - Message should include the right bounds information')

    // b - with simple unit
    const intlStub1b = makeIntlStub()
    const attrStub1b = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, 'km', {
      lowerBound: -0.25,
    })
    const result1b = formatLowerBoundHintText(intlStub1b, attrStub1b, 'POTATOES')
    assert.equal(result1b, 'criterion.attribute.bounds.lower.bound.value', '1b - Bound should be internationalized with value')
    assert.equal(intlStub1b.results.formatNumber.count, 1, '1b - formatNumber should have been called to format bound value')
    assert.equal(intlStub1b.results.formatMessage.count, 2, '1b - formatMessage should have been called to format bound value and value with unit')
    assert.deepInclude(intlStub1b.results.formatMessage.parameters, { typeText: 'POTATOES', lowerBoundText: 'criterion.attribute.bounds.value.with.unit' }, '1b - Message should include the right bounds information')

    // c - with storage unit
    const intlStub1c = makeIntlStub()
    const attrStub1c = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, 'o', {
      lowerBound: 0,
    })
    const result1c = formatLowerBoundHintText(intlStub1c, attrStub1c, 'SOME_TYPE')
    assert.equal(result1c, 'criterion.attribute.bounds.lower.bound.value', '1c - Bound should be internationalized with value')
    assert.equal(intlStub1c.results.formatNumber.count, 1, '1c - formatNumber should have been called to format bound value')
    assert.equal(intlStub1c.results.formatMessage.count, 3, '1c - formatMessage should have been called to format bound value, unit and value with unit')
    assert.deepInclude(intlStub1c.results.formatMessage.parameters, { typeText: 'SOME_TYPE', lowerBoundText: 'storage.capacity.monitoring.capacity' }, '1c - Message should include the right bounds information')

    // 2 - Date
    // a - valid
    const intlStub2a = makeIntlStub()
    const attrStub2a = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: '2018-09-27T13:15:42.726Z',
    })
    const result2a = formatLowerBoundHintText(intlStub2a, attrStub2a, 'DATE_TYPE')
    assert.equal(result2a, 'criterion.attribute.bounds.lower.bound.value', '2a - Bound should be internationalized with value')
    assert.equal(intlStub2a.results.formatDate.count, 1, '2a - formatDate should have been called to format date')
    assert.equal(intlStub2a.results.formatTime.count, 1, '2a - formatTime should have been called to format date')
    assert.equal(intlStub2a.results.formatMessage.count, 2, '2a - formatMessage should have been called to format bound value and date parameters')
    assert.deepInclude(intlStub2a.results.formatMessage.parameters, { typeText: 'DATE_TYPE', lowerBoundText: 'criterion.attribute.bounds.value.date' }, '2a - Message should include the right bounds information')

    // b - invalid
    const intlStub2b = makeIntlStub()
    const attrStub2b = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: 'somethinginvalid',
    })
    assert.throws(formatLowerBoundHintText.bind(null, intlStub2b, attrStub2b, 'DATE_TYPE'))

    // 3 - Without value
    // a - number
    const intlStub3a = makeIntlStub()
    const attrStub3a = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null, {
      lowerBound: null,
    })
    const result3a = formatLowerBoundHintText(intlStub3a, attrStub3a, 'LONG_TYPE')
    assert.equal(result3a, 'criterion.attribute.bounds.lower.bound.none', '3a - Bound should be internationalized without value')
    assert.equal(intlStub3a.results.formatMessage.count, 1, '3a - formatMessage should have been called to format bound text')
    assert.deepInclude(intlStub3a.results.formatMessage.parameters, { typeText: 'LONG_TYPE' }, '3a - Message should include the right bounds information')
    // date
    const intlStub3b = makeIntlStub()
    const attrStub3b = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: null,
    })
    const result3b = formatLowerBoundHintText(intlStub3b, attrStub3b, 'DATE_TYPE')
    assert.equal(result3b, 'criterion.attribute.bounds.lower.bound.none', '3b - Bound should be internationalized without value')
    assert.equal(intlStub3b.results.formatMessage.count, 1, '3b - formatMessage should have been called to format bound text')
    assert.deepInclude(intlStub3b.results.formatMessage.parameters, { typeText: 'DATE_TYPE' }, '3b - Message should include the right bounds information')
  })
  it('should format correctly an upper bound field', () => {
    // 1 - Number
    const intlStub1 = makeIntlStub()
    const attrStub1 = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, 'km', {
      upperBound: -0.25,
    })
    const result1 = formatUpperBoundHintText(intlStub1, attrStub1, 'POTATOES')
    assert.equal(result1, 'criterion.attribute.bounds.upper.bound.value', '1 - Bound should be internationalized with value')
    assert.equal(intlStub1.results.formatNumber.count, 1, '1 - formatNumber should have been called to format bound value')
    assert.equal(intlStub1.results.formatMessage.count, 2, '1 - formatMessage should have been called to format bound value and value with unit')
    assert.deepInclude(intlStub1.results.formatMessage.parameters, { typeText: 'POTATOES', upperBoundText: 'criterion.attribute.bounds.value.with.unit' }, '1 - Message should include the right bounds information')

    // 2 - Valid date
    const intlStub2 = makeIntlStub()
    const attrStub2 = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      upperBound: '2018-09-27T13:15:42.726Z',
    })
    const result2 = formatUpperBoundHintText(intlStub2, attrStub2, 'DATE_TYPE')
    assert.equal(result2, 'criterion.attribute.bounds.upper.bound.value', '2 - Bound should be internationalized with value')
    assert.equal(intlStub2.results.formatDate.count, 1, '2 - formatDate should have been called to format date')
    assert.equal(intlStub2.results.formatTime.count, 1, '2 - formatTime should have been called to format date')
    assert.equal(intlStub2.results.formatMessage.count, 2, '2 - formatMessage should have been called to format bound value and date parameters')
    assert.deepInclude(intlStub2.results.formatMessage.parameters, { typeText: 'DATE_TYPE', upperBoundText: 'criterion.attribute.bounds.value.date' }, '2 - Message should include the right bounds information')

    // 3 - Without value
    const intlStub3 = makeIntlStub()
    const attrStub3 = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null, {
      upperBound: null,
    })
    const result3 = formatUpperBoundHintText(intlStub3, attrStub3, 'LONG_TYPE')
    assert.equal(result3, 'criterion.attribute.bounds.upper.bound.none', '3 - Bound should be internationalized without value')
    assert.equal(intlStub3.results.formatMessage.count, 1, '3 - formatMessage should have been called to format bound text')
    assert.deepInclude(intlStub3.results.formatMessage.parameters, { typeText: 'LONG_TYPE' }, '3 - Message should include the right bounds information')
  })
  it('should format correctly an any bound field', () => {
    // 1 - Number range [a;b]
    const intlStub1 = makeIntlStub()
    const attrStub1 = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'o', {
      lowerBound: -0.10,
      upperBound: 0.25,
    })
    const result1 = formatAnyBoundHintText(intlStub1, attrStub1, 'SOME_TYPE')
    assert.equal(result1, 'criterion.attribute.bounds.range.values', '1 - Bound should be internationalized with values')
    assert.equal(intlStub1.results.formatNumber.count, 2, '1 - formatNumber should have been called to format bound values')
    assert.include(intlStub1.results.formatNumber.number, -0.10, '1 - formatNumber should have been called for lower bound')
    assert.include(intlStub1.results.formatNumber.number, 0.25, '1 - formatNumber should have been called for upper bound')
    assert.equal(intlStub1.results.formatMessage.count, 7, '1 - formatMessage for units (2 times), values (2 times), bound ranges (2 times) and full range')
    assert.deepInclude(intlStub1.results.formatMessage.parameters, {
      typeText: 'SOME_TYPE',
      rangeMin: 'criterion.attribute.bounds.range.inclusive.min.bound',
      rangeMax: 'criterion.attribute.bounds.range.inclusive.max.bound',
    }, '1 - Message should include the right bounds information')
    // 2 - Date range [a;+inf[
    const intlStub2 = makeIntlStub()
    const attrStub2 = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: '2018-09-27T13:15:42.726Z',
      upperBound: null,
    })
    const result2 = formatAnyBoundHintText(intlStub2, attrStub2, 'SOME_TYPE')
    assert.equal(result2, 'criterion.attribute.bounds.range.values', '2 - Bound should be internationalized with values')
    assert.equal(intlStub2.results.formatDate.count, 1, '2 - formatDate should have been called to format lower bound value')
    assert.deepInclude(intlStub2.results.formatDate.date, new Date('2018-09-27T13:15:42.726Z'), '2 - formatDate should have been called for lower bound')
    assert.equal(intlStub2.results.formatTime.count, 1, '2 - formatTime should have been called to format lower bound value')
    assert.deepInclude(intlStub2.results.formatTime.date, new Date('2018-09-27T13:15:42.726Z'), '2 - formatTime should have been called for lower bound')
    assert.equal(intlStub2.results.formatMessage.count, 4, '2 - formatMessage for bound each (2 times), for date displaying and for and full range')
    assert.deepInclude(intlStub2.results.formatMessage.parameters, {
      typeText: 'SOME_TYPE',
      rangeMin: 'criterion.attribute.bounds.range.inclusive.min.bound',
      rangeMax: 'criterion.attribute.bounds.range.max.infinity.bound',
    }, '2 - Message should include the right bounds information')
    // 2 - Number range ]-inf;a]
    const intlStub3 = makeIntlStub()
    const attrStub3 = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, 'km', {
      lowerBound: null,
      upperBound: 0,
    })
    const result3 = formatAnyBoundHintText(intlStub3, attrStub3, 'SOME_TYPE')
    assert.equal(result3, 'criterion.attribute.bounds.range.values', '3 - Bound should be internationalized with values')
    assert.equal(intlStub3.results.formatNumber.count, 1, '3 - formatNumber should have been called to format upper bound value')
    assert.deepInclude(intlStub3.results.formatNumber.number, 0, '3 - formatNumber should have been called for upper bound')
    assert.equal(intlStub3.results.formatMessage.count, 4, '3 - formatMessage for bound each (2 times), for unit displaying and for and full range')
    assert.deepInclude(intlStub3.results.formatMessage.parameters, {
      typeText: 'SOME_TYPE',
      rangeMin: 'criterion.attribute.bounds.range.min.infinity.bound',
      rangeMax: 'criterion.attribute.bounds.range.inclusive.max.bound',
    }, '3 - Message should include the right bounds information')
  })
  it('should format correctly bounds state', () => {
    values(DamDomain.MODEL_ATTR_TYPES).forEach((type) => {
      // 1 - bounds not exisiting
      const intlStub1 = makeIntlStub()
      const result1 = formatBoundsStateHint(intlStub1, makeAttributeStub(type, null, makeBoundsInformationStub(false)), 'TYPE.1')
      assert.equal(result1, 'criterion.attribute.bounds.not.existing', `[${type}] 1 - Non existing bounds should be correctly internationalized`)
      assert.equal(intlStub1.results.formatMessage.count, 1, `[${type}] 1 - Format message should have been called`)
      assert.deepInclude(intlStub1.results.formatMessage.parameters, { typeText: 'TYPE.1' }, `[${type}] 1 - Type should have been provided as parameter`)
      // 2 - bounds loading
      const intlStub2 = makeIntlStub()
      const result2 = formatBoundsStateHint(intlStub2, makeAttributeStub(type, null, makeBoundsInformationStub(true, true)), 'TYPE.2')
      assert.equal(result2, 'criterion.attribute.bounds.loading', `[${type}] 2 - Loading bounds should be correctly internationalized`)
      assert.equal(intlStub2.results.formatMessage.count, 1, `[${type}] 2 - Format message should have been called`)
      assert.deepInclude(intlStub2.results.formatMessage.parameters, { typeText: 'TYPE.2' }, `[${type}] 2 - Type should have been provided as parameter`)
      // 3 - bounds in error
      const intlStub3 = makeIntlStub()
      const result3 = formatBoundsStateHint(intlStub3, makeAttributeStub(type, null, makeBoundsInformationStub(true, false, true)), 'TYPE.3')
      assert.equal(result3, 'criterion.attribute.bounds.error', `[${type}] 3 - Bounds in error should be correctly internationalized`)
      assert.equal(intlStub3.results.formatMessage.count, 1, `[${type}] 3 - Format message should have been called`)
      assert.deepInclude(intlStub3.results.formatMessage.parameters, { typeText: 'TYPE.3' }, `[${type}] 3 - Type should have been provided as parameter`)
      // 4 - no bound
      const intlStub4 = makeIntlStub()
      const result4 = formatBoundsStateHint(intlStub4, makeAttributeStub(type, null, makeBoundsInformationStub(true, false, false)), 'TYPE.4')
      assert.equal(result4, 'criterion.attribute.bounds.none', `[${type}] 4 - Missing bounds should be correctly internationalized`)
      assert.equal(intlStub4.results.formatMessage.count, 1, `[${type}] 4 - Format message should have been called`)
      assert.deepInclude(intlStub4.results.formatMessage.parameters, { typeText: 'TYPE.4' }, `[${type}] 4 - Type should have been provided as parameter`)
      // 5 - Any other case should not be handled as it is not the role of that method
      const intlStub5 = makeIntlStub()
      assert.isNotOk(
        formatBoundsStateHint(intlStub5, makeAttributeStub(type, null, makeBoundsInformationStub(true, false, false, 5, null)), 'TYPE.5'),
        `[${type}] 5a - Method should not handle that attribute as it has a lower bound`)
      assert.isNotOk(
        formatBoundsStateHint(intlStub5, makeAttributeStub(type, null, makeBoundsInformationStub(true, false, false, null, '2018-09-27T13:15:42.726Z')), 'TYPE.5'),
        `[${type}] 5b - Method should not handle that attribute as it has an upper bound`)
    })
  })
  it('should format correctly a field hint', () => {
    // 1 - Test types that cannot have bounds
    typesWithoutBounds.forEach((t) => {
      const intlStub = makeIntlStub()
      const formatted = formatHintText(intlStub, makeAttributeStub(t, null, makeBoundsInformationStub(false, false, false)))
      assert.equal(formatted, 'criterion.attribute.bounds.not.existing', `[${t}] Bounds not existing should be correctly internalized`)
    })
    // 2 - Types that can have bounds, without bound
    typesWithBounds.forEach((t) => {
      const intlStub = makeIntlStub()
      assert.equal(formatHintText(intlStub, makeAttributeStub(t, null, makeBoundsInformationStub(false))),
        'criterion.attribute.bounds.not.existing', `[${t}] Bounds not existing should be correctly internationalized`)
      assert.equal(formatHintText(intlStub, makeAttributeStub(t, null, makeBoundsInformationStub(true, true))),
        'criterion.attribute.bounds.loading', `[${t}] Bounds loading should be correctly internationalized`)
      assert.equal(formatHintText(intlStub, makeAttributeStub(t, null, makeBoundsInformationStub(true, false, true))),
        'criterion.attribute.bounds.error', `[${t}] Bounds in error should be correctly internationalized`)
      assert.equal(formatHintText(intlStub, makeAttributeStub(t, null, makeBoundsInformationStub(true, false, false))),
        'criterion.attribute.bounds.none', `[${t}] No bound value should be correctly internationalized`)
    })
    // 3 - Numeric types
    const numericTypes = [DamDomain.MODEL_ATTR_TYPES.DOUBLE, DamDomain.MODEL_ATTR_TYPES.INTEGER, DamDomain.MODEL_ATTR_TYPES.LONG]
    const validNumberTestBounds = [{
      testCase: 'with upper bound only', lowerBound: null, upperBound: 12, hasUpper: true,
    }, {
      testCase: 'with lower bound only', lowerBound: 0, upperBound: null, hasLower: true,
    }, {
      testCase: 'with full range', lowerBound: -3, upperBound: 12000000010, hasUpper: true, hasLower: true,
    }]
    numericTypes.forEach((t) => {
      validNumberTestBounds.forEach(({
        testCase, lowerBound, upperBound, hasLower, hasUpper,
      }) => {
        const attrStub = makeAttributeStub(t, null, makeBoundsInformationStub(true, false, false, lowerBound, upperBound))
        // 1 - Test when lower only
        const expectedLower = hasLower ? 'criterion.attribute.bounds.lower.bound.value' : 'criterion.attribute.bounds.lower.bound.none'
        assert.equal(formatHintText(makeIntlStub(), attrStub, BOUND_TYPE.LOWER_BOUND),
          expectedLower, `[${t}] LOWER_BOUND should be correctly formatted in case "${testCase}"`)
        // 2 - Test when upper only
        const expectedUpper = hasUpper ? 'criterion.attribute.bounds.upper.bound.value' : 'criterion.attribute.bounds.upper.bound.none'
        assert.equal(formatHintText(makeIntlStub(), attrStub, BOUND_TYPE.UPPER_BOUND),
          expectedUpper, `[${t}] UPPER_BOUND should be correctly formatted in case "${testCase}"`)
        // 3 - Test when any bound
        assert.equal(formatHintText(makeIntlStub(), attrStub, BOUND_TYPE.ANY_BOUND),
          'criterion.attribute.bounds.range.values', `[${t}] ANY_BOUND should be correctly formatted in case "${testCase}"`)
      })
    })

    // 4 - Date type
    const validDateTestBounds = [{
      testCase: 'with upper bound only', lowerBound: null, upperBound: '2018-09-27T13:15:42.726Z', hasUpper: true,
    }, {
      testCase: 'with lower bound only', lowerBound: '2018-09-27T13:15:42.726Z', upperBound: null, hasLower: true,
    }, {
      testCase: 'with full range', lowerBound: '2017-09-27T13:15:42.726Z', upperBound: '2018-09-27T13:15:42.726Z', hasUpper: true, hasLower: true,
    }]
    validDateTestBounds.forEach(({
      testCase, lowerBound, upperBound, hasLower, hasUpper,
    }) => {
      const attrStub = makeAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, makeBoundsInformationStub(true, false, false, lowerBound, upperBound))
      // 1 - Test when lower only
      const expectedLower = hasLower ? 'criterion.attribute.bounds.lower.bound.value' : 'criterion.attribute.bounds.lower.bound.none'
      assert.equal(formatHintText(makeIntlStub(), attrStub, BOUND_TYPE.LOWER_BOUND),
        expectedLower, `LOWER_BOUND should be correctly formatted in case "${testCase}"`)
      // 2 - Test when upper only
      const expectedUpper = hasUpper ? 'criterion.attribute.bounds.upper.bound.value' : 'criterion.attribute.bounds.upper.bound.none'
      assert.equal(formatHintText(makeIntlStub(), attrStub, BOUND_TYPE.UPPER_BOUND),
        expectedUpper, `UPPER_BOUND should be correctly formatted in case "${testCase}"`)
      // 3 - Test when any bound
      assert.equal(formatHintText(makeIntlStub(), attrStub, BOUND_TYPE.ANY_BOUND),
        'criterion.attribute.bounds.range.values', `ANY_BOUND should be correctly formatted in case "${testCase}"`)
    })
  })
})
