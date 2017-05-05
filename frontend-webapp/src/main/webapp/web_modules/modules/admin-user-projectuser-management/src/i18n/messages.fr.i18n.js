import { Locales } from '@regardsoss/form-utils'
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'projectUser.list.table.no.content.title': 'Rien à afficher',
  'projectUser.list.table.lastupdate': 'Dernière mise à jour',
  'projectUser.list.table.role': 'Rôle',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Statut',
  'projectUser.list.table.status.label.WAITING_ACCESS': 'En attente d\'accès',
  'projectUser.list.table.status.label.ACCESS_GRANTED': 'Accès accordé',
  'projectUser.list.table.status.label.ACCESS_DENIED': 'Accès refusé',
  'projectUser.list.table.status.label.ACCESS_INACTIVE': 'Inactif',
  'projectUser.list.table.lastConnection': 'Dernière connexion',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.tooltip': 'Editer cet utilisateur',
  'projectUser.list.table.action.accept.tooltip': 'Accorder l\'accès projet à cet utilisateur',
  'projectUser.list.table.action.deny.tooltip': 'Refuser l\'accès projet cet utilisateur',
  'projectUser.list.table.action.delete.tooltip': 'Supprimer cet utilisateur',
  'projectUser.list.action.cancel': 'Annuler',
  'projectUser.list.all.tab': 'Tous les utilisateur ({count})',
  'projectUser.list.all.subtitle': 'Liste de tous les utilisateurs pour le projet courrant',
  'projectUser.list.all.action.create': 'Ajouter',
  'projectUser.list.all.no.content.message': 'Il n\'y a pas d\'utilisateur enregistré pour ce projet',
  'projectUser.list.waiting.tab': 'Nouveaux utilisateurs ({count})',
  'projectUser.list.waiting.subtitle': 'Liste des nouveaux utilisateurs du projet en attente de validation',
  'projectUser.list.waiting.accept.all': 'Tout accepter',
  'projectUser.list.waiting.no.content.message': 'Il n\'y a pas d\'utilisateur en attente d\'un accès au projet. Vous pouvez consulter et éditer la liste des utilisateurs dans l\'onglet "tous les utilisateurs"',
  'projectUser.list.delete.message': 'Confirmer la suppression de l\'utilisateur {name} ?',

  'projectUser.edit.title': 'Éditer l\'utilisateur {email}',
  'projectUser.edit.action.save': 'Sauvegarder',
  'projectUser.create.using.existing.account': 'L\'utilisateur a déjà un compte utilisateur REGARDS',
  'projectUser.create.title': 'Créer un nouvel utilisateur du projet',
  'projectUser.create.input.role': 'Rôle',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'Prénom',
  'projectUser.create.input.lastName': 'Nom de famille',
  'projectUser.create.input.password': 'Mot de passe',
  'projectUser.create.input.status': 'Statut',
  'projectUser.create.input.groups': 'Groupes',
  'projectUser.create.action.create': 'Créer',
  'projectUser.create.action.cancel': 'Annuler',

  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages

