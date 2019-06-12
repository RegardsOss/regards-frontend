/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = Object.assign({
  'role.list.title': 'Liste des rôles',
  'role.list.subtitle': 'Rôles utilisateurs sur le projet',
  'role.list.table.name': 'Nom',
  'role.list.table.parentRole': 'Rôle parent',
  'role.list.table.actions': 'Actions',
  'role.list.action.add': 'Ajouter',
  'role.list.action.cancel': 'Annuler',
  'role.list.value.false': 'Faux',
  'role.list.value.true': 'Vrai',
  'role.list.delete.message': 'Supprimer le rôle {name} ?',
  'role.edit.resource.action.title': 'Configurer les ressources accessibles',
  'role.edit.action.title': 'Éditer',
  'role.delete.action.title': 'Supprimer',


  'role.edit.title': 'Éditer le rôle {name}',
  'role.create.title': 'Ajouter un rôle',
  'role.form.name': 'Nom',
  'role.form.description': 'Description',
  'role.form.authorizedAdresses': 'Définir la liste des adresses IP autorisées (si non spécifié, le filtre est désactivé)',
  'role.form.action.cancel': 'Annuler',
  'role.form.action.submit': 'Sauvegarder',
  'role.form.parentRole': 'Rôle parent',

  'form-utils.enumform.authorizedAddresses.addvalue': 'Ajouter une valeur',
  'form-utils.enumform.addinput': 'Nouvelle adresse IP',
  'form-utils.enumform.add': 'Ajouter une adresse IP autorisée',
  'form-utils.enumform.valueinput': 'IP autorisée',
  'form-utils.enumform.novalue': 'Aucune IP spécifiée',
}, Locales.fr)

export default messages
