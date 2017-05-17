/**
 * LICENSE_PLACEHOLDER
 **/

const locationShape = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.object,
  action: PropTypes.string.isRequired,
  key: PropTypes.string,
})

export default locationShape

