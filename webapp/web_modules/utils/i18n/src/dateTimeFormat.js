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
import areIntlLocalesSupported from 'intl-locales-supported'
import IntlPolyfill from 'intl'
import 'intl/locale-data/jsonp/fr'

// eslint-disable-next-line import/no-mutable-exports
let dateTimeFormat
const localesAppSupports = [
  'fr',
]
// Use the native Intl.DateTimeFormat if available, or a polyfill if not.
if (areIntlLocalesSupported(localesAppSupports)) {
  dateTimeFormat = global.Intl.DateTimeFormat
} else {
  dateTimeFormat = IntlPolyfill.DateTimeFormat
}
export default dateTimeFormat
