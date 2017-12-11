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
import { buttonsMessages } from '@regardsoss/components'

/**
 * i18n messages english language
 * @type {*}
 */
const messages = {
  'criterion.date.field.label': 'Date',
  'criterion.date.picker.ok': 'Ok',
  'criterion.date.picker.cancel': 'Cancel',
  'criterion.time.field.label': 'Time',
  'criterion.time.picker.ok': 'Ok',
  'criterion.time.picker.cancel': 'Cancel',
  'criterion.seconds.field.label': 'Sec',
  'criterion.milliseconds.field.label': 'Ms',

  // XXX delete in V2
  ...buttonsMessages.en, // adds all buttons messages to enable use of clear button and comparators
}

export default messages
