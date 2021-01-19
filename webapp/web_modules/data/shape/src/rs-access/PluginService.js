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
import values from 'lodash/values'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import URL from '../rs-common/URL'

/**
 * Defines plugin service shapes as returned by access project microservice (proxy for front-end)
 * @author Raphaël Mechali
 */

/**
 * A single plugin service
 */
export const PluginService = PropTypes.shape({
  // config Id, used to retrieve config when running that service
  configId: PropTypes.string.isRequired,
  // label
  label: PropTypes.string.isRequired,
  // optional URL
  icon: URL,
  // possible application modes
  applicationModes: PropTypes.arrayOf(PropTypes.oneOf(values(AccessDomain.applicationModes))).isRequired,
  // possible application entity types
  entityTypes: PropTypes.arrayOf(PropTypes.oneOf(DamDomain.ENTITY_TYPES)).isRequired,
  // plugin service type
  type: PropTypes.oneOf(values(AccessDomain.pluginTypes)).isRequired,
})

/** Plugin service with content */
export const PluginServiceWithContent = PropTypes.shape({
  content: PluginService,
})

/** Plugin services as array */
export const PluginServiceWithContentArray = PropTypes.arrayOf(PluginServiceWithContent)
