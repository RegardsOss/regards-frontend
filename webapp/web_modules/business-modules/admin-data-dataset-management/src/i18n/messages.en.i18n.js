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
  'dataset.list.action.add': 'Add',
  'dataset.list.action.cancel': 'Cancel',
  'dataset.list.title': 'Datasets',
  'dataset.list.subtitle': 'Datasets are groupings of data sharing a common topic',
  'dataset.list.table.label': 'Label',
  'dataset.list.table.actions': 'Actions',
  'dataset.list.table.model': 'Model',
  'dataset.list.tooltip.edit': 'Edit',
  'dataset.list.tooltip.delete': 'Delete',
  'dataset.list.tooltip.info.button': 'Details',
  'dataset.list.tooltip.copy.button': 'Copy reference to clipboard',
  'dataset.list.delete.title': 'Delete the dataset {name} ?',

  'dataset.info.urn.label': 'Unique reference (ipId) : ',
  'dataset.info.creationdate.label': 'Creation date : ',
  'dataset.info.datamodel.label': 'Data model : ',
  'dataset.info.model.label': 'Dataset model : ',
  'dataset.info.close': 'Close',
  'dataset.info.title': 'Information about dataset {name}',

  'dataset.form.links.subtitle': 'Dataset are linked to collections and tags in order to simplify the research',
  'dataset.form.links.title': 'Edit dataset links',
  'dataset.form.links.collection.title': 'Collection list links',
  'dataset.form.links.collection.remove.button': 'Remove the link',
  'dataset.form.links.collection.none': 'No collection linked',
  'dataset.form.links.tag.subtitle': 'Associate with tags',
  'dataset.form.links.tag.add': 'New tag',
  'dataset.form.links.tag.add.button': 'Add',
  'dataset.form.links.tag.remove.button': 'Remove',
  'dataset.form.links.remainingcollection.subtitle': 'Available collections',
  'dataset.form.links.remainingcollection.search': 'Filter collections with their names',
  'dataset.form.links.remainingcollection.add.button': 'Link the collection',
  'dataset.form.links.action.next': 'Next',
  'dataset.form.links.action.cancel': 'Previous',

  'dataset.form.plugin.title': 'Manage plugins applied to this dataset',
  'dataset.form.plugin.subtitle': 'To process the dataset, activate those plugins',
  'dataset.form.plugin.services': 'Activate services',
  'dataset.form.plugin.action.next': 'Next',
  'dataset.form.plugin.action.cancel': 'Previous',

  'dataset.form.uiservices.title': 'Manage user interface services ',
  'dataset.form.uiservices.subtitle': 'To add user interactions with the dataset, activate those services.',
  'dataset.form.uiservices.action.next': 'Finish',
  'dataset.form.uiservices.action.cancel': 'Previous',
  'dataset.form.uiservices.services': 'Services UI',
  'dataset.form.uiservices.latestVersion': 'latest',

  'dataset.form.files.action.cancel': 'Back',
  'dataset.form.files.action.next': 'Next',
  'dataset.form.files.subtitle': 'Add one or more description file(s) to the dataset to explain its content. Three file formats are allowed : HTML, PDF and Markdown.',
  'dataset.form.files.title': 'Manage files associated with the dataset',


  'dataset.form.subsetting.subtitle': 'Setup subsetting',
  'dataset.form.subsetting.attributes': 'Attribute from object model',
  'dataset.form.subsetting.opensearch': 'Filter request in OpenSearch',
  'dataset.form.subsetting.testSubsetQuery': 'Test the request',
  'dataset.form.subsetting.action.next': 'Save',
  'dataset.form.subsetting.action.cancel': 'Previous',

  'dataset.form.action.next': 'Next',
  'dataset.form.action.cancel': 'Cancel',
  'dataset.form.model': 'Dataset model (*)',
  'dataset.form.providerId': 'Supplier identifier',
  'dataset.form.label': 'Label (*)',
  'dataset.form.geometry': 'Geometry',
  'dataset.form.descriptionUrl': 'Page URL describing the dataset',
  'dataset.form.descriptionFileContent': 'Upload a Markdown or PDF file',
  'dataset.form.descriptionFileContentReuploadToOverride': 'To overwrite the existing descrition, upload a new Markdown or PDF file',
  'dataset.form.datasource': 'Data source',
  'dataset.form.radio.descriptionUrl': 'Provide the URL containing the description',
  'dataset.form.radio.descriptionFileContent': 'Upload a file containing the description',
  'dataset.form.radio.none': 'No description',
  'dataset.form.subtitle': 'Manage dataset attributes',
  'dataset.table.filter.dataset.label': 'Dataset',
  'dataset.table.filter.clear.button': 'Clear',
  'dataset.table.filter.button': 'Apply',
  'dataset.table.refresh.button': 'Refresh',
  'dataset.no.dataset.title': 'No datasets',
  'dataset.no.dataset.subtitle': 'Create your first dataset',

  'dataset.subsetting.snackbar.success': 'The subsetting is OK',
  'dataset.subsetting.snackbar.error': 'The subsetting is not OK',

  'dataset.edit.title': 'Edit dataset {name}',
  'dataset.create.title': 'Create a dataset',

  'dataset.form.create.action.datasource': 'Create a datasource',
  'dataset.form.create.action.cancel': 'Back',
  'dataset.form.create.action.next': 'Next',
  'dataset.form.create.datasource': 'Datasource',
  'dataset.form.create.title': 'Create a datasource',
  'dataset.form.create.subtitle': 'To create a dataset, select a datasource. Otherwise, you can click on the button to create a new datasource',

  'dataset.stepper.links': 'Edit links',
  'dataset.stepper.attributes': 'Attributes',
  'dataset.stepper.files': 'Associated files',
  'dataset.stepper.subsetting': 'Subsetting',
  'dataset.stepper.plugins': 'Plugins',
  'dataset.stepper.uiServices': 'UI services',

}, Locales.en)

export default messages
