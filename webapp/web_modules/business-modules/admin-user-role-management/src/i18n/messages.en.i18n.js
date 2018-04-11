/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'role.list.title': 'Role list',
  'role.list.subtitle': 'User roles for the project',
  'role.list.table.name': 'Name',
  'role.list.table.parentRole': 'Parent role',
  'role.list.table.actions': 'Actions',
  'role.list.action.add': 'Add',
  'role.list.action.cancel': 'Cancel',
  'role.list.value.false': 'False',
  'role.list.value.true': 'True',
  'role.list.delete.message': 'Remove role {name}?',
  'role.edit.resource.action.title': 'Configure resources access',
  'role.edit.action.title': 'Edit',
  'role.delete.action.title': 'Delete',

  'role.edit.title': 'Edit the role {name}',
  'role.create.title': 'Add a role',
  'role.form.name': 'Role name',
  'role.form.description': 'Description',
  'role.form.authorizedAdresses': 'Define the IP adresses list autorized',
  'role.form.action.cancel': 'Cancel',
  'role.form.action.submit': 'Save',
  'role.form.parentRole': 'Parent role',

  'form-utils.enumform.authorizedAddresses.addvalue': 'Add a value',
  'form-utils.enumform.addinput': 'New IP address',
  'form-utils.enumform.add': 'Add an autorized IP address',
  'form-utils.enumform.valueinput': 'IP autorized',
  'form-utils.enumform.novalue': 'No IP specified',
}, Locales.en)

export default messages
