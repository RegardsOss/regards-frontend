/**
* LICENSE_PLACEHOLDER
**/
import values from 'lodash/values'
import { TagTypes } from '@regardsoss/domain/catalog'
import Entity from './Entity'

/** Tag shape, as considered by the UI */
export default PropTypes.shape({
  type: PropTypes.oneOf(values(TagTypes)).isRequired,
  data: PropTypes.oneOfType([PropTypes.string, Entity]).isRequired,
})
