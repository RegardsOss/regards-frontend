/**
 * LICENSE_PLACEHOLDER
 **/
import BoardActionShape from './BoardActionShape'

/**
 * BoardItem Entity definition
 * @author Sébastien Binda
 */
const BoardItemShape = React.PropTypes.shape({
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  description: React.PropTypes.string,
  actions: React.PropTypes.arrayOf(BoardActionShape),
  advanced: React.PropTypes.bool.isRequired,
})

export default BoardItemShape
