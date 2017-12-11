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
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'application.theme.title': 'Configure the theme',

  'application.theme.create.tooltip': 'New',
  'application.theme.create.form.title': 'Create a theme',
  'application.theme.create.form.name': 'Name',
  'application.theme.create.form.active': 'Default theme',
  'application.theme.create.form.cancel': 'Cancel',
  'application.theme.create.form.submit': 'Add',
  'application.theme.create.success': 'The theme was added',
  'application.theme.create.error': 'The theme could not be added',

  'application.theme.default.active': 'Default theme',

  'application.theme.save': 'Save',
  'application.theme.save.success': 'The theme was updated',
  'application.theme.save.error': 'The theme could not be updated',

  'application.theme.default.create.message': 'No theme. CLick "New" to add a theme and start configuration',

  'application.theme.remove.tooltip': 'Remove',
  'application.theme.remove.confirm': 'Remove theme?',
  'application.theme.remove.confirm.cancel': 'Cancel',
  'application.theme.remove.confirm.remove': 'Remove',
  'application.theme.remove.success': 'The theme was removed',
  'application.theme.remove.error': 'The theme could not be removed',

}, Locales.en)

export default messages
