/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'plugin.form.title.create': 'Add a new plugin',
  'plugin.form.title.update': 'Edit existing plugin {name}',
  'plugin.form.subtitle': 'Enter the path to yout plugin javascript file and click search to valid it',
  'plugin.form.name': 'Name',
  'plugin.form.type': 'Type',
  'plugin.form.sourcesPath': 'Path to the main javascript file of the plugin',
  'plugin.form.submit.button': 'Add plugin',
  'plugin.form.update.button': 'Update plugin',
  'plugin.form.cancel.button': 'Cancel',
  'plugins.list.delete.message': 'Deletion of plugin {name}',
  'plugins.list.title': 'List of available plugins',
  'plugins.list.subtitle': 'Plugins here under can be use to manage new Criteria for Search modules or new Services',
  'plugins.list.table.name': 'Name',
  'plugins.list.table.actions': 'Actions',
  'plugins.list.action.add': 'Add a new plugin',
  'plugins.list.action.cancel': 'Back',
  'plugin.description.url': 'Access to plugin description',
}, Locales.en)

export default messages
