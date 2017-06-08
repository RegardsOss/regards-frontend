/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Container entity
 * @author Sébastien Binda
 */
const ContainerContent = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object,
  containers: PropTypes.arrayOf(PropTypes.object),
  dynamicContent: PropTypes.bool,
})

export default ContainerContent
