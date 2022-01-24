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
import { RenderMessages } from '@regardsoss/components'

/**
 * i18n messages French language
 * @type {*}
 */
const messages = {
  // required to format dates
  ...RenderMessages.fr,
  'criterion.date.field.label': 'Date',
  'criterion.time.field.label': 'Heure',
  'criterion.picker.ok.label': 'Ok',
  'criterion.picker.cancel.label': 'Annuler',
}

export default messages
