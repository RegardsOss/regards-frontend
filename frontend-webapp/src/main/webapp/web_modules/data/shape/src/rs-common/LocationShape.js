/**
 * LICENSE_PLACEHOLDER
 **/

const LocationShape = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.object,
  action: PropTypes.string.isRequired,
  key: PropTypes.string,
})

export default LocationShape

