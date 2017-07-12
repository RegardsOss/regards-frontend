/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import UIPluginConfTarget from './UIPluginConfTarget'
import UIPluginConfParameter from './UIPluginConfParameter'

/**
 * Specific configuration for a UI service plugin instance, as the plugin administrator should provide it
 */
const UIServiceInstanceConfContent = PropTypes.shape({
  // this constant is essential to know what type of object the service will consume (without it the service will remain unused)
  target: UIPluginConfTarget,
  // static plugin parameters (ie configuration at administrion level)
  static: PropTypes.arrayOf(
    PropTypes.shape({
      type: UIPluginConfParameter.isRequired,
      required: PropTypes.bool,
    }),
  ),
  // dynamic plugin parameters (ie configuration when using, at runtime)
  dynamic: PropTypes.arrayOf(
    PropTypes.shape({
      type: UIPluginConfParameter.isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
    }),
  ),
})


export default UIServiceInstanceConfContent
