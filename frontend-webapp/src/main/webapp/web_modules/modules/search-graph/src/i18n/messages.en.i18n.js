/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = {
  // 1 - admin
  'search.graph.results.tab': 'Results',
  'search.graph.configuration.tab': 'Search',
  // 1.a - Graph levels
  'search.graph.configuration.levels.title': 'Browsing levels',
  'search.graph.configuration.levels.subtitle': 'Select below the graph browsing levels',
  'search.graph.levels.selection.none.selected.error': 'At least one element must be selected for the graph search',
  'search.graph.levels.selection.no.selection.hint': 'No selection. You can select levels by clicking on "Add level button"',
  'search.graph.add.level': 'Add level',
  'search.graph.collection.model.label': '{name} - {description}',
  'search.graph.selected.levels.column.index': 'Level',
  'search.graph.selected.levels.column.name': 'Name',
  'search.graph.selected.levels.column.description': 'Description',
  'search.graph.selected.levels.column.actions': 'Actions',
  // 1.b - Graph dataset attributes
  'search.graph.configuration.attributes.title': 'Visible attributes',
  'search.graph.configuration.attributes.subtitle': 'Select below the attributes that will be displayed on datasets in graph',
  'form.attributes.standard.section.title': 'Common attributes',
  'form.attributes.section.title': 'Dynamic attributes',
  'form.attributes.order': 'display order',
  'form.attributes.visibility.label': 'Display',
  'form.attributes.filter.label': 'Filter',
  // user
  'search.graph.title': 'Graph browsing',
  'search.graph.subtitle': 'Data browsing by collections and datasets objects display',
  'search.graph.show.details': 'Details',
  'search.graph.level.fetch.model.failed': 'Failed retrieving collections and datasets',
  'search.graph.level.no.model': 'Empty collection',
  'search.graph.dataset.attribute.no.value': '-',

  ...Locales.en,
}

export default messages
