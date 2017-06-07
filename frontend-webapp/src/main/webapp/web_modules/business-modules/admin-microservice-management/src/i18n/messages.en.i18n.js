import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'microservice-management.rs-access-project.description': 'Configure service for UI configuration',
  'microservice-management.rs-access-instance.description': 'Configure service for UI configuration (portal interface)',
  'microservice-management.rs-admin.description': 'Configure the microservice managing the system\'s administration',
  'microservice-management.rs-cloud.description': 'Configure du microservice providing cloud configuration',
  'microservice-management.rs-dam.description': 'Configure the microservice managing datas',
  'microservice-management.rs-gateway.description': 'Configure the gateway',
  'microservice-management.rs-catalog.description': 'Configure the service that handle data catalogage',
  'microservice-management.rs-authentication.description': 'Configure the service that handle system authentication',

  'microservice-management.configuration.tooltip': 'Configure',
  'microservice-management.plugins.tooltip': 'Plugins',
  'microservice-management.maintenance.tooltip.on': 'Deactive maintenance mode',
  'microservice-management.maintenance.tooltip.off': 'Activate maintenance mode',
  'microservice-management.maintenance.switch.mode.on.confirm': 'Confirm activation of maintenance mode for microservice {name} ?',
  'microservice-management.maintenance.switch.mode.off.confirm': 'Confirm desactivation of maintenance mode for microservice {name} ?',

  'microservice-management.plugin.list.title': 'Plugins',
  'microservice-management.plugin.list.filter.tooltip': 'Filter',
  'microservice-management.plugin.list.filter.title': 'Types',
  'microservice-management.plugin.list.configurations': 'Configurations',

  'microservice-management.plugin.configuration.list.add': 'Add',

  'microservice-management.plugin.configuration.copy': 'Duplicate',
  'microservice-management.plugin.configuration.increment.priorityOrder': 'Increase the prority',
  'microservice-management.plugin.configuration.decrement.priorityOrder': 'Decrease the priority',
  'microservice-management.plugin.configuration.delete': 'Delete',
  'microservice-management.plugin.configuration.delete.confirmation.title': 'Deletion of plugin configuration {name}',
  'microservice-management.plugin.configuration.delete.confirmation.text': 'Are you sure you want to delete the plugin configuration',
  'microservice-management.plugin.configuration.delete.cancel': 'Cancel',
  'microservice-management.plugin.configuration.edit': 'Edit',
  'microservice-management.plugin.configuration.priorityOrder': 'Priority',
  'microservice-management.plugin.configuration.parameters': 'Parameters',

  'microservice-management.plugin.configuration.form.create.title': 'Add a configuration',
  'microservice-management.plugin.configuration.form.edit.title': 'Edit a configuration',
  'microservice-management.plugin.configuration.form.pluginClassName': 'Plugin class (full path)',
  'microservice-management.plugin.configuration.form.label': 'Label',
  'microservice-management.plugin.configuration.form.version': 'Version',
  'microservice-management.plugin.configuration.form.priorityOrder': 'Priority',
  'microservice-management.plugin.configuration.form.active': 'Active',
  'microservice-management.plugin.configuration.form.inactive': 'Inactive',
  'microservice-management.plugin.configuration.form.action.submit.add': 'Add',
  'microservice-management.plugin.configuration.form.action.submit.save': 'Save',
  'microservice-management.plugin.configuration.form.action.cancel': 'Cancel',

  'microservice-management.plugin.parameter.list.title': 'Parameters',
  'microservice-management.plugin.parameter.dynamicvalue.add': 'Add a possible value',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.title': 'Add a possible value',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.placeholder': 'Value',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.cancel': 'Cancel',
  'microservice-management.plugin.parameter.dynamicvalue.dialog.submit': 'Add',
  'microservice-management.plugin.parameter.dynamicvalue.setdefault': 'Set default',
  'microservice-management.plugin.parameter.dynamicvalue.remove': 'Remove',

  'microservice-management.plugin.parameter.plugin.choose': 'Choose a plugin',
  'microservice-management.plugin.parameter.plugin.empty.menu.item': 'None',

}, Locales.en)

export default messages
