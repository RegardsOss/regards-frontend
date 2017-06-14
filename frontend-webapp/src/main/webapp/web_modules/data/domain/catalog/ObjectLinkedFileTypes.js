/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'


/**
 * File entity definition for files associated to each dataobject returned by cataog microservice.
 * @author Sébastien Binda
 */
const OBJECT_LINKED_FILE_ENUM = {
  RAWDATA: 'RAWDATA',
  THUMBNAIL: 'THUMBNAIL',
}

const OBJECT_LINKED_FILE_TYPES = values(OBJECT_LINKED_FILE_ENUM)

export default {
  OBJECT_LINKED_FILE_ENUM,
  OBJECT_LINKED_FILE_TYPES,
}
