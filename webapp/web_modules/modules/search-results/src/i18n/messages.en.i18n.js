/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { storage } from '@regardsoss/units'

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = {
  // form messages
  ...Locales.en,
  // units messages
  ...storage.messages.en,

  // Administration messages

  // Configuration tab
  'search.results.form.configuration.tree.section.label.MAIN': 'Main',
  'search.results.form.configuration.tree.section.label.DATA': 'Data',
  'search.results.form.configuration.tree.section.label.DATASET': 'Dataset',
  'search.results.form.configuration.tree.section.label.DOCUMENT': 'Document',
  'search.results.form.configuration.tree.page.label.MAIN': 'View',
  'search.results.form.configuration.tree.page.label.FILTERS': 'Filters',
  'search.results.form.configuration.tree.page.label.SORTING': 'Sorting',
  'search.results.form.configuration.tree.page.label.LIST_AND_TABLE': 'List and table',
  'search.results.form.configuration.tree.page.label.QUICKLOOKS': 'Quicklooks',
  'search.results.form.configuration.tree.page.label.MAP': 'Map',
  'search.results.form.main.configuration.display.types.message': 'Results types to display',
  'search.results.form.main.configuration.display.types.data': 'Data',
  'search.results.form.configuration.result.type.data.and.datasets': 'Data and datasets',
  'search.results.form.main.configuration.display.types.documents': 'Documents',
  'search.results.form.configuration.result.type.tab.title.message': 'View title',
  'search.results.form.configuration.result.type.tab.hint': 'Result type tab title, leave empty for default value',
  'search.results.form.configuration.result.type.tab.label.en': 'English',
  'search.results.form.configuration.result.type.tab.label.fr': 'French',
  'search.results.form.configuration.result.initial.view.mode': 'Initial display mode',
  'search.results.form.configuration.result.show.list.initially': 'List',
  'search.results.form.configuration.result.show.table.initially': 'Table',
  'search.results.form.configuration.result.show.quicklook.initially': 'Quicklooks',
  'search.results.form.configuration.result.show.map.initially': 'Map',
  'search.results.form.configuration.result.options.title': 'Options',
  'search.results.form.configuration.result.options.enable.download': 'Enable download associated files',
  'search.results.form.configuration.result.filters': 'Filters',
  'search.results.form.configuration.result.enable.filters': 'Enable filters',
  'search.results.form.configuration.result.enable.filters.initially': 'Enable filters initially',
  'search.results.form.configuration.result.no.filter': 'Add here attributes allowing user filtering results',
  'search.results.form.configuration.result.sorting': 'Initial results sorting',
  'search.results.form.configuration.result.no.sorting': 'Add here attributes to be used in initial results sorting',
  'search.results.form.configuration.result.enable.view': 'Enable view',
  'search.results.form.configuration.result.TABLE.configuration': 'Table and list configuration',
  'search.results.form.configuration.result.TABLE.no.attribute': 'Add here table columns / list elements fields',
  'search.results.form.configuration.result.QUICKLOOK.configuration': 'Quicklook configuration',
  'search.results.form.configuration.result.QUICKLOOK.no.attribute': 'Add here quicklook elements fields',
  'search.results.form.configuration.result.MAP.configuration': 'Map configuration',
  'search.results.form.configuration.result.MAP.no.attribute': 'Add here quicklook elements fields',
  'search.results.form.configuration.result.MAP.background.title': 'Map background',
  'search.results.form.configuration.result.MAP.background.layer.url': 'URL',
  'search.results.form.configuration.result.MAP.background.layer.type': 'Type',

  // User messages
  'search.results.configure.columns.option': 'Columns',
  'search.results.configure.columns.summary.text': '{columnsCount} columns are available for table display',
  'search.results.configure.columns.toggle.all.visible': 'Display all',
  'search.results.configure.columns.toggle.all.hidden': 'Hide all',
  'search.results.configure.columns.dialog.reset': 'Reset',
  'search.results.configure.columns.dialog.reset.tooltip': 'Reset columns to their initial configuration',
  'search.results.configure.columns.dialog.confirm': 'Confirm',
  'search.results.configure.columns.dialog.cancel': 'Cancel',
  'search.results.configure.columns.visible.column': 'Visible',
  'search.results.configure.columns.visible.title': 'That column is visible',
  'search.results.configure.columns.hidden.title': 'That column is hidden',
  'search.results.configure.columns.label.column': 'Label',
  'search.results.configure.columns.attribute.column': 'Attributes',
  'search.results.configure.columns.attribute.label.separator': ', ',
  'search.results.configure.columns.attribute.not.available': '-',
  'search.results.configure.columns.move.tooltip': 'Move that column',
  'search.results.configure.columns.move.column.at.first.position': 'First',
  'search.results.configure.columns.move.column.after': 'After {columnLabel}',
  'search.results.default.tab.label.for.DATA': 'Data',
  'search.results.default.tab.label.for.DATASET': 'Datasets',
  'search.results.default.tab.label.for.COLLECTION': 'Collections',
  'search.results.default.tab.label.for.DOCUMENT': 'Documents',
  'search.results.toggle.filters': 'Filters',
  'search.results.list.sort.label': 'Sort: {sortElement}',
  'search.results.list.sort.default.label': 'Default',
  'search.results.list.sort.custom.label': 'Custom',
  'view.type.selector.tooltip.for.LIST': 'Display results as list',
  'view.type.selector.tooltip.for.TABLE': 'Display results in table',
  'view.type.selector.tooltip.for.MAP': 'Display results over map',
  'view.type.selector.tooltip.for.QUICKLOOK': 'Display results as pictures quicklooks',
  'download.tooltip': 'Download',
  'no.download.tooltip': 'No file or insufficient user rights',
  'download.no.online.file.tooltip': 'All files are offline',
  'show.entity.services.tooltip': 'Services',
  'show.description.tooltip': 'Details',
  'search.related.objects': 'View dataset content',
  'add.to.cart.tooltip': 'Add item to my cart',
  'add.selection.to.cart.label': 'Add to basket',
  'add.selection.to.cart.tooltip': 'Add selected items to my cart',
  'table.filter.only.quicklook.label': 'Only quicklook',
  'table.filter.select.only.quicklook.tooltip': 'Select to display only elements with quicklooks',
  'table.filter.deselect.only.quicklook.label': 'Deselect to display all elements',
  'results.no.content.title': 'No result',
  'results.no.content.subtitle': 'Your search returned no result. Try to change your criteria',
  'results.selection.column.label': 'Selection column',
  'results.options.column.label': 'Options and services',
  'results.download': 'Download',
  'results.cell.multiple.values.separator': ', ',

  'search.facets.no.facet.found': 'No facet for current result',
  'search.facets.filter.menu.others.message': 'Available choices are not exhaustive',
  'search.facets.filter.boolean.value.true': 'true',
  'search.facets.filter.boolean.value.false': 'false',
  'search.facets.filter.menu.boolean.value': '{valueLabel} ({count})',
  'search.facets.filter.chip.boolean.value': '{facetLabel}: {valueLabel}',
  'search.facets.filter.menu.date.before': 'Before {date} ({count})',
  'search.facets.filter.menu.date.after': 'After {date} ({count})',
  'search.facets.filter.menu.date.range': 'From {minDate} to {maxDate} ({count})',
  'search.facets.filter.menu.date.value': '{date} ({count})',
  'search.facets.filter.chip.date.before': '{facetLabel} < {date}',
  'search.facets.filter.chip.date.after': '{date} < {facetLabel}',
  'search.facets.filter.chip.date.range': '{minDate} <= {facetLabel} < {maxDate}',
  'search.facets.filter.chip.date.value': '{facetLabel} = {date}',
  'search.facets.filter.menu.number.lower': 'Lower than {value} ({count})',
  'search.facets.filter.menu.number.greater': 'Greater then {value} ({count})',
  'search.facets.filter.menu.number.range': 'From {minValue} to {maxValue} ({count})',
  'search.facets.filter.menu.number.value': '{value} ({count})',
  'search.facets.filter.chip.number.lower': '{facetLabel} < {value}',
  'search.facets.filter.chip.number.greater': '{value} < {facetLabel}',
  'search.facets.filter.chip.number.range': '{minValue} <= {facetLabel} < {maxValue}',
  'search.facets.filter.chip.number.value': '{facetLabel} = {value}',
  'search.facets.filter.menu.word.value': '{word} ({count})',
  'search.facets.filter.chip.word.value': '{facetLabel} = {word}',
  'search.filter.geometry.label': 'Area',
  'search.filter.entities.selection.label': 'Entities ({count})',

  'results.map.tools.tooltip.for.PICK_ON_CLICK': 'Pick entities',
  'results.map.tools.tooltip.for.DRAW_RECTANGLE': 'Draw search area',
}

export default messages
