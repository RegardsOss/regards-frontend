/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Board action Entity definition.
 * @author Sébastien Binda
 */
const BoardActionShape = PropTypes.shape({
  path: PropTypes.string,
  icon: PropTypes.element,
  tooltipMsg: PropTypes.string,
  hateoasDependencies: PropTypes.arrayOf(PropTypes.string),
})

export default BoardActionShape
