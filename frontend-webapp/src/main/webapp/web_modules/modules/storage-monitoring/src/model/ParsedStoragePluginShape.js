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
import { CommonShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'

/**
 * Describes storage plugin shape after it has been completed with computed data
 * @author Raphaël Mechali
 */
export const ParsedStoragePluginShape = PropTypes.shape({
  // from default plugin
  confId: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // parsed and completed data
  totalSize: PropTypes.instanceOf(storage.StorageCapacity),
  usedSize: PropTypes.instanceOf(storage.StorageCapacity),
  unusedSize: PropTypes.instanceOf(storage.StorageCapacity),
  usedPercent: CommonShapes.Percent,
  unusedPercent: CommonShapes.Percent,
})
