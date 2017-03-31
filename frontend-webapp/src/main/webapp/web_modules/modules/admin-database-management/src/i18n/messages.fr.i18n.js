/*
 * LICENSE_PLACEHOLDER
 */
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'database.connectionTester.start': 'Tester',
  'database.connectionTester.restart': 'Réessayer',
  'database.connectionTester.connected': 'Connecté',
  'database.connectionTester.warning': 'Connecté',
  'database.connectionTester.notConnected': 'Non connecté',
  'database.connectionTester.pending': 'Test de la connexion...',

  'database.connectionTester.snackbar.connected': '{microservice} est correctement configuré pour {driverClassName}.',
  'database.connectionTester.snackbar.warning': 'TODO',
  'database.connectionTester.snackbar.notConnected': '{microservice} n a pas pu établir la connexion avec {driverClassName}.',

  'database.list.title': 'Bases de données',
  'database.list.subtitle': 'Liste des connexions de chaque microservice à une base de données pour chaque projet existant',
  'database.list.microservice': 'Microservice',
  'database.list.project': 'Projet',
  'database.list.test': 'Tester la connexion',
  'database.list.action': 'Actions',
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
