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
const CatalogEntity = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    ipId: PropTypes.string.isRequired,
    sipId: PropTypes.number,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(values(CatalogEntityTypes)).isRequired,
    files: PropTypes.arrayOf(ObjectLinkedFile),
    geometry: EntityGeoProperties,
    properties: PropTypes.object,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
})

export default CatalogEntity
