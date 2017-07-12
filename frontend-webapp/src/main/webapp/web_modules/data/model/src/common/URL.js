/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export const relativeURLRegexp = new RegExp('^((\\.\\.?\\/)*)([-a-z\\d%_\\.~+]+)' +    // . / .. / and first word
  '(\\/[-a-z\\d%_\\.~+]*)*$', 'i') // next words


export const validURLRegexp = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_\\.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~:+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

/**
 * URL prop type validator (you can use isRequired on it)
 */
const urlStringValidator = (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const url = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (isNumber(url)) {
    return new Error(`${propName} (${location}) is not a String object in ${localComponentName}.`)
  }
  if (!validURLRegexp.test(url) && !relativeURLRegexp.test(url)) {
    return new Error(`${propName} (${location}) has invalid URL format in ${localComponentName}.`)
  }
  return null
}

export default getChainableTypeChecker(urlStringValidator)
