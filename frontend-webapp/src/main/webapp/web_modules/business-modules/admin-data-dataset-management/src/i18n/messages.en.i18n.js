import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'dataset.list.action.add': 'Add',
  'dataset.list.action.cancel': 'Cancel',
  'dataset.list.title': 'Dataset list',
  'dataset.list.subtitle': 'Les jeux de données sont des regroupements de données qui partagent une même thématique',
  'dataset.list.table.label': 'Label',
  'dataset.list.table.actions': 'Actions',
  'dataset.list.table.model': 'Model',
  'dataset.list.tooltip.edit': 'Edit',
  'dataset.list.tooltip.delete': 'Delete',
  'dataset.list.delete.title': 'Delete the dataset {name} ?',

  'dataset.form.links.subtitle': 'Dataset are linked to collections and tags in order to simplify the research',
  'dataset.form.links.title': 'Edit dataset links',
  'dataset.form.links.collection.title': 'Collection list links : click on the cross to delete the link with the collection',
  'dataset.form.links.collection.none': 'No collection linked',
  'dataset.form.links.tag.subtitle': 'Associate with tags',
  'dataset.form.links.tag.add': 'New tag',
  'dataset.form.links.remainingcollection.subtitle': 'Collections available : click on the plus to link the collection',
  'dataset.form.links.remainingcollection.search': 'Filter collections with their names',
  'dataset.form.links.action.next': 'Next',
  'dataset.form.links.action.cancel': 'Back',

  'dataset.form.plugin.title': 'Manage plugins applyed to this dataset',
  'dataset.form.plugin.subtitle': 'You can link with these three types of plugins: <br /> - filters allow to modify user\'s research requests on a dataset. <br /> - converters allows to convert data coming from a research on a dataset. <br /> - services allows to realize processing on a dataset.',
  'dataset.form.plugin.services': 'Activate services',
  'dataset.form.plugin.action.next': 'Next',
  'dataset.form.plugin.action.cancel': 'Cancel',

  'dataset.form.uiservices.title': 'Manage user interface services ',
  'dataset.form.uiservices.subtitle': 'Call Seb on +33560336584',
  'dataset.form.uiservices.action.next': 'Finish',
  'dataset.form.uiservices.action.cancel': 'Cancel',


  'dataset.form.subsetting.subtitle': 'Setup subsetting',
  'dataset.form.subsetting.attributes': 'Attribute from object model',
  'dataset.form.subsetting.opensearch': 'Filter request in OpenSearch',
  'dataset.form.subsetting.testSubsetQuery': 'Test the request',
  'dataset.form.subsetting.action.next': 'Next',
  'dataset.form.subsetting.action.cancel': 'Cancel',

  'dataset.form.action.next': 'Next',
  'dataset.form.action.cancel': 'Cancel',
  'dataset.form.model': 'Dataset model',
  'dataset.form.label': 'Label',
  'dataset.form.descriptionUrl': 'Page URL describing the dataset',
  'dataset.form.descriptionFileContent': 'Upload a Markdown or PDF file',
  'dataset.form.descriptionFileContentReuploadToOverride': 'Upload a file containing the description if you want to overwrite the existing one',
  'dataset.form.datasource': 'Data source',
  'dataset.form.radio.descriptionUrl': 'Give the URL containing the description',
  'dataset.form.radio.descriptionFileContent': 'Upload a file containing the description',
  'dataset.form.radio.none': 'No description',
  'dataset.form.table.value': 'Fixed value',
  'dataset.form.table.type': 'Type',
  'dataset.form.table.fragmentAndLabel': 'Fragment and attribute name',
  'dataset.form.table.input': 'Attribute value',
  'dataset.form.subtitle': 'Manage dataset attributes',

  'dataset.edit.title': 'Edit dataset {name}',
  'dataset.create.title': 'Create a new dataset',
  'invalid.max_128_carac': 'The dataset label cannot 128 characters',

  'dataset.form.create.action.datasource': 'Create a new datasource',
  'dataset.form.create.action.cancel': 'Back',
  'dataset.form.create.action.next': 'Next',
  'dataset.form.create.datasource': 'Datasource',
  'dataset.form.create.title': 'Create a new datasource',
  'dataset.form.create.subtitle': 'Please select a datasource in order to create a dataset. Otherwise you can click on the button to create a new datasource',

  'dataset.stepper.links': 'Edit links with collections',
  'dataset.stepper.attributes': 'Attributes',
  'dataset.stepper.subsetting': 'Subsetting (datasource)',
  'dataset.stepper.plugins': 'Plugins',
  'dataset.stepper.uiServices': 'UI services',

}, Locales.en)

export default messages
