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

/**
 * Module message for FR local
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

  'value.render.duration.year': '{year, plural, one {{year} an} other {{year} ans}}',
  'value.render.duration.month': ' {month} mois',
  'value.render.duration.day': ' {day, plural, one {{day} jour} other {{day} jours}}',
  'value.render.duration.hour': ' {hour, plural, one {{hour} heure} other {{hour} heures}}',
  'value.render.duration.minute': ' {minute, plural, one {{minute} minute} other {{minute} minutes}}',
  'value.render.duration.second': ' {second} seconde(s)',

  'date.value.render.type.date': '{day}/{month}/{year}',
  'date.value.render.type.dateWithMinutes': '{day}/{month}/{year} {hours}:{minutes}',
  'date.value.render.type.dateWithSeconds': '{day}/{month}/{year} {hours}:{minutes}:{seconds}',
  'date.value.render.type.dateWithMilliseconds': '{day}/{month}/{year} {hours}:{minutes}:{seconds}.{milliseconds}',
  'date.value.render.type.time': '{hours}:{minutes}:{seconds}',
  'date.value.render.type.timeWithMilliseconds': '{hours}:{minutes}:{seconds}.{milliseconds}',
  'date.value.render.type.dateIso': '{year}-{month}-{day}T{hours}:{minutes}:{seconds}Z',
}

export default messages
