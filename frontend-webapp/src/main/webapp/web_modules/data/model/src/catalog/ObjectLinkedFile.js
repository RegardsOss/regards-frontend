/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * File entity definition for files associated to each dataobject returned by cataog microservice.
 * @author Sébastien Binda
 */
const ObjectLinkedFileTypes = {
  RAWDATA: 'RAWDATA',
  THUMBMAIL: 'THUMBMAIL',
}

const ObjectLinkedFile = PropTypes.shape({
  type: PropTypes.oneOf([ObjectLinkedFileTypes.RAWDATA, ObjectLinkedFileTypes.THUMBMAIL]).isRequired,
  uri: PropTypes.string.isRequired,
})

export default {
  ObjectLinkedFileTypes,
  ObjectLinkedFile,
}
