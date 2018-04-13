/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = {
  ...Locales.en,

  // Administration messages

  // Tabulation labels
  'form.configuration.tab.label': 'Results',
  'form.dataset.selection.tab.label': 'Datasets',
  'form.layout.tab.label': 'Layout',
  'form.criterions.tab.label': 'Criterions',
  'form.criterion.tab.title': 'Configure all the criterion of your form. Each criteria can be inserted into a specific section of your designed layout.',
  'form.preview.tab.label': 'Preview',
  'form.preview.tab.title': 'Preview of your form as it will be displayed in user interface.',
  // Configuration tab
  'form.configuration.tab.title': 'Configure main parameters for current search form module',
  'form.configuration.result.type.datasets': 'Display results grouped by datasets',
  'form.configuration.result.type.dataobjects': 'Display dataobjects results',
  'form.configuration.result.enable.facettes.label': 'Enable facets : Results filtering with criterion depending on initial search results',
  'form.attributes.parameters.title': 'Configure attributes displayed and used for filtering from each search results of the current form',
  'form.attributes.regroupement.form.title': 'Add new attributes clustering',
  'form.attributes.regroupement.description': 'A clustering of attributes allows you to display multiples attributes of a search result object into the same column of the results list.<br/>' +
  ' Please enter the new clustering label (that must be unique) and select attributes to cluster.',
  'form.attributes.regroupement.form.label': 'Label',
  'form.attributes.regroupement.form.save': 'Add',
  'form.attributes.regroupement.form.update': 'Update',
  'form.attributes.regroupement.form.cancel': 'Cancel',
  'form.attributes.regroupement.form.error.label.already.exists': 'This clustering label already exists',
  'form.attributes.regroupement.form.add.regroupement.button': 'Add new clustering',
  'form.attributes.visibility.label': 'Visibility',
  'form.attributes.facetable.label': 'Enable filter',
  'form.attributes.initialSort.label': 'Sort results on this attribute',
  'form.attributes.regroupement.section.title': 'Configure attributes clustering to display after every search result',
  'form.attributes.section.title': 'Configure attributes retrieved from each search result',
  'form.attributes.section.clear.filters.tooltip': 'Clear current filter',
  'form.attributes.regroupement.remove': 'Remove',
  'form.attributes.regroupement.edit': 'Edit',
  'form.attributes.delete.confirm.title': 'Remove attributes clustering {name}?',
  'form.attributes.regroupement.form.title.update': 'Update clustering : {name}',
  // Datasets tab
  'form.datasets.tab.title': 'Link this search form to one or many datasets, or to one or many models of dataset',
  'form.datasets.all.label': 'Link with all datasets',
  'form.datasets.reset.all': 'Reset all association to this search form',
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
  'form.criterion.list.attributes': 'Attributes',
  'form.criterion.list.container': 'Container',
  'form.criterion.list.actions': 'Actions',
  'form.criterion.new.button.label': 'Create',
  'form.criterion.reset.button.label': 'Reset',
  'form.criterion.criteria.new.title': 'Create a criterion',
  'form.criterion.criteria.select.criteria.label': 'Select a criteria ...',
  'form.criterion.criteria.select.container.label': 'Select a container ...',
  'form.criterion.criteria.submit.button.label': 'Create',
  'form.criterion.criteria.cancel.button.label': 'Cancel',
  'form.criterion.criteria.select.attribute.label': 'Select model attribute ...',

  // User display component
  'form.search.button.label': 'Search',
  'form.reset.button.label': 'Reset all',
  'results.module.title': 'Results',

}

export default messages
