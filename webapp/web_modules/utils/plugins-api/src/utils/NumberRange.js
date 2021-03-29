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
 **/
import isNaN from 'lodash/isNaN'
import isNumber from 'lodash/isNumber'
import { EnumNumericalComparator } from '@regardsoss/domain/common'
import { CatalogDomain } from '@regardsoss/domain'

/**
 * Represents a number range. Provides helper tools for number related plugins to parse,
 * publish and handle number ranges in open search queries
 * @author Raphaël Mechali
 */
export class NumberRange {
  /** Basic test to know if that number should be ignored / converted in queries */
  static isValidNumber(value) {
    return isNumber(value) && !isNaN(value)
  }

  /** Open search number escaping character */
  static OPEN_SEARCH_NUMBER_ESCAPING = '\\'

  /** Marks an infinite bound in open search */
  static INFINITE_BOUND_TAG = '*'

  /**
   * Formats a number for open search request
   * @param {number} value value to format (required
   * @return {string} open search valid number
   */
  static numberToOpenSearch(value) {
    return `${value < 0 ? NumberRange.OPEN_SEARCH_NUMBER_ESCAPING : ''}${value}`
  }

  /**
   * Returns query parameter for attribute name and number range as parameter
   * @param {string} attributeName attribute name (optional, when not provided no query will be generated)
   * @param {NumberRange} value a number range (optional, when not provided no query will be generated)
   * @return {CatalogDomain.OpenSearchQueryParameter} generated query parameter
   */
  static getNumberQueryParameter(attributeName, value) {
    if (!value || value.isInfinite()) {
      // query part cannot be generated or is useless (full infinite range)
      return new CatalogDomain.OpenSearchQueryParameter(attributeName, null)
    }
    if (value.isSingleValueRange()) {
      // a simple value equality request
      return new CatalogDomain.OpenSearchQueryParameter(attributeName, NumberRange.numberToOpenSearch(value.lowerBound))
    }
    // a range that has not 2 infinite bounds
    const lowerBound = value.isInfiniteLowerBound() ? NumberRange.INFINITE_BOUND_TAG : NumberRange.numberToOpenSearch(value.lowerBound)
    const upperBound = value.isInfiniteUpperBound() ? NumberRange.INFINITE_BOUND_TAG : NumberRange.numberToOpenSearch(value.upperBound)
    return new CatalogDomain.OpenSearchQueryParameter(attributeName, `[${lowerBound} TO ${upperBound}]`)
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
  static convertToRange(value, operator) {
    if (!NumberRange.isValidNumber(value) || !operator) {
      return null
    }
    switch (operator) {
      case EnumNumericalComparator.EQ:
        return new NumberRange(value, value)
      case EnumNumericalComparator.SL:
      case EnumNumericalComparator.LE:
        return new NumberRange(Number.NEGATIVE_INFINITY, value)
      case EnumNumericalComparator.SG:
      case EnumNumericalComparator.GE:
        return new NumberRange(value, Number.POSITIVE_INFINITY)
      default:
        throw new Error(`Unsupported operator for conversion to range ${operator}`)
    }
  }

  /**
   * Is range as parameter valid in attribute bounds
   * @param {*} attribute matching AttributeModelWithBounds shape
   * @param {NumberRange} restrictionRange range restriction
   * @return true when range is not null (covers inline parsing case), not empty and crosses attribute bounds range
   */
  static isValidRestrictionOn(attribute, restrictionRange) {
    // note: the following algorithm can be performed even if both lowerBound
    // and upperBound are undefined (covering non existing, loading or in error cases)
    const { boundsInformation: { lowerBound, upperBound } } = attribute
    const attributeRange = new NumberRange(lowerBound, upperBound)
    return restrictionRange && !restrictionRange.isEmpty() && attributeRange.intersects(restrictionRange)
  }

  /**
   * Constructor
   * @param {number} lowerBound lower bound (when not a valid number, defaults to NEGATIVE_INFINITY)
   * @param {number} upperBound  upper bound (when not a valid number, defaults to POSITIVE_INFINITY)
   */
  constructor(lowerBound, upperBound) {
    this.lowerBound = NumberRange.isValidNumber(lowerBound) ? lowerBound : Number.NEGATIVE_INFINITY
    this.upperBound = NumberRange.isValidNumber(upperBound) ? upperBound : Number.POSITIVE_INFINITY
  }

  /** @return {boolean} true if lower bound is infinite */
  isInfiniteLowerBound() {
    return this.lowerBound === Number.NEGATIVE_INFINITY
  }

  /** @return {boolean} true if higher bound is infinite */
  isInfiniteUpperBound() {
    return this.upperBound === Number.POSITIVE_INFINITY
  }

  /** @return {boolean} true if range is defining full infinity */
  isInfinite() {
    return this.isInfiniteLowerBound() && this.isInfiniteUpperBound()
  }

  /** @return {boolean} true if range is holding a single value */
  isSingleValueRange() {
    return this.lowerBound === this.upperBound
  }

  /** @return {boolean} true if range is empty */
  isEmpty() {
    return this.lowerBound > this.upperBound
  }

  /**
   * @param {NumberRange} range to compare
   * @return {true} if ranges intersion is not empty, false otherwise
   */
  intersects(range) {
    return range.upperBound >= this.lowerBound && range.lowerBound <= this.upperBound
  }
}
