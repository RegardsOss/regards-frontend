/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'storage.location.list.title': 'Configuration des espaces de stockage',
  'storage.location.list.subtitle': 'Permet de configurer les différents espaces de stockage utilisés par le système et de les prioriser. La priorité permet, dans le cas où des données sont stockées sur plusieurs espaces de stockage, de déterminer celui utilisé pour récupérer les données.',
  'storage.location.form.help-message': 'Taille Allouée : C\'est la taille limite de stockage des fichiers. Si le stockage est presque plein, le service ce met en état de maintenance. Pour désactiver ce fonctionnement, ne saisissez pas de taille allouée.',
  'storage.location.type.online.name': 'Online   : ',
  'storage.location.type.nearline.name': 'Nearline : ',
  'storage.location.type.offline.name': 'Offline  : ',
  'storage.location.type.cache.name': 'Cache    : ',
  'storage.location.type.online.description': 'Espace de stockage accessible de manière synchrone. Les fichiers stockés peuvent être téléchargés directement.',
  'storage.location.type.nearline.description': 'Espace de stockage distant. Les fichiers stockés doivent être rapatriés dans le cache avant d\'être accessibles.',
  'storage.location.type.offline.description': 'Espace de stockage deconnecté. Les fichiers ne sont pas accessibles.',
  'storage.location.type.cache.description': 'Espace de stockage unique et dedié aux fichiers rapatriés provenant des espaces de stockage Nearline. La seule action possible sur cet espace de stockage est la demande de suppression des fichiers dont la date de validité a expirée.',
  'storage.location.list.header.stored-file.label': 'Fichiers stockés',
  'storage.location.list.header.total-size.label': 'Taille Totale',
  'storage.location.list.header.deletion-error.label': 'Erreurs de suppression',
  'storage.location.list.header.storage-error.label': 'Erreurs de stockage',
  'storage.location.list.header.name.label': 'Nom',
  'storage.location.list.header.type.label': 'Type',
  'storage.location.list.header.activity': 'Activité',
  'storage.location.list.size.no.quota': 'Aucune limite définie',
  'storage.location.list.activity.none': 'Aucune',
  'storage.location.list.activity.storing': 'Stockages en cours ...',
  'storage.location.list.activity.deleting': 'Suppressions en cours ...',
  'storage.location.list.activity.copying': 'Copies en cours ...',
  'storage.location.list.errors.count': `{errorsCount, plural, 
    =0 {-} 
    other {#}
  }`,
  'storage.location.list.edit.button': 'Éditer la configuration',
  'storage.location.list.copy.button': 'Copier les fichiers',
  'storage.location.list.delete-files.button': 'Effacer les fichiers de l\'espace de stockage',
  'storage.location.list.up.priority.button': 'Augmenter la priorité de la configuration',
  'storage.location.list.down.priority.button': 'Diminuer la priorité de la configuration',
  'storage.location.list.confirm.title': 'Suppression du stockage {name} ?',
  'storage.location.list.back.button': 'Retour',
  'storage.location.list.empty.title': 'Aucun espace de stockage défini',
  'storage.location.list.add.button': 'Créer un espace de stockage',
  'storage.location.list.relaunch.storage': 'Relancer les erreurs de stockage',
  'storage.location.list.relaunch.deletion': 'Relancer les erreurs de suppression',
  'storage.location.list.delete.storage': 'Supprimer les erreurs de stockage',
  'storage.location.list.view.storage': 'Visualiser les erreurs de stockage',
  'storage.location.list.delete.deletion': 'Supprimer les erreurs de suppression',
  'storage.location.list.view.deletion': 'Visualiser les erreurs de suppression',
  'storage.location.delete.confirm.title': 'Suppression des fichiers du stockage {name} ?',
  'storage.location.errors.delete.confirm.title': 'Suppression des erreurs du stockage {name} ?',
  'storage.location.errors.relaunch.confirm.title': 'Relance des erreurs du stockage {name} ?',
  'storage.location.delete.confirm.option': 'Ignorer les erreurs de suppression des fichiers physiques ?',
  'storage.location.dialogs.confirm': 'Confirmer',
  'storage.location.dialogs.cancel': 'Annuler',
  'storage.location.copy.confirm.title': 'Copier les fichiers de l\' espace de stockage {name} vers...',
  'storage.location.copy.confirm.path-destination': 'Répertoire de destination (optionnel)',
  'storage.location.copy.confirm.path-source': 'Répertoire d\'origine à copier (optionnel)',

  'storage.location.errors.view.title': 'Erreurs sur l\'espace de stockage <{name}>',
  'storage.location.errors.view.table.label': 'Fichier',
  'storage.location.errors.view.table.error': 'Cause de l\'erreur',

  'storage.data-storage.monitoring.button': 'Recalculer les occupations',
  'storage.data-storage.refresh.button': 'Rafraîchir',
  'storage.data-storage.stop.button': 'Forcer l\'arrêt des traitements',
  'storage.location.stop.confirm.title': 'Forcer l\'arrêt de tout les traitements',
  'storage.location.stop.confirm.message': 'Cette action va arrêter tous les traitements en cours et les passer en erreur.',
  'storage.data-storage.monitoring.dialog.title': 'Lancer la supervision des espaces de stockages',
  'storage.data-storage.monitoring.dialog.checkbox': 'La supervision des espace de stockage permet de calculer pour chaque espace le nombre de fichiers stockés et la taille occupée ',

  'storage.location.form.create.title': 'Configuration d\'un nouvel espace de stockage',
  'storage.location.form.edit.title': 'Configuration de l\'espace de stockage "{name}"',
  'storage.location.form.subtitle': 'Vous pouvez configurer votre espace de stockage. Si vous ne selectionnez aucun plugin d\'accès, l\'espace de stockage sera considéré hors ligne et les fichiers ne seront pas accessible au travers de Regards.',
  'storage.location.form.type.select.title': 'Mode de stockage',
  'storage.location.form.type.select.label': 'Sélectionnez un mode ...',
  'storage.location.form.invalid.id': 'La configuration sélectionnée n\'existe plus',
  'storage.location.form.back.button': 'Annuler',
  'storage.location.form.plugin.label': 'Plugin d\'accès aux données',
  'storage.location.form.allocated-size.label': 'Taille allouée',
  'storage.location.form.name.label': 'Nom',
  'storage.location.form.submit.button': 'Créer',
  'storage.location.form.submit.edit.button': 'Modifier',
  'invalid.name.expression': 'Nom invalide, seul les caractères alphanumérique, - et _ sont acceptés',

  'storage.location.copy.from.label': 'De : ',
  'storage.location.copy.to.label': 'Vers : ',
  'storage.location.copy.submit': 'Copier les fichiers de données',
  'storage.location.copy.submit.manifest': 'Copier les manifestes',

  'storage.locations.size.title': 'Taux d\'utilisation des espaces de stockage',
  'storage.locations.configuration.title': 'Configuration des espaces de stockage',
  'storage.locations.configuration.subtitle': 'Cette section vous permet de configurer les espaces de stockage utilisés par le système pour stocker les données soumises. Ci-dessous sont listés les types d\'espaces de stockage que vous pouvez utiliser. Pour chaque type, vous pouvez lister les configurations existantes ou en ajouter une nouvelle. Une fois vos espaces de stockage configurés, veuillez configurer une stratégie de répartition des données depuis l\'écran précédent',

  'storage.back.button': 'Retour',

  'storage.type.ONLINE': 'Online',
  'storage.type.OFFLINE': 'Offline',
  'storage.type.NEARLINE': 'Nearline',
  'storage.type.CACHE': 'Cache',
  ...Locales.fr,
}

export default messages
