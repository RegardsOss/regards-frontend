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
import { UI_PLUGIN_INFO_TYPES } from '@regardsoss/domain/access'

/**
 * IHM Plugin entity definition
 * @author Sébastien Binda
 */
export const UIPluginDefinitionContent = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.oneOf(UI_PLUGIN_INFO_TYPES),
  sourcePath: PropTypes.string,
  iconUrl: PropTypes.string,
  applicationModes: PropTypes.arrayOf(PropTypes.string),
  entityTypes: PropTypes.arrayOf(PropTypes.string),
})

export const UIPluginDefinition = PropTypes.shape({
  content: UIPluginDefinitionContent.isRequired,
})

export const UIPluginDefinitionList = PropTypes.objectOf(UIPluginDefinition)
