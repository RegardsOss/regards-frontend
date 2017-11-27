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

const messages = Object.assign({
  'sips.title': 'Consultation des acquisitions de donées (SIP)',
  'sips.button.filter': 'Filtrer',
  'sips.button.back': 'Retour',
  'sips.list.subtitle': 'Liste des SIPS pour la session sélectionnée',
  'sips.list.filters.chain.label': 'Chaîne de traitement',
  'sips.list.filters.chain.all': 'Toutes les chaînes',
  'sips.list.filters.status.label': 'Etat',
  'sips.list.filters.status.all': 'Tous les statuts',
  'sips.list.filters.status.errors': 'Erreurs',
  'sips.list.filters.status.errors.rsingest': 'Erreurs rs-ingest',
  'sips.list.filters.status.errors.rsstorage': 'Erreurs rs-storage',
  'sips.list.filters.status.done': 'Complété',
  'sips.list.filters.date.label': 'Depuis',
  'sips.list.filters.my-sips.label': 'Uniquement mes SIPs',
  'sips.list.table.headers.sip-id': 'SIP ID',
  'sips.list.table.headers.type': 'Type',
  'sips.list.table.headers.state': 'Statut',
  'sips.list.table.headers.date': 'Date',
  'sips.list.table.headers.actions': 'Actions',
  'sips.list.table.actions.delete': 'Supprimer session',
  'sips.list.table.actions.original-sip': 'Voir SIP original',
  'sips.list.table.actions.original-aip': 'Voir AIP généré',
  'sips.list.table.actions.retry': 'Réessayer',
  'sips.list.aip-details.title': 'AIPs',
  'sips.list.aip-details.table.headers.aip-id': 'AIP ID',
  'sips.list.aip-details.table.headers.state': 'Statut',
  'sips.list.aip-details.table.headers.actions': 'Actions',
  'sips.list.aip-details.table.actions.retry': 'Réessayer',
  'sips.list.aip-details.table.actions.files': 'Voir fichiers',
  'sips.list.aip-details.table.files.title': 'Fichiers',
  'sips.list.aip-details.table.files.headers.name': 'Nom',
  'sips.list.aip-details.table.files.headers.size': 'Taille',
  'sips.list.aip-details.table.files.headers.actions': 'Actions',
  'sips.list.sip-details.title': 'Détails du SIP',
  'sips.list.button.back': 'Retour aux sessions',
  'sips.stepper.list': 'Afficher SIPs',
  'sips.stepper.session': 'Selectionner session',

  'sip.delete.confirm.title': 'Etes-vous sûr de vouloir supprimer le SIP {id}',
  'sip.details.button.close': 'Fermer',

  'sips.session.subtitle': 'Visualisation des sessions d\'acquisitions. Une session est un regroupement de paquets de d\'information de données (SIP).',
  'sips.session.filter.name': 'Nom de la session : ',
  'sips.session.filter.name.label': 'Nom',
  'sips.session.filter.date': 'Plage temporelle : ',
  'sips.session.filter.from.label': 'Début',
  'sips.session.filter.to.label': 'Fin',
  'sips.session.table.headers.id': 'Nom',
  'sips.session.table.headers.generated': 'Génération',
  'sips.session.table.headers.stored': 'Stockage',
  'sips.session.table.headers.indexed': 'Indexation',
  'sips.session.table.headers.errors': 'Nombre d\'erreurs',
  'sips.session.table.headers.date': 'Date',
  'sips.session.table.headers.actions': 'Actions',
  'sips.session.table.actions.errors': 'Lister les SIPS associés en erreur',
  'sips.session.table.actions.delete': 'Supprimer les SIPs associés',
  'sips.session.table.actions.list': 'Lister les SIPs associés',
  'sips.session.button.back': 'Retour',

  'sips.submit.title': 'Soumission de données',
  'sips.submit.subtitle': 'Vous pouvez ici lancer une ingestion de données au travers d\'un fichier au format geoson contenant le ou les entités',
  'sips.submit.error.message': 'Une erreur est survenue durant la soumission de vos données. Merci de vérifier le format des entités.',
  'sips.submit.select.file.button': 'Sélectionner le fichier contenant les données (SIPs)',
  'sips.submit.change.file.button': 'Changer le fichier sélectionné',
  'sips.submit.back.button': 'Retour',
  'sips.submit.submit.button': 'Soumettre',

  'sips.submition-summary.title': 'Compte rendu de soumition de vos données',
  'sips.submition-summary.subtitle': 'Ce compte rendu affiche l\'état de prise en compte de vos données par le système. Si vos données sont acceptées alos elles seront prisent en compte prochainement pour être stockées',
  'sips.submition-summary.back.button': 'Retour',

  CREATED: 'CREATED',
  REJECTED: 'REJECTED',
  QUEUED: 'QUEUED',
  VALID: 'VALID',
  INVALID: 'INVALID',
  AIP_GEN_ERROR: 'AIP_GEN_ERROR',
  AIP_CREATED: 'AIP_CREATED',
  STORED: 'STORED',
  STORE_ERROR: 'STORE_ERROR',
  INDEXED: 'INDEXED',
  INCOMPLETE: 'INCOMPLETE',
}, Locales.fr)

export default messages
