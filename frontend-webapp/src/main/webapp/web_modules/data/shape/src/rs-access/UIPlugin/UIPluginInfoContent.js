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
import { UI_PLUGIN_INFO_TYPES } from '@regardsoss/domain/access'
import UIPluginInfoServiceContent from './UIPluginInfoServiceContent'
import UIPluginInfoCriterionContent from './UIPluginInfoCriterionContent'

/**
 * Plugin information supplied by the plugin himself
 * @author Sébastien Binda
 */
const UIPluginInfoContent = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  company: PropTypes.string,
  email: PropTypes.string,
  license: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(UI_PLUGIN_INFO_TYPES),
  // Specific configuration properties for the given plugin
  conf: PropTypes.oneOfType([UIPluginInfoServiceContent, UIPluginInfoCriterionContent]).isRequired,
})


module.exports = {
  UIPluginInfoContent,
}
