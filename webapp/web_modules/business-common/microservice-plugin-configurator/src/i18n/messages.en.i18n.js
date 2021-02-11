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
  'plugin.configuration.form.create.title': 'Add a configuration',
  'plugin.configuration.form.edit.title': 'Edit a configuration {name}',
  'plugin.configuration.form.pluginClassName': 'Plugin class (full path)',
  'plugin.configuration.form.label': 'Label *',
  'plugin.configuration.form.version': 'Version *',
  'plugin.configuration.form.priorityOrder': 'Priority *',
  'plugin.configuration.form.icon': 'Icon (http link)',
  'plugin.configuration.form.active': 'Active',
  'plugin.configuration.form.inactive': 'Inactive',
  'plugin.configuration.form.action.submit.add': 'Add',
  'plugin.configuration.form.action.submit.save': 'Save',
  'plugin.configuration.form.action.cancel': 'Cancel',
  'plugin.configuration.form.description.more': 'More information about plugin',
  'plugin.configuration.form.description.title': '{plugin} description',

  'plugin.parameter.description.dialog.title': '{parameter} description',
  'plugin.parameter.description.dialog.tab.text': 'Text description',
  'plugin.parameter.description.dialog.tab.markdown': 'Markdown description',
  'plugin.parameter.description.dialog.close': 'Close',
  'plugin.parameter.static.field': 'Set parameter value',
  'plugin.parameter.dynamic.field': 'Dynamic parameter',
  'plugin.parameter.dynamicvalues.title': 'Possible values',
  'plugin.parameter.default.value.label': '(Default value : {defaultValue})',
  'plugin.configuration.form.no.parameters': 'Plugin doesn\'t need any further configuration.',

  'plugin.parameter.plugin.choose': 'Choose a plugin',
  'plugin.parameter.plugin.empty.menu.item': 'None',

  'plugin.parameter.map.new.key.dialog.title': 'Enter new <{key}>',
  'plugin.parameter.map.new.value.label': 'Value for {value}',
  ...Locales.en,
}

export default messages
