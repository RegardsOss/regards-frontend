/**
 * Copyright 2013.2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { Locales } from '@regardsoss/form-utils'

const messages = {
  ...DataProviderDomain.frMessages,
  ...IngestDomain.frMessages,

  // 1 Chain creation/edition form
  // 1.1 Header section
  'acquisition-chain.form.create.title': 'Créer une nouvelle chaîne de d\'acquisition de données',
  'acquisition-chain.form.edit.title': 'Édition de la chaine : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplication de la chaîne : {name}',
  'acquisition-chain.form.informations-1': 'Une chaîne d\'acquisition de données doit, pour fonctionner, être associée aux éléments ci-dessous. Remarque : Les champs marqués (*) correspondent aux champs obligatoires.',
  'acquisition-chain.form.informations-2': '1. Informations générales de la chaîne.',
  'acquisition-chain.form.informations-3': '2. Définition des fichiers à acquérir.',
  'acquisition-chain.form.informations-4': '3. Stockage des fichier acquis.',
  'acquisition-chain.form.informations-5': '4. Construction des produits à partir des fichiers acquis.',

  // 1.2 General configuration section
  'acquisition-chain.form.general.section.title': 'Général',
  'acquisition-chain.form.general.section.label': 'Nom de la chaîne (*)',
  'acquisition-chain.form.general.section.active': 'Chaîne active',
  'acquisition-chain.form.general.section.periodicity': 'Cron d\'activation.',
  'acquisition-chain.form.general.section.cron.description.title': 'Format des expressions Cron acceptées.',
  'acquisition-chain.form.general.section.cron.description.tooltip': 'Format des expressions Cron acceptées.',
  'acquisition-chain.form.general.section.cron.description.close': 'Fermer',
  'acquisition-chain.form.general.section.version.mode': 'Mode de versionnement des produits (*)',
  'acquisition-chain.form.general.section.version.mode.IGNORE': 'Ignorer les produits modifiés',
  'acquisition-chain.form.general.section.version.mode.INC_VERSION': 'Créer une nouvelle version pour les produits modifiés (standard)',
  'acquisition-chain.form.general.section.version.mode.REPLACE': 'Remplacer les produits actuels par les produits modifiés',
  'acquisition-chain.form.general.section.version.mode.MANUAL': 'Choisir l\'action à réaliser lorsqu\'un produit modifié est détecté',
  'acquisition-chain.form.general.section.starting.mode': 'Mode de lancement (*)',
  'acquisition-chain.form.general.section.starting.mode.AUTO': 'Automatique (périodique)',
  'acquisition-chain.form.general.section.starting.mode.MANUAL': 'Manuel',
  'acquisition-chain.form.general.section.ingestChain.select': 'Chaîne d\'ingestion (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Sélectionner une chaîne d\'ingestion existante... ',
  'acquisition-chain.form.general.section.info.category': 'Les catégories permettent de filtrer les AIPs à aspirer par les sources de données',
  'acquisition-chain.form.general.section.category-hint': 'Nouvelle categorie',
  'acquisition-chain.form.general.section.click.category.add.warn': 'Confirmer l\'ajout de la categorie',
  'acquisition-chain.form.general.section.click.category.add.exist': 'Cette catégorie existe déjà',

  // 1.3 Storage configuration section
  'acquisition-chain.form.storage.section': 'Stockage',
  'acquisition-chain.form.general.section.storage.mode.info': 'Cette section permet de configurer comment va être géré le stockage des fichiers acquis.',
  'acquisition-chain.form.general.section.storage.mode.store.name': 'Stocker les fichiers acquis',
  'acquisition-chain.form.general.section.storage.mode.store': ' : Les fichiers seront copier dans les espaces de stockages configurés. Par défaut le chemin de stockage sera déterminé par le système, toutefois vous pouvez configurer un chemin de stockage manuellement pour chaque espace de stockage de vos fichier.',
  'acquisition-chain.form.general.section.storage.mode.ref.name': 'Referencer les fichier acquis',
  'acquisition-chain.form.general.section.storage.mode.ref': ' : Les fichiers ne seront ni copiés ni déplacés mais référencés dans l\'espace de stockage configuré avec leur emplacement actuel.',
  'acquisition-chain.form.general.section.path': 'Répertoire de stockage (optionnel)',
  'acquisition-chain.form.general.section.info.storage': 'Selectionner un ou plusieurs espaces de stockage des fichiers. Pour chaque espace de stockage, veuillez selectionner les types de fichiers à stocker.',
  'acquisition-chain.form.general.section.info.storage.no.data': 'La chaîne ne peut pas être éditée car il n\'y a pas d\'espace de stockage configuré.',
  'acquisition-chain.form.general.section.storage.ref.select': 'Sélectionner l\'espace de stockage où les fichiers sont référencés',

  // 1.3 Files configuration section
  'acquisition-chain.form.fileInfos.section': 'Fichiers',
  'acquisition-chain.form.fileInfos.list.item.title': 'Fichier',
  'acquisition-chain.form.fileInfos.options.title': 'Actions',
  'acquisition-chain.form.fileInfos.list.add.button': 'Ajouter',
  'acquisition-chain.form.fileInfos.list.delete.button': 'Supprimer',
  'acquisition-chain.form.fileInfos.list.duplicate.button': 'Dupliquer',
  'acquisition-chain.form.fileInfo.comment': 'Nom',
  'acquisition-chain.form.fileInfo.plugin.scan.label': 'Plugin de détection des données (*)',
  'acquisition-chain.form.fileInfo.mandatory': 'Obligatoire à la construction du produit',
  'acquisition-chain.form.fileInfo.mimeType': 'Mime-type (*)',
  'acquisition-chain.form.fileInfo.dataType': 'Type de donnée à générer (*)',
  'acquisition-chain.form.fileInfo.scanDirInfos': 'Répertoires de scan (*)',
  'acquisition-chain.form.fileInfo.scanDir.scannedDirectory': 'Répertoire de scan',
  'acquisition-chain.form.fileInfo.scanDir.lastModificationDate': 'A partir de',
  // 1.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Construction des produits',
  'acquisition-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Système de validation des données (*)',
  'acquisition-chain.form.plugins.product.label': 'Association des fichiers detectés à un produit (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Système de génération des métadonnées du produit (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post traitement',

  // 1.5 Actions
  'acquisition-chain.form.create.button': 'Créer',
  'acquisition-chain.form.update.button': 'Mettre à jour',
  'acquisition-chain.form.cancel.button': 'Annuler',

  // 2 Chain list
  // 2.1 Header
  'acquisition-chain.list.subtitle': 'Configuration et activation des chaînes d\'acquisition de données',
  'acquisition-product.help.deletion.message': 'Pour supprimer une chaîne, vous devez la désactiver au préalable.',
  'acquisition-chain.empty.title': 'Aucune chaine configurée',
  'acquisition-chain.no.content.message': 'Pas de requêtes',
  'acquisition-chain.loading.content.title': 'Chargement...',
  'acquisition-chain-breadcrumb.label': 'Chaînes d\'acquisition',

  // 2.2 Table header
  'acquisition-chain.list.label': 'Nom',
  'acquisition-chain.list.mode': 'Mode',
  'acquisition-chain.list.mode.AUTO': 'Automatique',
  'acquisition-chain.list.mode.MANUAL': 'Manuel',
  'acquisition-chain.list.running': 'Actif',
  'acquisition-chain.list.state': 'Etat',
  'acquisition-chain.list.activity.not.running': 'Arrêtée',
  'acquisition-chain.list.activity.not.running.date': 'Arrêtée depuis le {date}',
  'acquisition-chain.list.activity.deletion.pending': 'Suppression en cours',
  'acquisition-chain.list.activity.dialog.title': 'Activité',
  'acquisition-chain.list.activity.button.title': 'Voir l\'activité',
  'acquisition-chain.list.total-nb-products': 'Produits',
  'acquisition-chain.list.total-products.tooltip': 'Total des produits',
  'acquisition-chain.list.error-nb-products.tooltip': 'Produits en erreur',
  'acquisition-chain.list.inprogress-nb-products.tooltip': 'Produits en cours',
  'acquisition-chain.list.total-nb-files': 'Fichiers',
  'acquisition-chain.list.total-files.tooltip': 'Total des Fichiers générés par la chaîne',
  'acquisition-chain.list.error-nb-files.tooltip': 'Fichiers en erreur',
  'acquisition-chain.list.inprogress-nb-files.tooltip': 'Fichiers en cours',

  // 2.3 Table actions
  'acquisition-chain.list.toggle.error': 'Erreur durant la modification de la chaîne {chainId}',
  'acquisition-chain.list.run.tooltip': 'Lancer la chaîne',
  'acquisition-chain.list.run.error': 'Erreur durant le lancement de la chaîne de traitement {label} ({chainId})',
  'acquisition-chain.list.stop.tooltip': 'Arrêter la chaîne',
  'acquisition-chain.list.stop.error': 'Erreur durant l\'arrêt de la chaîne de traitement {label} ({chainId})',
  'acquisition-chain.list.duplicate.tooltip': 'Dupliquer la chaîne de traitement',
  'acquisition-chain.list.edit.tooltip': 'Editer la chaîne de traitement',
  'acquisition-chain.list.list.tooltip': 'Voir les détails de la session',
  'acquisition-chain.list.mode.manual': 'Manuel',
  'acquisition-chain.list.mode.auto': 'Auto',
  'acquisition-chain.list.enabled.true': 'Activé',
  'acquisition-chain.list.enabled.false': 'Désactivé',
  'acquisition-chain.list.addnew.button': 'Créer une nouvelle chaîne',
  'acquisition-chain.list.delete.confirm.title': 'Supprimer la chaîne d\'acquisition {label} ?',

  // 2.4 Table filters
  'acquisition-chain.list.filters.label.label': 'Libellé',
  'acquisition-chain.list.filters.running.label': 'Etat d\'activation',
  'acquisition-chain.list.filters.mode.label': 'Mode d\'activation',
  'acquisition-chain.list.filters.mode.AUTO': 'Automatique',
  'acquisition-chain.list.filters.mode.MANUAL': 'Manuel',
  'acquisition-chain.list.filters.running.true': 'Actives',
  'acquisition-chain.list.filters.running.false': 'Arrêtées',
  'acquisition-chain.list.refresh.button': 'Rafraîchir',
  'acquisition-chain.list.filter.button': 'Filtrer',
  'acquisition-chain.list.enable-selected.button': 'Activer la selection',
  'acquisition-chain.list.disable-selected.button': 'Désactiver la selection',
  'acquisition-chain.list.refresh.auto.label': 'Rafraîchissement Auto',
  'acquisition-chain.list.back.button': 'Retour',

  //4 Run Confirm Dialog
  'acquisition-product.run.dialog.title': 'Souhaitez-vous renommer cette session ?',
  'acquisition-product.run.dialog.message': 'Vous pouvez directement confirmer si vous ne souhaitez pas la renommer.',
  'acquisition-product.run.dialog.confirm.button': 'Confirmer',
  'acquisition-product.run.dialog.close.button': 'Fermer',

  'invalid.cron.expression': 'Cron invalide',
  ...Locales.fr,
}

export default messages
