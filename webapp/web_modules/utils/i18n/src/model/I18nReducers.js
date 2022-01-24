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
import root from 'window-or-global'
import { browserHistory } from 'react-router'
import { UIDomain } from '@regardsoss/domain'
import { SET_LOCALE } from './I18nActions'

// 1 - Attempt retrieve language from navigator
const navigatorRef = root.navigator || {}
const navigatorLocale = navigatorRef.language || navigatorRef.userLanguage

// 2 - Parse locale when it is formed like language-country or language_country
const localeSeparators = ['-', '_']
/**
 * Parses both simple ('en' / 'fr' / 'CZ') and complex ('en_US', 'fr-FR') locales into REGARDS valid language locales.
 * Note: it is exported only for unit tests
 * @param {*} l locale or complex locale to parse
 * @return found locale in parameter or default REGARDS locale
 */
export function parseLanguageLocaleIn(l = '') {
  let simpleLocale = l.toLowerCase() // 0 - By default considered as simple locale
  const localeSeparator = localeSeparators.find((separator) => l.includes(separator))
  if (localeSeparator) {
    // 1.a - This is a composed locale, split on separator and keep the language part
    const foundParts = l.split(localeSeparator)
    simpleLocale = foundParts[0]
  }
  // 2 - verify that found locale can be used in REGARDS, return default locale otherwise
  return UIDomain.LOCALES.includes(simpleLocale) ? simpleLocale : UIDomain.LOCALES_ENUM.en
}

const { query } = browserHistory ? browserHistory.getCurrentLocation() : { query: {} }
// eslint-disable-next-line no-underscore-dangle
const DEFAULT_STATE = query._local ? { locale: query._local } : { locale: parseLanguageLocaleIn(navigatorLocale) }

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // Running fetch plugins from server
    case SET_LOCALE:
      return { locale: action.locale }
    default:
      return state
  }
}
