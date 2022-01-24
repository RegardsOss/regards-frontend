/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginParameterContent from './PluginParameter'

export const PluginConfigurationContent = PropTypes.shape({
  id: PropTypes.number,
  pluginId: PropTypes.string,
  label: PropTypes.string,
  version: PropTypes.string,
  priorityOrder: PropTypes.number,
  active: PropTypes.bool,
  pluginClassName: PropTypes.string,
  interfacenames: PropTypes.arrayOf(PropTypes.string),
  parameters: PropTypes.arrayOf(PluginParameterContent),
  iconUrl: PropTypes.string,
  businessId: PropTypes.string,
})
export const PluginConfiguration = PropTypes.shape({
  content: PluginConfigurationContent,
})
export const PluginConfigurationList = PropTypes.objectOf(PluginConfiguration)

export const PluginConfigurationArray = PropTypes.arrayOf(PluginConfiguration)
