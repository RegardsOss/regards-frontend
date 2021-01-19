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
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

/**
 * i18n messages english language
 * @author Léo Mieulet
 */
const messages = {
  'map.admin.info': 'You can consult some configuration examples on <a style="color: inherit;" href="https://github.com/MizarWeb/MizarWidget/tree/master/conf">the repository of MizarWidget</a>',
  'map.admin.json-invalid': 'Invalid JSON',
  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
