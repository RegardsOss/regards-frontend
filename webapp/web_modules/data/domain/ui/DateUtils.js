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
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
import split from 'lodash/split'
import includes from 'lodash/includes'
import isDate from 'lodash/isDate'
import moment from 'moment'
import { UIDomain } from '@regardsoss/domain'

/**
 * Functions used to manipulate dates
 * @author Théo Lasserre
 */

/**
 * Available date and time formats
 */
const DATE_FORMAT_US = 'MM/DD/YYYY'
const DATE_FORMAT = 'DD/MM/YYYY'
const TIME_FORMAT = 'HH:mm:ss'
const ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SS'

/**
 * Get date string format depending on locale
 * @param {String} locale
 * @returns DATE_FORMAT_US or DATE_FORMAT
 */
function getDateFormat(locale) {
  return locale === UIDomain.LOCALES_ENUM.en ? DATE_FORMAT_US : DATE_FORMAT
}

/**
 * Check if parameter is a date
 * @param {*} maybeDate
 * @returns true if parameter is a date, false otherwise
 */
function isADate(maybeDate) {
  return Object.prototype.toString.call(maybeDate) === '[object Date]' && !isNaN(maybeDate.getTime())
}

/**
 * Build displayed date text value
 * @param {Date} date
 * @param {String} locale
 * @returns text date value or empty string
 */
function computeDisplayedDateText(date, locale) {
  return date && isADate(date) ? moment.utc(date).format(getDateFormat(locale)) : ''
}

/**
 * Build displayed time text value
 * @param {Date} date
 * @returns text time value or empty string
 */
function computeDisplayedTimeText(date) {
  return date && isADate(date) ? moment.utc(date).format(TIME_FORMAT) : ''
}

/**
 * Create a new date using inputDate and override time values (hours, minutes & secondes) using datetimeToUse
 * @param {Date} inputDate
 * @param {Date} datetimeToUse
 * @returns a date
 */
function createDateAndOverrideTime(inputDate, datetimeToUse) {
  let resultingDate = inputDate
  if (isDate(resultingDate)) {
    resultingDate = new Date(inputDate)
    if (isDate(datetimeToUse)) {
      resultingDate.setHours(datetimeToUse.getHours())
      resultingDate.setMinutes(datetimeToUse.getMinutes())
      resultingDate.setSeconds(datetimeToUse.getSeconds())
    }
  }
  return resultingDate
}

/**
 * Create a new date using inputDate and override date values (day, month & year) using dateValuesToUse
 * @param {Date} inputDate
 * @param {Date} dateValuesToUse
 * @returns a date
 */
function createDateAndOverrideDateValues(inputDate, dateValuesToUse) {
  let resultingDate = inputDate
  if (isDate(resultingDate)) {
    resultingDate = new Date(inputDate)
    if (isDate(dateValuesToUse)) {
      resultingDate.setDate(dateValuesToUse.getDate())
      resultingDate.setMonth(dateValuesToUse.getMonth())
      resultingDate.setFullYear(dateValuesToUse.getFullYear())
    }
  }
  return resultingDate
}

/**
 * Convert a dateString to an US formatted date
 * @param {String} dateString
 * @returns an US formatted date or null if no dateString provided
 */
function getUsDateString(dateString) {
  if (!isEmpty(dateString) && includes(dateString, '/')) {
    const parts = split(dateString, '/')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[0]}-${parts[1]}`
    }
  }
  return null
}

function getEuropeanDateString(dateString) {
  if (!isEmpty(dateString) && includes(dateString, '/')) {
    const parts = split(dateString, '/')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    }
  }
  return null
}

/**
 * Tranform given date by removing specified timeZone.
 *
 * @param {Date} date
 * @param {Number} offset
 * @returns Transformed date
 */
function parseDateToUTC(date) {
  if (!date || !isADate(date)) return null
  // Transform input Date object to String and force timeZone to Z (UTC GMT+00)
  const dateStringWihtoutTimeZone = `${moment(date).utcOffset(0, true).format(ISO_DATE_FORMAT)}Z`
  // Transform String to Date
  return moment(dateStringWihtoutTimeZone).toDate()
}

/**
 * Create a date js object from a string with UTC (GMT00) timeZone
 *
 * @param {String} dateString
 * @param {String} locale
 * @param {String} timeString
 * @param {Number} offset
 * @returns a formatted date or null is no dateString provided
 */
function createUTCDateTimeFromString(dateString, locale, timeString) {
  const currentDateString = locale === UIDomain.LOCALES_ENUM.en ? getUsDateString(dateString) : getEuropeanDateString(dateString)
  // Transform input Date object to String and force timeZone to Z (UTC GMT+00)
  const utcDate = new Date(Date.parse(`${currentDateString}T${timeString}Z`))
  return isADate(utcDate) ? utcDate : null
}

/**
 * Convert input value to a date if possible, null otherwise
 * @param {Date || String || Other} value
 * @returns a date or null
 */
function getDateForComponent(value) {
  if (isDate(value)) {
    return value
  }
  if (Date.parse(value) > 0) {
    return new Date(value)
  }
  return null
}

/**
 * Substract local utc offset from a date
 * @param {Date} value
 * @returns a date
 */
function substractUTCOffset(value) {
  let dateValue = value
  if (value) {
    const momentDate = moment(value)
    dateValue = momentDate.subtract(momentDate.utcOffset(), 'minutes').toDate()
  }
  return dateValue
}

export default {
  createUTCDateTimeFromString,
  computeDisplayedDateText,
  parseDateToUTC,
  computeDisplayedTimeText,
  DATE_FORMAT_US,
  TIME_FORMAT,
  DATE_FORMAT,
  getDateFormat,
  createDateAndOverrideTime,
  createDateAndOverrideDateValues,
  isADate,
  getUsDateString,
  getDateForComponent,
  substractUTCOffset,
}
