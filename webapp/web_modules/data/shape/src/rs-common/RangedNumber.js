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
import isNumber from 'lodash/isNumber'
import getChainableTypeChecker from './ChainableTypeChecker'

/**
 * Ranged number prop type validator (returns range validation closure)
 */
const getRangedNumberValidator = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const number = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (!isNumber(number)) {
    return new Error(`${propName} (${location}) is not a number in ${localComponentName}.`)
  }
  if (number < min || number > max) {
    return new Error(`${propName} (${location}) is not in expected range [${min};${max}] in ${localComponentName}.`)
  }
  return null
}

export default (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => getChainableTypeChecker(getRangedNumberValidator(min, max))
