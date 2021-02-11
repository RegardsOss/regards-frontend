/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
  'service.list.title': 'UI Service plugin list',
  'service.list.open.tooltip': 'Configurations',
  'service.list.create.tooltip': 'Create',

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
  'service.listconf.plugin.license': 'License: {value}',
  'service.listconf.plugin.url': 'Url: {value}',
  'service.listconf.delete.confirm.title': 'Remove the configuration?',

  'service.form.create.title': 'Create a service configuration',
  'service.form.edit.title': 'Edit the service configuration {name}',
  'service.form.duplicate.title': 'Duplicate using the service configuration {name}',
  'service.form.subtitle': 'Services have two types of input variables: those fixed here in this form (static variables) and variables provided by the user (dynamic variables). For dynamic variables, you can define here the default value',
  'service.form.label': 'Configuration label (only for administrators)',
  'service.form.static.configuration.title': 'Configuration parameters',
  'service.form.dynamic.configuration.title': 'Runtime parameter (pre-filled values for user)',
  'service.form.mandatory.field': '{label} (*)',
  'service.form.isActive': 'Activate this configuration',
  'service.form.linkedToAllEntities': 'Include this service within every dataset',
  'service.form.action.save': 'Save',
  'service.form.action.back': 'Back',
  ...Locales.en,
}

export default messages
