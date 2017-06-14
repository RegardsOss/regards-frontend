/**
 * LICENSE_PLACEHOLDER
 **/
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import EntityGeoProperties from './EntityGeoProperties'
import { ObjectLinkedFile } from './ObjectLinkedFile'
import URL from '../../rs-common/URL'


/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
const Entity = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    ipId: PropTypes.string.isRequired,
    sipId: PropTypes.string,
    label: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(ENTITY_TYPES).isRequired,
    files: PropTypes.arrayOf(ObjectLinkedFile),
    geometry: EntityGeoProperties,
    properties: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.string),
    // description file for collections and datasets only
    descriptionFile: PropTypes.shape({
      // URL: external URL file (cannot be present at same time than type)
      url: URL,
      // type: MIME type for internal file (cannot be present at same time than URL)
      type: PropTypes.string, // cannot specify it better with MIME types as we use extended notations, text/markdown for instance
    }),
  }),
})

export default Entity
