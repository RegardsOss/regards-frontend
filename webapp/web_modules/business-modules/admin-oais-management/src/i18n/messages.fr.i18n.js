/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

  'oais.button.back': 'Retour',

  'oais.packages.close': 'Close',
  'oais.packages.switch-to.requests.label': 'Traitements ({requestsNb})',
  'oais.packages.switch-to.requests.title': 'Voir les traitements',
  'oais.list.filters.providerIds.label': 'ID fournisseur',
  'oais.list.filters.aipIdType.label': 'Type',
  'oais.list.filters.aipIdType.DATA': 'Donnée',
  'oais.list.filters.aipIdType.DATASET': 'Jeu de données',
  'oais.list.filters.aipIdType.COLLECTION': 'Collection',
  'oais.list.filters.aipState.label': 'État',
  'oais.list.filters.aipState.GENERATED': 'Généré',
  'oais.list.filters.aipState.STORED': 'Stocké',
  'oais.list.filters.aipState.DELETED': 'Supprimé',
  'oais.list.filters.session.label': 'Session',
  'oais.list.filters.storages.label': 'Stockage',
  'oais.package.storage.any': 'Tout stockage',
  'oais.list.filters.last.any': 'Toute version',
  'oais.list.filters.last.true': 'Dernière version',
  'oais.list.filters.last.false': 'Version antérieure',
  'oais.packages.list.filters.actions': 'Actions',
  'oais.list.filters.last.label': 'Version',
  'oais.list.filters.sessionOwner.label': 'Source',
  'oais.packages.list.filters.lastUpdate': 'Modifié le',
  'oais.packages.list.filters.buttons.modify': 'Modifier la sélection',
  'oais.packages.list.filters.buttons.delete': 'Supprimer la sélection',
  'oais.packages.list.filters.buttons.dropdown.aip': 'AIP',
  'oais.packages.list.filters.buttons.dropdown.sip': 'SIP',
  'oais.packages.delete.title': 'Supprimer les AIP sélectionnés et leurs fichiers sur le stockage',
  'oais.packages.delete.irrevocably': 'Supprimer définitivement',
  'oais.packages.delete.by_state': 'Marquer comme supprimé',
  'oais.packages.confirm.delete.message': 'Voulez-vous supprimer le/les produits sélectionné(s): Vous pouvez marquer les produits comme supprimés, dans ce cas les produits seront toujours visible dans l\'état supprimé\nVous pouvez également supprimer définitivement les produits',
  'oais.packages.modify.confirm': 'Modifier',
  'oais.packages.modify.cancel': 'Annuler',
  'oais.packages.modify.add.tags': 'Ajouter un nouveau tag',
  'oais.packages.modify.add.categories': 'Ajouter une nouvelle catégorie',
  'oais.packages.confirm.modify.message': 'Voulez-vous modifier le produit sélectionné ?',
  'oais.packages.modify.title': 'Modifier le produit sélectionné',
  'oais.packages.modify.list': 'Liste des {pane}',
  'oais.packages.modify.delete': '{pane} à supprimer',
  'oais.packages.modify.delete.storages.error': '(Vous ne pouvez pas supprimer tous les espaces de stockage)',
  'oais.packages.modify.add': '{pane} à ajouter',
  'oais.packages.modify.storage': 'Stockages',
  'oais.packages.modify.no.storage': 'Aucun stockage',
  'oais.packages.modify.category': 'Catégories',
  'oais.packages.modify.no.category': 'Aucune catégorie',
  'oais.packages.modify.tag': 'Mot-clefs',
  'oais.packages.modify.no.tag': 'Aucun mot-clef',
  'oais.packages.empty.results': 'Aucun produit trouvé',
  'oais.packages.loading.results': 'Chargement des produits ...',
  'oais.packages.details.sip.title': 'Détails du SIP',

  'oais.packages.tooltip.providerId': 'Saisir une partie de l\'identifiant fournisseur',
  'oais.packages.tooltip.type': 'Filtrer par le type de produits',
  'oais.packages.tooltip.state': 'Filtrer par l\'état des produits',
  'oais.packages.tooltip.storage': 'Filtrer par le stockage des produits',
  'oais.packages.tooltip.version': 'Filtrer par la version des produit',
  'oais.packages.tooltip.history': 'Voir l\'historique du produit',
  'oais.packages.tooltip.details': 'Voir les détails du produit',
  'oais.packages.tooltip.details.aip': 'Voir les détails de l\'AIP lié à ce produit',
  'oais.packages.tooltip.details.sip': 'Voir les détails du SIP lié à ce produit',
  'oais.packages.tooltip.modify': 'Modifier le produit',
  'oais.packages.tooltip.delete': 'Supprimer le produit',
  'oais.packages.tooltip.selection.modify': 'Modifier les produits sélectionnés',
  'oais.packages.tooltip.selection.delete': 'Supprimer les produits sélectionnés',

  'oais.requests.switch-to.products.label': 'Produits ({productsNb})',
  'oais.requests.switch-to.products.title': 'Voir les produits',
  'oais.packages.switch-to.refresh': 'Rafraîchir',
  'oais.requests.list.filters.providerId': 'ID fournisseur',
  'oais.requests.list.filters.creationDate.label': 'Date de création',
  'oais.requests.list.filters.requestType.label': 'Type',
  'oais.requests.list.filters.requestType.STORAGE_DELETION': 'ACK suppression',
  'oais.requests.list.filters.requestType.STORE_METADATA': 'Stockage des méta-données',
  'oais.requests.list.filters.requestType.UPDATE': 'Mise à jour',
  'oais.requests.list.filters.requestType.AIP_UPDATES_CREATOR': 'Recherche de mises à jour',
  'oais.requests.list.filters.requestType.INGEST': 'Création',
  'oais.requests.list.filters.requestType.OAIS_DELETION_CREATOR': 'Recherche de suppressions',
  'oais.requests.list.filters.requestType.OAIS_DELETION': 'Suppressions',
  'oais.requests.list.filters.requestType.AIP_POST_PROCESS': 'Post traitement',
  'oais.list.filters.requestState.label': 'État',
  'oais.list.filters.requestState.TO_SCHEDULE': 'En attente',
  'oais.list.filters.requestState.CREATED': 'Créé',
  'oais.list.filters.requestState.BLOCKED': 'Bloqué',
  'oais.list.filters.requestState.WAITING_VERSIONING_MODE': 'Attente d\'action...',
  'oais.list.filters.requestState.RUNNING': 'En cours',
  'oais.list.filters.requestState.ERROR': 'Erreur',
  'oais.list.filters.requestState.ABORTED': 'Annulé',
  'oais.list.filters.requestState.IGNORED': 'Ignoré',
  'oais.requests.list.filters.actions': 'Actions',
  'oais.requests.list.filters.lastSubmission': 'Soumis le',
  'oais.requests.list.filters.buttons.validate': 'Valider la sélection',
  'oais.requests.list.filters.buttons.operations.button': 'Operations',
  'oais.requests.list.filters.buttons.version.option': 'Option de versionnement',
  'oais.requests.list.filters.buttons.retry': 'Relancer la sélection',
  'oais.requests.list.filters.buttons.abort': 'Annuler les traitements en cours',
  'oais.requests.list.filters.buttons.delete': 'Supprimer la sélection',
  'oais.requests.confirm.delete': 'Supprimer',
  'oais.requests.confirm.delete.close': 'Fermer',
  'oais.requests.confirm.delete.title': 'Supprimer les requêtes sélectionnées',
  'oais.requests.confirm.delete.message': 'Voulez vous supprimer les requêtes sélectionnées ?',
  'oais.requests.confirm.delete.note': 'Attention, les requêtes en cours de traitement ne peuvent pas être supprimées.',
  'oais.requests.confirm.abort.title': 'Arrêter toutes les requêtes',
  'oais.requests.confirm.abort.message': 'Arrêter toutes les requêtes en cours de traitement?',
  'oais.requests.confirm.abort.warning': 'Attention, cette opération s\'applique à toutes les requêtes, pas uniquement à celles visibles ou sélectionnées.',
  'oais.requests.confirm.abort.cancel': 'Annuler',
  'oais.requests.confirm.abort.confirm': 'Confirmer',
  'oais.requests.confirm.retry': 'Relancer',
  'oais.requests.confirm.retry.close': 'Fermer',
  'oais.requests.confirm.retry.title': 'Relancer les requêtes sélectionnées',
  'oais.requests.confirm.retry.message': 'Voulez vous relancer les requêtes sélectionnées ?',
  'oais.request.details.button.close': 'Fermer',
  'oais.requests.empty.results': 'Aucune requête trouvée',
  'oais.requests.loading.results': 'Chargement des requêtes ...',
  'oais.requests.retry.title': 'Relancer le traitement',
  'oais.requests.delete.title': 'Supprimer le traitement',
  'oais.requests.selection.version.option.title': 'Gestion {requestCount, plural, one {du produit modifié} other {des produits modifiés}}',
  'oais.requests.selection.version.option.cancel': 'Annuler',
  'oais.requests.selection.version.option.confirm': 'Confirmer',
  'oais.requests.selection.version.option.single.message': 'Selectionner ci-dessous l\'opération à appliquer suite aux modifications du produit "{providerId}"',
  'oais.requests.selection.version.option.many.message': 'Selectionner ci-dessous l\'opération à appliquer suite aux modifications des produits sélectionnés',
  'oais.requests.selection.version.option.IGNORE': 'Ignorer {requestCount, plural, one {le produit modifié} other {les produits modifiés}}',
  'oais.requests.selection.version.option.INC_VERSION': 'Créer une nouvelle version {requestCount, plural, one {du produit modifié} other {des produits modifiés}}',
  'oais.requests.selection.version.option.REPLACE': 'Remplacer {requestCount, plural, one {le produit actuel} other {les produits actuels}} par {requestCount, plural, one {le produit modifié} other {les produits modifiés}}',
  'oais.requests.selection.version.option.async.info': 'La prise en compte de cette opération est asynchrone et nécessite un rafraîchissement',

  'oais.aips.list.subtitle': 'Liste des AIPS pour la session sélectionnée',
  'oais.aips.list.filters.data.storage.label': 'Stocké sur',
  'oais.aips.list.filters.status.label': 'État',
  'oais.list.filters.lastUpdate.label': 'Dernière modification',
  'oais.aips.list.filters.tag.label': 'Mot-clefs',
  'oais.aips.list.remove-tag.button': 'Supprimer mot-clefs',
  'oais.aips.list.add-tag.button': 'Ajouter mot-clefs',
  'oais.aips.list.table.headers.providerId': 'ID fournisseur',
  'oais.aips.list.table.headers.type': 'Type',
  'oais.aips.list.table.headers.state': 'Statut',
  'oais.aips.list.table.headers.data.storages': 'Stocké sur',
  'oais.aips.list.table.headers.lastUpdate': 'Modifié le',
  'oais.aips.list.table.headers.nbFiles': 'Nombre de fichier',
  'oais.aips.list.table.headers.version': 'Version',
  'oais.aips.list.aip-details.title': 'Détail de l\'AIP',
  'oais.aips.list.request.dialog.title': 'Erreurs de la requête',
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
  'oais.aips.list.retry.button': 'Relancer tout',

  'oais.aip.confirm.delete.title': 'Suppression d\'AIP',
  'oais.aip.confirm.delete.message': 'Voulez-vous supprimer intégralement les AIP sélectionnés de tous les espaces de stockage ?',
  'oais.aip.confirm.delete.aip': 'Supprimer',
  'oais.aip.cancel.delete': 'Annuler',

  'oais.aip.confirm.retry.title': 'Relance de stockage d\'AIP',
  'oais.aip.confirm.retry.message': 'Voulez-vous relancer les AIP sélectionnés ?',
  'oais.aip.confirm.retry.aip': 'Relancer',
  'oais.aip.cancel.retry': 'Annuler',

  'oais.sip.cancel.retry': 'Annuler',
  'oais.sip.confirm.retry': 'Relancer',
  'oais.sip.confirm.retry.title': 'Relance de SIPs',
  'oais.sip.confirm.retry.message': 'Etes-vous sur de vouloir relancer les SIPs selectionnés ?',

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
  'oais.aips.session.filter.button': 'Filtrer',

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
  'oais.sips.list.retry.button': 'Relancer tout',
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
  'oais.filters.id.title': 'Identifiant',
  'oais.button.retry-all.label': 'Relancer tout',
  'oais.button.retry-all.title': 'Relancer tous les AIPs selectionnés',
  'oais.session.title': 'Produits OAIS',
  'oais.button.switch-to.AIP': 'Voir les AIPs',
  'oais.button.switch-to.AIP-title': 'Ouvre le panneau des AIPs',
  'oais.button.switch-to.SIP': 'Voir les SIPs',
  'oais.button.switch-to.SIP-title': 'Ouvre le panneau des SIPs',
  'oais.button.switch-to.requests': 'Voir les requêtes',
  'oais.button.switch-to.requests-title': 'Ouvre le panneau des requêtes OAIS',
  'oais.button.switch-to.packages': 'Voir les produits',
  'oais.button.switch-to.packages-title': 'Ouvrir le panneau des produits OAIS',

  'sips.submit.title': 'Soumission de produits',
  'sips.submit.subtitle': 'Vous pouvez ici lancer une ingestion de données au travers d\'un fichier au format GeoJSON contenant le ou les produits.',
  'sips.submit.oais.format.description.link': 'Vous pouvez consulter ici la documentation concernant le format du fichier GeoJson à fournir',
  'sips.submit.error.message': 'Une erreur est survenue lors de la soumission de vos données. Merci de vérifier le format des entités.',
  'sips.submit.select.file.button': 'Sélectionner le fichier contenant les données (SIPs)',
  'sips.submit.change.file.button': 'Changer le fichier sélectionné',
  'sips.submit.back.button': 'Retour',
  'sips.submit.submit.button': 'Soumettre',

  'sips.submission-summary.title': 'Compte-rendu de soumission de vos données',
  'sips.submission-summary.subtitle': 'Ce compte-rendu affiche l\'état de prise en compte de vos données par le système. Si vos données sont acceptées alors elles seront prises en compte prochainement pour être stockées',
  'sips.submission-summary.granted.count.message': `{count, plural,
    =0 {Aucune entité n'a été soumise.}
    one {# entité a été soumise.}
    other {# entités ont été soumises.}
  }`,
  'sips.submission-summary.denied.count.message': `{count, plural,
    one {L'entité suivante a été rejetée:}
    other {Les # entités suivantes ont été rejetées:}
  }`,
  'sip.submission-summary.denied.feature.message': '- {label}: {reason}',
  'sips.submission-summary.back.button': 'Retour',
  'sips.submission-summary.go.to.session': 'Suivre la session {sessionOwner}/{session}',
  'sips.submission-summary.go.to.submission': 'Soumettre un nouveau fichier',

  'oais.settings.title': 'Paramètres du gestionnaire des produits OAIS',
  'oais.settings.subtitle': 'Configurer les parametres',
  'oais.settings.clear': 'Réinitialiser',
  'oais.settings.field.activeNotifications': 'Activer les notifications',
  'oais.settings.fieldgroup.dumpParameters': 'Paramètres de dump',
  'oais.settings.fieldgroup.dumpParameters.isActiveModule': 'Activer le module',
  'oais.settings.fieldgroup.dumpParameters.cronTrigger': 'Cron trigger',
  'oais.settings.fieldgroup.dumpParameters.dumpLocation': 'Emplacement du dump',
  'oais.settings.field.lastDumpReqDate': 'Dernière requête de dump effectuée',
  'oais.settings.field.sipBodyTimeToLive': 'Nombre de jours avant suppression des SIPs',
  'oais.settings.action.confirm': 'Confirmer',
  'oais.settings.action.cancel': 'Retour',
  'oais.settings.field.cron.help.message':
  'The pattern is a list of six single space-separated fields: representing second, minute, hour, day, month, weekday. Month and weekday names can be given as the first three letters of the English names. Example patterns : ',
  'oais.settings.field.cron.help.message.example': '<ul>'
  + '<li> "0 0 * * * *" = the top of every hour of every day.</li>'
  + '<li> "*/10 * * * * *" = every ten seconds.</li>'
  + '<li> "0 0 8-10 * * *" = 8, 9 and 10 o\'clock of every day.</li>'
  + '<li> "0 0 6,19 * * *" = 6:00 AM and 7:00 PM every day.</li>'
  + '<li> "0 0/30 8-10 * * *" = 8:00, 8:30, 9:00, 9:30, 10:00 and 10:30 every day.</li>'
  + '<li> "0 0 9-17 * * MON-FRI" = on the hour nine-to-five weekdays.</li>'
  + '<li> "0 0 0 25 12 ?" = every Christmas Day at midnight.</li>'
  + '</ul>',
  'oais.settings.dialog.title': 'A propos de ce champs',
  'oais.settings.dialog.close': 'Fermer',
}
