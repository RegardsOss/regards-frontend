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
  'storage.data-storage.plugins.list.title': 'Configuration des espaces de stockage',
  'storage.data-storage.plugins.list.subtitle': 'Cette section vous permer de configurer les différents espaces de stockage utilisés par le stystème et de les prioriser. La priorité permet, dans le cas ou des données sont stockées sur plusieurs systèmes de stockage, de déterminer sur lequel d\'entre eux récupérer les données.',
  'storage.data-storage.plugins.list.header.name.label': 'Mode de stockage',
  'storage.data-storage.plugins.list.header.type.label': 'Type de stockage',
  'storage.data-storage.plugins.list.header.active.label': 'Activer/Désactiver',
  'storage.data-storage.plugins.list.edit.button': 'Editer la configuration',
  'storage.data-storage.plugins.list.duplicate.button': 'Dupliquer la configuration',
  'storage.data-storage.plugins.list.up.priority.button': 'Augmenter la priorité de la configuration',
  'storage.data-storage.plugins.list.down.priority.button': 'Diminuer la priorité de la configuration',
  'storage.data-storage.plugins.list.active.on.button': 'Activer ce système de stockage',
  'storage.data-storage.plugins.list.active.off.button': 'Désactiver ce système de stockage',
  'storage.data-storage.plugins.list.add.button': 'Ajouter un nouveau système de stockage',
  'storage.data-storage.plugins.list.back.button': 'Retour',
  'storage.data-storage.plugins.list.empty.title': 'Aucun mode de stockage défini',

  'storage.data-storage.plugins.form.create.title': 'Ajout d\'un nouvel espace de stockage',
  'storage.data-storage.plugins.form.edit.title': 'Edition de l\'espace de stockage "{name}"',
  'storage.data-storage.plugins.form.create.subtitle': 'Après avoir sélectionner le mode de stockage désiré, veuillez renseigner les paramètres de configuration associés.',
  'storage.data-storage.plugins.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'storage.data-storage.plugins.form.type.select.title': 'Mode de stockage',
  'storage.data-storage.plugins.form.type.select.label': 'Sélectionnez un mode ...',
  'storage.data-storage.plugins.form.parameters.title': 'Paramètres de configuration',

  'storage.locations.size.title': 'Taux d\'utilisation des espaces de stockage',
  'storage.locations.configuration.title': 'Configuration des espaces de stockage',
  'storage.locations.configuration.subtitle': 'Cette section vous permet de configurer les espaces de stockage utilisés par le système pour stocker les données soumises. Ci-dessous sont listés les types d\'espaces de stockage que vous pouvez utiliser. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Une fois vos esapces de stockage configurés, veuillez configurer une stratégie de répartition des données depuis l\'écran précédent',
  'storage.allocations.configuration.title': 'Configuration des stratégies de répartition des données',
  'storage.allocations.configuration.subtitle': 'Cette section vous permet de configurer les stratégies permettant au système de sélectionner un espace de stockage parmis ceux configurés lors de la soumission d\'une donnée. Ci-dessous sont listés les différents types de stratégie à votre disposition. Vous pouvez pour chaque type lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.security.configuration.title': 'Configuration des droits d\'accès aux fichiers archivés',
  'storage.security.configuration.subtitle': 'Cette section vous permet de configurer la stratégie de droit d\'accès aux fichiers archivés par REGARDS. Ci-dessous sont listés les différents types de stratégies à votre disposition. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.security.no.plugin.title': 'Aucune stratégie de droit d\'accès n\'est active',
  'storage.security.no.plugin.subtitle': 'L\'accès aux fichiers archivés ne fonctionnera pas tant qu\'aucun plugin ne sera défini et actif',
  'storage.security.plugin.defined.title': 'L\'accès aux fichiers archivés est configuré',
  'storage.security.plugin.defined.subtitle': ' ',
  'storage.security.too.many.plugin.title': 'Plusieurs stratégies de droit d\'accès sont actives',
  'storage.security.too.many.plugin.subtitle': 'L\'accès aux fichiers archivés ne fonctionnera pas tant que plus d\'un plugin sera actif',
  'storage.plugin.list.configurations': 'Lister les configurations',
  'storage.plugin.configuration.list.add': 'Ajouter une configuration',
  'storage.back.button': 'Retour',
}, Locales.fr)

export default messages
