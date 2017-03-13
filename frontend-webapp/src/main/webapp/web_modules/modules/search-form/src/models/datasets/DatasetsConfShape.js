/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Form entity description
 * @author Sébastien binda
 */
const DatasetsConfShape = React.PropTypes.shape({
  type: React.PropTypes.string,
  selectedDatasets: React.PropTypes.arrayOf(React.PropTypes.string),
  selectedModels: React.PropTypes.arrayOf(React.PropTypes.number),
})

export default DatasetsConfShape
