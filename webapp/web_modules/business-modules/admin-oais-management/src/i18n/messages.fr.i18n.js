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
import { IngestDomain } from '@regardsoss/domain'
import { Locales } from '@regardsoss/form-utils'

export default {
  ...Locales.fr,
  ...IngestDomain.frMessages,
  'oais.aips.list.subtitle': 'Liste des AIPS pour la session sélectionnée',
  'oais.aips.list.filters.data.storage.label': 'Stocké sur',
  'oais.aips.list.filters.status.label': 'État',
  'oais.aips.list.filters.providerId.label': 'Id fournisseur',
  'oais.aips.list.filters.from.label': 'Depuis',
  'oais.aips.list.filters.to.label': 'Jusqu\'à',
  'oais.aips.list.filters.tag.label': 'Mot-clefs',
  'oais.aips.list.remove-tag.button': 'Supprimer mot-clefs',
  'oais.aips.list.add-tag.button': 'Ajouter mot-clefs',
  'oais.aips.list.table.headers.providerId': 'Identifiant fournisseur',
  'oais.aips.list.table.headers.type': 'Type',
  'oais.aips.list.table.headers.state': 'Statut',
  'oais.aips.list.table.headers.data.storages': 'Stocké sur',
  'oais.aips.list.table.headers.lastUpdate': 'Modifié le',
  'oais.aips.list.table.headers.nbFiles': 'Nombre de fichier',
  'oais.aips.list.aip-details.title': 'Détails de l\'AIP',
  'oais.aips.list.aip-retry.title': 'Relancer le stockage de l\'AIP',
  'oais.aips.list.delete.files.on.all.storages.label': 'Suppression complète',
  'oais.aips.list.delete.files.on.all.storages.title': 'Supprimer les AIP sélectionnés et leurs fichiers sur tous les espaces de stockage',
  'oais.aips.list.delete.files.on.some.storages.label': 'Suppression partielle',
  'oais.aips.list.delete.files.on.some.storages.title': 'Supprimer les fichiers des AIP sélectionnés sur certains espaces de stockage...',
  'oais.aips.list.empty.title': 'Aucune donnée trouvée',
  'oais.aips.list.snackbar.job-remove-tag': 'Un job de suppression de tag a été lancé',
  'oais.aips.list.snackbar.job-remove-tag-failed': 'Le job de suppression de tag n\'a pas pu être lancé',
  'oais.aips.list.snackbar.job-add-tag': 'Un job d\'ajout de tag a été lancé',
  'oais.aips.list.snackbar.job-add-tag-failed': 'Le job d\'ajout de tag n\'a pas pu être lancé',
  'oais.aips.list.snackbar.job-failed': 'Erreur : un job du même type est déjà lancé',
  'oais.aips.list.relaunch.button': 'Relancer tout',

  'oais.aip.confirm.delete.title': 'Suppression d\'AIP',
  'oais.aip.confirm.delete.message': 'Voulez-vous supprimer intégralement les AIP sélectionnés de tous les espaces de stockage ?',
  'oais.aip.confirm.delete.aip': 'Supprimer',
  'oais.aip.cancel.delete': 'Annuler',

  'oais.aip.confirm.relaunch.title': 'Relance de stockage d\'AIP',
  'oais.aip.confirm.relaunch.message': 'Voulez-vous relancer les AIP sélectionnés ?',
  'oais.aip.confirm.relaunch.aip': 'Relancer',
  'oais.aip.cancel.relaunch': 'Annuler',

  'oais.sip.cancel.relaunch': 'Annuler',
  'oais.sip.confirm.relaunch': 'Relancer',
  'oais.sip.confirm.relaunch.title': 'Relance de SIPs',
  'oais.sip.confirm.relaunch.message': 'Etes-vous sur de vouloir relancer les SIPs selectionnés ?',

  'oais.sip.cancel.selected.delete': 'Annuler',
  'oais.sip.confirm.selected.delete': 'Supprimer',
  'oais.sip.confirm.delete.selected.title': 'Suppression de SIPs',
  'oais.sip.confirm.delete.selected.message': 'Etes-vous sur de vouloir supprimer les SIPs selectionnés ?',

  'oais.aip.delete.on.storages.title': 'Suppression de fichiers des AIP sélectionnés',
  'oais.aip.delete.on.storages.message': 'Sur quels espaces de stockage voulez-vous supprimer les fichiers des AIP sélectionnés ? Les AIP seront supprimés sur les espaces de stockage cochés uniquement s\'ils sont toujours présents sur un espace de stockage après l\'opération',
  'oais.aip.delete.on.selected.storages.messages': 'Les fichiers des AIP sélectionnés seront supprimés des espaces de stockage suivants : {datastorages}. Veuillez confirmer cette opération.',
  'oais.aip.delete.on.selected.storages.label.separator': ', ',
  'oais.aip.confirm.delete.on.storages': 'Supprimer',
  'oais.aip.cancel.delete.on.storages': 'Annuler',

  'oais.aip.details.button.close': 'Fermer',

  'oais.aips.session.title': 'Sessions',
  'oais.aips.session.aips.title': 'Session {session}',
  'oais.aips.session.button.back': 'Retour',
  'oais.aips.session.refresh.button': 'Rafraîchir',
  'oais.aips.session.clear.filters.button': 'Vider les filtres',
  'oais.aips.session.apply.filters.button': 'Appliquer les filtres',

  VALID: 'VALID',
  PENDING: 'PENDING',
  STORING_METADATA: 'STORING_METADATA',
  STORED: 'STORED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',

  'oais.aips.files.modal.action.close': 'Fermer',
  'oais.aips.files.modal.title': 'Trace ...',
  'oais.aips.files.table.headers.name': 'Nom',
  'oais.aips.files.table.headers.state': 'État',
  'oais.aips.files.table.headers.type': 'Type',
  'oais.aips.files.table.headers.filesize': 'Taille du fichier',
  'oais.aips.files.table.empty.title': 'Aucun résultat',
  'oais.aips.files.title': 'Fichiers',
  'oais.aips.files.subtitle': 'Liste les fichiers associés à l\'AIP courant',
  'oais.aips.files.actions.back': 'Retour',
  'oais.aips.files.table.tooltip.show-stacktrace': 'Afficher la stacktrace',
  'oais.aips.files.table.tooltip.show-error-files': 'Afficher les fichiers en erreur',

  'oais.aip.remove-tag.title': 'Suppression d\'une liste de tag',
  'oais.aip.remove-tag.available': 'Cliquez sur un des tags suivant pour l\'ajouter à la liste des tags à supprimer :',
  'oais.aip.remove-tag.removing': 'Tags à supprimer :',
  'oais.aip.remove-tag.action.cancel': 'Annuler',
  'oais.aip.remove-tag.action.delete': 'Envoyer',
  'oais.aip.add-tag.action.cancel': 'Annuler',
  'oais.aip.add-tag.action.add': 'Ajouter',
  'oais.aip.add-tag.title': 'Ajouter une liste de tag',
  'oais.aip.add-tag.list': 'Liste des tags à ajouter :',
  'oais.aip.add-tag.input': 'Nouveau tag',
  'oais.aip.add-tag.input.action.add': 'Ajouter le tag',

  'oais.sips.listsubtitle': 'Liste des SIPS pour la session sélectionnée',
  'oais.sips.listfilters.chain.label': 'Chaîne de traitement',
  'oais.sips.listfilters.providerId.label': 'Identifiant fournisseur',
  'oais.sips.listfilters.status.label': 'État',
  'oais.sips.listfilters.date.label': 'Depuis',
  'oais.sips.listtable.headers.providerId': 'Identifiant fournisseur',
  'oais.sips.listtable.headers.type': 'Type',
  'oais.sips.listtable.headers.state': 'Statut',
  'oais.sips.listtable.headers.date': 'Modifié le',
  'oais.sips.listtable.headers.version': 'Version',
  'oais.sips.listsip-details.title': 'Détails du SIP',
  'oais.sips.listsip-history.title': 'Historique du SIP',
  'oais.sips.listempty.title': 'Aucune donnée trouvée',
  'oais.sips.listtable.tooltip.go-to-aip-management': 'Aller au suivi du stockage des AIPs pour visualiser l\'erreur.',
  'oais.sips.listtable.tooltip.go-to-datasources-management': 'Aller au suivi des aspirations',
  'oais.sip.list.retry.action': 'Relancer l\'ingestion du SIP',
  'oais.sips.list.relaunch.button': 'Relancer tout',
  'oais.sips.list.delete.button': 'Supprimer tout',

  'oais.sip.confirm.delete.title': 'Suppression de données (identifiant producteur : {id})',
  'oais.sip.confirm.delete.message': 'Voulez-vous supprimer uniquement la donnée sélectionnée ou toutes les données de même identifiant fournisseur ?',
  'oais.sip.confirm.delete.sips': 'Tout supprimer',
  'oais.sip.confirm.delete.sip': 'Supprimer',
  'oais.sip.cancel.delete': 'Annuler',

  'oais.sip.details.button.close': 'Fermer',

  'oais.sip.delete.error.dialog.close': 'Fermer',
  'oais.sip.delete.error.title': 'Erreur durant la suppression du SIP "{id}"',

  'oais.sips.session.title': 'Sessions',
  'oais.sips.session.sips.title': 'Session {session}',
  'oais.sips.session.button.back': 'Retour',
  'oais.sips.session.refresh.button': 'Rafraîchir',
  'oais.sips.session.clear.filters.button': 'Vider les filtres',
  'oais.sips.session.apply.filters.button': 'Appliquer les filtres',

  'oais.filters.session.title': 'Session',
  'oais.filters.source.title': 'Source',
  'oais.button.relaunch-all.label': 'Relancer tout',
  'oais.button.relaunch-all.title': 'Relancer tous les AIPs selectionnés',
  'oais.session.title': 'Liste des paquets OAIS',
  'oais.button.switch-to.AIP': 'Voir les AIPs',
  'oais.button.switch-to.AIP-title': 'Ouvre le panneau des AIPs',
  'oais.button.switch-to.SIP': 'Voir les SIPs',
  'oais.button.switch-to.SIP-title': 'Ouvre le panneau des SIPs',

}
