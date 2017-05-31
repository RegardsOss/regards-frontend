/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'datasource.list.action.add': 'Add',
  'datasource.list.action.cancel': 'Cancel',
  'datasource.list.title': 'Datasource list',
  'datasource.list.subtitle': 'Datasources provides data for dataset',
  'datasource.list.table.label': 'Name',
  'datasource.list.table.actions': 'Actions',
  'datasource.list.table.model': 'Model',
  'datasource.list.action.edit': 'Edit',
  'datasource.list.action.delete': 'Delete',
  'datasource.list.delete.title': 'Delete datasource {name} ?',

  'datasource.form.create.title': 'Create a new datasource',
  'datasource.form.create.subtitle': 'Please select which connection you want to use for this datasource',
  'datasource.form.create.action.cancel': 'Cancel',
  'datasource.form.create.action.next': 'Next',
  'datasource.form.create.action.connection': 'Create a new connection',
  'datasource.form.create.datasource': 'List actives connections',

  'datasource.form.action.next': 'Next',
  'datasource.form.action.cancel': 'Cancel',
  'datasource.form.model': 'Datasource models',
  'datasource.form.connection': 'Selected connection',
  'datasource.form.label': 'Name',
  'datasource.form.pluginConfiguration': 'Plugin type',
  'datasource.form.table.input': 'Attribute value',
  'datasource.form.subtitle': 'Manage datasource attributes',

  'datasource.edit.title': 'Edit datasource {name}',
  'datasource.create.title': 'Create a new datasource',

  'datasource.stepper.attributes': 'Specify datasource attributes',
  'datasource.stepper.connection': 'Select a connection',
  'datasource.stepper.mapping': 'Data mapping',


  'datasource.form.mapping.title': 'Set up the link between connection and object model',
  'datasource.form.mapping.subtitle': 'This step aims to link for each model attribute from your model an attribute comming from the connection. If your data comes from one table, select the tab "Link with one table", otherwise you can select the option "Advanced link" to let you write your own SQL query. The attribute sipId must be linked to the primary key of your database',

  'datasource.form.mapping.table.fragment': 'Fragment',
  'datasource.form.mapping.table.attrName': 'Attribute name',
  'datasource.form.mapping.table.attribute': 'Model attribute',
  'datasource.form.mapping.table.attributeStatic': 'Common attribute',
  'datasource.form.mapping.table.type': 'Type of attribute',
  'datasource.form.mapping.table.dbValue': 'Value of attribute',
  'datasource.form.mapping.connectionViewer.title': 'Connection browser',
  'datasource.form.mapping.connectionViewerFromTable.subtitle': 'Select the table that contains model attributes',
  'datasource.form.mapping.connectionViewerCustom.subtitle': 'Select a table to display its attributes',
  'datasource.form.mapping.table.optional.true': 'Optionnal',
  'datasource.form.mapping.table.optional.false': 'Mandatory',
  'datasource.form.mapping.action.save': 'Save',
  'datasource.form.mapping.action.cancel': 'Back',

  'datasource.form.mapping.fromTable.title': 'Link model attributes and the connection table',
  'datasource.form.mapping.fromTable.subtitle': 'For each model attribute, you need to specify how the value is retrieved',
  'datasource.form.mapping.fromTable.tableName': 'Table name',
  'datasource.form.mapping.table.input': 'Select clause (SQL)',
  'datasource.form.mapping.table.select': 'Select table attribute',
  'datasource.form.mapping.table.showAdvancedConfiguration': 'Use SQL',
  'datasource.form.mapping.table.isPK': 'Primary key of the table',

  'datasource.form.mapping.custom.title': 'Link between model attributes and connection',
  'datasource.form.mapping.custom.subtitle': 'Dans un premier temps, écrivez votre requête SQL pour récuperer les données en fonction des tables disponibles dans la connexion. Then, specify the SELECT clause (in SQL) to let the system retrieves the model attribute value',
  'datasource.form.mapping.custom.fromClause': 'Clause FROM, WHERE, [GROUP BY and HAVING]',

  'invalid.max_128_carac': 'Datasource name cannot exceed 128 caracters',
  'invalid.one_pk_required': 'Must select a field as a primary key',
  'invalid.only_one_pk_allowed': 'Only one primary key allowed',
}, Locales.en)

export default messages
