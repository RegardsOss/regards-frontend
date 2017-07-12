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

/**
 * Redux form common error types
 */
export default {
  REQUIRED: 'invalid.required',
  EMAIL: 'invalid.email',
  INVLID_JSON_FORMAT: 'invalid.json',
  ALPHA_NUMERIC: 'invalid.only_alphanumeric',
  NUMERIC: 'invalid.only_numeric',
  INVALID_IP: 'invalid.ip',
  DIFFERENT_PASSWORDS: 'different.password',
  INVALID_PASSWORD: 'invalid.password',
  INVALID_URL: 'invalid.url',
  TYPE_STRING: 'type.string',
  invalidRegex: regexp => ({
    key: 'invalid.regex.pattern',
    props: { regexp },
  }),
  invalidNumericRange: (lowerBound, upperBound) => ({
    key: 'invalid.numeric.range',
    props: {
      lowerBound,
      upperBound,
    },
  }),
}
