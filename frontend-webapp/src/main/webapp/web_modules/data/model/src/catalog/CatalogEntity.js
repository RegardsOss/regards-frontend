/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import EntityGeoProperties from './EntityGeoProperties'
import { ObjectLinkedFile } from './ObjectLinkedFile'

export const CatalogEntityTypes = {
  DATASET: 'DATASET',
  COLLECTION: 'COLLECTION',
  DATAOBJECT: 'DATAOBJECT',
  DOCUMENT: 'DOCUMENT',
}

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 * @author Sébastien Binda
 */
const CatalogEntity = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    ipId: React.PropTypes.string.isRequired,
    sipId: React.PropTypes.number,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(values(CatalogEntityTypes)).isRequired,
    files: React.PropTypes.arrayOf(ObjectLinkedFile),
    geometry: EntityGeoProperties,
    properties: React.PropTypes.object,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
  }),
})

export default CatalogEntity
