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
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'dataaccess.searchengines.list.title': 'Configure catalog search engines',
  'dataaccess.searchengines.list.subtitle': 'This section allows you to configure data catalog search engines. Each engine configuration can be assocaited to all catalog o to a specific dataset.',
  'dataaccess.searchengines.list.header.label': 'Label',
  'dataaccess.searchengines.list.header.engine': 'Search engine',
  'dataaccess.searchengines.list.header.dataset': 'Dataset',
  'dataaccess.searchengines.list.edit.button': 'Edit engine',
  'dataaccess.searchengines.list.confirm.title': 'Delete search engine {name} ?',
  'dataaccess.searchengines.list.back.button': 'Back',
  'dataaccess.searchengines.list.empty.title': 'No search engine confgiuration available',
  'dataaccess.searchengines.list.add.button': 'Add a new search engine',

  'dataaccess.searchengines.form.create.title': 'Add new search engine',
  'dataaccess.searchengines.form.edit.title': 'Edit search engine "{name}"',
  'dataaccess.searchengines.form.create.subtitle': 'This form allows you to configure a new search engine. A search engine can be used for all catalog search or for a specific dataset search. After choosing an engine type, you can use an existing configuration or create a new one.',
  'dataaccess.searchengines.form.edit.subtitle': 'Please configure the search engines parameters.',
  'dataaccess.searchengines.form.type.select.title': 'Search engine',
  'dataaccess.searchengines.form.type.select.label': 'Select a search engine ...',
  'dataaccess.searchengines.form.invalid.id': 'Search engine configuration selected does not exists anymore.',
  'dataaccess.searchengines.form.back.button': 'Cancel',

  'search-engines.form.label': 'Label',
  'search-engines.form.label.infos': 'Search engine short description',
  'search-engines.form.dataset.type.all': 'Use this search engine for every search on catalog',
  'search-engines.form.dataset.type.selected': 'Use this search engine only for search on the selected dataset',
  'search-engines.form.dataset.section.title': 'Select dataset',
  'search-engines.form.dataset': 'Select the dataset for which this search engine is for.',
  'search-engines.form.dataset.hinttext': 'This field allows tou to filter dasets from all datasets availables.',
  'search-engines.form.dataset.infos': 'The shown dataset list can be a non-exhaustive list. To find not displayed datasets, please filter the list giving the first caracters of his label.',
  'component.plugin-parameter.action.choose-plugin': 'Choose a search engine',
  'component.plugin-parameter.action.create-plugin': 'New configuration',
  'component.plugin-parameter.action.reset': 'Remove selected search engine',
  'component.plugin-parameter.no-plugin-available': 'No search engine available',
  'component.plugin-parameter.new.conf.option': 'New configuration',
  'search-engines.form.action.save': 'Create',
  'search-engines.form.action.cancel': 'Cancel',

}, Locales.en)

export default messages
