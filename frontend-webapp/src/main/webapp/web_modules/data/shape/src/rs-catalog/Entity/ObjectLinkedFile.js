/**
 * LICENSE_PLACEHOLDER
 **/
import { OBJECT_LINKED_FILE_TYPES } from '@regardsoss/domain/catalog'

/**
 * File entity definition for files associated to each dataobject returned by cataog microservice.
 * @author Sébastien Binda
 */

const ObjectLinkedFile = PropTypes.shape({
  type: PropTypes.oneOf(OBJECT_LINKED_FILE_TYPES).isRequired,
  uri: PropTypes.string.isRequired,
})

export default {
  ObjectLinkedFile,
}
