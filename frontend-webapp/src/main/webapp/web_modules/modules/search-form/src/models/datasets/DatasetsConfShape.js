/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import DatasetSelectionType from '../../definitions/DatasetSelectionType'

/**
 * Form entity description
 * @author Sébastien binda
 */
const DatasetsConfShape = React.PropTypes.shape({
  type: React.PropTypes.oneOf(values(DatasetSelectionType)),
  selectedDatasets: React.PropTypes.arrayOf(React.PropTypes.string),
  selectedModels: React.PropTypes.arrayOf(React.PropTypes.number),
})

export default DatasetsConfShape
