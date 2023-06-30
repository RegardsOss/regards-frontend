/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
  // 1 - admin
  'search.graph.results.tab': 'Results',
  'search.graph.configuration.tab': 'Graph',
  // 1.a - Graph levels
  'search.graph.configuration.levels.message': 'Browsing graph levels',
  'search.graph.levels.selection.none.selected.error': 'No display level selected',
  'search.graph.levels.selection.header.message': `{count, plural, 
    =0 {No browsing level}
    one {# browsing level}
    other {# browsing levels}
  } defined`,
  'search.graph.levels.selection.no.selection.hint': 'Add here graph browsing levels',
  'search.graph.add.level': 'Add',
  'search.graph.collection.model.label': '{name} - {description}',
  'search.graph.selected.levels.column.name': 'Name',
  'search.graph.selected.levels.column.description': 'Description',
  'search.graph.selected.levels.column.options.remove.tooltip': 'Remove that level',
  // 1.b - Graph dataset attributes
  'search.graph.configuration.attributes.message': 'Displayed datasets attributes',
  'search.graph.configuration.dataset.attributes.hint': 'Add here attributes to show for datasets when details option is enabled',
  'form.attributes.standard.section.title': 'Common attributes',
  'form.attributes.section.title': 'Dynamic attributes',
  'form.attributes.section.clear.filters.tooltip': 'Clear current filter',
  'form.attributes.order': 'display order',
  'form.attributes.initialSort.label': 'Sort results on this attribute',
  'form.attributes.visibility.label': 'Display',
  'form.attributes.filter.label': 'Filter',
  'form.attributes.facetable.label': 'Enable filter',
  // user
  'search.graph.title': 'Graph browsing',
  'search.graph.show.details': 'Details',
  'search.graph.entity.detail.tooltip': 'Details',
  'search.graph.level.fetch.model.failed': 'Failed retrieving collections and datasets',
  'search.graph.level.no.model': 'Empty collection',
  'search.graph.dataset.attribute.no.value': '-',
  'search.graph.results.title': 'Results',

  ...Locales.en,
}

export default messages
