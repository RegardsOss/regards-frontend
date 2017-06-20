/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import { Geometry } from '@regardsoss/domain/catalog'

const Position = PropTypes.arrayOf(PropTypes.number)

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
export default PropTypes.shape({
  type: PropTypes.oneOf(values(Geometry.GEOMETRY_TYPES)),
  coordinates: PropTypes.oneOfType([
    Position, // Simple point
    PropTypes.arrayOf(Position), // LineString, MultiPoint
    PropTypes.arrayOf(PropTypes.arrayOf(Position)), // Polygon, MultiLineString
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(Position))), // Multi polygon
  ]),
})
