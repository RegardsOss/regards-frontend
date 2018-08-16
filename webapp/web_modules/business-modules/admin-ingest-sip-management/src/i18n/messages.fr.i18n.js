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

  'sips.button.filter': 'Filtrer',
  'sips.button.back': 'Retour',
  'sips.list.subtitle': 'Liste des SIPS pour la session sélectionnée',
  'sips.list.filters.chain.label': 'Chaîne de traitement',
  'sips.list.filters.sipid.label': 'Identient SIP',
  'sips.list.filters.chain.all': 'Toutes les chaînes',
  'sips.list.filters.status.label': 'Etat',
  'sips.list.filters.status.all': 'Tous les statuts',
  'sips.list.filters.status.errors': 'Erreurs',
  'sips.list.filters.status.errors.rsingest': 'Erreurs rs-ingest',
  'sips.list.filters.status.errors.rsstorage': 'Erreurs rs-storage',
  'sips.list.filters.status.done': 'Complété',
  'sips.list.filters.date.label': 'Depuis',
  'sips.list.filters.my-sips.label': 'Uniquement mes SIPs',
  'sips.list.table.headers.providerId': 'Identifiant producteur',
  'sips.list.table.headers.type': 'Type',
  'sips.list.table.headers.state': 'Statut',
  'sips.list.table.headers.date': 'Modifié le',
  'sips.list.table.headers.version': 'Version',
  'sips.list.table.headers.actions': 'Actions',
  'sips.list.table.actions.delete': 'Supprimer session',
  'sips.list.table.actions.original-sip': 'Voir SIP original',
  'sips.list.table.actions.original-aip': 'Voir AIP généré',
  'sips.list.table.actions.retry': 'Réessayer',
  'sips.list.sip-details.title': 'Détails du SIP',
  'sips.list.sip-history.title': 'Historique du SIP',
  'sips.list.empty.title': 'Aucune donnée trouvée',
  'sips.stepper.list': 'Afficher SIPs',
  'sips.stepper.session': 'Selectionner session',

  'sip.confirm.delete.title': 'Suppression de données (identifiant producteur : {id})',
  'sip.confirm.delete.message': 'Voulez-vous supprimer uniquement la donnée sélectionée ou toutes les données de même identifiant producteur (SIP ID) ?',
  'sip.confirm.delete.sips': 'Tout supprimer',
  'sip.confirm.delete.sip': 'Supprimer',
  'sip.cancel.delete': 'Annuler',

  'sip.details.button.close': 'Fermer',

  'sip.delete.error.dialog.close': 'Fermer',
  'sip.delete.error.title': 'Erreur durant la suppression du SIP "{id}"',

  'sips.session.title': 'Sessions',
  'sips.session.sips.title': 'Session {session}',
  'sips.session.subtitle': 'Visualisation des sessions d\'acquisitions. Une session est un regroupement de paquets d\'information de données (SIP).',
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
  'sips.session.refresh.button': 'Rafraîchir',
  'sips.session.clear.filters.button': 'Vider les filtres',
  'sips.session.apply.filters.button': 'Appliquer les filtres',
  'sips.session.delete.confirm.title': 'Supprimer la session {id} ?',

  'sips.submit.title': 'Soumission de données',
  'sips.submit.subtitle': 'Vous pouvez ici lancer une ingestion de données au travers d\'un fichier au format GeoJSON contenant le ou les entités',
  'sips.submit.error.message': 'Une erreur est survenue lors de la soumission de vos données. Merci de vérifier le format des entités.',
  'sips.submit.select.file.button': 'Sélectionner le fichier contenant les données (SIPs)',
  'sips.submit.change.file.button': 'Changer le fichier sélectionné',
  'sips.submit.back.button': 'Retour',
  'sips.submit.submit.button': 'Soumettre',

  'sips.submission-summary.title': 'Compte-rendu de soumission de vos données',
  'sips.submission-summary.subtitle': 'Ce compte-rendu affiche l\'état de prise en compte de vos données par le système. Si vos données sont acceptées alors elles seront prises en compte prochainement pour être stockées',
  'sips.submission-summary.back.button': 'Retour',

  'sips.submission.not.ready.title': 'Configuration manquante pour la soumission de données',
  'sips.submission.not.ready.information.message': 'Votre configuration du système est incomplète et vous interdit de soumettre de nouvelles données. Merci de vous assurer que vous avez bien configuré votre ou vos systèmes de stockage des données. Le système nécessite au moins un espace de stockage et une stratégie de répartition pour pouvoir stocker les données soumises.',
  'sips.submission.not.ready.server.message': 'Le service de stockage indique : ',
  'sips.submission.not.ready.config.allocations.link.button': 'Configurer la répartion',
  'sips.submission.not.ready.config.storages.link.button': 'Configurer les espaces de stockage',
  'sips.submission.not.ready.config.catalog.security.link.button': 'Sécuriser l\'accès aux données',
  'sips.submission.not.ready.back.button': 'Retour',

  CREATED: 'CREATED',
  DELETED: 'DELETED',
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
