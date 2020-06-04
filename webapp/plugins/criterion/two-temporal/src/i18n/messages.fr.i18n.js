/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'single.attributes.label': '{label}',
  'multiple.attributes.label': '{label1} / {label2}',
  'criterion.date.field.label': 'Date',
  'criterion.date.picker.ok': 'Ok',
  'criterion.date.picker.cancel': 'Annuler',
  'criterion.time.field.label': 'Heure',
  'criterion.time.picker.ok': 'Ok',
  'criterion.time.picker.cancel': 'Annuler',
  'criterion.seconds.field.label': 'Sec',
  'criterion.aggregator.between': '{label} entre',
  'criterion.aggregator.and': 'et',
}

export default messages
