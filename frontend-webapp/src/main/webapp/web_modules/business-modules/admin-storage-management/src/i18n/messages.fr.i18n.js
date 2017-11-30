/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'storage.locations.configuration.title': 'Configuration des espaces de stockage',
  'storage.locations.configuration.subtitle': 'Cette section vous permet de configurer les espaces de stockage utilisés par le système pour stocker les données soumises. Ci-dessous sont listés les types d\'espaces de stockage que vous pouvez utiliser. Vous pouvez pour chaque type lister les configurations existantes ou en ajouter une nouvelle. Une fois vos esapces de stockage configurés, veuillez configurer une stratégie de répartition des données depuis l\'écran précédent',
  'storage.allocations.configuration.title': 'Configuration des stratégies de répartition des données',
  'storage.allocations.configuration.subtitle': 'Cette section vous permet de configurer les stratégies permettant au système de sélectionner un espace de stockage parmis ceux configurés lors de la soumission d\'une donnée. Ci-dessous sont listés les différents type de stratégie à votre disposition. Vous pouvez pour chaque type lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.plugin.list.configurations': 'Lister les configurations',
  'storage.plugin.configuration.list.add': 'Ajouter une configuration',
  'storage.back.button': 'Retour',
}, Locales.fr)

export default messages
