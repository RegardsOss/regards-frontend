/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Shape of a Fragment of attributes as it is used in the AttributesModel passed to the plugins
 * @author Sébastien Binda
 */
const Fragment = React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
  }),
})

export default Fragment
