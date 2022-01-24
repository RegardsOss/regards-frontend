/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'

/**
 * Describes an attribute model with completed bounds state, as it should be provided to criteria plugins
 * @author Raphaël Mechali
 */

/** Attribute bounds information  */
const BoundsInformation = PropTypes.shape({
  exists: PropTypes.bool.isRequired, // true when attribute has a 'boundable' type
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired, // error when fetching?
  // depends on attribute type, provided when loading finished without error
  lowerBound: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  upperBound: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
})

export const AttributeModelWithBounds = PropTypes.shape({
  ...DataManagementShapes.attributeModelFields,
  boundsInformation: BoundsInformation.isRequired,
})
