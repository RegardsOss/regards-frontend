/**
 * LICENSE_PLACEHOLDER
 **/

const locationShape = React.PropTypes.shape({
  pathname: React.PropTypes.string.isRequired,
  search: React.PropTypes.string.isRequired,
  state: React.PropTypes.object,
  action: React.PropTypes.string.isRequired,
  key: React.PropTypes.string,
})

export default locationShape

