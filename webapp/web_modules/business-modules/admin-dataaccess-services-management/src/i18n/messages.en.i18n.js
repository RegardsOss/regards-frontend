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

/**
 * @author Sébastien Binda
 */
const messages = {
  'dataaccess.services.list.title': 'Configure catalog services',
  'dataaccess.services.list.subtitle': 'This section allows you to configure data catalog services.',
  'dataaccess.services.list.header.id.label': 'Identifier',
  'dataaccess.services.list.header.name.label': 'Label',
  'dataaccess.services.list.header.type.label': 'Service type',
  'dataaccess.services.list.header.active.label': 'Enable',
  'dataaccess.services.list.edit.button': 'Edit service',
  'dataaccess.services.list.duplicate.button': 'Duplicate service',
  'dataaccess.services.list.active.on.button': 'Enable service',
  'dataaccess.services.list.active.off.button': 'Disable service',
  'dataaccess.services.list.confirm.title': 'Delete service {name} ?',
  'dataaccess.services.list.back.button': 'Back',
  'dataaccess.services.list.empty.title': 'No service plugin available',
  'dataaccess.services.list.add.button': 'Add a new service',

  'dataaccess.services.form.create.title': 'Add new service',
  'dataaccess.services.form.edit.title': 'Edit service "{name}"',
  'dataaccess.services.form.create.subtitle': 'First you have to select a service type. When its done, you have to configure the needed parameters.',
  'dataaccess.services.form.edit.subtitle': 'Please configure the service parameters.',
  'dataaccess.services.form.type.select.title': 'Service type',
  'dataaccess.services.form.type.select.label': 'Select a type ...',
  'dataaccess.services.form.invalid.id': 'Service plugin configuration selected does not exist anymore.',
  'dataaccess.services.form.back.button': 'Cancel',
  ...Locales.en,
}

export default messages
