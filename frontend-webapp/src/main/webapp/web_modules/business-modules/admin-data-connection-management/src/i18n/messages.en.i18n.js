import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'connection.create.title': 'Création d\'une nouvelle connexion',
  'connection.edit.title': 'Editer la connexion {name}',
  'connection.form.subtitle': 'Les connexions permettent au serveur REGARDS de se connecter à la source de vos données que vous souhaitez partager',
  'connection.form.label': 'Nom de la connexion',
  'connection.form.version': 'Version',
  'connection.form.priorityOrder': 'Priorité de la connexion',
  'connection.form.pluginClassName': 'Plugin de connexion',
  'connection.form.user': 'Utilisateur à utiliser lors de la connection à la base de données',
  'connection.form.password': 'Mot de passe à utiliser lors de la connection à la base de données',
  'connection.form.dbProtocol': 'Protocole de communication (ex: jdbc:postgresql)',
  'connection.form.dbHost': 'Adresse de la base de données',
  'connection.form.dbPort': 'Port',
  'connection.form.dbName': 'Nom de la base de données',
  'connection.form.driver': 'Type de base de données',
  'connection.form.maxPoolSize': 'Nombre maximum de connexion simultanées (aka maxPoolSize)',
  'connection.form.minPoolSize': 'Nombre de connexion simultanées maintenues en permanence (aka minPoolSize)',
  'connection.form.isActive': 'Connexion active',
  'connection.form.action.save': 'Sauvegarder',
  'connection.form.action.cancel': 'Annuler',
  'connection.list.title': 'Liste des connexions',
  'connection.list.subtitle': 'Les connexions permettent au serveur REGARDS de se connecter à la source de vos données que vous souhaitez partager',
  'connection.list.table.label': 'Nom de la connexion',
  'connection.list.table.isActive': 'Status de la connexion',
  'connection.list.isActive.false': 'Désactivée',
  'connection.list.isActive.true': 'Activée',
  'connection.list.table.test': 'Tester la connexion',
  'connection.list.table.actions': 'Actions',
  'connection.list.action.add': 'Créer une nouvelle connexion',
  'connection.list.action.cancel': 'Previous',
  'connection.list.action.edit': 'Edit',
  'connection.list.action.delete': 'Delete',
  'connection.list.delete.title': 'Delete the connection {name} ?',

  'table.actions.more': 'Plus d\'actions',


  'database.connectionTester.start' : 'Vérifier la connexion',
  'connection.connectionTester.snackbar.success': 'La connexion à {label} est fonctionnelle',
  'connection.connectionTester.snackbar.error': 'La connexion à {label} a échouée',
  'connection.connectionTester.pending': 'Tentative de connexion...',
  'invalid.minPoolSizeLow': 'Nombre de connexions insuffisante',
  'invalid.maxPoolSizeGreaterThanMinPoolSize': 'Le nombre max de connexions doit être supérieur au min',
}, Locales.en)

export default messages
