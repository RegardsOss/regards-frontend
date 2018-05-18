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
import isNil from 'lodash/isNil'
import StaticQueryParameter from './StaticQueryParameter'

/**
 * Formats parameter
 * @param {string} name parameter name
 * @param {*} value parameter value
 * @param {string} valueSeparator value separator (like '=' or ')' )
 */
export function formatParameter(name, value, valueSeparator) {
  // note: we want to keep here the values like 0, -1... or NaN so we cant write !value
  if (isNil(value) || value === '') {
    // parameter should not appear in request
    return ''
  }
  return `${name}${valueSeparator}${value}`
}

/**
 * Common query parameter model with value and name
 * @author Raphaël Mechali
 */
export default class QueryParameter extends StaticQueryParameter {
  /**
   * Query parameter constructor
   * @param name parameter name
   * @param value parameter value
   * @param valueSeparator value separator (like '=' or ')' )
   */
  constructor(name, value, valueSeparator) {
    super(formatParameter(name, value, valueSeparator))
  }
}
