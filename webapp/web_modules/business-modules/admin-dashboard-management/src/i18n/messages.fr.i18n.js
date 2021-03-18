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
  'dashboard.title': 'Tableau de board',
  'dashboard.refresh': 'Rafraichir',
  'dashboard.back': 'Retour',

  // Sources
  'dashboard.sources.table.column.sourceName': 'Nom',
  'dashboard.sources.table.column.referencedProducts': 'Produits référencés',
  'dashboard.sources.table.column.diffusedProducts': 'Produits diffusés',
  'dashboard.sources.title': 'Sources',
  'dashboard.sources.filter.name': 'Rechercher un nom...',
  'dashboard.sources.filter.status': 'Statut',

  ...Locales.fr,
}

export default messages
