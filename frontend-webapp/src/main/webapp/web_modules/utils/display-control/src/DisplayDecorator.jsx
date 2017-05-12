/**
 * LICENSE_PLACEHOLDER
 **/
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Generic decorator for controlling display
 * Use this decorator on a React.Component class in order to control its display
 * with the passed controller logic.
 *
 * @author Léo Mieulet
 */
class DisplayDecorator extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    // The logic in charge of supervising if the component shall be displayed
    displayLogic: PropTypes.func.isRequired,
  }
  render() {
    const { displayLogic, children } = this.props
    return (
      <ShowableAtRender show={displayLogic(children)}>
        {children}
      </ShowableAtRender>
    )
  }
}
export default DisplayDecorator
