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

/**
 * i18n messages English language
 * @author Sébastien binda
 */
const messages = Object.assign({
  'portal.layout.title': 'Layout configuration',
  'project.layout.title': 'Layout configuration',
  'project.layout.description': 'Layout configuration',
  'project.layout.tooltip': 'Layout',

  'portal.module.title': 'UI modules',
  'project.module.title': 'UI modules',
  'project.module.description': 'Modules configuration',

  'project.service.title': 'Services configuration',
  'project.service.description': 'Services configuration',

  'project.plugin.title': 'Plugins configuration',
  'project.plugin.description': 'Interface plugins configuration',

  'portal.theme.title': 'Themes configuration',
  'project.theme.title': 'Themes configuration',
  'project.theme.description': 'Customize the look of REGARDS',
  'project.theme.tooltip': 'Edit themes',

  'action.list.tooltip': 'List',
  'action.add.tooltip': 'Add',

  'action.service.list.tooltip': 'UI Services',
}, Locales.en)

export default messages