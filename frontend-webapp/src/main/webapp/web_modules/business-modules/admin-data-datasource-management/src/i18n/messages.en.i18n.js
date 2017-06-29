/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
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

  'invalid.max_128_carac': 'Use 128 characters or fewer for datasource names',
  'invalid.one_pk_required': 'Choose a field as primary key',
  'invalid.only_one_pk_allowed': 'Use only one primary key',
}, Locales.en)

export default messages
