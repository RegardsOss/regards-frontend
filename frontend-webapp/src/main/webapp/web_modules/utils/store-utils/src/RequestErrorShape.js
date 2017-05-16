/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * HTTP Request error entity description
 */
const RequestErrorShape = PropTypes.shape({
  hasError: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
})

export default RequestErrorShape
