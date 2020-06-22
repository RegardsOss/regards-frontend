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

const messages = Object.assign({
  ...DataProviderDomain.frMessages,
  ...IngestDomain.frMessages,

  // 1 Chain creation/edition form
  // 1.1 Header section
  'acquisition-chain.form.create.title': 'Créer une nouvelle chaîne de d\'acquisition de données',
  'acquisition-chain.form.edit.title': 'Édition de la chaine : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplication de la chaîne : {name}',
  'acquisition-chain.form.informations-1': 'Une chaîne d\'acquisition de données doit, pour fonctionner, être associée aux éléments ci-dessous. Remarque : Les champs marqués (*) correspondent aux champs obligatoires.',
  'acquisition-chain.form.informations-2': '1. Informations générales de la chaîne.',
  'acquisition-chain.form.informations-3': '2. Définition des fichiers constituant une donnée.',
  'acquisition-chain.form.informations-4': '3. Définition des plugins constituant la chaine.',

  // 1.2 General configuration section
  'acquisition-chain.form.general.section.title': 'Général',
  'acquisition-chain.form.general.section.label': 'Nom de la chaîne (*)',
  'acquisition-chain.form.general.section.active': 'Chaîne active',
  'acquisition-chain.form.general.section.periodicity': 'Cron d\'activation.',
  'acquisition-chain.form.general.section.cron.description.title': 'Format des expressions Cron acceptées.',
  'acquisition-chain.form.general.section.cron.description.tooltip': 'Format des expressions Cron acceptées.',
  'acquisition-chain.form.general.section.cron.description.close': 'Fermer',
  'acquisition-chain.form.general.section.session': 'Session (*)',
  'acquisition-chain.form.general.section.mode': 'Mode (*)',
  'acquisition-chain.form.general.section.mode.AUTO': 'Automatique',
  'acquisition-chain.form.general.section.mode.MANUAL': 'Manuel',
  'acquisition-chain.form.general.section.ingestChain.select': 'Chaîne d\'ingestion (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Sélectionner une chaîne d\'ingestion existante... ',
  'acquisition-chain.form.general.section.path': 'Répertoire de stockage (optionnel)',
  'acquisition-chain.form.general.section.info.storage': 'Selectionner un ou plusieurs espaces de stockage des fichiers. Pour chaque espace de stockage, veuillez selectionner les types de fichiers à stocker.',
  'acquisition-chain.form.general.section.info.storage.no.data': 'La chaîne ne peut pas être éditée car il n\'y a pas d\'espace de stockage configuré.',
  'acquisition-chain.form.general.section.info.category': 'Les catégories permettent de filtrer les AIPs à aspirer par les sources de données',
  'acquisition-chain.form.general.section.category-hint': 'Nouvelle categorie',
  'acquisition-chain.form.general.section.click.category.add.warn': 'Confirmer l\'ajout de la categorie',

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
  // 1.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Plugins',
  'acquisition-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Plugin de validation des données (*)',
  'acquisition-chain.form.plugins.product.label': 'Plugin de construction du produit (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Plugin de génération des métadonnées (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post traitement',

  // 1.5 Actions
  'acquisition-chain.form.create.button': 'Créer',
  'acquisition-chain.form.update.button': 'Mettre à jour',
  'acquisition-chain.form.cancel.button': 'Annuler',

  // 2 Chain list
  // 2.1 Header
  'acquisition-chain.list.subtitle': 'Configuration et activation des chaînes d\'acquisitio de données',
  'acquisition-product.help.deletion.message': 'Pour supprimer une chaîne, vous devez la désactiver au préalable.',
  'acquisition-chain.empty.title': 'Aucune chaine configurée',
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
  'acquisition-chain.list.filters.label': 'Libellé',
  'acquisition-chain.list.filters.running': 'Etat d\'activation',
  'acquisition-chain.list.filters.mode': 'Mode d\'activation',
  'acquisition-chain.list.filters.mode.all': 'Tous',
  'acquisition-chain.list.filters.mode.auto': 'Automatique',
  'acquisition-chain.list.filters.mode.manual': 'Manuel',
  'acquisition-chain.list.filters.running.all': 'Toutes',
  'acquisition-chain.list.filters.running.running': 'Actives',
  'acquisition-chain.list.filters.running.stopped': 'Arrêtées',
  'acquisition-chain.list.filters.apply.button': 'Appliquer les filtres',
  'acquisition-chain.list.filters.clear.button': 'Vider',
  'acquisition-chain.list.refresh.button': 'Rafraîchir',
  'acquisition-chain.list.enable-selected.button': 'Activer la selection',
  'acquisition-chain.list.disable-selected.button': 'Désactiver la selection',
  'acquisition-chain.list.back.button': 'Retour',

  //3. Sessions Monitor
  'acquisition-sessions.empty-response': 'Aucune session disponible',
  'acquisition-sessions.title': 'Sessions',
  'acquisition-sessions.subtitle': 'Suivi de l\'avancement global de l\'aquisition et traitement des données',
  'acquisition-sessions.back.button': 'Retour',
  'acquisition-sessions.refresh.button': 'Rafraîchir',

  //3.1 Table headers
  'acquisition-sessions.table.name': 'Session',
  'acquisition-sessions.table.source': 'Source',
  'acquisition-sessions.table.creation-date': 'Date de création',
  'acquisition-sessions.table.state': 'Etat',
  'acquisition-sessions.table.sip-generated': 'Acquisition',
  'acquisition-sessions.table.aip-stored': 'Archivage',
  'acquisition-sessions.table.indexed': 'Catalogage',
  'acquisition-sessions.table.last-modification': 'Dernière modification',

  //3.2 Table Headers tooltip
  'acquisition-sessions.table.sip-generated.tooltip': 'Produits préparés pour l’ingestion (SIP générés)',
  'acquisition-sessions.table.aip-stored.tooltip': 'Produits enregistrés auprès du stockage (AIP stockés)',
  'acquisition-sessions.table.indexed.tooltip': 'Produits indexés au catalogue',

  //3.3 Products states
  'acquisition-sessions.states.complet': 'Produits générés',
  'acquisition-sessions.states.incomplete': 'Prod. incomplets',
  'acquisition-sessions.states.invalid': 'Prod. invalides',
  'acquisition-sessions.states.files_acquired': 'Fichiers détectés',
  'acquisition-sessions.states.error': 'Erreurs',
  'acquisition-sessions.states.pending': 'En cours',
  'acquisition-sessions.states.storing': 'Archivages en cours',
  'acquisition-sessions.states.stored': 'Produits Archivés',
  'acquisition-sessions.states.running': 'En cours',
  'acquisition-sessions.states.indexed': 'Produits indexés',
  'acquisition-sessions.states.index.errors': 'Erreurs',
  'acquisition-sessions.states.acknowledge': 'Acquitter l\'erreur de session',


  //3.4 Cell's Menus
  'acquisition-sessions.menus.session.delete.button': 'Supprimer les produits de la session',
  'acquisition-sessions.menus.session.delete.force.button': 'Supprimer la session',
  'acquisition-sessions.menus.session.delete.dialog.title': 'Supprimer les produits de la session <{source} - {name}>',
  'acquisition-sessions.menus.session.delete.dialog.message': 'Etes vous sûr de vouloir supprimer tous les produits de cette session ? Si les fichiers sont sockés sur un espace de stockage configuré pour autoriser la suppression, alors les fichiers seront également supprimés physiquement.',
  'acquisition-sessions.menus.session.delete.dialog.cancel.button': 'Annuler',
  'acquisition-sessions.menus.session.delete.dialog.delete.button': 'Supprimer les produits',
  'acquisition-sessions.menus.session.delete.dialog.force.button': 'Supprimer la session',
  'acquisition-sessions.menus.session.delete.dialog.deletion.error': 'Une erreur innatendue c\'est produite durant la demande de suppression. Veuillez réessayer ultérieurement',
  'acquisition-sessions.menus.products.relaunch': 'Relancer les produits en erreur',
  'acquisition-sessions.menus.products.show.errors': 'Voir les produits en erreur',
  'acquisition-sessions.menus.products.show.incomplete': 'Voir les produits incomplets',
  'acquisition-sessions.menus.products.show.invalids': 'Voir les produits invalides',
  'acquisition-sessions.menus.products.delete': 'Supprimer tous les produits',
  'acquisition-sessions.menus.archives': 'Produits pour archivage',
  'acquisition-sessions.menus.archives.relaunch': 'Relancer les produits en erreur',
  'acquisition-sessions.menus.archives.list': 'Visualiser les Produits',
  'acquisition-sessions.menus.archives.list.error': 'Visualiser les Traitements en erreur',

  'acquisition-sessions.menus.products.list.name': 'Produit',
  'acquisition-sessions.menus.products.list.error': 'Cause de l\'erreur',
  'acquisition-sessions.menus.products.list.title.error': 'Liste des produits en erreur pour la session {source}:{session}',
  'acquisition-sessions.menus.products.list.title.incomplete': 'Liste des produits incomplets pour la session {source}:{session}',
  'acquisition-sessions.menus.products.list.help.error': 'Liste des produits en erreurs sur la session courante. Après avoir corrigé les problèmes rencontrés, vous pouvez relancer l\'acquisition des produits en erreur',
  'acquisition-sessions.menus.products.list.help.incomplete': 'Un produit incompet est un produit auquel il manque au moins un type de fichier obligatoire. Il se peut que le fichier n\'était pas présent lors du scan du répertoire. Vous pouvez relancer la chaîne d\'acquisition pour compléter ces produits si les fichiers sont désormais présents.',

  'acquisition-sessions.menus.index.view': 'Visualiser les aspirations',

  //3.5 Filters
  'acquisition-sessions.filters.source': 'Source',
  'acquisition-sessions.filters.session': 'Session',
  'acquisition-sessions.filters.from.label': 'Du',
  'acquisition-sessions.filters.to.label': 'Au',
  'acquisition-sessions.filters.last-session': 'Dernière session seulement',
  'acquisition-sessions.filters.errors-only': 'Erreurs seulement',
  'acquisition-sessions.filters.reset': 'Vider les filtres',
  'acquisition-sessions.filters.apply': 'Appliquer les filtres',
  'acquisition-sessions.filters.column-selector': 'Selectionnez les colonnes à afficher',
  'acquisition-sessions.filters.sources-hint': 'Sources',
  'acquisition-sessions.filters.sessions-hint': 'Sessions',

  // 3.6 Sessions states
  'acquisition-sessions.state.OK': 'Aucune erreur',
  'acquisition-sessions.state.DELETED': 'Supprimée',
  'acquisition-sessions.state.ACKNOWLEDGED': 'Erreur acquittée',
  'acquisition-sessions.state.ERROR': 'En erreur',

  //4 Run Confirm Dialog
  'acquisition-product.run.dialog.title': 'Souhaitez-vous renommer cette session ?',
  'acquisition-product.run.dialog.message': 'Vous pouvez directement confirmer si vous ne souhaitez pas la renommer.',
  'acquisition-product.run.dialog.confirm.button': 'Confirmer',
  'acquisition-product.run.dialog.close.button': 'Fermer',

  'invalid.cron.expression': 'Cron invalide',

}, Locales.fr)

export default messages
