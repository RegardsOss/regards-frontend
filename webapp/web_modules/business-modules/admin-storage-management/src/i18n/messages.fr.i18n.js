/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'storage.data-storage.plugins.list.subtitle': 'Permet de configurer les différents espaces de stockage utilisés par le système et de les prioriser. La priorité permet, dans le cas où des données sont stockées sur plusieurs espaces de stockage, de déterminer sur lequel d\'entre eux récupérer les données.',
  'storage.data-storage.plugins.list.header.stored-file.label': 'Fichiers stockés',
  'storage.data-storage.plugins.list.header.total-size.label': 'Taille Totale',
  'storage.data-storage.plugins.list.header.deletion-error.label': 'Erreurs de suppression',
  'storage.data-storage.plugins.list.header.storage-error.label': 'Erreurs de stockage',
  'storage.data-storage.plugins.list.header.name.label': 'Nom',
  'storage.data-storage.plugins.list.header.type.label': 'Type',
  'storage.data-storage.plugins.list.edit.button': 'Éditer la configuration',
  'storage.data-storage.plugins.list.duplicate.button': 'Dupliquer la configuration',
  'storage.data-storage.plugins.list.up.priority.button': 'Augmenter la priorité de la configuration',
  'storage.data-storage.plugins.list.down.priority.button': 'Diminuer la priorité de la configuration',
  'storage.data-storage.plugins.list.active.on.button': 'Activer ce système de stockage',
  'storage.data-storage.plugins.list.active.off.button': 'Désactiver ce système de stockage',
  'storage.data-storage.plugins.list.confirm.title': 'Suppression du stockage {name} ?',
  'storage.data-storage.plugins.list.back.button': 'Retour',
  'storage.data-storage.plugins.list.empty.title': 'Aucun espace de stockage défini',
  'storage.data-storage.plugins.list.add.button': 'Créer un espace de stockage',
  'storage.data-storage.plugins.list.relaunch.storage': 'Relancer les erreurs de stockage',
  'storage.data-storage.plugins.list.relaunch.deletion': 'Relancer les erreurs de suppression',
  'storage.data-storage.plugins.delete.confirm.title': 'Suppression des fichiers du stockage {name} ?',
  'storage.data-storage.plugins.delete.confirm.option': 'Ignorer les erreurs de suppression des fichiers physiques ?',
  'storage.data-storage.plugins.dialogs.confirm': 'Confirmer',
  'storage.data-storage.plugins.dialogs.cancel': 'Annuler',

  'storage.plugins.storage.form.create.title': 'Configuration d\'un nouvel espace de stockage',
  'storage.plugins.storage.form.edit.title': 'Configuration de l\'espace de stockage "{name}"',
  'storage.plugins.storage.form.subtitle': 'Vous pouvez configurer votre espace de stockage. Si vous ne selectionnez aucun plugin d\'accès, l\'espace de stockage sera considéré hors ligne et les fichiers ne seront pas accessible au travers de Regards.',
  'storage.plugins.storage.form.type.select.title': 'Mode de stockage',
  'storage.plugins.storage.form.type.select.label': 'Sélectionnez un mode ...',
  'storage.plugins.storage.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.plugins.storage.form.back.button': 'Annuler',
  'storage.plugins.storage.form.submit.button': 'Créer',
  'storage.plugins.storage.form.submit.edit.button': 'Modifier',
  'storage.plugins.storage.form.plugin.label': 'Plugin de détection des données',
  'storage.plugins.storage.form.allocated-size.label': 'Taille allouée',
  'storage.plugins.storage.form.name.label': 'Nom',
  'invalid.name.expression': 'Nom invalide, seul les caractères alphanumérique, - et _ sont acceptés',

  'storage.allocation-strategy.plugins.list.title': 'Configuration des stratégies de répartition des données',
  'storage.allocation-strategy.plugins.list.subtitle': 'Cette section vous permet de configurer les stratégies permettant au système de sélectionner un espace de stockage parmi ceux configurés lors de la soumission d\'une donnée. Ci-dessous sont listés les différents types de stratégie à votre disposition. Vous pouvez pour chaque type lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.allocation-strategy.plugins.list.header.name.label': 'Nom',
  'storage.allocation-strategy.plugins.list.header.type.label': 'Type',
  'storage.allocation-strategy.plugins.list.header.active.label': 'Actif',
  'storage.allocation-strategy.plugins.list.empty.title': 'Aucune stratégie définie',
  'storage.allocation-strategy.plugins.list.edit.button': 'Éditer',
  'storage.allocation-strategy.list.add.button': 'Ajouter',
  'storage.allocation-strategy.plugins.list.confirm.delete.title': 'Suppression de la stratégie de répartition {name} ?',
  'storage.allocation-strategy.plugins.list.active.on.button': 'Activer la stratégie',
  'storage.allocation-strategy.plugins.list.active.off.button': 'Désactiver la stratégie',

  'storage.plugins.allocation.form.create.title': 'Ajout d\'une nouvelle stratégie de répartition des données',
  'storage.plugins.allocation.form.edit.title': 'Édition de la stratégie de répartition "{name}"',
  'storage.plugins.allocation.form.create.subtitle': 'Après avoir sélectionné le type de répartition désiré, veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.allocation.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.allocation.form.type.select.title': 'Type de répartition',
  'storage.plugins.allocation.form.type.select.label': 'Sélectionnez un type ...',
  'storage.plugins.allocation.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.plugins.allocation.form.back.button': 'Annuler',

  'storage.security-delegation.plugins.list.title': 'Configuration des droits d\'accès aux fichiers archivés',
  'storage.security-delegation.plugins.list.subtitle': 'Permet de configurer la stratégie de droit d\'accès aux fichiers archivés par REGARDS. Ci-dessous sont listés les différents types de stratégies à votre disposition. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Attention, une seule configuration de stratégie doit être active.',
  'storage.security-delegation.plugins.list.header.name.label': 'Nom',
  'storage.security-delegation.plugins.list.header.type.label': 'Type',
  'storage.security-delegation.plugins.list.header.active.label': 'Actif',
  'storage.security-delegation.plugins.list.empty.title': 'Aucune stratégie de droit d\'accès n\'est active',
  'storage.security-delegation.plugins.list.edit.button': 'Éditer',
  'storage.security-delegation.list.add.button': 'Ajouter',
  'storage.security-delegation.plugins.list.confirm.delete.title': 'Suppression de la stratégie de droit d\'accès {name} ?',
  'storage.security-delegation.plugins.list.active.on.button': 'Activer la stratégie',
  'storage.security-delegation.plugins.list.active.off.button': 'Désactiver la stratégie',

  'storage.plugins.security.form.create.title': 'Ajout d\'une nouvelle stratégie de droit d\'accès des données',
  'storage.plugins.security.form.edit.title': 'Édition de la stratégie de droit d\'accès "{name}"',
  'storage.plugins.security.form.create.subtitle': 'Après avoir sélectionné le type de droit d\'accès désiré, veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.security.form.edit.subtitle': 'Veuillez renseigner les paramètres de configuration associés.',
  'storage.plugins.security.form.type.select.title': 'Type de droit d\'accès',
  'storage.plugins.security.form.type.select.label': 'Sélectionnez un type ...',
  'storage.plugins.security.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.plugins.security.form.back.button': 'Annuler',
  'storage.plugins.security.form.add.button': 'Ajouter',

  'storage.locations.size.title': 'Taux d\'utilisation des espaces de stockage',
  'storage.locations.configuration.title': 'Configuration des espaces de stockage',
  'storage.locations.configuration.subtitle': 'Cette section vous permet de configurer les espaces de stockage utilisés par le système pour stocker les données soumises. Ci-dessous sont listés les types d\'espaces de stockage que vous pouvez utiliser. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Une fois vos espaces de stockage configurés, veuillez configurer une stratégie de répartition des données depuis l\'écran précédent',

  'storage.back.button': 'Retour',
}, Locales.fr)

export default messages
