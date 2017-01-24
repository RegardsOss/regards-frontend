/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Form entity description
 */
const DatasetsConfShape = React.PropTypes.shape({
  type: React.PropTypes.string,
  selectedDatasets: React.PropTypes.arrayOf(React.PropTypes.number),
  selectedModels: React.PropTypes.arrayOf(React.PropTypes.number),
})

export default DatasetsConfShape
