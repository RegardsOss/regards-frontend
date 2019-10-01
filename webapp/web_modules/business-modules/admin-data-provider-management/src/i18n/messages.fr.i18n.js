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
import { DataProviderDomain, IngestDomain } from '@regardsoss/domain'
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  ...DataProviderDomain.frMessages,
  ...IngestDomain.frMessages,
  // 1. Chains list
  // 1.1 Headers
  'acquisition-chain.list.title': 'Configuration des chaînes d\'acquisition de données',
  'acquisition-chain.list.subtitle': 'Une chaîne d\'acquisition est l\'enchaînement de traitements réalisés sur les données avant leur soumission au service d\'ingestion. Une chaine d\'acquisition génère en sortie un ou plusieurs SIPs.',
  'acquisition-chain.list.info.message': 'Vous pouvez définir pour chaque étape de la chaîne un traitement un fonctionnement spécifique grâce aux plugins suivants.',
  'acquisition-chain.list.empty.title': 'Aucune chaîne définie',
  'acquisition-chain.list.delete.conditions': 'Pour pouvoir supprimer une chaîne d\'acquisition vous devez la désactiver au préalable',

  // 1.2 table headers
  'acquisition-chain.list.table.label': 'Nom',
  'acquisition-chain.list.table.mode': 'Mode de déclenchement',
  'acquisition-chain.list.table.session': 'Session',

  // 1.3 actions
  'acquisition-chain.list.addnew.button': 'Ajouter',
  'acquisition-chain.list.back.button': 'Retour',
  'acquisition-chain.list.edit.tooltip': 'Éditer',
  'acquisition-chain.list.duplicate.tooltip': 'Dupliquer',
  'acquisition-chain.list.delete.confirm.title': 'Etes-vous sûr de vouloir supprimer la chaîne d\'acquisition : {label}',

  // 2 Chain creation/edition form
  // 2.1 Header section
  'acquisition-chain.form.create.title': 'Créer une nouvelle chaîne de d\'acquisition de données',
  'acquisition-chain.form.edit.title': 'Édition de la chaine : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplication de la chaîne : {name}',
  'acquisition-chain.form.informations-1': 'Une chaîne d\'acquisition de données doit, pour fonctionner, être associée aux éléments ci-dessous. Remarque : Les champs marqués (*) correspondent aux champs obligatoires.',
  'acquisition-chain.form.informations-2': '1. Informations générales de la chaîne.',
  'acquisition-chain.form.informations-3': '2. Définition des fichiers constituant une donnée.',
  'acquisition-chain.form.informations-4': '3. Définition des plugins constituant la chaine.',

  // 2.2 General configuration section
  'acquisition-chain.form.general.section.title': 'Général',
  'acquisition-chain.form.general.section.label': 'Nom de la chaîne (*)',
  'acquisition-chain.form.general.section.active': 'Chaîne active',
  'acquisition-chain.form.general.generationRetryEnabled': 'Autoriser la re-génération des SIP associés à des produits en erreur.',
  'acquisition-chain.form.general.section.periodicity': 'Cron d\'activation. (ex : "0 * 0 * *", il doit démarrer par "0 *")',
  'acquisition-chain.form.general.section.session': 'Session (*)',
  'acquisition-chain.form.general.section.mode': 'Mode (*)',
  'acquisition-chain.form.general.section.mode.AUTO': 'Automatique',
  'acquisition-chain.form.general.section.mode.MANUAL': 'Manuel',
  'acquisition-chain.form.general.section.ingestChain.select': 'Chaîne d\'ingestion (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Sélectionner une chaîne d\'ingestion existante... ',
  'acquisition-chain.form.general.section.path': 'Répertoire de stockage (optionnel)',
  'acquisition-chain.form.general.section.info.storage': 'Selectionner un ou plusieurs espaces de stockage des fichiers',
  'acquisition-chain.form.general.section.info.category': 'Les catégories permettent de filtrer les AIPs à aspirer par les sources de données',
  'acquisition-chain.form.general.section.category-hint': 'Ajouter une ou plusieurs catégories (Presser Entrer pour valider)',

  // 2.3 Files configuration section
  'acquisition-chain.form.fileInfos.section': 'Fichiers',
  'acquisition-chain.form.fileInfos.list.item.title': 'Fichier',
  'acquisition-chain.form.fileInfos.options.title': 'Actions',
  'acquisition-chain.form.fileInfos.list.add.button': 'Ajouter',
  'acquisition-chain.form.fileInfos.list.delete.button': 'Supprimer',
  'acquisition-chain.form.fileInfos.list.duplicate.button': 'Dupliquer',
  'acquisition-chain.form.fileInfo.comment': 'Name',
  'acquisition-chain.form.fileInfo.plugin.scan.label': 'Plugin de détection des données (*)',
  'acquisition-chain.form.fileInfo.mandatory': 'Obligatoire à la construction du produit',
  'acquisition-chain.form.fileInfo.mimeType': 'Mime-type (*)',
  'acquisition-chain.form.fileInfo.dataType': 'Type de donnée à générer (*)',
  // 2.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Plugins',
  'acquisition-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Plugin de validation des données (*)',
  'acquisition-chain.form.plugins.product.label': 'Plugin de construction du produit (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Plugin de génération des métadonnées (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post traitement',

  // 2.5 Actions
  'acquisition-chain.form.create.button': 'Créer',
  'acquisition-chain.form.update.button': 'Mettre à jour',
  'acquisition-chain.form.cancel.button': 'Annuler',

  // 3. Monitoring
  // 3.1 Chain list
  // 3.1.1 Header
  'acquisition-chain.monitor.list.subtitle': 'Suivi de l\'avancement des chaînes d\'acquisition de données, consultation des erreurs d\'acquisition et activation des chaînes à déclenchement manuel',
  'acquisition-chain.monitor.empty.title': 'Aucune chaine configurée',
  'acquisition-chain-monitor.breadcrumb.label': 'Chaînes d\'acquisition',

  // 3.1.2 Table header
  'acquisition-chain.monitor.list.label': 'Nom',
  'acquisition-chain.monitor.list.mode': 'Mode',
  'acquisition-chain.monitor.list.mode.AUTO': 'Automatique',
  'acquisition-chain.monitor.list.mode.MANUAL': 'Manuel',
  'acquisition-chain.monitor.list.running': 'Actif',
  'acquisition-chain.monitor.list.state': 'Etat',
  'acquisition-chain.monitor.list.activity.not.running': 'Arrêtée',
  'acquisition-chain.monitor.list.activity.not.running.date': 'Arrêtée depuis le {date}',
  'acquisition-chain.monitor.list.total-nb-products': 'Produits',
  'acquisition-chain.monitor.list.total-products.tooltip': 'Total des produits',
  'acquisition-chain.monitor.list.error-nb-products.tooltip': 'Produits en erreur',
  'acquisition-chain.monitor.list.inprogress-nb-products.tooltip': 'Produits en cours',
  'acquisition-chain.monitor.list.total-nb-files': 'Fichiers',
  'acquisition-chain.monitor.list.total-files.tooltip': 'Total des Fichiers générés par la chaîne',
  'acquisition-chain.monitor.list.error-nb-files.tooltip': 'Fichiers en erreur',
  'acquisition-chain.monitor.list.inprogress-nb-files.tooltip': 'Fichiers en cours',

  // 3.1.3 Table actions
  'acquisition-chain.monitor.list.run.tooltip': 'Lancer la chaîne',
  'acquisition-chain.monitor.list.run.error': 'Erreur durant le lancement de la chaîne de traitement {label} ({chainId})',
  'acquisition-chain.monitor.list.stop.tooltip': 'Arrêter la chaîne',
  'acquisition-chain.monitor.list.stop.error': 'Erreur durant l\'arrêt de la chaîne de traitement {label} ({chainId})',
  'acquisition-chain.monitor.list.list.tooltip': 'Voir les détails de la session',
  'acquisition-chain.monitor.list.mode.manual': 'Manuel',
  'acquisition-chain.monitor.list.mode.auto': 'Auto',
  'acquisition-chain.monitor.list.enabled.true': 'Activé',
  'acquisition-chain.monitor.list.enabled.false': 'Désactivé',

  // 3.1.4 Table filters
  'acquisition-chain.monitor.list.filters.label': 'Libellé',
  'acquisition-chain.monitor.list.filters.running': 'Etat d\'activation',
  'acquisition-chain.monitor.list.filters.mode': 'Mode d\'activation',
  'acquisition-chain.monitor.list.filters.mode.all': 'Tous',
  'acquisition-chain.monitor.list.filters.mode.auto': 'Automatique',
  'acquisition-chain.monitor.list.filters.mode.manual': 'Manuel',
  'acquisition-chain.monitor.list.filters.running.all': 'Toutes',
  'acquisition-chain.monitor.list.filters.running.running': 'Actives',
  'acquisition-chain.monitor.list.filters.running.stopped': 'Arrêtées',
  'acquisition-chain.monitor.list.filters.apply.button': 'Appliquer les filtres',
  'acquisition-chain.monitor.list.filters.clear.button': 'Vider',
  'acquisition-chain.monitor.list.refresh.button': 'Rafraîchir',
  'acquisition-chain.monitor.list.enable-selected.button': 'Activer la selection',
  'acquisition-chain.monitor.list.disable-selected.button': 'Désactiver la selection',
  'acquisition-chain.monitor.list.back.button': 'Retour',

  // 3.2 Chain jobs
  'acquisition-chain.jobs.monitor.view.button.label': 'Détails',
  'acquisition-chain.jobs.monitor.dialog.title': 'Etat d\'activité des "Jobs" associés à la chaîne d\'acquisition {label}',
  'acquisition-chain.jobs.monitor.dialog.information.message': 'Ci-dessous sont listés les jobs en cours d\'activité pour la chaîne d\'acquisition courante.',
  'acquisition-chain.jobs.monitor.product-acquisition.job.label': '{count} Jobs d\'acquisition actif(s).',
  'acquisition-chain.jobs.monitor.product-acquisition.job.empty.label': 'Tous les jobs d\'acquisition sont terminés.',
  'acquisition-chain.jobs.monitor.generation.job.label': '{count} Jobs de génération actif(s).',
  'acquisition-chain.jobs.monitor.generation.job.empty.label': 'Tous les "Jobs" de génération sont terminés.',

  // 4. Products list
  // 4.1 Headers
  'acquisition-product.breadcrumb.label': 'Produits',
  'acquisition-product.selected-chain.title': 'Produits de la chaîne {chain}',
  'acquisition-product.empty.title': 'Aucun produit',
  'acquisition-product.list.productName': 'Produit',
  'acquisition-product.list.lastUpdate': 'Date de mise à jour',
  'acquisition-product.list.state': 'Etat',
  'acquisition-product.list.sipState': 'Etat du SIP',
  'acquisition-product.list.session': 'Session',

  //4.2 Filters
  'acquisition.product.list.filters.state': 'Etat des produits',
  'acquisition.product.list.filters.sipState': 'Etat des SIPs',
  'acquisition.product.list.filters.state.ACQUIRING': 'En cours',
  'acquisition.product.list.filters.state.COMPLETED': 'Complet',
  'acquisition.product.list.filters.state.FINISHED': 'Terminé',
  'acquisition.product.list.filters.state.INVALID': 'Invalide',
  'acquisition.product.list.filters.state.ERROR': 'Erreur',
  'acquisition-product.list.filters.productName': 'Nom du produit',
  'acquisition.product.list.filters.session': 'Session d\'ingestion',
  'acquisition-chain.monitor.list.filters.no.session': 'Produits sans session',
  'acquisition.product.list.filters.from': 'Depuis ...',

  // 4.3 actions
  'acquisition-product.list.view.files.tooltip': 'Voir les fichiers associés',
  'acquisition-product.list.product.info.tooltip': 'Voir les informations sur l\'acquisition du produit',
  'acquisition-product.list.back.button': 'Retour',
  'acquisition.product.list.filters.clear.button': 'Vider',
  'acquisition.product.list.filters.apply.button': 'Appliquer les filtres',
  'acquisition.product.list.refresh.button': 'Rafraîchir',
  'acquisition.product.list.sip.session.link.title': 'Visualiser l\'état de la session',

  // 5. Acquisition file list
  // 5.1 Headers
  'acquisition-file.breadcrumb.label': 'Fichiers',
  'acquisition.file.list.subtitle': 'Fichiers de la chaîne d\'acquisition {chain}',
  'acquisition.file.list.product.selected.subtitle': 'Fichiers du produit {product}',
  'acquisition.file.empty.title': 'Aucun fichiers acquis',
  'acquisition.file.list.back.button': 'Retour',
  'acquisition.file.list.filePath': 'Fichier',
  'acquisition.file.list.acqDate': 'Date d\'acquisition',
  'acquisition.file.list.state': 'Etat',

  //5.2 Filters
  'acquisition.file.list.filters.state': 'Etat',
  'acquisition.file.list.filters.state.IN_PROGRESS': 'En cours',
  'acquisition.file.list.filters.state.VALID': 'Valide',
  'acquisition.file.list.filters.state.ACQUIRED': 'Acquis',
  'acquisition.file.list.filters.state.SUPERSEDED': 'Remplacé',
  'acquisition.file.list.filters.state.SUPERSEDED_AFTER_ERROR': 'Remplacé après erreur',
  'acquisition.file.list.filters.state.INVALID': 'Invalide',
  'acquisition.file.list.filters.state.ERROR': 'Erreur',
  'acquisition.file.list.filters.filePath': 'Fichier',
  'acquisition.file.list.filters.from': 'Depuis ...',

  //5.3 actions
  'acquisition.file.list.filters.clear.button': 'Vider',
  'acquisition.file.list.filters.apply.button': 'Appliquer les filtres',
  'acquisition.file.list.refresh.button': 'Rafraîchir',

  //6. Product information dialog
  'acquisition-product.informaton.dialog.title': 'Informations sur l\'acquisition du produit {label}',
  'acquisition-product.informaton.dialog.close.button': 'Fermer',
  'acquisition-product.informaton.global.error': 'Erreur durant l\'acquisition : ',
  'acquisition-product.informaton.generation.job.title': 'Informations sur le processus de génération du produit',
  'acquisition-product.informaton.submission.job.title': 'Information sur le processus de soumission du SIP',
  'acquisition-product.informaton.dialog.job.info.percentCompleted': 'Avancement : ',
  'acquisition-product.informaton.dialog.job.info.queuedDate': 'Date de création : ',
  'acquisition-product.informaton.dialog.job.info.startDate': 'Date de début : ',
  'acquisition-product.informaton.dialog.job.info.stopDate': 'Date de fin : ',
  'acquisition-product.informaton.dialog.job.info.status': 'Etat : ',

  //7. Sessions Monitor
  'acquisition-sessions.empty-response': 'Aucune session disponible',
  'acquisition-sessions.title': 'Sessions',
  'acquisition-sessions.subtitle': 'Suivi de l\'avancement global de l\'aquisition et traitement des données',
  'acquisition-sessions.back.button': 'Retour',

  //7.1 Table headers
  'acquisition-sessions.table.name': 'Session',
  'acquisition-sessions.table.source': 'Source',
  'acquisition-sessions.table.creation-date': 'Date de création',
  'acquisition-sessions.table.state': 'Etat',
  'acquisition-sessions.table.sip-generated': 'Produits acquis',
  'acquisition-sessions.table.sip-treated': 'Produits ingérés',
  'acquisition-sessions.table.aip-generated': 'Produits pour archivage',
  'acquisition-sessions.table.aip-stored': 'Produits archivés',
  'acquisition-sessions.table.indexed': 'Produits catalogués',
  'acquisition-sessions.table.last-modification': 'Dernière modification',

  //7.2 Table Headers tooltip
  'acquisition-sessions.table.sip-generated.tooltip': 'Produits préparés pour l’ingestion (SIP générés)',
  'acquisition-sessions.table.sip-treated.tooltip': 'Produits traités par l’ingestion (SIP traités)',
  'acquisition-sessions.table.aip-generated.tooltip': 'Produits prêts pour l’archivage (AIP générés)',
  'acquisition-sessions.table.aip-stored.tooltip': 'Produits enregistrés auprès du stockage (AIP stockés)',
  'acquisition-sessions.table.indexed.tooltip': 'Produits indexés au catalogue',

  //7.3 Products states
  'acquisition-sessions.states.completed': 'Complété',
  'acquisition-sessions.states.incomplete': 'Incomplet',
  'acquisition-sessions.states.error': 'Erreur',
  'acquisition-sessions.states.processed': 'Traité',
  'acquisition-sessions.states.pending': 'En attente',
  'acquisition-sessions.states.stored': 'Archivé',
  'acquisition-sessions.states.invalid': 'Invalide',
  'acquisition-sessions.states.refused': 'Refusé',
  'acquisition-sessions.states.running': 'En cours',
  'acquisition-sessions.states.acknowledge': 'Acquitter l\'erreur de session',

  //7.4 Cell's Menus
  'acquisition-sessions.menus.session.delete': 'Supprimer les produits associés',
  'acquisition-sessions.menus.session.delete.definitely': 'Supprimer définitivement la session',
  'acquisition-sessions.menus.products.relaunch': 'Relancer les produits en erreur',
  'acquisition-sessions.menus.ingested.relaunch': 'Relancer le traitement des SIPs en erreur',
  'acquisition-sessions.menus.ingested.list': 'Lister les SIPs',
  'acquisition-sessions.menus.ingested.list.error': 'Lister les SIPs en erreur',
  'acquisition-sessions.menus.archives.relaunch': 'Relancer le stockage des AIPs en erreur',
  'acquisition-sessions.menus.archives.list': 'Lister les AIPs',
  'acquisition-sessions.menus.archives.list.error': 'Lister les AIPs en erreur',
  'acquisition-sessions.menus.indexed.list': 'Liste les AIPs indexés',

  //7.5 Filters
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

  //8 Run Confirm Dialog
  'acquisition-product.run.dialog.title': 'Souhaitez-vous renommer cette session ?',
  'acquisition-product.run.dialog.message': 'Vous pouvez directement confirmer si vous ne souhaitez pas la renommer.',
  'acquisition-product.run.dialog.confirm.button': 'Confirmer',
  'acquisition-product.run.dialog.close.button': 'Fermer',

  'invalid.cron.expression': 'Cron invalide',

}, Locales.fr)

export default messages
