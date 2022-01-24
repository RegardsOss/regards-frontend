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
import values from 'lodash/values'
import { GEOMETRY_TYPES } from '@regardsoss/domain/catalog'

const Position = PropTypes.arrayOf(PropTypes.number)

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
export default PropTypes.shape({
  type: PropTypes.oneOf(values(GEOMETRY_TYPES)),
  coordinates: PropTypes.oneOfType([
    Position, // Simple point
    PropTypes.arrayOf(Position), // LineString, MultiPoint
    PropTypes.arrayOf(PropTypes.arrayOf(Position)), // Polygon, MultiLineString
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(Position))), // Multi polygon
  ]),
  bbox: PropTypes.arrayOf(PropTypes.number),
  crs: PropTypes.string,
})
