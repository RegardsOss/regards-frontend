/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'project.list.value.isPublic': 'Public',
  'project.list.value.isPrivate': 'Privé',
  'project.list.value.isAccessible': 'Visible',
  'project.list.value.isNotAccessible': 'Caché',
  'project.list.value.isDeleted': 'Supprimé',
  'project.list.title': 'Liste des projets',
  'project.list.subtitle': 'Gestion des Projets REGARDS',
  'project.list.table.icon': 'Icône',
  'project.list.table.name': 'Nom',
  'project.list.table.description': 'Description',
  'project.list.table.isPublic': 'Visibilité',
  'project.list.table.isAccessible': 'Accessibilité',
  'project.list.table.isDeleted': 'Supprimé',
  'project.list.table.actions': 'Actions',
  'project.list.action.add': 'Ajouter',
  'project.list.action.edit.connections.button': 'Configurer les bases de données',
  'project.list.action.openbutton': 'Ouvrir',
  'project.list.action.editbutton': 'Éditer',
  'project.list.action.licenseUpdateButton': 'Licence mise à jour',
  'project.list.dialog.title.update.license': 'Licence mise à jour?',
  'project.list.dialog.message.update.license': 'Lorsque vous notifiez une mise à jour de licence, il sera demandé à tous les utilisateurs d\'accepter à nouveau la licence du projet',
  'project.list.action.deletebutton': 'Supprimer',
  'project.list.dialog.title.delete': 'Supprimer ce projet?',

  'project.list.action.open': 'Se connecter à l\'interface d`administration',
  'project.edit.title': 'Éditer le projet {name}',
  'project.create.title': 'Ajouter un projet',
  'project.form.name': 'Nom du projet *',
  'project.form.label': 'Libellé du projet *',
  'project.form.hint.label': 'Ce libellé est celui qui sera utilisé dans les diverses interfaces pour présenter le projet ',
  'project.form.description': 'Description',
  'project.form.isPublic': 'Projet public',
  'project.form.isAccessible': 'Projet accessible',
  'project.form.icon': 'Lien HTTP vers l\'icône du projet',
  'project.form.license': 'Lien HTTP vers la description de la licence du projet',
  'project.form.host': 'Adresse publique de la passerelle de REGARDS *',
  'project.form.crs': 'Système de référence des coordonnées géométriques (crs)',
  'project.form.crs.WGS_84': 'Terre - WGS_84',
  'project.form.crs.MARS_49900': 'Mars - MARS_49900',
  'project.form.crs.ASTRO': 'Voute célèste',
  'project.form.isPoleToBeManaged': 'Avez-vous besoin de gérer les polygones de type calotte polaire ? Si oui, les polygones doivent respecter la norme geojson RFC 7946 (en particulier, la règle de la main droite pour les cercles extérieurs)',
  'project.form.action.cancel': 'Annuler',
  'project.form.action.submit': 'Sauvegarder',

  'invalid.only_alphanumeric': 'Utilisez des caractères alphanumériques',

  // Database connections
  'project.connection.list.title': 'Configuration des bases de données des microservices du projet {project}',
  'project.connection.list.subtitle': 'Modifiez les paramètres d\'accès aux bases de données pour chaque microservice du système',
  'project.connection.list.microservice': 'Nom du microservice',
  'project.connection.list.status': 'État de la configuration',
  'project.connection.list.actions': 'Actions',
  'project.connection.list.action.back': 'Retour',
  'project.connection.is.configured': 'Active',
  'project.connection.is.not.valid': 'Échec lors de la connexion :',
  'project.connection.is.disabled': 'En attente de connexion...',
  'project.connection.is.connecting': 'En cours de connexion...',
  'project.connection.is.not.defined': 'Aucune connexion définie',
  'project.connection.form.error.server': 'Erreur de création de la connexion.',

  'database.connectionTester.default.tooltip': 'Tester la connexion',
  'database.connectionTester.success.tooltip': 'Retester la connexion - le test précédent s\'est terminé avec succès',
  'database.connectionTester.warn.tooltip': 'Retester la connexion - avertissements lors du test précédent',
  'database.connectionTester.error.tooltip': 'Retester la connexion - erreurs lors du test précédent',
  'database.connectionTester.start': 'Tester',
  'database.connectionTester.restart': 'Réessayer',
  'database.connectionTester.connected': 'Connecté',
  'database.connectionTester.warning': 'Connecté',
  'database.connectionTester.notConnected': 'Non connecté',
  'database.connectionTester.pending': 'Test de la connexion...',
  'database.connection.edit.tooltip': 'Éditer la connexion',

  'database.list.test': 'Tester la connexion',
  'database.list.access.guided.configuration': 'Configuration guidée',

  'database.project.configuration.title': 'Configurer les bases de données pour le projet {project}',

  'database.form.edit.title': 'Connecter {microservice} à une base de données du projet {project}',
  'database.form.input.driverClassName': 'Driver',
  'database.form.input.address': 'Adresse de la base de données',
  'database.form.input.port': 'Port de la base de données',
  'database.form.input.db_name': 'Nom de la base de données',
  'database.form.input.userName': 'Utilisateur',
  'database.form.input.password': 'Mot de passe',
  'database.form.reset': 'Réinitialiser',
  'database.form.action.save': 'Sauvegarder',
  'database.form.action.next': 'Suivant',
  'database.form.action.previous': 'Précédent',
  'database.form.action.cancel': 'Annuler',
  'database.form.input.cange.configuration.mode': 'Utiliser cette connexion pour tous les microservices du projet',
  ...Locales.fr,
}

export default messages
