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
 * */
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = Object.assign({
  'admin.app.title': 'Administration UI',
  'admin.app.description': 'Configure Administration interface',
  'admin.app.modules.tooltip': 'Configure modules',
  'admin.app.layout.tooltip': 'Configure layout',
  'admin.app.themes.tooltip': 'Manage themes',
  'project.app.title': 'Project UI',
  'project.app.description': 'Configure Project interface',
  'project.app.modules.tooltip': 'Configure modules',
  'project.app.layout.tooltip': 'Configure layout',
  'project.app.themes.tooltip': 'Manage themes',
  'portal.app.title': 'Portal UI',
  'portal.app.description': 'Configure Portal interface',
  'portal.app.modules.tooltip': 'Configure modules',
  'portal.app.layout.tooltip': 'Configure layout',
  'portal.app.themes.tooltip': 'Manage themes',
  'modules.list.title': 'UI modules',
  'modules.list.subtitle': 'To define the global layout, you can configure the interface modules',
  'modules.list.table.name': 'Module type',
  'modules.list.table.description': 'Module name',
  'modules.list.table.action.edit.tooltip': 'Edit',
  'modules.list.table.action.duplicate.tooltip': 'Duplicate',
  'modules.list.table.action.delete.tooltip': 'Delete',
  'modules.list.action.add': 'Add a new module configuration',
  'modules.list.delete.message': 'Confirm {name} module deletion ?',
  'modules.list.table.active': 'Active',
  'modules.list.table.actions': 'Actions',
  'layout.title': 'Application layout configuration',
  'layout.subtitle': 'This section allow you to manage your interface layout. Each declared container can be use to locate your interface modules.',
  'layout.submit': 'Update layout',
  'layout.cancel': 'Cancel',
  'module.form.title.create': 'Create a new interface module',
  'module.form.title.update': 'Update {name} interface module',
  'module.form.title.duplicate': 'Duplicate module {name}',
  'module.form.name': 'Module type',
  'module.form.description': 'Description',
  'module.form.container': 'Layout container',
  'module.form.active': 'Activate mdule',
  'module.form.isDefault': 'Will be the element selected by default in the menu',
  'module.form.submit.button': 'Create module',
  'module.form.update.button': 'Update module',
  'module.form.cancel.button': 'Cancel',
  'module.no.container.available.title': 'Modules configuration is not available yet',
  'module.no.container.available': 'No container available. Please create a layout before adding modules',
  'module.no.container.available.configure.layout': 'Configure interface containers',
  'invalid.json': 'Invalid json file',
  'application.theme.title': 'Configure the theme',

  'application.theme.create.tooltip': 'New',
  'application.theme.create.form.title': 'Create a theme',
  'application.theme.create.form.name': 'Name',
  'application.theme.create.form.active': 'Default theme',
  'application.theme.create.form.cancel': 'Cancel',
  'application.theme.create.form.submit': 'Add',
  'application.theme.create.success': 'The theme was added',
  'application.theme.create.error': 'The theme could not be added',

  'application.theme.default.active': 'Default active theme',
  'application.theme.default.create.message': 'No theme available. Create a new one by clicking "New"',

  'application.theme.save': 'Save',
  'application.theme.save.success': 'The theme was updated',
  'application.theme.save.error': 'The theme could not be updated',

  'application.theme.remove.tooltip': 'Remove',
  'application.theme.remove.confirm': 'Remove the theme?',
  'application.theme.remove.confirm.cancel': 'Cancel',
  'application.theme.remove.confirm.remove': 'Remove',
  'application.theme.remove.success': 'The theme was removed',
  'application.theme.remove.error': 'The theme could not be removed',

}, Locales.en)

export default messages
