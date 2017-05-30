import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'project.list.value.isPublic': 'Public',
  'project.list.value.isPrivate': 'Privé',
  'project.list.value.isAccessible': 'Visible',
  'project.list.value.isNotAccessible': 'caché',
  'project.list.value.isDeleted': 'Supprimé',
  'project.list.title': 'Liste des projets',
  'project.list.subtitle': 'Gestion des Projets REGARDS',
  'project.list.table.icon': 'Icone',
  'project.list.table.name': 'Nom',
  'project.list.table.description': 'Description',
  'project.list.table.isPublic': 'Accessibilité',
  'project.list.table.isAccessible': 'Visibilité',
  'project.list.table.isDeleted': 'Supprimé',
  'project.list.table.actions': 'Actions',
  'project.list.action.add': 'Ajouter',
  'project.list.action.edit.connections.button': 'Configurer les bases de données',
  'project.list.action.openbutton': 'Ouvrir',
  'project.list.action.editbutton': 'Editer',
  'project.list.action.licenseUpdateButton': 'License mise à jour',
  'project.list.dialog.title.update.license': 'License mise à jour?',
  'project.list.dialog.message.update.license': 'Lorsque vous notifiez une mise à jour de licence, il sera demandé à tous les utilisateur d\'accepter à nouveau la licence du projet',
  'project.list.action.deletebutton': 'Supprimer',
  'project.list.dialog.title.delete': 'Supprimer ce projet?',

  'project.list.action.open': 'Login on that project admin dashboard',
  'project.edit.title': 'Editer le projet {name}',
  'project.create.title': 'Ajouter un projet',
  'project.form.name': 'Nom du projet',
  'project.form.description': 'Description',
  'project.form.isPublic': 'Projet public',
  'project.form.isAccessible': 'Projet accessible',
  'project.form.icon': 'Icone',
  'project.form.license': 'Lien http vers la description de la licence du projet',
  'project.form.host': 'Nom de domaine de l\'interface utilisateur',
  'project.form.action.cancel': 'Annuler',
  'project.form.action.submit': 'Sauvegarder',

  'invalid.only_alphanumeric': 'Seuls les caractères alphanumériques sont autorisés',

  // Database connections
  'project.connection.list.title': 'Configuration des bases de données des microservices du projet {project}',
  'project.connection.list.subtitle': 'Vous pouvez ici modifier les paramètres d\'accès aux bases de données pour chaque microservice du système',
  'project.connection.list.microservice': 'Nom du microservice',
  'project.connection.list.status': 'Etat de la configuration',
  'project.connection.list.actions': 'Actions',
  'project.connection.is.configured': 'Valide',
  'project.connection.is.not.valid': 'Non valide',
  'project.connection.is.not.configured': 'Non configurée',

  'database.connectionTester.start': 'Tester',
  'database.connectionTester.restart': 'Réessayer',
  'database.connectionTester.connected': 'Connecté',
  'database.connectionTester.warning': 'Connecté',
  'database.connectionTester.notConnected': 'Non connecté',
  'database.connectionTester.pending': 'Test de la connexion...',

  'database.list.test': 'Tester la connexion',
  'database.list.access.guided.configuration': 'Configuration guidée',

  'database.project.configuration.title': 'Configurer les bases de données pour le projet {project}',

  'database.form.edit.title': 'Connecter {microservice} à une base de données du projet {project}',
  'database.form.input.driverClassName': 'Driver',
  'database.form.input.url': 'Url',
  'database.form.input.userName': 'Utilisateur',
  'database.form.input.password': 'Mot de passe',
  'database.form.reset': 'Réinitialiser',
  'database.form.action.save': 'Sauvegarder',
  'database.form.action.next': 'Suivant',
  'database.form.action.previous': 'Précédent',
  'database.form.action.cancel': 'Annuler',
}, Locales.fr)

export default messages
