/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @author Sébastien Binda
 */
const messages = {
  'dataaccess.searchengines.list.title': 'Configure catalog search protocol',
  'dataaccess.searchengines.list.subtitle': 'Each protocol configuration can be associated to all catalog o to a specific dataset.',
  'dataaccess.searchengines.list.header.label': 'Label',
  'dataaccess.searchengines.list.header.engine': 'Search protocol',
  'dataaccess.searchengines.list.header.dataset': 'Dataset',
  'dataaccess.searchengines.list.edit.button': 'Edit protocol',
  'dataaccess.searchengines.list.info.button': 'Access information',
  'dataaccess.searchengines.list.confirm.title': 'Delete search protocol {name} ?',
  'dataaccess.searchengines.list.back.button': 'Back',
  'dataaccess.searchengines.list.empty.title': 'No search protocol configuration available',
  'dataaccess.searchengines.list.add.button': 'Save protocol',

  'dataaccess.searchengines.info.title': 'Access information for catalog search with < {name} > protocol',
  'dataaccess.searchengines.info.content.all': 'This protocol allows you to search data over the whole catalog. To do so, you can use the here-under endpoint.',
  'dataaccess.searchengines.info.content.dataset': 'This protocol allows you to search data from the dataset {dataset}. To do so, you can use the here-under endpoint.',
  'dataaccess.searchengines.info.test': 'Click here to check protocol request',
  'dataaccess.searchengines.info.test.descriptor': 'Click here to retrieve protocol descriptor',
  'dataaccess.searchengines.info.test.stac': 'Click here to navigate in the STAC catalog',
  'dataaccess.searchengines.info.close': 'Close',

  'dataaccess.searchengines.form.create.title': 'Configure search protocol',
  'dataaccess.searchengines.form.edit.title': 'Edit search protocol "{name}"',
  'dataaccess.searchengines.form.create.subtitle': 'A search protocol can be used for all catalog search or for a specific dataset search. After choosing an engine type, you can use an existing configuration or create a new one.',
  'dataaccess.searchengines.form.edit.subtitle': 'Please configure the search protocol parameters.',
  'dataaccess.searchengines.form.type.select.label': 'Select a protocol ...',
  'dataaccess.searchengines.form.invalid.id': 'Search protocol configuration selected does not exist anymore.',
  'dataaccess.searchengines.form.no.plugin.available': 'No search protocol available.',
  'dataaccess.searchengines.form.back.button': 'Cancel',

  'search-engines.form.label': 'Label',
  'search-engines.form.label.infos': 'Search protocol short description',
  'search-engines.form.dataset.type.all': 'Use this search protocol for every search on catalog',
  'search-engines.form.dataset.type.selected': 'Use this search protocol only for search on the selected dataset',
  'search-engines.form.dataset.section.title': 'Select dataset',
  'search-engines.form.dataset': 'Select the dataset for which this search protocol is for.',
  'search-engines.form.dataset.hinttext': 'This field allows you to filter datasets from all datasets available.',
  'search-engines.form.dataset.infos': 'The shown dataset list can be a non-exhaustive list. To find not displayed datasets, please filter the list giving the first characters of his label.',
  'search-engines.form.new.plugin.section.title': 'Create new configuration for protocol {engine}',
  'component.plugin-parameter.action.choose-plugin': 'Choose a search protocol',
  'component.plugin-parameter.action.create-plugin': 'New configuration',
  'component.plugin-parameter.action.reset': 'Remove selected search protocol',
  'component.plugin-parameter.no-plugin-available': 'No search protocol available',
  'component.plugin-parameter.new.conf.option': 'New configuration',
  'search-engines.form.create.action': 'Create',
  'search-engines.form.update.action': 'Update',
  'search-engines.form.cancel.action': 'Cancel',

  'plugin.configuration.form.description.more': 'Display protocol advanced description',

  'dataaccess.searchengines.list.confirm.delete.title': 'Delete selected protocol?',
  ...Locales.en,
}

export default messages
