/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import DatasetSelectionType from '../../models/datasets/DatasetSelectionTypes'

/**
 * Form entity description
 * @author Sébastien binda
 */
const DatasetsConfShape = PropTypes.shape({
  type: PropTypes.oneOf(values(DatasetSelectionType)),
  selectedDatasets: PropTypes.arrayOf(PropTypes.string),
  selectedModels: PropTypes.arrayOf(PropTypes.number),
})

export default DatasetsConfShape
