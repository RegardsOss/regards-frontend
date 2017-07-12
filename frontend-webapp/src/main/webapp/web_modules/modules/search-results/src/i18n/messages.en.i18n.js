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

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = Object.assign({

  // Administration messages

  // Configuration tab
  'form.configuration.tab.title': 'Configure options of visualization of your search results.',
  'form.configuration.result.type.datasets': 'Display "dataset" view in results',
  'form.configuration.result.enable.facettes.label': 'Enable facets : Results filtering with criterion depending on initial search results',
  'form.attributes.regroupement.form.title': 'Add new attributes clustering',
  'form.attributes.regroupement.description': 'A clustering of attributes allow you to display multiples attributes of a search result object into the same column of the results list.<br/>' +
  ' Please enter the new clustering label (that must be unique) and select attributes to cluster.',
  'form.attributes.regroupement.form.label': 'Label',
  'form.attributes.regroupement.form.save': 'Add',
  'form.attributes.regroupement.form.update': 'Update',
  'form.attributes.regroupement.form.cancel': 'Cancel',
  'form.attributes.regroupement.form.error.label.already.exists': 'This label is already in use',
  'form.attributes.regroupement.form.add.regroupement.button': 'Add new clustering',
  'form.attributes.visibility.label': 'Visibility',
  'form.attributes.facetable.label': 'Enable filter',
  'form.attributes.order': 'Display order',
  'form.attributes.initialSort.label': 'Sort results on this attribute',
  'form.attributes.regroupement.section.title': 'Configure attributes clustering to display after every search result',
  'form.attributes.section.title': 'Configure attributes from dynamic models retrieved from each search result',
  'form.attributes.section.clear.filters.tooltip': 'Clear current filter',
  'form.attributes.standard.section.title': 'Configure default models attributes. Default models attributes are attributes that are associated to each model without configuration',
  'form.attributes.filter.label': 'Search for attribute label ... ',
  'form.attributes.regroupement.remove': 'Remove',
  'form.attributes.regroupement.edit': 'Edit',
  'form.attributes.delete.confirm.title': 'Remove the attributes clustering {name}?',
  'form.attributes.regroupement.form.title.update': 'Update clustering : {name}',
  'form.attribute.conf.selection.tab.label': 'Data objects attributes configuration',
  'form.attribute.dataset.conf.selection.tab.label': 'Datasets attributes configuration',

  // User messages
  'navigation.home.label': 'Catalog',
  'navigation.dataobjects.label': 'Dataobjects',
  'navigation.datasets.label': 'Datasets',
  'navigation.filter.by.facets': 'Filters',
  'list.sort.prefix.label': 'Sort :',
  'list.sort.none.label': 'None',
  'view.type.table.button.label': 'Display results with table format',
  'view.type.list.button.label': 'Display results with list format',
  'show.description.tooltip': 'View entity details',
  'results.no.content.title': 'No results',
  'results.no.content.subtitle': 'Your search returned no results. Try to change your criteria',
  'results.options.column.label': 'Options and services',
}, Locales.en)

export default messages
