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

/**
 * @author Sébastien Binda
 */
const messages = {
  'user.authentication.plugins.list.title': 'Configure authentication systems',
  'user.authentication.plugins.list.subtitle': 'This section allows you to configure authentication systems on REGARDS. By default, if no authentication system is defined, REGARDS handle is own authentication system based on JWT tokens. However, it is possible to externalize user management with IDP and/or SP.',
  'user.authentication.plugins.list.subtitle.idp': 'IDP (Identity provider) : ',
  'user.authentication.plugins.list.subtitle.idp.description': 'Authentication system managed by REGARDS which user base is deported on an external base. This operation allow to connect to an LDAP base for example.',
  'user.authentication.plugins.list.subtitle.service': 'SP (Service Provider) : ',
  'user.authentication.plugins.list.subtitle.service.description': 'Authentication system fully externalized. This operation allow to connect through external SSO like github for example.',
  'user.authentication.plugins.list.idp.title': 'Identity Provider',
  'user.authentication.plugins.list.idp.subtitle': 'Allows to determine an external user base of LDAP type',
  'user.authentication.plugins.list.service.title': 'Service Provider',
  'user.authentication.plugins.list.service.subtitle': 'Allows to delegate authentication to an external SSO type system',
  'user.authentication.plugins.list.header.id.label': 'Identifier',
  'user.authentication.plugins.list.header.name.label': 'Label',
  'user.authentication.plugins.list.header.name': 'Name',
  'user.authentication.plugins.list.header.action.delete': 'Supprimer',
  'user.authentication.plugins.list.edit.button': 'Edit authentication system',
  'user.authentication.plugins.list.duplicate.button': 'Duplicate authentication system',
  'user.authentication.plugins.list.active.on.button': 'Enable authentication system',
  'user.authentication.plugins.list.active.off.button': 'Disable authentication system',
  'user.authentication.plugins.list.confirm.title': 'Delete authentication system {name} ?',
  'user.authentication.plugins.list.back.button': 'Back',
  'user.authentication.plugins.list.empty.title': 'No authentication systems available',
  'user.authentication.plugins.list.add.button': 'Add a new identity provider',
  'user.authentication.external.plugins.list.add.button': 'Add a new service provider',

  'user.authentication.external.plugins.form.create.invalid.id': 'Invalid ID',
  'user.authentication.external.plugins.form.create.field.name': 'Name',
  'user.authentication.external.plugins.form.create.field.url': 'URL de connexion',
  'user.authentication.external.plugins.form.create.field.logout.url': 'URL de deconnexion',
  'user.authentication.external.plugins.form.create.field.description.fr': 'French description',
  'user.authentication.external.plugins.form.create.field.description.en': 'English description',
  'user.authentication.external.plugins.form.create.field.pluginConfiguration': 'Plugin',
  'user.authentication.external.plugins.form.submit.edit.button': 'Modfify',
  'user.authentication.external.plugins.form.submit.create.button': 'Create',
  'user.authentication.external.plugins.form.submit.create.title': 'Add new service provider',
  'user.authentication.external.plugins.form.submit.edit.title': 'Edit service provider {name}',
  'user.authentication.external.plugins.form.subtitle': 'First you have to select a service provider. When its done, you have to configure the needed parameters.',
  'user.authentication.external.plugins.form.back.button': 'Cancel',
  'user.authentication.plugins.form.create.title': 'Add new authentication system',
  'user.authentication.plugins.form.edit.title': 'Edit authentication system "{name}"',
  'user.authentication.plugins.form.create.subtitle': 'First you have to select an authentication system type. When its done, you have to configure the needed parameters.',
  'user.authentication.plugins.form.edit.subtitle': 'Please configure the authentication system parameters.',
  'user.authentication.plugins.form.type.select.title': 'authentication system type',
  'user.authentication.plugins.form.type.select.label': 'Select a type ...',
  'user.authentication.plugins.form.invalid.id': 'Authentication system plugin configuration selected does not exist anymore.',
  'user.authentication.plugins.form.back.button': 'Cancel',

  'user.authentication.plugins.list.confirm.delete.title': 'Delete selected authentication system?',
  ...Locales.en,
}

export default messages
