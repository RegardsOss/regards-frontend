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
  'storage.data-storage.plugins.list.title': 'Configuration des espaces de stockage',
  'storage.data-storage.plugins.list.subtitle': 'Cette section vous permet de configurer les différents espaces de stockage utilisés par le stystème et de les prioriser. La priorité permet, dans le cas ou des données sont stockées sur plusieurs systèmes de stockage, de déterminer sur lequel d\'entre eux récupérer les données.',
  'storage.data-storage.plugins.list.header.priority.label': 'Priorité',
  'storage.data-storage.plugins.list.header.id.label': 'Identifiant',
  'storage.data-storage.plugins.list.header.name.label': 'Libellé',
  'storage.data-storage.plugins.list.header.type.label': 'Tyoe de stockage',
  'storage.data-storage.plugins.list.header.active.label': 'Activer',
  'storage.data-storage.plugins.list.edit.button': 'Editer la configuration',
  'storage.data-storage.plugins.list.duplicate.button': 'Dupliquer la configuration',
  'storage.data-storage.plugins.list.up.priority.button': 'Augmenter la priorité de la configuration',
  'storage.data-storage.plugins.list.down.priority.button': 'Diminuer la priorité de la configuration',
  'storage.data-storage.plugins.list.active.on.button': 'Activer ce système de stockage',
  'storage.data-storage.plugins.list.active.off.button': 'Désactiver ce système de stockage',
  'storage.data-storage.plugins.list.confirm.title': 'Suppression du type de stockage {name} ?',
  'storage.data-storage.plugins.list.back.button': 'Retour',
  'storage.data-storage.plugins.list.empty.title': 'Aucun espace de stockage défini',
  'storage.data-storage.plugins.list.add.button': 'Créer un espace de stockage',
  'storage.data-storage.plugins.online.list.title': 'Espaces de stockage en ligne',
  'storage.data-storage.plugins.online.list.subtitle': 'Les espaces de stockage en ligne sont des espaces directement accessibles où les données pourront être téléchargées directement.',
  'storage.data-storage.plugins.online.list.add.button': 'Créer un espace de stockage en ligne',
  'storage.data-storage.plugins.nearline.list.title': 'Espaces de stockage distants',
  'storage.data-storage.plugins.nearline.list.subtitle': 'Les espaces de stockage distants sont des espaces pour lesquels la récupération des données peut être longue. De ce fait les données stockées sur ces espaces ne sont pas téléchargeables directement.',
  'storage.data-storage.plugins.nearline.list.add.button': 'Créer un espace de stockage distant',

  'storage.plugins.storage.form.create.title': 'Ajout d\'un nouvel espace de stockage',
  'storage.plugins.storage.form.edit.title': 'Edition de l\'espace de stockage "{name}"',
  'storage.plugins.storage.form.create.subtitle': 'Après avoir sélectionné le type de stockage désiré, veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.storage.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.storage.form.type.select.title': 'Type de stockage',
  'storage.plugins.storage.form.type.select.label': 'Sélectionnez un type ...',
  'storage.plugins.storage.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.plugins.storage.form.back.button': 'Annuler',

  'storage.allocation-strategy.plugins.list.title': 'Configuration des stratégies de répartition des données',
  'storage.allocation-strategy.plugins.list.subtitle': 'Cette section vous permet de configurer les stratégies permettant au système de sélectionner un espace de stockage parmis ceux configurés lors de la soumission d\'une donnée. Ci-dessous sont listés les différents types de stratégie à votre disposition. Vous pouvez pour chaque type lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.allocation-strategy.plugins.list.header.name.label': 'Nom',
  'storage.allocation-strategy.plugins.list.header.type.label': 'Type',
  'storage.allocation-strategy.plugins.list.header.active.label': 'Actif',
  'storage.allocation-strategy.plugins.list.empty.title': 'Aucune stratégie définie',
  'storage.allocation-strategy.plugins.list.edit.button': 'Editer',
  'storage.allocation-strategy.list.add.button': 'Ajouter',
  'storage.allocation-strategy.plugins.list.confirm.delete.title': 'Suppression de la strategie de répartition {name} ?',
  'storage.allocation-strategy.plugins.list.active.on.button': 'Activer la stratégie',
  'storage.allocation-strategy.plugins.list.active.off.button': 'Désactiver la stratégie',

  'storage.plugins.allocation.form.create.title': 'Ajout d\'une nouvelle stratégie de répartition des données',
  'storage.plugins.allocation.form.edit.title': 'Edition de la sttratégie de répartition "{name}"',
  'storage.plugins.allocation.form.create.subtitle': 'Après avoir sélectionné le type de répartition désiré, veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.allocation.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.allocation.form.type.select.title': 'Type de répartition',
  'storage.plugins.allocation.form.type.select.label': 'Sélectionnez un type ...',
  'storage.plugins.allocation.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.plugins.allocation.form.back.button': 'Annuler',

  'storage.security-delegation.plugins.list.title': 'Configuration des droits d\'accès aux fichiers archivés',
  'storage.security-delegation.plugins.list.subtitle': 'Cette section vous permet de configurer la stratégie de droit d\'accès aux fichiers archivés par REGARDS. Ci-dessous sont listés les différents types de stratégies à votre disposition. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.security-delegation.plugins.list.header.name.label': 'Nom',
  'storage.security-delegation.plugins.list.header.type.label': 'Type',
  'storage.security-delegation.plugins.list.header.active.label': 'Actif',
  'storage.security-delegation.plugins.list.empty.title': 'Aucune stratégie de droit d\'accès n\'est active',
  'storage.security-delegation.plugins.list.edit.button': 'Editer',
  'storage.security-delegation.list.add.button': 'Ajouter',
  'storage.security-delegation.plugins.list.confirm.delete.title': 'Suppression de la strategie de droit d\'accès {name} ?',
  'storage.security-delegation.plugins.list.active.on.button': 'Activer la stratégie',
  'storage.security-delegation.plugins.list.active.off.button': 'Désactiver la stratégie',

  'storage.plugins.security.form.create.title': 'Ajout d\'une nouvelle stratégie de droit d\'accès des données',
  'storage.plugins.security.form.edit.title': 'Edition de la stratégie de droit d\'accès "{name}"',
  'storage.plugins.security.form.create.subtitle': 'Après avoir sélectionné le type de droit d\'accès désiré, veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.security.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.security.form.type.select.title': 'Type de droit d\'accès',
  'storage.plugins.security.form.type.select.label': 'Sélectionnez un type ...',
  'storage.plugins.security.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.plugins.security.form.back.button': 'Annuler',

  'storage.locations.size.title': 'Taux d\'utilisation des espaces de stockage',
  'storage.locations.configuration.title': 'Configuration des espaces de stockage',
  'storage.locations.configuration.subtitle': 'Cette section vous permet de configurer les espaces de stockage utilisés par le système pour stocker les données soumises. Ci-dessous sont listés les types d\'espaces de stockage que vous pouvez utiliser. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Une fois vos espaces de stockage configurés, veuillez configurer une stratégie de répartition des données depuis l\'écran précédent',

  'storage.back.button': 'Retour',
}, Locales.fr)

export default messages
