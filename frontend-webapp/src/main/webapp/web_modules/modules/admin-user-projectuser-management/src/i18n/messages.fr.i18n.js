import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  // common
  'projectUser.list.table.lastupdate': 'Dernière mise à jour',
  'projectUser.list.table.role': 'Rôle',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Statut',
  'projectUser.list.table.lastconnection': 'Dernière connexion',
  'projectUser.list.table.action': 'Actions',

  // by tab
  'projectUser.list.all.subtitle': 'Liste de tous les utilisateurs pour le projet courrant',
  'projectUser.list.all.action.create': 'Ajouter',
  'projectUser.list.all.action.cancel': 'Annuler',
  'projectUser.list.all.tab': 'Tous les utilisateurs',

  'projectUser.list.waiting.subtitle': 'Liste des nouveaux utilisateurs du projet en attente de validation',
  'projectUser.list.waiting.tab': 'Nouveaux utilisateur',

  'projectUser.create.title': 'Créer un nouvel utilisateur du projet',
  'projectUser.create.input.role': 'Rôle',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'Prénom',
  'projectUser.create.input.lastName': 'Nom de famille',
  'projectUser.create.input.password': 'Mot de passe',
  'projectUser.create.input.status': 'Statut',
  'projectUser.create.action.create': 'Créer',
  'projectUser.create.action.cancel': 'Annuler',

}, Locales.fr)

export default messages

