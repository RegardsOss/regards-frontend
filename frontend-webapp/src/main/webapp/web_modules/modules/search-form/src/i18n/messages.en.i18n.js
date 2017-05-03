/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = Object.assign({

  // Administration messages

  // Tabulation labels
  'form.configuration.tab.label': 'Parameters',
  'form.dataset.selection.tab.label': 'Datasets',
  'form.layout.tab.label': 'Layout',
  'form.criterions.tab.label': 'Criterions',
  'form.preview.tab.label': 'Preview',
  // Configuration tab
  'form.configuration.tab.title': 'Configure main parameters for current search form module',
  'form.configuration.result.type.datasets': 'Display results grouped by datasets',
  'form.configuration.result.type.dataobjects': 'Display dataobjects results',
  'form.configuration.result.enable.facettes.label': 'Enable facetes : Results filtering with criterion depending on initial search results',
  'form.attributes.parameters.title': 'Configure attributes displayed and used for filtering from each search results of the current form',
  'form.attributes.regroupement.form.title': 'Add new attributes regrouepement',
  'form.attributes.regroupement.description': 'A regroupement of attributes allow you to display multiples attributes of a search result object into the same column of the results list.<br/>' +
  ' Please enter the new regroupement label (that must be unique) and select attributes to regroup.',
  'form.attributes.regroupement.form.label': 'Label',
  'form.attributes.regroupement.form.save': 'Add',
  'form.attributes.regroupement.form.update': 'Update',
  'form.attributes.regroupement.form.cancel': 'Cancel',
  'form.attributes.regroupement.form.error.label.aleady.exists': 'This regroupement label already exists',
  'form.attributes.regroupement.form.add.regroupement.button': 'Add new regroupement',
  'form.attributes.visibility.label': 'Visibility',
  'form.attributes.facetable.label': 'Enable filter',
  'form.attributes.initialSort.label': 'Sort results on this attribute',
  'form.attributes.regroupement.section.title': 'Configure attributes regroupement to display after every search result',
  'form.attributes.section.title': 'Configure attributes retrieved from each search result',
  'form.attributes.regroupement.remove': 'Remove',
  'form.attributes.regroupement.edit': 'Edit',
  'form.attributes.delete.confirm.title': 'Confirm deletion of attributs regroupement {name}',
  'form.attributes.regroupement.form.title.update': 'Update regroupement : {name}',
  // Datasets ta
  'form.datasets.tab.title': 'Link this search form to one or many datasets, or to one or many models of dataset',
  'form.datasets.all.label': 'Link with all datasets',
  'form.datasets.selected.label': 'Link with one or many datasets',
  'form.datasets.model.selected.label': 'Link with one or many models of dataset',
  'form.datasets.select.dataset.list.title': 'Select datasets to link with search form',
  'form.datasets.select.dataset.models.list.title': 'Select dataset models to link with search form',
  // Layout tab
  'form.layout.tab.title': 'Search form layout configuration',
  'form.layout.tab.reset': 'Reset',
  'layout.invalid.error': 'Error layout',
  // Criterion tab
  'form.criterion.list.name': 'Name',
  'form.criterion.list.container': 'Container',
  'form.criterion.list.actions': 'Actions',
  'form.criterion.new.button.label': 'Create',
  'form.criterion.reset.button.label': 'Reset',
  'form.criterion.criteria.new.title': 'Create new criterion',
  'form.criterion.criteria.select.criteria.label': 'Select a criteria ...',
  'form.criterion.criteria.select.container.label': 'Select a container ...',
  'form.criterion.criteria.submit.button.label': 'Create',
  'form.criterion.criteria.cancel.button.label': 'Cancel',
  'form.criterion.criteria.select.attribute.label': 'Select model attribute ...',

  // User display component

  'form.search.button.label': 'Search',

}, Locales.en)

export default messages
