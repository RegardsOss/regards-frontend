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
import { UIPluginDefinitionContent } from './UIPluginDefinition'

/**
 * UI Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
export const UIPluginConfContent = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  label: PropTypes.string,
  pluginInstanceId: PropTypes.string, // unique plugin ID in module
  conf: PropTypes.oneOfType([
    // A service configuration
    PropTypes.shape({
      // must be filled by the admin (empty if no parameter)
      // eslint-disable-next-line react/forbid-prop-types
      static: PropTypes.object.isRequired,
      // can be, optionally, filled by the admin (empty if no parameter)
      // eslint-disable-next-line react/forbid-prop-types
      dynamic: PropTypes.object.isRequired,
    }),
    // A criterion field configuration
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      attributes: PropTypes.object.isRequired,
    }),
  ]),
  pluginDefinition: UIPluginDefinitionContent.isRequired,
})

export const UIPluginConf = PropTypes.shape({
  content: UIPluginConfContent,
})
export const UIPluginConfList = PropTypes.objectOf(UIPluginConf)
export const UIPluginConfArray = PropTypes.arrayOf(UIPluginConf)
