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

/**
 * @source https://stackoverflow.com/a/29153059/2294168
 */
const iso8601DurationRegex = /(-)?P(?:([.,\d]+)Y)?(?:([.,\d]+)M)?(?:([.,\d]+)W)?(?:([.,\d]+)D)?T(?:([.,\d]+)H)?(?:([.,\d]+)M)?(?:([.,\d]+)S)?/

/**
 * Converts an ISO 8601 Duration into an object
 */
const parseISO8601Duration = function (iso8601Duration) {
  const matches = iso8601Duration.match(iso8601DurationRegex)

  let days = matches[5] === undefined ? 0 : parseInt(matches[5], 10)
  // Do not use weeks, days are good
  days += (matches[4] === undefined ? 0 : parseInt(matches[4], 10)) * 7

  return {
    sign: matches[1] === undefined ? '+' : '-',
    years: matches[2] === undefined ? 0 : parseInt(matches[2], 10),
    months: matches[3] === undefined ? 0 : parseInt(matches[3], 10),
    days,
    hours: matches[6] === undefined ? 0 : parseInt(matches[6], 10),
    minutes: matches[7] === undefined ? 0 : parseInt(matches[7], 10),
    seconds: matches[8] === undefined ? 0 : parseFloat(matches[8]),
  }
}

export default parseISO8601Duration
