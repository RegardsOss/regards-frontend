/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'role.list.title': 'Role list',
  'role.list.subtitle': 'User roles for the project. You can create new roles that inherit of a selected default role.',
  'role.list.public.name': 'Public : ',
  'role.list.public.description': 'Role for not connected visitor. Only allow to consult public data. No administration fonctionalities granted',
  'role.list.registered.user.name': 'Registered user : ',
  'role.list.registered.user.description': 'Role for connected users. Inherit of public role. Allow to consult, download and order data. No administration fonctionalities granted',
  'role.list.exploit.name': 'Operator : ',
  'role.list.exploit.description': 'Role for project data opertors. Inherit of registered user role. Limited access to administration fonctionalities to manage data catalog.',
  'role.list.admin.name': 'Administrator : ',
  'role.list.admin.description': 'Role for project administrator. Inherit or operator role. Expanded access to administration fonctionalities',
  'role.list.admin.project.name': 'Super Administrator : ',
  'role.list.admin.project.description': 'Super user. No restricted access to any fonctionality',
  'role.list.table.name': 'Name',
  'role.list.table.parentRole': 'Inherits from',
  'role.list.table.actions': 'Actions',
  'role.list.action.add': 'Add',
  'role.list.action.cancel': 'Cancel',
  'role.list.value.false': 'False',
  'role.list.value.true': 'True',
  'role.list.delete.message': 'Remove role {name}?',
  'role.edit.resource.action.title': 'Configure resources access',
  'role.edit.action.title': 'Edit',
  'role.delete.action.title': 'Delete',

  'role.name.PUBLIC': 'Public',
  'role.name.REGISTERED_USER': 'Registered user',
  'role.name.EXPLOIT': 'Operator',
  'role.name.ADMIN': 'Administrator',
  'role.name.PROJECT_ADMIN': 'Super Administrator',
  'role.name.empty': ' - ',

  'role.edit.title': 'Edit the role {name}',
  'role.create.title': 'Add a role',
  'role.form.name': 'Role name',
  'role.form.description': 'Description',
  'role.form.authorizedAdresses': 'Define the IP adresses list autorized',
  'role.form.action.cancel': 'Cancel',
  'role.form.action.submit': 'Save',
  'role.form.parentRole': 'Inherits from',

  'form-utils.enumform.authorizedAddresses.addvalue': 'Add a value',
  'form-utils.enumform.addinput': 'New IP address',
  'form-utils.enumform.add': 'Add an autorized IP address',
  'form-utils.enumform.valueinput': 'IP autorized',
  'form-utils.enumform.novalue': 'No IP specified',
  ...Locales.en,
}

export default messages
