/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain } from '@regardsoss/domain'
import { NumberRange } from './NumberRange'


/**
 * Represents a date range. Provides helper tools for date related plugins to parse,
 * publish and handle date ranges in open search queries.
 * For using plugin convenience, tool method use string input
 * @author Raphaël Mechali
 */
export class DateRange extends NumberRange {
  /**
   * Converts date time to open search query date value
   * @param {number} dateTime
   * @return {string} usable date time for open search query
   */
  static toOpenSearchDate(dateTime) {
    const dateWithTZ = new Date(dateTime)
    const dateWithoutTZ = new Date(dateWithTZ.getTime() - (dateWithTZ.getTimezoneOffset() * 60000))
    return dateWithoutTZ.toISOString()
  }

  /**
   * Returns query parameter for attribute name and date range as parameter
   * @param {String} attributeName attribute name (optional, when not provided no query will be generated)
   * @param {DateRange} value a date range (optional, when not provided) not number no query will be generated)
   * @return {CatalogDomain.OpenSearchQueryParameter} generated query parameter
   */
  static getDateQueryParameter(attributeName, value) {
    if (!value || value.isInfinite() || value.isEmpty()) {
      // query part cannot be generated or is useless (full infinite range)
      return new CatalogDomain.OpenSearchQueryParameter(attributeName, null)
    }
    if (value.isSingleValueRange()) {
      // a simple value equality request
      return new CatalogDomain.OpenSearchQueryParameter(attributeName, DateRange.toOpenSearchDate(value.lowerBound))
    }
    // a range that has not 2 infinite bounds
    const lowerBound = value.isInfiniteLowerBound() ? NumberRange.INFINITE_BOUND_TAG : DateRange.toOpenSearchDate(value.lowerBound)
    const upperBound = value.isInfiniteUpperBound() ? NumberRange.INFINITE_BOUND_TAG : DateRange.toOpenSearchDate(value.upperBound)
    return new CatalogDomain.OpenSearchQueryParameter(attributeName, `[${lowerBound} TO ${upperBound}]`)
  }

  /**
   * Is range as parameter valid in attribute bounds
   * @param {*} attribute matching AttributeModelWithBounds shape
   * @param {DateRange} restrictionRange range restriction
   * @return true when range is not null (covers inline parsing case), not empty and crosses attribute bounds range
   */
  static isValidRestrictionOn(attribute, restrictionRange) {
    const { boundsInformation: { lowerBound, upperBound } } = attribute
    const attributeRange = new DateRange(
      lowerBound ? new Date(lowerBound).getTime() : null,
      upperBound ? new Date(upperBound).getTime() : null)
    return restrictionRange && !restrictionRange.isEmpty() && attributeRange.intersects(restrictionRange)
  }
}
