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
  'crawler.list.title': 'Data crawling list',
  'crawler.list.back.button': 'Back',
  'crawler.list.label.column.header': 'Label',
  'crawler.list.lastIngestDate.column.header': 'Last ingest date',
  'crawler.list.nextPlannedIngestDate.column.header': 'Next ingest date',
  'crawler.list.savedObjectsCount.column.header': 'Number of entites',
  'crawler.list.status.column.header': 'Status',
  'crawler.list.duration.column.header': 'Duration',
  'crawler.list.refresh.button': 'Refresh',
  'crawler.list.show.stacktrace.tooltip': 'Show the stacktrace',
  'crawler.list.stacktrace.title': 'Stacktrace',
  'crawler.list.stacktrace.action.close': 'Close',

  'datasource.list.action.add': 'Add',
  'datasource.list.action.cancel': 'Cancel',
  'datasource.list.title': 'Datasources',
  'datasource.list.subtitle': 'Datasources provides data for dataset',
  'datasource.list.table.label': 'Name',
  'datasource.list.table.actions': 'Actions',
  'datasource.list.table.model': 'Model',
  'datasource.list.action.edit': 'Edit',
  'datasource.list.action.delete': 'Delete',
  'datasource.list.delete.title': 'Delete datasource {name} ?',

  'datasource.form.create.title': 'Create a new datasource',
  'datasource.form.create.subtitle': 'Select which connection you want to use for this datasource',
  'datasource.form.create.action.cancel': 'Cancel',
  'datasource.form.create.action.next': 'Next',
  'datasource.form.create.action.connection': 'Createa a connection',
  'datasource.form.create.datasource': 'List actives connections',

  'datasource.form.action.next': 'Next',
  'datasource.form.action.cancel': 'Cancel',
  'datasource.form.model': 'Data model',
  'datasource.form.refreshRate': 'Refresh rate (in second)',
  'datasource.form.connection': 'Selected connection',
  'datasource.form.label': 'Name',
  'datasource.form.pluginConfiguration': 'Plugin type',
  'datasource.form.table.input': 'Attribute value',
  'datasource.form.subtitle': 'Manage datasource attributes',
  'datasource.form.tags': 'Tags list',

  'datasource.edit.title': 'Edit datasource {name}',
  'datasource.create.title': 'Create a datasource',

  'datasource.stepper.attributes': 'Specify datasource attributes',
  'datasource.stepper.connection': 'Select a connection',
  'datasource.stepper.mapping': 'Data mapping',

  'datasource.form.mapping.title': 'Set up the link between connection and object model',
  'datasource.form.mapping.subtitle': 'Link each model attribute from your model to an attribute issued from the connection. The attribute sipId must be linked to the primary key of your database',
  'datasource.form.mapping.emptyDatabase.title': 'Your database is empty',
  'datasource.form.mapping.emptyDatabase.message': 'Associate model attributes to a datasource with at least 1 table',

  'datasource.form.mapping.table.fragment': 'Fragment',
  'datasource.form.mapping.table.attrName': 'Attribute name',
  'datasource.form.mapping.table.attribute': 'Model attribute',
  'datasource.form.mapping.table.attributeStatic': 'Common attribute',
  'datasource.form.mapping.table.type': 'Type of attribute',
  'datasource.form.mapping.table.dbValue': 'Value of attribute',
  'datasource.form.mapping.connectionViewer.title': 'Connection browser',
  'datasource.form.mapping.connectionViewerFromTable.subtitle': 'Select the table containing model attributes',
  'datasource.form.mapping.connectionViewerCustom.subtitle': 'Select a table to display its attributes',
  'datasource.form.mapping.table.optional.true': 'Optionnal',
  'datasource.form.mapping.table.optional.false': 'Mandatory',
  'datasource.form.mapping.action.save': 'Save',
  'datasource.form.mapping.action.cancel': 'Back',

  'datasource.form.mapping.fromTable.title': 'Links between model attributes and the connection table',
  'datasource.form.mapping.fromTable.subtitle': 'Specify how the value is retrieved, for each model attribute',
  'datasource.form.mapping.fromTable.tableName': 'Table name',
  'datasource.form.mapping.table.input': 'Select clause (SQL)',
  'datasource.form.mapping.table.select': 'Select table attribute',
  'datasource.form.mapping.table.showAdvancedConfiguration': 'Use SQL',
  'datasource.form.mapping.table.isPK': 'Primary key of the table',

  'datasource.form.mapping.custom.title': 'Links between model attributes and the connection',
  'datasource.form.mapping.custom.subtitle': 'In the first place, write an SQL request FROM, WHERE in order to retrieve data. Then specify the SELECT clause (in SQL) to retrieve the model attribute value',
  'datasource.form.mapping.custom.fromClause': 'Clause FROM, WHERE, [GROUP BY and HAVING]',

  'invalid.one_pk_required': 'Choose a field as primary key',
  'invalid.only_one_pk_allowed': 'Use only one primary key',
}, Locales.en)

export default messages
