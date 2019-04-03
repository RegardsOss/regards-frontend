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
  'form.configuration.visible.tabs.message': 'Result views to display',
  'form.configuration.result.type.data': 'Display "data" results',
  'form.configuration.result.type.data_datasets': 'Display "data" and "dataset" view in results',
  'form.configuration.result.type.documents': 'Display "document" view in results',
  'form.configuration.results.options.message': 'Results available options',
  'form.configuration.result.enable.facettes.label': 'Enable results filtering by facets',
  'form.configuration.result.select.facettes.initially.label': 'Show facets initially',
  'form.configuration.result.enable.download.label': 'Enable download associated files',
  'form.configuration.result.enable.quicklooks.label': 'Enable quicklook view on data',
  'form.configuration.results.quicklooks.message': 'Quicklooks configuration',
  'form.configuration.result.width.quicklooks.label': 'Quicklook width',
  'form.configuration.result.spacing.quicklooks.label': 'Quicklook spacing',
  'form.configuration.result.datasets.title.message': 'Dataset view title',
  'form.configuration.result.datasets.section.label.en': 'English',
  'form.configuration.result.datasets.section.label.fr': 'French',
  'form.configuration.result.data.titles.message': 'Data view title',
  'form.configuration.result.data.section.label.en': 'English',
  'form.configuration.result.data.section.label.fr': 'French',
  'form.configuration.result.initial.view.mode': 'Initial display mode',
  'form.configuration.result.show.list.initially': 'List',
  'form.configuration.result.show.table.initially': 'Table',
  'form.configuration.result.show.quicklook.initially': 'Quicklooks',
  'form.attributes.configuration.section.title': 'Displayed table columns and attributes',
  'form.attributes.regroupement.form.title': 'Add new attributes clustering',
  'form.attributes.regroupement.description': 'A clustering of attributes allows you to display multiples attributes of a search result object into the same column of the results list.<br/>'
    + ' Please enter the new clustering label (that must be unique) and select attributes to cluster.',
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
  'form.attributes.section.clear.filters.tooltip': 'Clear current filter',
  'form.attributes.filter.label': 'Search for attribute label ... ',
  'form.attributes.regroupement.remove': 'Remove',
  'form.attributes.regroupement.edit': 'Edit',
  'form.attributes.delete.confirm.title': 'Remove the attributes clustering {name}?',
  'form.attributes.regroupement.form.title.update': 'Update clustering : {name}',
  'form.attribute.conf.selection.tab.label': 'Data display',
  'form.attribute.dataset.conf.selection.tab.label': 'Datasets display',
  'form.attribute.quicklook.conf.selection.tab.label': 'Quicklooks display',
  'form.attribute.conf.columns': 'Displayed results columns',
  'form.attribute.conf.no.column': 'Add here table columns to show in results',
  'form.attribute.conf.facets': 'Results filters',
  'form.attribute.conf.no.facet': 'Add here filters that will be available on results',
  'form.attribute.conf.sorting': 'Initial results sorting attributes',
  'form.attribute.conf.no.sorting': 'Add here attributes that will be used to sort inital results, from greater to lower significance',

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
  'no.download.tooltip': 'No file or unsufficient user rights',
  'download.no.online.file.tooltip': 'All files are offline',
  'show.entity.services.tooltip': 'Services',
  'show.description.tooltip': 'Details',
  'search.related.objects': 'View dataset content',
  'add.to.cart.tooltip': 'Add item to my cart',
  'add.selection.to.cart.label': 'Add to basket',
  'add.selection.to.cart.tooltip': 'Add selected items to my cart',
  'table.filter.only.quicklook.label': 'Only quicklook',
  'table.filter.select.only.quicklook.tooltip': 'Select to display only elements with quicklooks',
  'table.filter.deselect.only.quicklook.label': 'Unselect to display all elements',
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
}

export default messages
