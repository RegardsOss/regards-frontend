/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * HTTP Request error entity description
 */
const RequestErrorShape = React.PropTypes.shape({
  hasError: React.PropTypes.bool,
  type: React.PropTypes.string,
  message: React.PropTypes.string,
})

export default RequestErrorShape
