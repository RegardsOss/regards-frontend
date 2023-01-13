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
import { Locales } from '@regardsoss/form-utils'
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'projectUser.list.card.title': 'Utilisateurs',
  'projectUser.list.card.subtitle': 'Liste des utilisateurs créés pour le projet',
  'projectUser.list.card.selectField.account': 'Mode de visualisation : Utilisateur',
  'projectUser.list.card.selectField.quota': 'Mode de visualisation : Quota',
  'projectUser.list.card.selectField.accessRight': 'Mode de visualisation : Droits d\'accès',

  'projectUser.list.users.count': `{count, plural, 
    =0 {Aucun utilisateur}
    one {# utilisateur}
    other {# utilisateurs}
  } {waitingUsersCount, plural,
    =0 {}
    one { (# nouveau compte)}
    other { (# nouveaux comptes)}
  }`,
  'projectUser.list.only.waiting.users': 'utilisateurs en attente',
  'projectUser.list.only.low.quota': 'Quota faible',
  'projectUser.list.filter.label': 'Filtre: {groupFilter}',
  'projectUser.list.filter.none': 'aucun',
  'projectUser.list.filter.title': 'Filtrer les utilisateurs par groupe d\'accès',
  'projectUser.list.table.no.content.title': 'Pas d\'utilisateur',
  'projectUser.list.table.loading.content.title': 'Chargement...',
  'projectUser.list.table.no.content.without.filter.message': 'Il n\'y a pas d\'utilisateur pour le projet courant',
  'projectUser.list.table.no.content.with.filter.message': 'Il n\'y a pas d\'utilisateur correspondant aux filtres sélectionnés dans le projet courant',
  'projectUser.list.table.lastupdate': 'Dernière mise à jour',
  'projectUser.list.table.role.label': 'Rôle',
  'projectUser.list.table.role.PUBLIC': 'Public',
  'projectUser.list.table.role.REGISTERED_USER': 'Utilisateur enregistré',
  'projectUser.list.table.role.EXPLOIT': 'Exploitant',
  'projectUser.list.table.role.ADMIN': 'Administrateur',
  'projectUser.list.table.role.PROJECT_ADMIN': 'Super Administrateur',
  'projectUser.list.table.role.INSTANCE_ADMIN': 'Administrateur Instance',
  'projectUser.list.table.role.any': 'Tous les rôles',
  'projectUser.list.table.email.label': 'E-mail',
  'projectUser.list.table.lastName.label': 'Nom',
  'projectUser.list.table.firstName.label': 'Prénom',
  'projectUser.list.table.status.label': 'Statut',
  'projectUser.list.table.status.WAITING_ACCOUNT_ACTIVE': 'En attente de validation d\'instance',
  'projectUser.list.table.status.WAITING_ACCESS': 'En attente d\'accès au projet',
  'projectUser.list.table.status.WAITING_EMAIL_VERIFICATION': 'En attente de vérification de l\'email',
  'projectUser.list.table.status.ACCESS_GRANTED': 'Accès accordé',
  'projectUser.list.table.status.ACCESS_DENIED': 'Accès refusé',
  'projectUser.list.table.status.ACCESS_INACTIVE': 'Accès désactivé',
  'projectUser.list.table.origin.label': 'Origine',
  'projectUser.list.table.origin.any': 'Toutes les origines',
  'projectUser.list.table.created': 'Date de création',
  'projectUser.list.table.lastConnection': 'Dernière connexion',
  'projectUser.list.table.actions': 'Actions',
  'projectUser.list.table.quota': 'Quota',
  'projectUser.list.table.quotaWarningCount.label': 'Quota faible',
  'projectUser.list.table.accessGroup.label': 'Groupes',
  'projectUser.list.table.unlimited.quota.message': 'Illimité',
  'projectUser.list.table.current.quota.message': '{currentQuota} / {maxQuota}',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.quota': 'Changer le quota maximal',
  'projectUser.list.table.action.accept': 'Accorder l\'accès',
  'projectUser.list.table.action.deny': 'Refuser l\'accès',
  'projectUser.list.table.action.enable': 'Ré-activer l\'accès',
  'projectUser.list.table.action.disable': 'Désactiver l\'accès',
  'projectUser.list.table.action.send.email': 'Envoyer email de confirmation',
  'projectUser.list.table.action.edit.tooltip': 'Éditer',
  'projectUser.list.table.action.delete.tooltip': 'Supprimer',
  'projectUser.list.action.cancel': 'Annuler',
  'projectUser.list.all.action.create': 'Ajouter',
  'projectUser.list.accept.all': 'Tout accepter',
  'projectUser.list.accept.all.tooltip': 'Accorder l\'accès à tous les nouveaux utilisateurs affichés dans le tableau',
  'projectUser.list.delete.message': 'Supprimer l\'utilisateur {name} ?',
  'projectUser.list.email.confirmation.message': 'Voulez-vous envoyer un email de confirmation à {email} ?',
  'projectUser.list.edit.quota.dialog.title': 'Editer le quota maximal de {name}',
  'projectUser.list.edit.quota.dialog.max.quota.field': 'Quota maximal (-1: illimité / entier positif ou nul: nombre de fichiers)',
  'projectUser.list.edit.quota.dialog.current.quota.field': 'Quota consommé',
  'projectUser.list.edit.quota.dialog.remaining.quota.field': 'Quota restant',
  'projectUser.list.edit.quota.dialog.remaining.quota.unlimited': 'illimité',
  'projectUser.list.edit.quota.dialog.cancel': 'Annuler',
  'projectUser.list.edit.quota.dialog.confirm': 'Confirmer',
  'projectUser.list.table.filters.clear': 'Effacer filtres',
  'projectUser.list.info.nb.accounts': '{value} résultats',
  'projectUser.list.refresh': 'Rafraîchir',
  'projectUser.list.filter': 'Filtrer',
  'projectUser.list.exportCSV.label': 'Résumé',
  'projectUser.list.exportCSV.tooltip': 'Télécharger le résumé en CSV',

  'projectUser.edit.title': 'Éditer l\'utilisateur {email}',
  'projectUser.edit.action.save': 'Sauvegarder',
  'projectUser.create.using.existing.account': 'L\'utilisateur a déjà un compte utilisateur REGARDS',
  'projectUser.create.title': 'Créer un utilisateur',
  'projectUser.create.message': 'Créer un utilisateur pour le projet. {passwordRules}',
  'projectUser.create.input.role': 'Rôle',
  'projectUser.create.input.role.default': 'Rôle par défaut',
  'projectUser.create.input.emails_confirmation': 'Liste des emails à contacter lors de l\'envoi du mail de confirmation',
  'projectUser.create.input.emails_confirmation.add.warn': 'Confirmer l\'ajout de l\'email',
  'projectUser.create.input.emails_confirmation.add.error': 'Adresse e-mail invalide',
  'projectUser.create.input.emails_confirmation.add.exist': 'Cette adresse e-mail existe déjà',
  'projectUser.create.input.emails_confirmation.add.floating.text': 'Entrez un email',
  'projectUser.create.input.email': 'E-mail (*)',
  'projectUser.create.input.firstName': 'Prénom (*)',
  'projectUser.create.input.lastName': 'Nom (*)',
  'projectUser.create.input.password': 'Mot de passe (*)',
  'projectUser.create.input.password.confirm': 'Confirmer le mot de passe (*)',
  'projectUser.create.input.status': 'Statut',
  'projectUser.create.input.groups': 'Groupes',
  'projectUser.create.input.max.quota': 'Quota maximal (*)',
  'projectUser.create.input.max.quota.help.message': `Le quota maximal d'un utilisateur désigne le nombre de fichiers de donnée brute stockés en interne par REGARDS qu'il peut télécharger. 
Les valeurs possibles sont -1, pour illimité, 0, pour aucun, ou tout autre entier positif, pour le nombre précisément autorisé`,
  'projectUser.create.input.rate.limit': 'Vitesse maximale de téléchargement (*)',
  'projectUser.create.input.rate.limit.help.message': `La vitesse maximale de téléchargement d'un utilisateur désigne le nombre de fichiers de donnée brute stockés en interne par REGARDS qu'il peut télécharger simultanément. 
Les valeurs possibles sont -1, pour illimitée, 0, pour aucun, ou tout autre entier positif pour le nombre précisément autorisé`,
  'projectUser.create.action.add': 'Ajouter',
  'projectUser.create.action.create': 'Créer',
  'projectUser.create.action.cancel': 'Annuler',

  'project.user.settings.title': 'Paramètres des utilisateurs',
  'project.user.settings.subtitle': 'Gérer les paramètres communs aux utilisateurs du projet',
  'project.user.settings.mode.field': 'Mode de validation',
  'project.user.settings.mode.MANUAL': 'Manuel: chaque demande de création d\'un utilisateur projet doit être validée par l\'administrateur',
  'project.user.settings.mode.AUTO': 'Automatique: les demandes de création d\'un utilisateur projet sont automatiquement validées',
  'project.user.settings.role.PUBLIC': 'Public',
  'project.user.settings.role.REGISTERED_USER': 'Utilisateur enregistré',
  'project.user.settings.role.EXPLOIT': 'Exploitant',
  'project.user.settings.role.ADMIN': 'Administrateur',
  'project.user.settings.role.PROJECT_ADMIN': 'Super Administrateur',
  'project.user.settings.role.INSTANCE_ADMIN': 'Administrateur Instance',
  'project.user.settings.max.quota.field': 'Quota maximal par défaut',
  'project.user.settings.max.quota.help.message': `Le quota maximal par défaut est appliqué à la création de nouveaux utilisateurs. 
  Le quota maximal d'un utilisateur désigne le nombre de fichiers de donnée brute stockés en interne par REGARDS qu'il peut télécharger. 
  Les valeurs possibles sont -1, pour illimité, 0, pour aucun, ou tout autre entier positif, pour le nombre précisément autorisé`,
  'project.user.settings.rate.limit.field': 'Vitesse maximale de téléchargement par défaut',
  'project.user.settings.rate.limit.help.message': `La vitesse maximale de téléchargement est appliquée à la création de nouveaux utilisateurs. 
  La vitesse maximale de téléchargement d'un utilisateur désigne le nombre de fichiers de donnée brute stockés en interne par REGARDS qu'il peut télécharger simultanément. 
  Les valeurs possibles sont -1, pour illimitée, 0, pour aucun, ou tout autre entier positif pour le nombre précisément autorisé`,
  'project.user.settings.action.confirm': 'Confirmer',
  'project.user.settings.action.cancel': 'Annuler',

  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages
