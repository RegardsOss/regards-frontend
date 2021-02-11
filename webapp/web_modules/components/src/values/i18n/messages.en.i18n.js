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
* Module message for EN local
* @author Raphaël Mechali
*/
const messages = {
  'value.render.no.value.label': '-',
  'value.render.date.value': '{date} {time}',
  'value.render.array.values.separator': ', ',
  'value.render.range.full.label': '[{lower}, {upper}]',
  'value.render.range.upper.only.label': ']-∞, {upper}]',
  'value.render.range.lower.only.label': '[{lower}, +∞[',
  'value.render.range.infinite.label': ']-∞, +∞[',

  'value.render.duration.year': '{year, plural, one {{year} year} other {{year} years}}',
  'value.render.duration.month': ' {month, plural, one {{month} month} other {{month} months}}',
  'value.render.duration.day': ' {day, plural, one {{day} day} other {{day} days}}',
  'value.render.duration.hour': ' {hour, plural, one {{hour} hour} other {{hour} hours}}',
  'value.render.duration.minute': ' {minute, plural, one {{minute} minute} other {{minute} minutes}}',
  'value.render.duration.second': ' {second} second(s)',

  'date.value.render.type.date': '{month}/{day}/{year}',
  'date.value.render.type.dateWithMinutes': '{month}/{day}/{year} {hours}:{minutes}',
  'date.value.render.type.dateWithSeconds': '{month}/{day}/{year} {hours}:{minutes}:{seconds}',
  'date.value.render.type.dateWithMilliseconds': '{month}/{day}/{year} {hours}:{minutes}:{seconds}.{milliseconds}',
  'date.value.render.type.time': '{hours}:{minutes}:{seconds}',
  'date.value.render.type.timeWithMilliseconds': '{hours}:{minutes}:{seconds}.{milliseconds}',
}

export default messages
