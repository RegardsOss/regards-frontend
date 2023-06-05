/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { criterionTestSuiteHelpers } from '@regardsoss/tests-helpers'
import { DateRange } from '../../src/utils/DateRange'

describe('[PLUGINS API] Testing DateRange', () => {
  // override timezone offset to make it constant for tests (+3h) - avoids tests issues on other timezones
  let savedGetTimezoneOffset
  before(() => {
    savedGetTimezoneOffset = Date.prototype.getTimezoneOffset
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = () => 180 // in minutes
  })
  after(() => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.getTimezoneOffset = savedGetTimezoneOffset
  })
  // Nota: time zone issues can not be strongly tested,
  // see https://medium.com/@toastui/handling-time-zone-in-javascript-547e67aa842d
  it('should convert correctly a time to OpenSearch date representation', () => {
    assert.equal(DateRange.toOpenSearchDate(Number.NEGATIVE_INFINITY), '*')
    assert.equal(DateRange.toOpenSearchDate(Number.POSITIVE_INFINITY), '*')
    assert.equal(DateRange.toOpenSearchDate(new Date('2030-01-01T03:00:00.000Z').getTime()), '2030-01-01T03:00:00.000Z')
  })
  it('should convert correctly a range into request', () => {
    assert.isNotOk(DateRange.getDateQueryParameter('attr1',
      new DateRange(null, null)).toQueryString())

    assert.isNotOk(DateRange.getDateQueryParameter('attr1',
      DateRange.convertToRange(null, CommonDomain.EnumNumericalComparator.LE)).toQueryString())
    assert.isNotOk(DateRange.getDateQueryParameter('attr1',
      DateRange.convertToRange(null, CommonDomain.EnumNumericalComparator.EQ)).toQueryString())
    assert.isNotOk(DateRange.getDateQueryParameter('attr1',
      DateRange.convertToRange(null, CommonDomain.EnumNumericalComparator.GE)).toQueryString())

    assert.equal(DateRange.getDateQueryParameter('attr1',
      new DateRange(null, new Date('2030-01-01T03:00:00.000Z').getTime())).toQueryString(),
    'attr1:[* TO 2030-01-01T03:00:00.000Z]')
    assert.equal(DateRange.getDateQueryParameter('attr1',
      new DateRange(new Date('2030-01-01T03:00:00.000Z').getTime()), null).toQueryString(),
    'attr1:[2030-01-01T03:00:00.000Z TO *]')
    assert.equal(DateRange.getDateQueryParameter('attr1',
      new DateRange(new Date('2030-01-01T03:00:00.000Z').getTime(), new Date('2040-06-06T03:00:00.000Z').getTime())).toQueryString(),
    'attr1:[2030-01-01T03:00:00.000Z TO 2040-06-06T03:00:00.000Z]')

    assert.equal(DateRange.getDateQueryParameter('attr1',
      DateRange.convertToRange(new Date('2040-06-05T21:00:00.000Z').getTime(), CommonDomain.EnumNumericalComparator.LE)).toQueryString(),
    'attr1:[* TO 2040-06-05T21:00:00.000Z]')
    assert.equal(DateRange.getDateQueryParameter('attr1',
      DateRange.convertToRange(new Date('2040-06-06T03:00:00.000Z').getTime(), CommonDomain.EnumNumericalComparator.EQ)).toQueryString(),
    'attr1:2040-06-06T03:00:00.000Z')
    assert.equal(DateRange.getDateQueryParameter('attr1',
      DateRange.convertToRange(new Date('2040-06-06T03:00:00.000Z').getTime(), CommonDomain.EnumNumericalComparator.GE)).toQueryString(),
    'attr1:[2040-06-06T03:00:00.000Z TO *]')
  })

  it('should compute correctly restriction validity on intersection', () => {
    const getRange = (minDateISO, maxDateIso) => new DateRange(minDateISO && new Date(minDateISO).getTime(), maxDateIso && new Date(maxDateIso).getTime())
    const getAttrStub = (minDateISO, maxDateIso) => criterionTestSuiteHelpers.getAttributeStub(
      DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601, null,
      criterionTestSuiteHelpers.getBoundsInformationStub(true, false, false, minDateISO && new Date(minDateISO).getTime(), maxDateIso && new Date(maxDateIso).getTime()))
    // Nota: Attributes ranges, as provided by the server, are expressed as UTC time. Constraints ranges, as provided by user,
    // are expressed as local times
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2034-06-06T06:00:00.000Z', '2036-06-06T06:00:00.000Z')))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2036-06-06T06:00:00.000Z', '2050-06-06T06:00:00.000Z')))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2036-06-06T06:00:00.000Z', null)))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2036-06-06T06:00:00.000Z', '2050-06-06T06:00:00.000Z')))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2040-06-06T09:00:00.000Z', null)))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange(null, '2050-06-06T06:00:00.000Z')))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('1901-06-06T06:00:00.000Z', '2030-06-06T09:00:00.000Z')))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('1901-06-06T06:00:00.000Z', null)))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange(null, '2030-06-06T09:00:00.000Z')))
    assert.isTrue(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange(null, null)))

    assert.isFalse(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2040-06-06T09:00:00.001Z', '2045-06-06T06:00:00.000Z')))
    assert.isFalse(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange('2040-06-06T09:00:00.001Z', null)))
    assert.isFalse(DateRange.isValidRestrictionOn(getAttrStub('2030-06-06T06:00:00.000Z', '2040-06-06T06:00:00.000Z'), getRange(null, '2030-06-06T08:59:59.999Z')))
  })
})
