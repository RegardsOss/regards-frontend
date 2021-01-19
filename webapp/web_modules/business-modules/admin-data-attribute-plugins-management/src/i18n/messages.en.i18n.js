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

/**
 * @author Sébastien Binda
 */
const messages = {
  'model.attribute.calculation.plugins.list.title': 'Configure attribute calculation plugin',
  'model.attribute.calculation.plugins.list.subtitle': 'This section allows you to configure attribute calculation plugins used by system during new data acquisition.',
  'model.attribute.calculation.plugins.list.header.id.label': 'Identifier',
  'model.attribute.calculation.plugins.list.header.name.label': 'Label',
  'model.attribute.calculation.plugins.list.header.type.label': 'Calculation type',
  'model.attribute.calculation.plugins.list.header.active.label': 'Enable',
  'model.attribute.calculation.plugins.list.edit.button': 'Edit configuration',
  'model.attribute.calculation.plugins.list.duplicate.button': 'Duplicate configuration',
  'model.attribute.calculation.plugins.list.active.on.button': 'Enable calculation',
  'model.attribute.calculation.plugins.list.active.off.button': 'Disable storage',
  'model.attribute.calculation.plugins.list.confirm.title': 'Delete plugin {name} ?',
  'model.attribute.calculation.plugins.list.back.button': 'Back',
  'model.attribute.calculation.plugins.list.empty.title': 'No calculation plugin available',
  'model.attribute.calculation.plugins.list.add.button': 'Create a new calculation plugin',

  'model.attribute.calculation.plugins.form.create.title': 'Add new calculation plugin system',
  'model.attribute.calculation.plugins.form.edit.title': 'Edit calculation plugin system "{name}"',
  'model.attribute.calculation.plugins.form.create.subtitle': 'First you have to select a calculation type. When its done, you have to configure the needed parameters.',
  'model.attribute.calculation.plugins.form.edit.subtitle': 'Please configure the calculation plugin parameters.',
  'model.attribute.calculation.plugins.form.type.select.title': 'Calculation type',
  'model.attribute.calculation.plugins.form.type.select.label': 'Select a type ...',
  'model.attribute.calculation.plugins.form.invalid.id': 'Calculation plugin configuration selected does not exist anymore.',
  'model.attribute.calculation.plugins.form.back.button': 'Cancel',
  ...Locales.en,
}

export default messages
