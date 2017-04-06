/**
 * LICENSE_PLACEHOLDER
 **/
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
  'modules.list.title': 'Configure UI available modules',
  'modules.list.subtitle': 'Here under are displayed the modules configured for the inter. Once the modules are confiured, you can use them to configure the global layout.',
  'modules.list.table.name': 'Module name',
  'modules.list.table.description': 'Description',
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
  'module.form.name': 'Module name',
  'module.form.description': 'Description',
  'module.form.container': 'Layout container',
  'module.form.active': 'Activate mdule',
  'module.form.isDefault': 'Use as default module ?',
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
  'application.theme.default.create.message': 'No theme available. Create a new one using the button on the top bar',

  'application.theme.save': 'Save',
  'application.theme.save.success': 'The theme was updated',
  'application.theme.save.error': 'The theme could not be updated',

  'application.theme.remove.tooltip': 'Remove',
  'application.theme.remove.confirm': 'Remove theme?',
  'application.theme.remove.confirm.cancel': 'Cancel',
  'application.theme.remove.confirm.remove': 'Remove',
  'application.theme.remove.success': 'The theme was removed',
  'application.theme.remove.error': 'The theme could not be removed',

}, Locales.en)

export default messages
