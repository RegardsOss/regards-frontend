/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  getTypeText, formatBoundValue, formatBoundsStateHint,
  formatAnyBoundHintText, formatLowerBoundHintText, formatUpperBoundHintText,
  formatHintText, formatTooltip, BOUND_TYPE,
} from '../../src/utils/AttributesMessagesHelper'


/**
 * @return {*} self spying intl stub for tests
 */
function makeIntlStub() {
  const results = {
    formatMessage: { count: 0, id: [], parameters: [] },
    formatNumber: { count: 0, number: [] },
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
    formatTime: () => { },
    formatDate: () => { },
    results,
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


describe('[PLUGINS API] Testing AttributesMessagesHelper', () => {
  it('should define expected members', () => {
    assert.isDefined(getTypeText, 'getTypeText should be exported')
    assert.isDefined(formatBoundValue, 'formatBoundValue should be exported')
    assert.isDefined(formatBoundsStateHint, 'formatBoundsStateHint should be exported')
    assert.isDefined(formatLowerBoundHintText, 'formatLowerBoundHintText should be exported')
    assert.isDefined(formatUpperBoundHintText, 'formatUpperBoundHintText should be exported')
    assert.isDefined(formatAnyBoundHintText, 'formatAnyBoundHintText should be exported')
    assert.isDefined(formatHintText, 'formatHintText should be exported')
    assert.isDefined(formatTooltip, 'formatTooltip should be exported')
    assert.isDefined(BOUND_TYPE, 'BOUND_TYPE should be exported')
  })
  it('should format type text', () => {
    const intlStub = makeIntlStub()
    assert.equal(getTypeText(intlStub, criterionTestSuiteHelpers.getAttributeStub('my.type')), 'criterion.attribute.hint.type.my.type', 'key should be correctly computed')
    assert.equal(intlStub.results.formatMessage.count, 1, 'Type should be internationalized')
  })
  it('should format correctly a bound value', () => {
    // 1 - Valid attributes (detailed tests above)
    const intlStub = makeIntlStub()
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER), 0),
      '0', '"0" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER), 15),
      '15', '"15" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG), 456789123456),
      '456789123456', '"456789123456" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE), -45.25),
      '-45.25', '"-45.25" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'dB'), 15),
      '15dB', '"15dB" should be returned by the number bound value formatter (delegated onto number render)')
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, 'o'), 15500000),
      'storage.capacity.monitoring.capacity', '"storage.capacity.monitoring.capacity" should be returned by the number bound value formatter')
    assert.equal(formatBoundValue(intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601), '2018-09-27T13:15:42.726Z'),
      'date.value.render.type.dateWithSeconds', '"date.value.render.type.dateWithSeconds" should be returned by the date bound value formatter')
    // 2 - Invalid values or attribute types
    assert.throws(formatBoundValue.bind(null, intlStub, criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601), 'anything'))
    typesWithoutBounds.forEach((type) => {
      const typedAttr = criterionTestSuiteHelpers.getAttributeStub(type)
      testValues.forEach((value) => {
        assert.throws(formatBoundValue.bind(null, intlStub, typedAttr, value))
      })
    })
  })
  it('should format correctly a lower bound field', () => {
    // 1 - Number
    // a - simple
    const intlStub1a = makeIntlStub()
    const attrStub1a = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null, {
      lowerBound: -564678,
    })
    const result1a = formatLowerBoundHintText(intlStub1a, attrStub1a)
    assert.equal(result1a, 'criterion.attribute.bounds.lower.bound.value', '1a - Bound should be internationalized with value')
    assert.deepInclude(intlStub1a.results.formatMessage.parameters, { lowerBoundText: '-564678' }, '1a - Message should include the right bounds information')

    // b - with simple unit
    const intlStub1b = makeIntlStub()
    const attrStub1b = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, 'km', {
      lowerBound: -0.25,
    })
    const result1b = formatLowerBoundHintText(intlStub1b, attrStub1b)
    assert.equal(result1b, 'criterion.attribute.bounds.lower.bound.value', '1b - Bound should be internationalized with value')
    assert.equal(intlStub1b.results.formatMessage.count, 1, '1b - formatMessage should have been called to format bound value')
    assert.deepInclude(intlStub1b.results.formatMessage.parameters, { lowerBoundText: '-0.25km' }, '1b - Message should include the right bounds information')

    // c - with storage unit
    const intlStub1c = makeIntlStub()
    const attrStub1c = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, 'o', {
      lowerBound: 0,
    })
    const result1c = formatLowerBoundHintText(intlStub1c, attrStub1c)
    assert.equal(result1c, 'criterion.attribute.bounds.lower.bound.value', '1c - Bound should be internationalized with value')
    assert.equal(intlStub1c.results.formatNumber.count, 1, '1c - formatNumber should have been called to format bound value (storage value)')
    assert.equal(intlStub1c.results.formatMessage.count, 3, '1c - formatMessage should have been called to format bound value, unit and value with unit')
    assert.deepInclude(intlStub1c.results.formatMessage.parameters, { lowerBoundText: 'storage.capacity.monitoring.capacity' }, '1c - Message should include the right bounds information')

    // 2 - Date
    // a - valid
    const intlStub2a = makeIntlStub()
    const attrStub2a = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: '2018-09-27T13:15:42.726Z',
    })
    const result2a = formatLowerBoundHintText(intlStub2a, attrStub2a)
    assert.equal(result2a, 'criterion.attribute.bounds.lower.bound.value', '2a - Bound should be internationalized with value')
    assert.equal(intlStub2a.results.formatMessage.count, 2, '2a - formatMessage should have been called to format bound value and date parameters')
    assert.deepInclude(intlStub2a.results.formatMessage.parameters, { lowerBoundText: 'date.value.render.type.dateWithSeconds' }, '2a - Message should include the right bounds information')

    // b - invalid
    const intlStub2b = makeIntlStub()
    const attrStub2b = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: 'somethinginvalid',
    })
    assert.throws(formatLowerBoundHintText.bind(null, intlStub2b, attrStub2b))

    // 3 - Without value
    // a - number
    const intlStub3a = makeIntlStub()
    const attrStub3a = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null, {
      lowerBound: null,
    })
    const result3a = formatLowerBoundHintText(intlStub3a, attrStub3a)
    assert.equal(result3a, 'criterion.attribute.bounds.lower.bound.none', '3a - Bound should be internationalized without value')
    assert.equal(intlStub3a.results.formatMessage.count, 2, '3a - formatMessage should have been called to format bound text and attribute type')
    assert.deepInclude(intlStub3a.results.formatMessage.parameters, { typeText: 'criterion.attribute.hint.type.LONG' }, '3a - Message should include the right bounds information')
    // date
    const intlStub3b = makeIntlStub()
    const attrStub3b = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: null,
    })
    const result3b = formatLowerBoundHintText(intlStub3b, attrStub3b)
    assert.equal(result3b, 'criterion.attribute.bounds.lower.bound.none', '3b - Bound should be internationalized without value')
    assert.equal(intlStub3b.results.formatMessage.count, 2, '3b - formatMessage should have been called to format bound text and attribute type')
    assert.deepInclude(intlStub3b.results.formatMessage.parameters, { typeText: 'criterion.attribute.hint.type.DATE_ISO8601' }, '3b - Message should include the right bounds information')
  })
  it('should format correctly an upper bound field', () => {
    // 1 - Number
    const intlStub1 = makeIntlStub()
    const attrStub1 = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, 'km', {
      upperBound: -0.25,
    })
    const result1 = formatUpperBoundHintText(intlStub1, attrStub1)
    assert.equal(result1, 'criterion.attribute.bounds.upper.bound.value', '1 - Bound should be internationalized with value')
    assert.equal(intlStub1.results.formatMessage.count, 1, '1 - formatMessage should have been called to format bound value')
    assert.deepInclude(intlStub1.results.formatMessage.parameters, { upperBoundText: '-0.25km' }, '1 - Message should include the right bounds information')

    // 2 - Valid date
    const intlStub2 = makeIntlStub()
    const attrStub2 = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      upperBound: '2018-09-27T13:15:42.726Z',
    })
    const result2 = formatUpperBoundHintText(intlStub2, attrStub2)
    assert.equal(result2, 'criterion.attribute.bounds.upper.bound.value', '2 - Bound should be internationalized with value')
    assert.equal(intlStub2.results.formatMessage.count, 2, '2 - formatMessage should have been called to format bound value and date parameters')
    assert.deepInclude(intlStub2.results.formatMessage.parameters, { upperBoundText: 'date.value.render.type.dateWithSeconds' }, '2 - Message should include the right bounds information')

    // 3 - Without value
    const intlStub3 = makeIntlStub()
    const attrStub3 = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.LONG, null, {
      upperBound: null,
    })
    const result3 = formatUpperBoundHintText(intlStub3, attrStub3)
    assert.equal(result3, 'criterion.attribute.bounds.upper.bound.none', '3 - Bound should be internationalized without value')
    assert.equal(intlStub3.results.formatMessage.count, 2, '3 - formatMessage should have been called to format bound text and attribute type')
    assert.deepInclude(intlStub3.results.formatMessage.parameters, { typeText: 'criterion.attribute.hint.type.LONG' }, '3 - Message should include the right bounds information')
  })
  it('should format correctly an any bound field', () => {
    // 1 - Number range [a;b]
    const intlStub1 = makeIntlStub()
    const attrStub1 = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DOUBLE, 'o', {
      lowerBound: -0.10,
      upperBound: 0.25,
    })
    const result1 = formatAnyBoundHintText(intlStub1, attrStub1)
    assert.equal(result1, 'criterion.attribute.bounds.range.values', '1 - Bound should be internationalized with values')
    assert.equal(intlStub1.results.formatMessage.count, 7, '1 - formatMessage for units (2 times), values (2 times), bound ranges (2 times) and full range')
    assert.deepInclude(intlStub1.results.formatMessage.parameters, {
      rangeMin: 'criterion.attribute.bounds.range.inclusive.min.bound',
      rangeMax: 'criterion.attribute.bounds.range.inclusive.max.bound',
    }, '1 - Message should include the right bounds information')
    // 2 - Date range [a;+inf[
    const intlStub2 = makeIntlStub()
    const attrStub2 = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null, {
      lowerBound: '2018-09-27T13:15:42.726Z',
      upperBound: null,
    })
    const result2 = formatAnyBoundHintText(intlStub2, attrStub2)
    assert.equal(result2, 'criterion.attribute.bounds.range.values', '2 - Bound should be internationalized with values')
    assert.equal(intlStub2.results.formatMessage.count, 4, '2 - formatMessage for bound each (2 times), for date displaying and for and full range')
    assert.deepInclude(intlStub2.results.formatMessage.parameters, {
      rangeMin: 'criterion.attribute.bounds.range.inclusive.min.bound',
      rangeMax: 'criterion.attribute.bounds.range.max.infinity.bound',
    }, '2 - Message should include the right bounds information')
    // 2 - Number range ]-inf;a]
    const intlStub3 = makeIntlStub()
    const attrStub3 = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.INTEGER, 'km', {
      lowerBound: null,
      upperBound: 0,
    })
    const result3 = formatAnyBoundHintText(intlStub3, attrStub3)
    assert.equal(result3, 'criterion.attribute.bounds.range.values', '3 - Bound should be internationalized with values')
    assert.equal(intlStub3.results.formatMessage.count, 3, '3 - formatMessage for bound each (2 times) and for and full range')
    assert.deepInclude(intlStub3.results.formatMessage.parameters, {
      rangeMin: 'criterion.attribute.bounds.range.min.infinity.bound',
      rangeMax: 'criterion.attribute.bounds.range.inclusive.max.bound',
    }, '3 - Message should include the right bounds information')
  })
  it('should format correctly bounds state', () => {
    values(DamDomain.MODEL_ATTR_TYPES).forEach((type) => {
      // 1 - bounds not exisiting
      const intlStub1 = makeIntlStub()
      const result1 = formatBoundsStateHint(intlStub1, criterionTestSuiteHelpers.getAttributeStub(type, null, criterionTestSuiteHelpers.getBoundsInformationStub(false)))
      assert.equal(result1, 'criterion.attribute.bounds.not.existing', `[${type}] 1 - Non existing bounds should be correctly internationalized`)
      assert.equal(intlStub1.results.formatMessage.count, 2, `[${type}] 1 - Format message should have been called to format state and type`)
      assert.deepInclude(intlStub1.results.formatMessage.parameters, { typeText: `criterion.attribute.hint.type.${type}` }, `[${type}] 1 - Type should have been provided as parameter`)
      // 2 - bounds loading
      const intlStub2 = makeIntlStub()
      const result2 = formatBoundsStateHint(intlStub2, criterionTestSuiteHelpers.getAttributeStub(type, null, criterionTestSuiteHelpers.getBoundsInformationStub(true, true)))
      assert.equal(result2, 'criterion.attribute.bounds.loading', `[${type}] 2 - Loading bounds should be correctly internationalized`)
      assert.equal(intlStub2.results.formatMessage.count, 2, `[${type}] 2 - Format message should have been called to format state and type`)
      assert.deepInclude(intlStub2.results.formatMessage.parameters, { typeText: `criterion.attribute.hint.type.${type}` }, `[${type}] 2 - Type should have been provided as parameter`)
      // 3 - bounds in error
      const intlStub3 = makeIntlStub()
      const result3 = formatBoundsStateHint(intlStub3, criterionTestSuiteHelpers.getAttributeStub(type, null, criterionTestSuiteHelpers.getBoundsInformationStub(true, false, true)))
      assert.equal(result3, 'criterion.attribute.bounds.error', `[${type}] 3 - Bounds in error should be correctly internationalized`)
      assert.equal(intlStub3.results.formatMessage.count, 2, `[${type}] 3 - Format message should have been called to format state and type`)
      assert.deepInclude(intlStub3.results.formatMessage.parameters, { typeText: `criterion.attribute.hint.type.${type}` }, `[${type}] 3 - Type should have been provided as parameter`)
      // 4 - no bound
      const intlStub4 = makeIntlStub()
      const result4 = formatBoundsStateHint(intlStub4, criterionTestSuiteHelpers.getAttributeStub(type, null, criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false)))
      assert.equal(result4, 'criterion.attribute.bounds.none', `[${type}] 4 - Missing bounds should be correctly internationalized`)
      assert.equal(intlStub4.results.formatMessage.count, 2, `[${type}] 4 - Format message should have been called to format state and type`)
      assert.deepInclude(intlStub4.results.formatMessage.parameters, { typeText: `criterion.attribute.hint.type.${type}` }, `[${type}] 4 - Type should have been provided as parameter`)
      // 5 - Any other case should not be handled as it is not the role of that method
      const intlStub5 = makeIntlStub()
      assert.isNotOk(
        formatBoundsStateHint(intlStub5, criterionTestSuiteHelpers.getAttributeStub(type, null, criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, 5, null)), 'TYPE.5'),
        `[${type}] 5a - Method should not handle that attribute as it has a lower bound`)
      assert.isNotOk(
        formatBoundsStateHint(intlStub5, criterionTestSuiteHelpers.getAttributeStub(type, null, criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, null, '2018-09-27T13:15:42.726Z')), 'TYPE.5'),
        `[${type}] 5b - Method should not handle that attribute as it has an upper bound`)
    })
  })
  it('should format correctly a field hint', () => {
    // 1 - Test types that cannot have bounds
    typesWithoutBounds.forEach((t) => {
      const intlStub = makeIntlStub()
      const formatted = formatHintText(intlStub, criterionTestSuiteHelpers.getAttributeStub(t, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(false, false, false)))
      assert.equal(formatted, 'criterion.attribute.bounds.not.existing', `[${t}] Bounds not existing should be correctly internalized`)
    })
    // 2 - Types that can have bounds, without bound
    typesWithBounds.forEach((t) => {
      const intlStub = makeIntlStub()
      assert.equal(formatHintText(intlStub, criterionTestSuiteHelpers.getAttributeStub(t, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(false))),
      'criterion.attribute.bounds.not.existing', `[${t}] Bounds not existing should be correctly internationalized`)
      assert.equal(formatHintText(intlStub, criterionTestSuiteHelpers.getAttributeStub(t, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, true))),
      'criterion.attribute.bounds.loading', `[${t}] Bounds loading should be correctly internationalized`)
      assert.equal(formatHintText(intlStub, criterionTestSuiteHelpers.getAttributeStub(t, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, true))),
      'criterion.attribute.bounds.error', `[${t}] Bounds in error should be correctly internationalized`)
      assert.equal(formatHintText(intlStub, criterionTestSuiteHelpers.getAttributeStub(t, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false))),
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
        const attrStub = criterionTestSuiteHelpers.getAttributeStub(t, null,
          criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, lowerBound, upperBound))
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
      const attrStub = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, lowerBound, upperBound))
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
    // 5 - Test with valid bounds but NONE bound type
    // 5a - partial number range
    const attrStub5a = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
      criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, 25))
    assert.equal(formatHintText(makeIntlStub(), attrStub5a, BOUND_TYPE.NONE),
      'criterion.attribute.bounds.upper.bound.none', '5a - NO_BOUND should always return the corresponding text')

    // 5b - full date range
    const attrStub5b = criterionTestSuiteHelpers.getAttributeStub(DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
      criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, '2017-09-27T13:15:42.726Z', '2018-09-27T13:15:42.726Z'))
    assert.equal(formatHintText(makeIntlStub(), attrStub5b, BOUND_TYPE.NONE),
      'criterion.attribute.bounds.upper.bound.none', '5b - NO_BOUND should always return the corresponding text')

    // 6 - stateful attributes
    assert.equal(
      formatHintText(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub('*', null,
        criterionTestSuiteHelpers.getBoundsInformationStub(false, false, false)), BOUND_TYPE.NONE),
      'criterion.attribute.bounds.upper.bound.none', '6a - NO_BOUND should always return the corresponding text')
    assert.equal(
      formatHintText(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub('*', null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, true, false)), BOUND_TYPE.NONE),
      'criterion.attribute.bounds.upper.bound.none', '6b - NO_BOUND should always return the corresponding text')
    assert.equal(
      formatHintText(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub('*', null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, true)), BOUND_TYPE.NONE),
      'criterion.attribute.bounds.upper.bound.none', '6c - NO_BOUND should always return the corresponding text')

    // 6 - check error is thrown when no intl is provided
    assert.throws(formatHintText.bind(null, null, attrStub5b, BOUND_TYPE.NONE))
    assert.throws(formatHintText.bind(null, {}, attrStub5b, BOUND_TYPE.NONE))
  })
  it('should format correctly a field tooltip', () => {
    // 1 - any attribute when bounds do not exist, are fetching or in error
    values(DamDomain.MODEL_ATTR_TYPES).forEach((type) => {
      // 1.a - not exisiting
      assert.equal(formatTooltip(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub(type, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(false))),
      'criterion.attribute.tooltip.no.bound', `1.a - [${type}] Should be formatted as not boundable`)
      // 1.b - loading
      assert.equal(formatTooltip(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub(type, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, true))),
      'criterion.attribute.tooltip.no.bound', `1.b - [${type}] Should be formatted as not boundable`)
      // 1.c - in error
      assert.equal(formatTooltip(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub(type, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, true))),
      'criterion.attribute.tooltip.no.bound', `1.c - [${type}] Should be formatted as not boundable`)
    })
    // 2 - Boundable attribute with bounds
    const testCases = [
      { type: DamDomain.MODEL_ATTR_TYPES.DOUBLE, lower: -1, upper: 5423.21 },
      { type: DamDomain.MODEL_ATTR_TYPES.INTEGER, upper: 0 },
      { type: DamDomain.MODEL_ATTR_TYPES.LONG, lower: 50000000000000 },
      { type: DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, lower: '2017-09-27T13:15:42.726Z', upper: '2018-09-27T13:15:42.726Z' },
      { type: DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, upper: '2018-09-27T13:15:42.726Z' },
      { type: DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, lower: '2017-09-27T13:15:42.726Z' },
    ]
    testCases.forEach(({ type, lower, upper }, index) => {
      const attr = criterionTestSuiteHelpers.getAttributeStub(type, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, lower, upper))
      assert.equal(formatTooltip(makeIntlStub(), attr), 'criterion.attribute.tooltip.valueable.with.bounds',
        `2 - (${index + 1}) should be formatted with bounds in tooltip`)
    })
    // 3 - Boundable without bounds
    typesWithBounds.forEach((type) => {
      assert.equal(formatTooltip(makeIntlStub(), criterionTestSuiteHelpers.getAttributeStub(type, null,
        criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false))),
      'criterion.attribute.tooltip.valueable.without.bound', `3 - [${type}] should be formatted as no bound value`)
    })
  })
})
