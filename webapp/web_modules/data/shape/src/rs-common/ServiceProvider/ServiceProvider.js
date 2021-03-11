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

import { PluginConfigurationContent } from '../Plugin/PluginConfiguration'

export const ServiceProviderContent = PropTypes.shape({
  name: PropTypes.string.isRequired,
  authUrl: PropTypes.string.isRequired,
  pluginConfiguration: PluginConfigurationContent,
})

export const ServiceProvider = PropTypes.shape({
  content: ServiceProviderContent,
})

export const ServiceProviderList = PropTypes.objectOf(ServiceProvider)
export const ServiceProviderArray = PropTypes.arrayOf(ServiceProvider)
