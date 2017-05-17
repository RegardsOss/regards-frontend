/**
 * LICENSE_PLACEHOLDER
 **/
import BoardActionShape from './BoardActionShape'

/**
 * BoardItem Entity definition
 * @author Sébastien Binda
 */
const BoardItemShape = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(BoardActionShape),
  advanced: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
})

export default BoardItemShape
