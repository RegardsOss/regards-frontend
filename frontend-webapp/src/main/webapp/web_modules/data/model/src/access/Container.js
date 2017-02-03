/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Container entity
 * @author Sébastien Binda
 */
const Container = React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  classes: React.PropTypes.arrayOf(React.PropTypes.string),
  styles: React.PropTypes.object,
  containers: React.PropTypes.arrayOf(React.PropTypes.object),
  dynamicContent: React.PropTypes.bool,
})

export default Container
