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
  'modelattr.edit.title': 'Edit model attributes {name}',
  'modelattr.edit.description': 'To add an attribute or a fragment to the current model drag it from the right column to left column. Do the opposite to remove an attribute or fragment.',
  'modelattr.form.action.back': 'Back',
  'modelattr.edit.remainingAttr': 'Available attributes',
  'modelattr.edit.modelname': 'Model {name}',
  'component.plugin-parameter.action.choose-plugin': 'Use a plugin',
  'component.plugin-parameter.action.reset': 'Do not use a plugin',
  'component.plugin-parameter.no-plugin-available': 'No plugin available',
  'modelattr.edit.computation.label': 'Computation',
  'modelattr.edit.table.computationMethod': 'Computation method',
  'modelattr.edit.table.name': 'Name (type)',
  'modelattr.edit.noAttrLink': 'There is no attribute linked to the model',
  ...Locales.en,
}

export default messages
