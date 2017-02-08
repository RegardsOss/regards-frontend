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
  // Datasets tab
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
