/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'invalid.require_max_more_than_min': ' The max value must be greater than min value',
  'invalid.require_plugin_configuration': 'You must select which plugin configuration you want to use',
  'accessright.table.dataset.label': 'Dataset',
  'accessright.table.actions': 'Actions',
  'accessright.table.filter.dataset.label': 'Dataset',
  'accessright.table.filter.clear.button': 'Clear',
  'accessright.table.filter.button': 'Apply',
  'accessright.table.refresh.button': 'Refresh',
  'accessright.title': 'Dataset access rights for access group {name}',
  'accessright.subtitle': 'Configure access rights for all datasets for the access group {name} below.',
  'accessright.form.meta.accessLevel': 'Access level to dataset meta-data',
  'accessright.form.meta.accessLevel.NO_ACCESS': 'No access',
  'accessright.form.meta.accessLevel.RESTRICTED_ACCESS': 'Dataset access',
  'accessright.form.meta.accessLevel.FULL_ACCESS': 'Dataset and Dataobjects access',
  'accessright.form.meta.accessLevel.CUSTOM_ACCESS': 'Full access to dataset. Partial access to data objects (filtered by plugin)',
  'accessright.form.data.accessLevel': 'Access level to data',
  'accessright.form.data.accessLevel.NO_ACCESS': 'Refused',
  'accessright.form.data.accessLevel.INHERITED_ACCESS': 'Authorized',
  'accessright.form.data.accessLevel.CUSTOM_ACCESS': 'Authorized by plugin',
  'accessright.form.data.accessLevel.NOT_APPLICABLE': 'No access',
  'accessright.form.dataAccessPlugin.title': 'Data objects access filer',
  'accessright.form.dataAccessPlugin.select.label': 'Select a filter ...',
  'accessright.form.accessGroup': 'Data access group',
  'accessright.form.dataset.title': 'Datasets list',
  'accessright.form.dataset.input': 'Search by collection name',
  'accessright.form.action.save': 'Save',
  'accessright.form.action.cancel': 'Cancel',
  'accessright.form.action.back': 'Back',
  'accessright.form.title': 'Access rights',
  'accessright.form.subtitle': 'Setting up access rights for {nbSelectedDataset} datasets',
  'accessright.form.error.message': 'Could not save your configuration.',
  'accessright.edit.tooltip': 'Edit access rights',
  'accessright.delete.tooltip': 'Take off access rights for this dataset',
  'accessright.list.delete.message': 'Remove the {name} access rights?',
  'component.plugin-parameter.action.choose-plugin': 'Select a plugin',
  'component.plugin-parameter.action.reset': 'Deselect a plugin',
  'component.plugin-parameter.no-plugin-available': 'No plugin available',
  'accessright.edit.multiples.button.label': 'Configure access rights for selected datasets',
  'accessright.no.dataset.title': 'No dataset',
  'accessright.no.dataset.subtitle': 'Create your first dataset',
  ...Locales.en,
}

export default messages
