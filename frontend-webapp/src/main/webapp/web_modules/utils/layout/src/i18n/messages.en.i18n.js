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
 */
import { Locales } from '@regardsoss/form-utils'
/**
 * Modules english messages
 * @type {{[modules.list.menu.label]: string, [section.search-form]: string}}
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'container.form.id': 'Name',
  'container.form.type': 'Type',
  'container.form.classes': 'CSS Classes',
  'container.form.styles': 'HTML Styles',
  'container.form.dynamicContent': 'Does this container contains dynamic modules ?',
  'container.form.update.button': 'Update',
  'container.form.submit.button': 'Create',
  'container.form.cancel.button': 'Cancel',
  'container.form.advanced.mode': 'Show/Hide advanced options',
  'container.configuration.delete.section': 'Remove',
  'container.configuration.add.subsection': 'Add a sub-section',
  'container.configuration.edit.section': 'Edit',
  'container.configuration.edit.dialog.title': 'Edit the container',
}, Locales.en)

export default messages
