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
 */
import { Locales } from '@regardsoss/form-utils'
/**
 * Modules english messages
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'container.form.id': 'Name',
  'container.form.type': 'Type',
  'container.form.classes': 'CSS Classes',
  'container.form.styles': 'Inline container styles (JSON)',
  'container.form.dynamicContent': 'Main container',
  'container.form.dynamicContent.info': 'The application\'s menu will be composed of this container\'s modules',
  'container.form.dynamicContent.modal.title': 'Make it the main container?',
  'container.form.dynamicContent.modal.content': 'The application\'s menu will be composed of this container\'s modules. If you had another main container, it will be converted to a static container',
  'container.form.dynamicContent.modal.cancel': 'Cancel',
  'container.form.dynamicContent.modal.ok': 'OK',
  'container.form.update.button': 'Update',
  'container.form.submit.button': 'Create',
  'container.form.cancel.button': 'Cancel',
  'container.form.advanced.mode.hide': 'Hide advanced options',
  'container.form.advanced.mode.show': 'Show advanced options',
  'container.configuration.delete.section': 'Remove',
  'container.configuration.add.subsection': 'Add a sub-section',
  'container.configuration.edit.section': 'Edit',
  'container.configuration.edit.dialog.title': 'Edit the container',

  'container.type.row.container': 'Row',
  'container.type.content.row.container': 'Growing row',
  'container.type.content.column.100.percent.container': '100% width column',
  'container.type.content.column.75.percent.container': '75% width column',
  'container.type.content.column.50.percent.container': '50% width column',
  'container.type.content.column.25.percent.container': '25% width column',
  'container.configuration.edit.styles.error.json.format': ' - JSON format is invalid',
}, Locales.en)

export default messages
