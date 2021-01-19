/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
  'connection.create.title': 'Ajout d\'une connexion à une source de données externe',
  'connection.edit.title': 'Éditer la connexion {name}',
  'connection.form.subtitle': 'Une connexion à une source externe permet au serveur REGARDS de se connecter à la source de données pour les aspirer',
  'connection.form.label': 'Nom de la connexion',
  'connection.form.version': 'Version',
  'connection.form.priorityOrder': 'Priorité de la connexion',
  'connection.form.pluginId': 'Plugin de connexion',
  'connection.form.user': 'Utilisateur de la connexion à la base de données',
  'connection.form.password': 'Mot de passe de la connexion à la base de données',
  'connection.form.dbProtocol': 'Protocole de communication (ex: jdbc:postgresql)',
  'connection.form.dbHost': 'Adresse de la base de données',
  'connection.form.dbPort': 'Port',
  'connection.form.dbName': 'Nom de la base de données',
  'connection.form.driver': 'Type de base de données',
  'connection.form.isActive': 'Connexion active',
  'connection.form.action.save': 'Sauvegarder',
  'connection.form.action.cancel': 'Annuler',
  'connection.list.title': 'Connexions aux bases de données externes',
  'connection.list.subtitle': 'Une connexion à une base externe permet au serveur REGARDS de se connecter à la source de données pour les aspirer',
  'connection.list.table.label': 'Nom de la connexion',
  'connection.list.table.isActive': 'Statut de la connexion',
  'connection.list.isActive.false': 'Désactivée',
  'connection.list.isActive.true': 'Activée',
  'connection.list.table.test': 'Tester la connexion',
  'connection.list.table.actions': 'Actions',
  'connection.list.action.add': 'Ajouter',
  'connection.list.action.cancel': 'Précédent',
  'connection.list.action.edit': 'Éditer',
  'connection.list.action.delete': 'Supprimer',
  'connection.list.delete.title': 'Supprimer la connexion {name} ?',

  'database.connectionTester.start': 'Tester la connexion',
  'connection.connectionTester.snackbar.success': 'La connexion à {label} est fonctionnelle',
  'connection.connectionTester.snackbar.error': 'La connexion à {label} a échoué',
  'connection.connectionTester.pending': 'Tentative de connexion...',
  ...Locales.fr,
}

export default messages
