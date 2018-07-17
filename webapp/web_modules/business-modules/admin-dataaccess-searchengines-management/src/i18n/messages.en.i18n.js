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
  'dataaccess.searchengines.list.header.id.label': 'Identifier',
  'dataaccess.searchengines.list.header.name.label': 'Label',
  'dataaccess.searchengines.list.header.type.label': 'Search engine',
  'dataaccess.searchengines.list.edit.button': 'Edit engine',
  'dataaccess.searchengines.list.confirm.title': 'Delete search engine {name} ?',
  'dataaccess.searchengines.list.back.button': 'Back',
  'dataaccess.searchengines.list.empty.title': 'No search engine confgiuration available',
  'dataaccess.searchengines.list.add.button': 'Add a new search engine',

  'dataaccess.searchengines.form.create.title': 'Add new search engine',
  'dataaccess.searchengines.form.edit.title': 'Edit search engine "{name}"',
  'dataaccess.searchengines.form.create.subtitle': 'First you have to select a search engine. When its done, you have to configure the needed parameters.',
  'dataaccess.searchengines.form.edit.subtitle': 'Please configure the search engines parameters.',
  'dataaccess.searchengines.form.type.select.title': 'Search engine',
  'dataaccess.searchengines.form.type.select.label': 'Select a search engine ...',
  'dataaccess.searchengines.form.invalid.id': 'Search engine configuration selected does not exists anymore.',
  'dataaccess.searchengines.form.back.button': 'Cancel',

}, Locales.en)

export default messages
