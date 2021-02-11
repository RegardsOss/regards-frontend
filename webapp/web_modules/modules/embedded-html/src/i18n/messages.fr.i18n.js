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
 * i18n messages French language
 * @author Sébastien Binda
 */
const messages = {
  'embedded.html.styles.group.title': 'Présentation',
  'embedded.html.admin.css.height.label': 'Propriété CSS Height',
  'embedded.html.admin.css.width.label': 'Propriété CSS Width',
  'embedded.html.content.group.title': 'Contenu par langue',
  'embedded.html.admin.html.url.en': 'Url d\'accès au fichier HTML en anglais',
  'embedded.html.admin.html.url.fr': 'Url d\'accès au fichier HTML en français',
  'embedded.html.admin.html.no.url.error': 'Il doit au moins y avoir une URL définie',
  'embedded.html.content.preview.title': 'Prévisualisation',
  'embedded.html.content.preview.locale.selector': 'Langue de la prévisualisation',
  'embedded.html.content.preview.locale.en': 'Anglais',
  'embedded.html.content.preview.locale.fr': 'Français',
  'embedded.html.content.preview.no.page': 'Il n\'y a aucune URL définie',
  ...Locales.fr,
}

export default messages
