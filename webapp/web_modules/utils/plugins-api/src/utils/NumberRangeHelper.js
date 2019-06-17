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
import isNaN from 'lodash/isNaN'
import isNumber from 'lodash/isNumber'
import { EnumNumericalComparator } from '@regardsoss/domain/common'


/**
 * Provides helper tools for number related plugins to parse, publish and handle number ranges in open search queries
 * @author Raphaël Mechali
 */


/** Basic test to know if that number should be ignored / converted in queries */
function isValidNumber(value) {
  return isNumber(value) && !isNaN(value)
}


/**
 * A parsed number range
 */
class NumberRange {
  /**
   * Constructor
   * @param {number} lowerBound lower bound (when not a valid number, defaults to NEGATIVE_INFINITY)
   * @param {number} upperBound  upper bound (when not a valid number, defaults to POSITIVE_INFINITY)
   */
  constructor(lowerBound, upperBound) {
    this.lowerBound = isValidNumber(lowerBound) ? lowerBound : Number.NEGATIVE_INFINITY
    this.upperBound = isValidNumber(upperBound) ? upperBound : Number.POSITIVE_INFINITY
  }

  /** @return true if lower bound is infinite */
  isInfiniteLowerBound() {
    return this.lowerBound === Number.NEGATIVE_INFINITY
  }

  /** @return true if higher bound is infinite */
  isInfiniteUpperBound() {
    return this.upperBound === Number.POSITIVE_INFINITY
  }

  /** @return true if range is defining full infinity */
  isFullyInifiniteRange() {
    return this.isInfiniteLowerBound() && this.isInfiniteUpperBound()
  }

  /** @return true if range is holding a single value */
  isSingleValueRange() {
    return this.lowerBound === this.upperBound
  }
}

/** Open search number escaping character */
const OPEN_SEARCH_NUMBER_ESCAPING = '\\'

/** Marks an infinite bound in open search */
const INFINITE_BOUND_TAG = '*'

/**
 * Formats a number for open search request
 * @param {number} value value to format (required
 * @return {string} open search valid number
 */
function numberToOpenSearch(value) {
  return `${value < 0 ? OPEN_SEARCH_NUMBER_ESCAPING : ''}${value}`
}

/**
 * Returns query part for attribute name and number or NumberRange as parameter
 * @param {string} attributeName attribute name (optional, when not provided no query will be generated)
 * @param {NumberRange} value a NumberRange (optional, when not number no query will be generated)
 * @return {string} generated attribute query for value (maybe empty string)
 */
function getNumberAttributeQueryPart(attributeName, value) {
  if (!attributeName || !value || value.isFullyInifiniteRange()) {
    // query part cannot be generated or is useless (full infinite range)
    return ''
  }
  if (value.isSingleValueRange()) {
    // a simple value equality request
    return `${attributeName}:${numberToOpenSearch(value.lowerBound)}`
  }
  // a range that has not 2 infinite bounds
  const lowerBound = value.isInfiniteLowerBound() ? INFINITE_BOUND_TAG : numberToOpenSearch(value.lowerBound)
  const upperBound = value.isInfiniteUpperBound() ? INFINITE_BOUND_TAG : numberToOpenSearch(value.upperBound)
  return `${attributeName}:[${lowerBound} TO ${upperBound}]`
}

/**
 * Returns a NumberRange from value and operator as as follow
 * VALUE, >= [VALUE, +inf]
 * VALUE, <= [-inf, VALUE]
 * VALUE, == [VALUE, VALUE]
 * @param {number} value value (optional, infinity range is returned when not provided or invalid)
 * @param {string} operator operator, one of EnumNumericalComparator choices (optional, converted value is null when not provided)
 * @return {NumberRange} converted NumberRange
 */
function convertToRange(value, operator) {
  if (!isValidNumber(value) || !operator) {
    return null
  }
  switch (operator) {
    case EnumNumericalComparator.EQ:
      return new NumberRange(value, value)
    case EnumNumericalComparator.LE:
      return new NumberRange(Number.NEGATIVE_INFINITY, value)
    case EnumNumericalComparator.GE:
      return new NumberRange(value, Number.POSITIVE_INFINITY)
    default:
      throw new Error(`Unsupported operator for conversion to range ${operator}`)
  }
}

export default {
  convertToRange,
  isValidNumber,
  getNumberAttributeQueryPart,
  NumberRange,
}
