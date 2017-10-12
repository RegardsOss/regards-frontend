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
import { UIPluginDefinitionContent } from './UIPluginDefinition'

/**
 * UI Plugin configuration for layout display
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
const UIPluginConfContent = PropTypes.shape({
  id: PropTypes.number,
  active: PropTypes.bool,
  label: PropTypes.string,
  // conf as saved by the corresponding administration form: see admin-ui-service-management/src/containers/ServiceConfigurationFormContainer
  conf: PropTypes.shape({
    // must be filled by the admin (empty if no parameter)
    static: PropTypes.object.isRequired,
    // can be, optionally, filled by the admin (empty if no parameter)
    dynamic: PropTypes.object.isRequired,
  }),
  pluginDefinition: UIPluginDefinitionContent.isRequired,
})

const UIPluginConf = PropTypes.shape({
  content: UIPluginConfContent,
})
const UIPluginConfList = PropTypes.objectOf(UIPluginConf)
const UIPluginConfArray = PropTypes.arrayOf(UIPluginConf)

export default {
  UIPluginConfContent,
  UIPluginConf,
  UIPluginConfList,
  UIPluginConfArray,
}
