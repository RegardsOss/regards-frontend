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
  'role.list.title': 'Liste des rôles',
  'role.list.subtitle': 'Rôles utilisateurs sur le projet. Vous pouvez créer de nouveau rôle en choisissant un rôle à partir duquel hériter des droits existants.',
  'role.list.public.name': 'Publique : ',
  'role.list.public.description': 'Rôle pour les visiteurs non connectés. Permet essentiellement de consulter les données publiques. Aucun accès aux fonctionalités d\'administration.',
  'role.list.registered.user.name': 'Utilisateur enregistré : ',
  'role.list.registered.user.description': 'Rôle pour les utilisateurs connectés. Hérite des droits du rôle Publique. Permet de consulter, de télécharger et de commander les données. Aucun accès aux fonctionalités d\'administration.',
  'role.list.exploit.name': 'Exploitant : ',
  'role.list.exploit.description': 'Rôle pour les exploitants de données du projet. Hérite des droits du rôle Utilisateur enregistré. Accès limité aux fonctionnalités d\'administration pour la gestion des données du catalogue.',
  'role.list.admin.name': 'Administrateur : ',
  'role.list.admin.description': 'Rôle pour les administrateurs du projet. Hérite des droits du rôle exploitant. Accès étendu aux fonctionnalités d\'administration pour la gestion du projet.',
  'role.list.admin.project.name': 'Super Administrateur : ',
  'role.list.admin.project.description': 'Rôle pour les super administrateurs du projet. Aucune limite de droits.',
  'role.list.table.name': 'Nom',
  'role.list.table.parentRole': 'Hérite de',
  'role.list.table.actions': 'Actions',
  'role.list.action.add': 'Ajouter',
  'role.list.action.cancel': 'Annuler',
  'role.list.value.false': 'Faux',
  'role.list.value.true': 'Vrai',
  'role.list.delete.message': 'Supprimer le rôle {name} ?',
  'role.edit.resource.action.title': 'Configurer les ressources accessibles',
  'role.edit.action.title': 'Éditer',
  'role.delete.action.title': 'Supprimer',

  'role.name.PUBLIC': 'Public',
  'role.name.REGISTERED_USER': 'Utilisateur enregistré',
  'role.name.EXPLOIT': 'Exploitant',
  'role.name.ADMIN': 'Administrateur',
  'role.name.PROJECT_ADMIN': 'Super Administrateur',
  'role.name.empty': ' - ',

  'role.edit.title': 'Éditer le rôle {name}',
  'role.create.title': 'Ajouter un rôle',
  'role.form.name': 'Nom',
  'role.form.description': 'Description',
  'role.form.authorizedAdresses': 'Définir la liste des adresses IP autorisées (si non spécifié, le filtre est désactivé)',
  'role.form.action.cancel': 'Annuler',
  'role.form.action.submit': 'Sauvegarder',
  'role.form.parentRole': 'Hérite de',

  'form-utils.enumform.authorizedAddresses.addvalue': 'Ajouter une valeur',
  'form-utils.enumform.addinput': 'Nouvelle adresse IP',
  'form-utils.enumform.add': 'Ajouter une adresse IP autorisée',
  'form-utils.enumform.valueinput': 'IP autorisée',
  'form-utils.enumform.novalue': 'Aucune IP spécifiée',
  ...Locales.fr,
}

export default messages
