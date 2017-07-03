/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Board action Entity definition.
 * @author Sébastien Binda
 */
const BoardActionShape = PropTypes.shape({
  initialize: PropTypes.func,
  path: PropTypes.string,
  icon: PropTypes.element,
  className: PropTypes.string,
  tooltipMsg: PropTypes.string,
  touchTapAction: PropTypes.func,
  confirmMessage: PropTypes.string,
  hateoasDependencies: PropTypes.arrayOf(PropTypes.string),
})

export default BoardActionShape
