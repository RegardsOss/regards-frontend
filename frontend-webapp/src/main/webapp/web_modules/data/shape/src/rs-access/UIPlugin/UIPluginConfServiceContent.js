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
import values from 'lodash/values'
import { applicationModes } from '@regardsoss/domain/access'
import UIPluginConfParameter from './UIPluginConfParameter'

/**
 * Specific configuration for a UI service plugin instance, as the plugin administrator should provide it
 */
const UIServiceInstanceConfContent = PropTypes.shape({
  // this constant is essential to know the plugin working mode (works with ONE and / or many objects)
  target: PropTypes.arrayOf(PropTypes.oneOf(values(applicationModes))).isRequired,
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
