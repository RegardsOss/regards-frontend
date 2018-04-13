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

const messages = Object.assign({
  // 1. Chains list
  // 1.1 Headers
  'acquisition-chain.list.title': 'Configuration des chaînes d\'acquisition de données',
  'acquisition-chain.list.subtitle': 'Les chaînes d\'acquisition de données correspondent à l\'enchaînement de traitements réalisés sur les nouvelles données détectées avant leur ajout dans le catalogue de données.',
  'acquisition-chain.list.info.message': 'Vous pouvez définir pour chaque étape de la chaîne un traitement un fonctionnement spécifique grâce aux plugins suivants.',
  'acquisition-chain.list.empty.title': 'Aucune chaîne définie',

  // 1.2 table headers
  'acquisition-chain.list.table.label': 'Nom',
  'acquisition-chain.list.table.mode': 'Mode de déclenchement',

  // 1.3 actions
  'acquisition-chain.list.addnew.button': 'Ajouter',
  'acquisition-chain.list.back.button': 'Retour',
  'acquisition-chain.list.edit.tooltip': 'Editer',
  'acquisition-chain.list.duplicate.tooltip': 'Dupliquer',
  'acquisition-chain.list.delete.confirm.title': 'Etes-vous sûr de vouloir supprimer la chaîne d\'acquisition : {label}',

  // 2 Chain creation/edition form
  // 2.1 Header section
  'acquisition-chain.form.create.title': 'Créer une nouvelle chaîne de d\'acquisition de données',
  'acquisition-chain.form.edit.title': 'Edition de la chaine : {name}',
  'acquisition-chain.form.duplicate.title': 'Duplication de la chaîne : {name}',
  'acquisition-chain.form.informations-1': 'Une chaîne d\'acquisition de données doit pour fonctionner être associée aux éléments ci-dessous. Remarque : Les champs marqués (*) correspondent aux champs obligatoires.',
  'acquisition-chain.form.informations-2': '1. Une chaîne de traitement. (*)',
  'acquisition-chain.form.informations-3': '2. Un ou plusieurs types de fichiers. Un type de fichier permet de configurer où et comment trouver les fichiers à acquérir. (*)',
  'acquisition-chain.form.informations-4': '3. Un plugin de validation des données. (*)',
  'acquisition-chain.form.informations-5': '4. Un plugin de génération des produits associés aux fichiers détectés. (*)',
  'acquisition-chain.form.informations-6': '5. Un plugin de génération des méta données à partir des fichiers détectés.',
  'acquisition-chain.form.informations-7': '6. Un plugin de post-traitement.',

  // 2.2 General configuration section
  'acquisition-chain.form.general.section.title': 'Général',
  'acquisition-chain.form.general.section.label': 'Libellé (*)',
  'acquisition-chain.form.general.section.active': 'Activer la chaîne d\'acquisition',
  'acquisition-chain.form.general.section.periodicity': 'Période d\'activation (secondes)',
  'acquisition-chain.form.general.section.session': 'Nom de session d\'ingestion',
  'acquisition-chain.form.general.section.mode': 'Mode',
  'acquisition-chain.form.general.section.mode.AUTO': 'Automatique',
  'acquisition-chain.form.general.section.mode.MANUAL': 'Manuel',
  'acquisition-chain.form.general.section.ingestChain.select': 'Chaîne de traitement (*)',
  'acquisition-chain.form.general.section.ingestChain.select.hint': 'Sélectionner une chaîne de traitement ... ',

  // 2.3 Files configuration section
  'acquisition-chain.form.fileInfos.section': 'Fichiers',
  'acquisition-chain.form.fileInfos.list.item.title': 'Fichier',
  'acquisition-chain.form.fileInfos.options.title': 'Actions',
  'acquisition-chain.form.fileInfos.list.add.button': 'Ajouter',
  'acquisition-chain.form.fileInfos.list.delete.button': 'Supprimer',
  'acquisition-chain.form.fileInfos.list.duplicate.button': 'Dupliquer',
  'acquisition-chain.form.fileInfo.comment': 'Description',
  'acquisition-chain.form.fileInfo.plugin.scan.label': 'Méthode de détection des données (*)',
  'acquisition-chain.form.fileInfo.mandatory': 'Le fichier est-il obligatoire à la construction du produit ?',
  'acquisition-chain.form.fileInfo.mimeType': 'Mime-type',
  'acquisition-chain.form.fileInfo.dataType': 'Type de donnée à générer',
  // 2.4 Plugins configuration section
  'acquisition-chain.form.plugins.section': 'Plugins',
  'acquisition-chain.form.plugins.select.label': 'Sélectionner un plugin ...',
  'acquisition-chain.form.plugins.validation.label': 'Méthode de validation des données (*)',
  'acquisition-chain.form.plugins.product.label': 'Construction du produit (*)',
  'acquisition-chain.form.plugins.gen-sip.label': 'Génération des métadonnées (*)',
  'acquisition-chain.form.plugins.post-processing.label': 'Post traitement',

  // 2.5 Actions
  'acquisition-chain.form.create.button': 'Créer',
  'acquisition-chain.form.update.button': 'Mettre à jour',
  'acquisition-chain.form.cancel.button': 'Annuler',

  // 3. Monitoring
  // 3.1 Chain list
  // 3.1.1 Header
  'acquisition-chain.monitor.list.subtitle': 'Cet écran vous permet de suivre l\'avancement des chaînes d\'acquisition de données, de consulter les erreurs de génération et d\'activer les chaînes à déclenchement manuel',
  'acquisition-chain.monitor.empty.title': 'Aucune chaine configurée',
  'acquisition-chain-monitor.breadcrumb.label': 'Chaînes d\'acquisition',

  // 3.1.2 Table header
  'acquisition-chain.monitor.list.label': 'Libellé',
  'acquisition-chain.monitor.list.running': 'Etat',
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
  'acquisition-chain.monitor.list.back.button': 'Retour',

  // 3.2 Chain jobs
  'acquisition-chain.jobs.monitor.view.button.label': 'Détails',
  'acquisition-chain.jobs.monitor.dialog.title': 'Etat d\'activité des "Jobs" associés à la chaîne d\'acquisition {label}',
  'acquisition-chain.jobs.monitor.dialog.information.message': 'Ci-dessous sont listés les "Jobs" en cours d\'activité pour la chaîne d\'acquisition courante.',
  'acquisition-chain.jobs.monitor.product-acquisition.job.label': '{count} "Job(s)" d\'acquisition actif(s).',
  'acquisition-chain.jobs.monitor.product-acquisition.job.empty.label': 'Tous les "Jobs" d\'acquisition sont terminés.',
  'acquisition-chain.jobs.monitor.generation.job.label': '{count} "Job(s)" de génération actif(s).',
  'acquisition-chain.jobs.monitor.generation.job.empty.label': 'Tous les "Jobs" de génération sont terminés.',
  'acquisition-chain.jobs.monitor.submission.job.label': '{count} "Job(s)" de soumission actif(s).',
  'acquisition-chain.jobs.monitor.submission.job.empty.label': 'Tous les "Jobs" de soumission sont terminés.',

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
  'acquisition.product.list.filters.state.COMPLETED': 'En cours (complet)',
  'acquisition.product.list.filters.state.FINISHED': 'Terminé',
  'acquisition.product.list.filters.state.ERROR': 'Erreur',
  'acquisition.product.list.filters.sipState.NOT_SCHEDULED': 'En cours ... (non planifié)',
  'acquisition.product.list.filters.sipState.SCHEDULED': 'En cours ... (planifié)',
  'acquisition.product.list.filters.sipState.GENERATED': 'En cours ... (généré)',
  'acquisition.product.list.filters.sipState.SUBMISSION_SCHEDULED': 'En cours ... (soumission en cours)',
  'acquisition.product.list.filters.sipState.SUBMISSION_ERROR': 'Erreur de soumission',
  'acquisition.product.list.filters.sipState.GENERATION_ERROR': 'Erreur de génération',
  'acquisition.product.list.filters.sipState.CREATED': 'En cours (créé)',
  'acquisition.product.list.filters.sipState.REJECTED': 'Refusé',
  'acquisition.product.list.filters.sipState.QUEUED': 'En attente',
  'acquisition.product.list.filters.sipState.VALID': 'En cours (Valide)',
  'acquisition.product.list.filters.sipState.INVALID': 'Invalide',
  'acquisition.product.list.filters.sipState.AIP_GEN_ERROR': 'Erreur AIP génération',
  'acquisition.product.list.filters.sipState.AIP_CREATED': 'En cours (AIP généré)',
  'acquisition.product.list.filters.sipState.STORED': 'Stocké',
  'acquisition.product.list.filters.sipState.STORE_ERROR': 'Erreur de stockage',
  'acquisition.product.list.filters.sipState.INDEXED': 'Indexé',
  'acquisition.product.list.filters.sipState.INCOMPLETE': 'Incomplet',
  'acquisition.product.list.filters.sipState.DELETED': 'Supprimé',
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
  'acquisition.file.list.filters.state.VALID': 'En cours (validé)',
  'acquisition.file.list.filters.state.ACQUIRED': 'Acquis',
  'acquisition.file.list.filters.state.SUPERSEDED': 'Remplacé',
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
  'acquisition-product.informaton.global.error': 'Erreur durant l`acquisition : ',
  'acquisition-product.informaton.generation.job.title': 'Informations sur le processus de génération du produit',
  'acquisition-product.informaton.submition.job.title': 'Information sur le processus de soumission du SIP',
  'acquisition-product.informaton.dialog.job.info.percentCompleted': 'Avancement : ',
  'acquisition-product.informaton.dialog.job.info.queuedDate': 'Date de création : ',
  'acquisition-product.informaton.dialog.job.info.startDate': 'Date de début : ',
  'acquisition-product.informaton.dialog.job.info.stopDate': 'Date de fin : ',
  'acquisition-product.informaton.dialog.job.info.status': 'Etat : ',

}, Locales.fr)

export default messages
