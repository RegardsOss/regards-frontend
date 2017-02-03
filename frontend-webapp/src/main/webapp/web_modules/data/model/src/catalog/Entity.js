/**
 * LICENSE_PLACEHOLDER
 **/
import EntityGeoProperties from './EntityGeoProperties'
import KeyValueObject from '../common/KeyValueObject'

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
    geometry: EntityGeoProperties,
    properties: KeyValueObject,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
  }).isRequired,
})

export default Entity
