/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'crawler.list.savedObjectsCount.column.header': 'Number of entities',
  'crawler.list.status.column.header': 'Status',
  'crawler.list.duration.column.header': 'Duration',
  'crawler.list.refresh.button': 'Refresh',
  'crawler.list.show.stacktrace.tooltip': 'Show the stacktrace',
  'crawler.list.stacktrace.title': 'Stacktrace',
  'crawler.list.stacktrace.action.close': 'Close',
  'crawler.list.delete.action': 'Delete',
  'crawler.list.schedule.action': 'Schedule an ingestion',
  'crawler.list.scheduled': 'The ingestion date has been updated',
  'crawler.delete.confirm.title': 'Are you sure to delete crawler {crawler} ?',

  'datasource.list.action.add': 'Add',
  'datasource.list.action.cancel': 'Cancel',
  'datasource.list.title': 'Datasources',
  'datasource.list.subtitle': 'Datasources provides data for dataset. Note : You can delete datasource that is not associated to any dataset.',
  'datasource.list.table.label': 'Name',
  'datasource.list.table.associatedDatasets': 'Associated datasets',
  'datasource.list.table.actions': 'Actions',
  'datasource.list.action.edit': 'Edit',
  'datasource.list.action.delete': 'Delete',
  'datasource.list.delete.title': 'Delete datasource {name} ?',
  'datasource.list.empty.title': 'No existing datasource',
  'datasource.list.empty.subtitle': 'Create your first datasource',
  'datasource.list.table.active': 'Active/deactivate',
  'datasource.list.action.desactivate': 'Deactivate the datasource',
  'datasource.list.action.activate': 'Activate the datasource',

  'datasource.form.create.title': 'Create a new datasource',
  'datasource.form.create.subtitle': 'Select which connection you want to use for this datasource',
  'datasource.form.create.action.cancel': 'Cancel',
  'datasource.form.create.action.previous': 'Previous',
  'datasource.form.create.action.next': 'Next',
  'datasource.form.create.action.finish': 'Finish',
  'datasource.form.create.action.connection': 'Create a connection',
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
  'datasource.form.tags': 'Tags list added to all data crawled',
  'datasource.form.subsettingTags': 'Only crawl data containing these tags (empty = all data crawled)',
  'datasource.form.subsettingCategories': 'Only crawl data of given categories (empty = all categories crawled)',
  'datasource.form.attributeFileSize': 'Select data model attribute in which the total size of AIP files will be written (sum of AIP files size).',

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
  'datasource.form.mapping.table.type': 'Attribute type',
  'datasource.form.mapping.table.dbValue': 'Attribute value',
  'datasource.form.mapping.connectionViewer.title': 'Connection browser',
  'datasource.form.mapping.connectionViewerFromTable.subtitle': 'Select the table containing model attributes',
  'datasource.form.mapping.connectionViewerCustom.subtitle': 'Select a table to display its attributes',
  'datasource.form.mapping.table.optional.true': 'Optional',
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


  'datasource.form.create.pick-interface.title': 'Datasource creation',
  'datasource.form.create.pick-interface.subtitle': 'Please select the crawler type you want to create.',
  'datasource.form.create.pick-interface.description.aip': 'AIP crawlers allow crawling GeoJSON SIPs',
  'datasource.form.create.pick-interface.description.db': 'This mode allows you to crawl data from an external data source',
  'datasource.form.create.pick-interface.description.opensearch': 'Crawls data from an OpenSearch Web Source',
  'datasource.form.create.pick-interface.action.select': 'Select',
  'datasource.form.create.pick-interface.action.cancel': 'Cancel',
  'aip.datasource.create.title': 'SIPs datasource creation',
  'aip.datasource.form.subtitle': 'This form allows you to configure AIPs crawling from storage microservice. To do so, you have to map each attribute of your data model to the key of associated value in the AIPs.',
  'aip.datasource.edit.title': 'Edit datasource {name}',
  'aip.datasource.form.table.fragmentAndLabel': 'Model attributes',
  'aip.datasource.form.table.type': 'Type',
  'aip.datasource.form.table.value': 'AIP path',
  'aip.datasource.form.table.staticAttributes': 'Statics attributes',
  'aip.datasource.form.table.input': 'Value',
  'aip.datasource.form.table.lowerBound': 'Lower bound',
  'aip.datasource.form.table.upperBound': 'Upper bound',

  'opensearch.crawler.stepper.crawler': 'Crawler configuration',
  'opensearch.crawler.stepper.query': 'Query configuration',
  'opensearch.crawler.stepper.results': 'Results configuration',

  'opensearch.crawler.form.crawler.title.create': 'Create a new crawler',
  'opensearch.crawler.form.crawler.title.edit': 'Edit a crawler',
  'opensearch.crawler.form.crawler.subtitle': 'Specify which OpenSearch ressource to crawl',
  'opensearch.crawler.form.crawler.name': 'Crawler name',
  'opensearch.crawler.form.crawler.refreshRate': 'Refresh rate',
  'opensearch.crawler.form.crawler.descriptor': 'OpenSearch descriptor URL',
  'opensearch.crawler.form.crawler.descriptor.invalid.url': 'URL cannot be reached or does not return a valid OpenSearch descriptor',
  'opensearch.crawler.form.crawler.descriptor.no.json.url': 'The OpenSearch descriptor does not contain any search URL for JSON results',
  'opensearch.crawler.form.crawler.descriptor.no.page.index.parameter': 'The OpenSearch descriptor for JSON resource URL does not contain any page index parameter',
  'opensearch.crawler.form.crawler.descriptor.no.page.size.parameter': 'The OpenSearch descriptor for JSON resource URL does not contain any page size parameter',

  'opensearch.crawler.form.query.title.create': 'Create the query',
  'opensearch.crawler.form.query.title.edit': 'Edit the query',
  'opensearch.crawler.form.query.subtitle': 'Choose which filters will be applied to the query',
  'opensearch.crawler.form.query.lastUpdate': 'Last update parameter',
  'opensearch.crawler.form.query.pageSize': 'Pages size in {minBound},{maxBound}',
  'opensearch.crawler.form.query.filters.parameter.no.selection': 'No parameter selected',
  'opensearch.crawler.form.query.filters.parameter.name': 'Name',
  'opensearch.crawler.form.query.filters.parameter.value': 'Reference',
  'opensearch.crawler.form.query.filters.parameter.title': 'Title',
  'opensearch.crawler.form.query.filters.parameter.minInclusive': 'Inclusive minimum value',
  'opensearch.crawler.form.query.filters.parameter.minExclusive': 'Exclusive minimum value',
  'opensearch.crawler.form.query.filters.parameter.maxInclusive': 'Inclusive maximum value',
  'opensearch.crawler.form.query.filters.parameter.maxExclusive': 'Exclusive maximum value',
  'opensearch.crawler.form.query.filters.parameter.pattern': 'Values pattern',
  'opensearch.crawler.form.query.add.label': 'New filter',
  'opensearch.crawler.form.query.add.tooltip': 'Add a new search query filter',
  'opensearch.crawler.form.query.name': 'Name',
  'opensearch.crawler.form.query.description': 'Description',
  'opensearch.crawler.form.query.value': 'Value',
  'opensearch.crawler.form.query.actions': 'Actions',
  'opensearch.crawler.form.query.removeFilter': 'Remove filter',
  'opensearch.crawler.form.query.no.opensearch.crawler.form.query.filter.message': 'Search request results are not filtered',
  'opensearch.crawler.form.query.testQuery.label': 'Test query',
  'opensearch.crawler.form.query.testQuery.tooltip': 'Test search query with selected filters and parameters',
  'opensearch.crawler.form.query.dialog.title': 'Select parameter',
  'opensearch.crawler.form.query.filter': 'Filter...',
  'opensearch.crawler.form.query.possibleValues': 'Possible values',
  'opensearch.crawler.form.query.input.field.free.value': 'Value (*)',
  'opensearch.crawler.form.query.input.field.numeric.value': 'Number (*) in {minBound},{maxBound}',
  'opensearch.crawler.form.query.input.field.numeric.min.exclusive.bound': ']{bound}',
  'opensearch.crawler.form.query.input.field.numeric.min.inclusive.bound': '[{bound}',
  'opensearch.crawler.form.query.input.field.numeric.min.free.bound': ']-∞',
  'opensearch.crawler.form.query.input.field.numeric.max.exclusive.bound': '{bound}[',
  'opensearch.crawler.form.query.input.field.numeric.max.inclusive.bound': '{bound}]',
  'opensearch.crawler.form.query.input.field.numeric.max.free.bound': '+∞[',
  'opensearch.crawler.form.query.input.field.pattern.value': 'Value (*) matching pattern {pattern}',
  'opensearch.crawler.form.query.input.field.pattern.error': 'The value does not match expecter pattern',
  'opensearch.crawler.form.query.input.field.invalid.number.error': 'The value must be a valid number',
  'opensearch.crawler.form.query.input.field.number.outside.bounds.error': 'The value is outside bounds',

  'opensearch.crawler.form.results.title': 'Map results',
  'opensearch.crawler.form.results.subtitle': "Specify which field is associated to each model's attribute",
  'opensearch.crawler.form.results.model': 'Regards Model',
  'opensearch.crawler.form.results.standardAttr': 'Standard attributes',
  'opensearch.crawler.form.results.associatedFiles': 'Associated files',
  'opensearch.crawler.form.results.dynamicAttr': 'dynamic attributes',
  'opensearch.crawler.form.results.totalResults': 'Total results field',
  'opensearch.crawler.form.results.pageSize': 'Page size field',
  'opensearch.crawler.form.results.label': 'Label',
  'opensearch.crawler.form.results.providerId': 'Provider ID',
  'opensearch.crawler.form.results.RAWDATA': 'Raw data',
  'opensearch.crawler.form.results.QUICKLOOK': 'Quicklook',
  'opensearch.crawler.form.results.THUMBNAIL': 'Thumbnail',
  'opensearch.crawler.form.results.value': 'Value',
}, Locales.en)

export default messages
