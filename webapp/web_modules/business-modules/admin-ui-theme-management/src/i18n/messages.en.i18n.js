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
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 *
 * @author Léo Mieulet
 */
const messages = {
  'theme.list.delete.title': 'Remove theme {name}?',
  'theme.list.title': 'Theme list',
  'theme.list.subtitle': 'Personifications list of REGARDS themes',
  'theme.list.table.label': 'Theme name',
  'theme.list.table.actions': 'Actions',
  'theme.list.tooltip.edit': 'Edit',
  'theme.list.tooltip.duplicate': 'Duplicate',
  'theme.list.tooltip.delete': 'Delete',
  'theme.list.action.cancel': 'Cancel',
  'theme.list.action.add': 'Add a new theme',

  'theme.create.title': 'Create a new theme',
  'theme.edit.title': 'Edit theme {name}',
  'theme.duplicate.title': 'Duplicate theme {name}',
  'theme.form.baseTheme': 'Based on Material UI theme',
  'theme.form.mui.light.theme': 'Light theme',
  'theme.form.mui.dark.theme': 'Dark theme',
  'theme.form.name': 'Theme name',
  'theme.form.name.not.unique.error': 'That name is already used by another theme',
  'theme.form.active': 'Active by default',
  'theme.form.action.submit': 'Save',
  'theme.form.action.cancel': 'Cancel',
  ...Locales.en,
}

export default messages
