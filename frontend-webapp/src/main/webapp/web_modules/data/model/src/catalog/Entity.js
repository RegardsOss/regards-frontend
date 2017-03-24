/**
 * LICENSE_PLACEHOLDER
 **/
import EntityGeoProperties from './EntityGeoProperties'
import { ObjectLinkedFile } from './ObjectLinkedFile'

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
const Entity = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    sip_id: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['DATASET', 'COLLECTION', 'DATAOBJECT', 'DOCUMENT']).isRequired,
    files: React.PropTypes.arrayOf(ObjectLinkedFile),
    geometry: EntityGeoProperties,
    properties: React.PropTypes.object,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
  }).isRequired,
})

export default Entity
