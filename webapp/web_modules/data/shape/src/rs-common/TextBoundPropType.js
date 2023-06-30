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
import isString from 'lodash/isString'
import root from 'window-or-global'
import getChainableTypeChecker from './ChainableTypeChecker'

/**
 * Validates a textual bound type: asserts we have here a parsable string or null
 * @param parser bound text parser: string => boolean (true if parsable)
 * @return PropType validator, to be used in getChainableTypeChecker to make a valid PropType
 */
const getTextBoundPropType = (parser) => (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const boundText = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (!isString(boundText)) {
    return new Error(`${propName} (${location}) is not a String object in ${localComponentName}.`)
  }
  if (!parser(boundText)) {
    return new Error(`${propName} (${location}) cannot be parsed as bound in ${localComponentName}.`)
  }
  return null
}

const parseInt = (intText) => {
  const n = Number.parseInt(intText, 10)
  return !root.isNaN(n) && Number.isInteger(n)
}

export const NumericTextBoundPropType = getChainableTypeChecker(getTextBoundPropType(parseInt))

const parseDate = (dateText) => !root.isNaN(Date.parse(dateText))
export const DateTextBoundPropType = getChainableTypeChecker(getTextBoundPropType(parseDate))
