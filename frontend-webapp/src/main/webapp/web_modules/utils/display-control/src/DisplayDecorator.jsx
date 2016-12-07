/**
 * @author lmieulet
 */
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Generic decorator for controlling display
 * Use this decorator on a React.Component class in order to control its display
 * with the passed controller logic.
 */
class DisplayDecorator extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    // The logic in charge of supervising if the component shall be displayed
    displayLogic: React.PropTypes.func.isRequired,
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
