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
  'microservice-management.maintenance.switch.mode.on.confirm': 'Activate maintenance mode for microservice {name} ?',
  'microservice-management.maintenance.switch.mode.off.confirm': 'Deactivate maintenance mode for microservice {name} ?',

  'microservice-management.plugin.list.title': 'Plugins',
  'microservice-management.plugin.list.filter.tooltip': 'Filter',
  'microservice-management.plugin.list.filter.title': 'Types',
  'microservice-management.plugin.list.configurations': 'Configurations',

  'microservice-management.plugin.configuration.list.add': 'Add',
  'microservice-management.plugin.configuration.list.back': 'Back',

  'microservice-management.plugin.configuration.copy': 'Duplicate',
  'microservice-management.plugin.configuration.increment.priorityOrder': 'Increase the prority',
  'microservice-management.plugin.configuration.decrement.priorityOrder': 'Decrease the priority',
  'microservice-management.plugin.configuration.delete': 'Delete',
  'microservice-management.plugin.configuration.delete.confirmation.title': 'Deletion of plugin configuration {name}',
  'microservice-management.plugin.configuration.delete.confirmation.text': 'Delete the plugin configuration',
  'microservice-management.plugin.configuration.delete.cancel': 'Cancel',
  'microservice-management.plugin.configuration.edit': 'Edit',
  'microservice-management.plugin.configuration.priorityOrder': 'Priority',
  'microservice-management.plugin.configuration.parameters': 'Parameters',

  'microservice-management.plugin.configuration.form.create.title': 'Add a configuration',
  'microservice-management.plugin.configuration.form.edit.title': 'Edit a configuration',
  'microservice-management.plugin.configuration.form.pluginClassName': 'Plugin class (full path)',
  'microservice-management.plugin.configuration.form.label': 'Label *',
  'microservice-management.plugin.configuration.form.version': 'Version *',
  'microservice-management.plugin.configuration.form.priorityOrder': 'Priority *',
  'microservice-management.plugin.configuration.form.icon': 'Icon (http link)',
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

  'microservice-management.sips.title': 'SIPs',
  'microservice-management.sips.list.subtitle': 'List of SIPs for selected session',
  'microservice-management.sips.list.filters.chain.label': 'Processing chain',
  'microservice-management.sips.list.filters.chain.all': 'All chains',
  'microservice-management.sips.list.filters.status.label': 'Status',
  'microservice-management.sips.list.filters.status.all': 'All statuses',
  'microservice-management.sips.list.filters.status.errors': 'Errors',
  'microservice-management.sips.list.filters.status.errors.rsingest': 'rs-ingest errors',
  'microservice-management.sips.list.filters.status.errors.rsstorage': 'rs-storage errors',
  'microservice-management.sips.list.filters.status.done': 'Done',
  'microservice-management.sips.list.filters.date.label': 'Since',
  'microservice-management.sips.list.filters.my-sips.label': 'Only my SIPs',
  'microservice-management.sips.list.table.headers.sip-id': 'SIP ID',
  'microservice-management.sips.list.table.headers.type': 'Type',
  'microservice-management.sips.list.table.headers.state': 'State',
  'microservice-management.sips.list.table.headers.date': 'Date',
  'microservice-management.sips.list.table.headers.actions': 'Actions',
  'microservice-management.sips.list.table.actions.delete': 'Delete session',
  'microservice-management.sips.list.table.actions.original-sip': 'View original SIP',
  'microservice-management.sips.list.table.actions.original-aip': 'View generated AIP',
  'microservice-management.sips.list.table.actions.retry': 'Retry',
  'microservice-management.sips.list.aip-details.title': 'AIPs',
  'microservice-management.sips.list.aip-details.table.headers.aip-id': 'AIP ID',
  'microservice-management.sips.list.aip-details.table.headers.state': 'State',
  'microservice-management.sips.list.aip-details.table.headers.actions': 'Actions',
  'microservice-management.sips.list.aip-details.table.actions.retry': 'Retry',
  'microservice-management.sips.list.aip-details.table.actions.files': 'View files',
  'microservice-management.sips.list.aip-details.table.files.title': 'Files',
  'microservice-management.sips.list.aip-details.table.files.headers.name': 'Name',
  'microservice-management.sips.list.aip-details.table.files.headers.size': 'Size',
  'microservice-management.sips.list.aip-details.table.files.headers.actions': 'Actions',
  'microservice-management.sips.list.sip-details.title': 'SIP details',
  'microservice-management.sips.stepper.list': 'View SIPs',
  'microservice-management.sips.stepper.session': 'Select session',

  'microservice-management.sips.session.subtitle': 'Select the session associated to the SIPs you want to view',
  'microservice-management.sips.session.filter.name.label': 'Filter by name',
  'microservice-management.sips.session.filter.date.label': 'Filter by date',
  'microservice-management.sips.session.filter.date.value': '{numDays, number} {numDays, plural, one {day} other {days}} ago',
  'microservice-management.sips.session.table.headers.id': 'ID',
  'microservice-management.sips.session.table.headers.generated': 'Generation',
  'microservice-management.sips.session.table.headers.stored': 'Storage',
  'microservice-management.sips.session.table.headers.indexed': 'Indexation',
  'microservice-management.sips.session.table.headers.errors': 'Number of errors',
  'microservice-management.sips.session.table.headers.date': 'Date',
  'microservice-management.sips.session.table.headers.actions': 'Actions',
  'microservice-management.sips.session.table.actions.delete': 'Delete associated SIPs',
  'microservice-management.sips.session.table.actions.list': 'List associated SIPs',

}, Locales.en)

export default messages
