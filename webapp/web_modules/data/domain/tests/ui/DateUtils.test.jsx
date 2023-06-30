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
 */
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LOCALES_ENUM } from '@regardsoss/domain/ui'
import DateUtils from '../../ui/DateUtils'

const setTimezone = (newTimezone) => {
  process.env.TZ = newTimezone
}

const getTimezone = () => process.env.TZ

describe('[FORM UTILS] Testing DateUtils', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  // computeDisplayedDateText & computeDisplayedTimeText tests
  let testCases = [{
    label: 'compile empty text values when null date and null timezone',
    date: null,
    timezone: null,
    locale: LOCALES_ENUM.fr,
    expectedResult: {
      dateText: '',
      timeText: '',
    },
  }, {
    label: 'compile empty text values when null date and Europe/London timezone (UTC 0)',
    date: null,
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: {
      dateText: '',
      timeText: '',
    },
  }, {
    label: 'compile empty text values when invalid date object and Europe/Paris timezone (UTC +1)',
    date: new Date('qdqzdqd'),
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: {
      dateText: '',
      timeText: '',
    },
  }, {
    label: 'compile empty text values when invalid date string and Europe/Paris timezone (UTC +1)',
    date: 'test',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: {
      dateText: '',
      timeText: '',
    },
  }, {
    label: 'compile text values (HH +0) when date objec and Europe/London timezone (UTC 0)',
    date: new Date('2022-01-05T00:00:00.000Z'),
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: {
      dateText: '05/01/2022',
      timeText: '00:00:00',
    },
  }, {
    label: 'compile text values (HH +0) when date object, Europe/Paris timezone (UTC +1) and Locale FR',
    date: new Date('2022-01-05T00:00:00.000Z'),
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: {
      dateText: '05/01/2022',
      timeText: '00:00:00',
    },
  }, {
    label: 'compile text values (HH +0) when date object, America/Havana timezone (UTC -5) and Locale FR',
    date: new Date('2022-01-05T00:00:00.000Z'),
    locale: LOCALES_ENUM.fr,
    timezone: 'America/Havana',
    expectedResult: {
      dateText: '05/01/2022',
      timeText: '00:00:00',
    },
  }, {
    label: 'compile empty text values when date string (with Z parameter) and Europe/Paris timezone (UTC +1) and Locale EN',
    date: '2022-01-05T00:00:00.000Z',
    locale: LOCALES_ENUM.en,
    timezone: 'Europe/Paris',
    expectedResult: {
      dateText: '',
      timeText: '',
    },
  }]
  testCases.forEach(({
    date, locale, expectedResult, label, timezone,
  }) => it(`computeDisplayedDate should correctly ${label}`, () => {
    const currentTimezone = getTimezone()
    setTimezone(timezone)
    const newDateText = DateUtils.computeDisplayedDateText(date, locale)
    const newTimeText = DateUtils.computeDisplayedTimeText(date)
    assert.deepEqual(newDateText, expectedResult.dateText)
    assert.deepEqual(newTimeText, expectedResult.timeText)
    setTimezone(currentTimezone)
  }))

  // computeDisplayedDateText tests
  testCases = [{
    label: 'compile empty text value when null date and null timezone',
    date: null,
    timezone: null,
    locale: LOCALES_ENUM.fr,
    expectedResult: '',
  }, {
    label: 'compile empty text value when null date and Europe/London timezone (UTC 0)',
    date: null,
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: '',
  }, {
    label: 'compile empty text value when invalid date object and Europe/Paris timezone (UTC +1)',
    date: new Date('qdqzdqd'),
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: '',
  }, {
    label: 'compile empty text value when invalid date string and Europe/Paris timezone (UTC +1)',
    date: 'test',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: '',
  }, {
    label: 'compile empty text value when date string and Europe/Paris timezone (UTC +1)',
    date: '2022-01-01T00:00:00.000Z',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: '',
  }, {
    label: 'compile empty text value when date string (without Z parameter), Europe/Paris timezone (UTC +1) and Locale FR',
    date: '2022-01-01T00:00:00.000',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: '',
  }, {
    label: 'compile empty text value when date string (without Z parameter), Europe/Paris timezone (UTC +1) and Locale EN',
    date: '2022-01-01T00:00:00.000',
    locale: LOCALES_ENUM.en,
    timezone: 'Europe/Paris',
    expectedResult: '',
  }, {
    label: 'compile empty text value when date string (without Z parameter), Europe/London timezone (UTC +0) and Locale FR',
    date: '2022-01-01T00:00:00.000',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: '',
  }, {
    label: 'compile empty text value when date string (without Z parameter), Europe/London timezone (UTC +0) and Locale EN',
    date: '2022-01-01T00:00:00.000',
    locale: LOCALES_ENUM.en,
    timezone: 'Europe/London',
    expectedResult: '',
  }, {
    label: 'compile text value (HH +0) when date object and Europe/London timezone (UTC 0)',
    date: new Date('2022-01-01T00:00:00.000Z'),
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: '01/01/2022',
  }, {
    label: 'compile text value (HH +0) when date object and Europe/Paris timezone (UTC +1)',
    date: new Date('2022-01-01T00:00:00.000Z'),
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: '01/01/2022',
  }, {
    label: 'compile text value (HH +0) when date object and American/Havana timezone (UTC -5)',
    date: new Date('2022-01-01T00:00:00.000Z'),
    locale: LOCALES_ENUM.fr,
    timezone: 'American/Havana',
    expectedResult: '01/01/2022',
  }]
  testCases.forEach(({
    date, locale, expectedResult, label, timezone,
  }) => it(`computeDisplayedDateText should compute correctly ${label}`, () => {
    const currentTimezone = getTimezone()
    setTimezone(timezone)
    const result = DateUtils.computeDisplayedDateText(date, locale)
    assert.equal(result, expectedResult)
    setTimezone(currentTimezone)
  }))

  // createDateAndOverrideTime tests
  testCases = [{
    label: 'copy time from datetimeToUse to inputDate',
    datetimeToUse: new Date('2022-01-01T22:59:59.000Z'),
    inputDate: new Date('2023-03-04T00:00:00.000Z'),
    expectedResult: new Date('2023-03-04T22:59:59.000Z'),
  }, {
    label: 'return inputDate when no datetimeToUse and no default date specified',
    datetimeToUse: null,
    inputDate: new Date('2023-03-04T00:00:00.000Z'),
    expectedResult: new Date('2023-03-04T00:00:00.000Z'),
  }, {
    label: 'return null when no inputDate specified',
    datetimeToUse: new Date('2022-05-05T00:46:00.000Z'),
    inputDate: null,
    expectedResult: null,
  }]
  testCases.forEach(({
    datetimeToUse, inputDate, label, expectedResult,
  }) => it(`createDateAndOverrideTime should correctly ${label}`, () => {
    const result = DateUtils.createDateAndOverrideTime(inputDate, datetimeToUse)
    assert.deepEqual(result, expectedResult)
  }))

  // createDateAndOverrideDateValues tests
  testCases = [{
    label: 'copy date from dateValuesToUse to inputDate',
    dateValuesToUse: new Date('2022-01-01T00:00:00.000Z'),
    inputDate: new Date('2023-03-04T00:02:00.000Z'),
    expectedResult: new Date('2022-01-01T00:02:00.000Z'),
  }, {
    label: 'return inputDate when no dateValuesToUse and no default date specified',
    dateValuesToUse: null,
    inputDate: new Date('2023-03-04T00:00:00.000Z'),
    expectedResult: new Date('2023-03-04T00:00:00.000Z'),
  }, {
    label: 'return null when no inputDate specified',
    dateValuesToUse: new Date('2022-05-05T00:46:00.000Z'),
    inputDate: null,
    expectedResult: null,
  }]
  testCases.forEach(({
    dateValuesToUse, inputDate, label, expectedResult,
  }) => it(`createDateAndOverrideDateValues should correctly ${label}`, () => {
    const result = DateUtils.createDateAndOverrideDateValues(inputDate, dateValuesToUse)
    assert.deepEqual(result, expectedResult)
  }))

  // createUTCDateTimeFromString tests
  testCases = [{
    label: 'compile null date when empty text values and null timezone',
    dateString: '',
    timeString: '',
    timezone: null,
    locale: LOCALES_ENUM.fr,
    expectedResult: null,
  }, {
    label: 'compile null date when empty text values and Europe/London timezone (UTC 0)',
    dateString: '',
    timeString: '',
    timezone: 'Europe/London',
    locale: LOCALES_ENUM.fr,
    expectedResult: null,
  }, {
    label: 'compile null date when invalid date text value and Europe/Paris timezone (UTC +1)',
    dateString: 'dqzdqz',
    timeString: '',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: null,
  }, {
    label: 'compile null date when invalid date text value and correct time text value and Europe/Paris timezone (UTC +1)',
    dateString: 'dqzdqz',
    timeString: '02:00:00',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: null,
  }, {
    label: 'compile date with correct hour when invalid time text value and correct date text value, Europe/Paris timezone (UTC +1) and Locale FR',
    dateString: '02/01/2002',
    timeString: 'dqdqd',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: null,
  }, {
    label: 'compile date with correct hour when invalid time text value and correct date text value, Europe/London timezone (UTC +0) and Locale FR',
    dateString: '02/01/2002',
    timeString: 'dqdqd',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: null,
  }, {
    label: 'compile date with correct hour (HH +0) when valid text values, Europe/London timezone (UTC 0) and Locale FR',
    dateString: '06/04/2022',
    timeString: '11:00:01',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/London',
    expectedResult: 12,
  }, {
    label: 'compile date object (HH +0) when valid text values, Europe/Paris timezone (UTC +1) and Locale FR',
    dateString: '06/04/2022',
    timeString: '11:00:01',
    locale: LOCALES_ENUM.fr,
    timezone: 'Europe/Paris',
    expectedResult: 13,
  }, {
    label: 'compile date object (HH +0) when valid text values, Europe/London timezone (UTC 0) and Locale EN',
    dateString: '10/01/2024',
    timeString: '05:33:23',
    locale: LOCALES_ENUM.en,
    timezone: 'Europe/London',
    expectedResult: 6,
  }, {
    label: 'compile date object (HH +0) when valid text values, Europe/Paris timezone (UTC +1) and Locale EN',
    dateString: '07/08/2022',
    timeString: '12:42:44',
    locale: LOCALES_ENUM.en,
    timezone: 'Europe/Paris',
    expectedResult: 14,
  }, {
    label: 'compile date object (HH +0) when valid text values, America/Havana timezone (UTC -5) and Locale EN',
    dateString: '07/08/2022',
    timeString: '12:42:44',
    locale: LOCALES_ENUM.en,
    timezone: 'America/Havana',
    expectedResult: 8,
  }, {
    label: 'compile date object (HH +0) when valid text values, Pacific/Nauru timezone (UTC +12) and Locale EN',
    dateString: '07/08/2022',
    timeString: '12:42:44',
    locale: LOCALES_ENUM.en,
    timezone: 'Pacific/Nauru',
    expectedResult: 0,
  }, {
    label: 'compile date object (HH +0) when valid text values, Europe/Samara timezone (UTC +12) and Locale EN',
    dateString: '07/08/2022',
    timeString: '12:42:44',
    locale: LOCALES_ENUM.en,
    timezone: 'Europe/Samara',
    expectedResult: 16,
  }]
  testCases.forEach(({
    dateString, locale, timeString, label, expectedResult, timezone,
  }) => it(`createUTCDateTimeFromString should correctly ${label}`, () => {
    const currentTimezone = getTimezone()
    setTimezone(timezone)
    const result = DateUtils.createUTCDateTimeFromString(dateString, locale, timeString)
    if (result) {
      assert.equal(result.getHours(), expectedResult)
    } else {
      assert.deepEqual(result, expectedResult)
    }
    setTimezone(currentTimezone)
  }))
})
