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

/**
 * i18n messages english language
 * @author Sébastien Binda
 */
const messages = {
  'embedded.html.styles.group.title': 'Display',
  'embedded.html.admin.css.height.label': 'CSS Height property',
  'embedded.html.admin.css.width.label': 'CSS Width property',
  'embedded.html.content.group.title': 'Content by locale',
  'embedded.html.admin.html.url.en': 'English HTML file URL',
  'embedded.html.admin.html.url.fr': 'French HTML file URL',
  'embedded.html.admin.html.no.url.error': 'There must be at least one URL defined',
  'embedded.html.content.preview.title': 'Preview',
  'embedded.html.content.preview.locale.selector': 'Preview locale',
  'embedded.html.content.preview.locale.en': 'English',
  'embedded.html.content.preview.locale.fr': 'French',
  'embedded.html.content.preview.no.page': 'There is no page URL',
  ...Locales.en,
}

export default messages
