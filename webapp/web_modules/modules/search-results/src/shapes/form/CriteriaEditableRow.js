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
import { UIShapes } from '@regardsoss/shape'
import { PluginMeta } from './PluginMeta'

export const CriterionLightConfiguration = PropTypes.shape({
  label: UIShapes.OptionalIntlMessage.isRequired, // optional as it could be in error, unset yet
})

export const CriteriaEditableRow = PropTypes.shape({
  label: PropTypes.objectOf(PropTypes.string),
  showTitle: PropTypes.bool, // only for groups, null for criteria
  groupIndex: PropTypes.number.isRequired,
  criterionIndex: PropTypes.number, // only for criteria, null for groups
  pluginMetadata: PluginMeta, // only for criteria, null for groups or when not found / set
  configuration: PropTypes.shape({ // only for criteria with configuration
    attributes: PropTypes.objectOf(PropTypes.string),
  }),
  // group criteria (only for group): defines a minimal configuration shape
  criteria: PropTypes.arrayOf(CriterionLightConfiguration),
})
