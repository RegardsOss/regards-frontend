/**
 * @author lmieulet
 */
import { connect } from 'react-redux'
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Generic decorator for controlling display
 * Use this decorator on a React.Component class in order to control its display
 * with the passed controller logic.
 * You can also pass mapStateToProps/mapDispatchToProps methods in order to
 * connect the decorated component.
 *
 * @type {function}
 * @param {IDisplayLogic} displayLogic The logic in charge of supervising if the component shall be displayed
 * @param {function} mapStateToProps method to connect the decorated component to the redux store
 * @param {function} mapDispatchToProps method to connect the decorated component to the dispatch
 * @return {function}
 */
class DisplayDecorator extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
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
