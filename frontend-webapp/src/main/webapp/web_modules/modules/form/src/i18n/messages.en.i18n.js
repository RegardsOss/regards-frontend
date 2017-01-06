/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

/**
 * i18n messages English language
 * @type {*}
 */
const messages = Object.assign({
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
}, Locales.en)

export default messages
