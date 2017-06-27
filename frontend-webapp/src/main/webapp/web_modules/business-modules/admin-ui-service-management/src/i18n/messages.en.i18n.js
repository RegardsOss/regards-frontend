/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'service.list.title': 'UI Service plugin list',
  'service.list.open.tooltip': 'Configurations',

  'service.listconf.title': 'List service configurations {value}',
  'service.listconf.subtitle': 'You can define several configurations for each service',
  'service.listconf.action.add': 'Add',
  'service.listconf.action.back': 'Back',
  'service.listconf.table.label': 'Configuration name',
  'service.listconf.table.status': 'State',
  'service.listconf.table.default': 'Activated on all dataset',
  'service.listconf.table.actions': 'Actions',
  'service.listconf.tooltip.edit': 'Edit',
  'service.listconf.tooltip.delete': 'Delete',
  'service.listconf.tooltip.duplicate': 'Duplicate',

  'service.listconf.plugin.title': 'Plugin information',
  'service.listconf.plugin.description': 'Description: {value}',
  'service.listconf.plugin.version': 'Version: {value}',
  'service.listconf.plugin.author': 'Author: {value}',
  'service.listconf.plugin.company': 'Creator: {value}',
  'service.listconf.plugin.email': 'Email contact: {value}',
  'service.listconf.plugin.license': 'Licence: {value}',
  'service.listconf.plugin.url': 'Url: {value}',

  'service.form.create.title': 'Create a service configuration',
  'service.form.edit.title': 'Edit the service configuration {name}',
  'service.form.duplicate.title': 'Duplicate using the service configuration {name}',
  'service.form.subtitle': 'Services have two types of input variables: those fixed here in this form (static variables) and variables provided by the user (dynamic variables). For dynamic variables, you can define here the default value',
  'service.form.label': 'Configuration label (only for administrators)',
  'service.form.staticField': 'Value of the static variable "{name}"',
  'service.form.dynamicField': 'Value used by default by the dynamic variable "{name}"',
  'service.form.isActive': 'Activate this configuration',
  'service.form.isDefault': 'Automatically associate this service with the current configuration on ALL datasets',
  'service.form.action.save': 'Save',
  'service.form.action.back': 'Back',

}, Locales.en)

export default messages
