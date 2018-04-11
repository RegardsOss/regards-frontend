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

import AttributeConfigurationController from './AttributeConfigurationController'
import defaultTheme from './defaultTheme'
import { PAGE_MODULE_ICON_TYPES, PAGE_MODULE_ICON_TYPES_ENUM } from './PageModuleIconType'
import PluginServiceConstants from './PluginServiceConstants'
import RuntimeTargetTypes from './RuntimeTargetTypes'
import UIPluginInfoTypes from './UIPluginInfoTypes'
import UIPluginConfParameterTypes from './UIPluginConfParameterTypes'


module.exports = {
  AttributeConfigurationController,
  defaultTheme,
  PAGE_MODULE_ICON_TYPES,
  PAGE_MODULE_ICON_TYPES_ENUM,
  ...PluginServiceConstants,
  ...RuntimeTargetTypes,
  ...UIPluginInfoTypes,
  ...UIPluginConfParameterTypes,
}
