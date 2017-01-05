/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Form entity description
 */
const DatasetsConfShape = React.PropTypes.shape({
  type: React.PropTypes.string,
  datasets: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
  })),
  models: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
  })),
})

export default DatasetsConfShape
