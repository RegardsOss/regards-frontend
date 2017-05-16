/**
 * LICENSE_PLACEHOLDER
 **/
import Model from '../dam/Model'

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 */
export default PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['DATASET', 'COLLECTION', 'DATAOBJECT', 'DOCUMENT']).isRequired,
    model: Model.isRequired,
  }).isRequired,
})
