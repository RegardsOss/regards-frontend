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
  'role.list.title': 'Authorized resources for {role} role',
  'role.list.subtitle': 'All system\'s functionalities. You can choose current role\'s accessibility for each one of them',
  'role.list.action.back': 'Back',
  'role.form.info': 'More information',
  'role.form.autorizedBy': 'Is also available for',
  'role.form.moreinfo': 'More information',
  'role.modal.title': 'Resource {name}',
  'role.modal.action.back': 'Back',
  'role.name.PUBLIC': 'Public',
  'role.name.REGISTERED_USER': 'Registered user',
  'role.name.EXPLOIT': 'Operator',
  'role.name.ADMIN': 'Administrator',
  'role.name.PROJECT_ADMIN': 'Super Administrator',
  ...Locales.en,
}

export default messages
