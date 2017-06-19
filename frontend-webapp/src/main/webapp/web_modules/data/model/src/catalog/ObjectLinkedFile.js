/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * File entity definition for files associated to each dataobject returned by cataog microservice.
 * @author Sébastien Binda
 */
const ObjectLinkedFileTypes = {
  RAWDATA: 'RAWDATA',
  THUMBNAIL: 'THUMBNAIL',
}

const ObjectLinkedFile = PropTypes.shape({
  dataType: PropTypes.oneOf([ObjectLinkedFileTypes.RAWDATA, ObjectLinkedFileTypes.THUMBNAIL]).isRequired,
  fileRef: PropTypes.string.isRequired,
})

export default {
  ObjectLinkedFileTypes,
  ObjectLinkedFile,
}
