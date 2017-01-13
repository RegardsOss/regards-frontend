/**
 * LICENSE_PLACEHOLDER
 **/
import Model from '../dam/Model'

/**
 * Entity definition for all catalog entities like datasets, dataobjects, collections or documents.
 */
export default React.PropTypes.shape({
  id: React.PropTypes.number,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['DATASET', 'COLLECTION', 'DATAOBJECT', 'DOCUMENT']).isRequired,
  model: Model.isRequired,
})
