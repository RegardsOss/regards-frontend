/**
 * LICENSE_PLACEHOLDER
 **/
import { ShowableAtRender } from '@regardsoss/components'

/**
 * Generic decorator for controlling the display of a component.
 * Use this decorator on a React.Component class in order to control its display with the passed logic.
 * You can also pass mapStateToProps/mapDispatchToProps methods in order to connect the decorated component.
 *
 * @type {function}
 * @param {function} displayLogic The function in charge of supervising the display
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
export default function applyDisplayLogic(displayLogic) {
  return function (DecoratedComponent) {
    class DisplayDecorator extends React.Component {

      render() {
        // Instanciate the component before in order to be able to pass it
        // to the controller
        const decoratedComponentElement = React.createElement(
          DecoratedComponent,
          this.props,
        )

        return (
          <ShowableAtRender show={displayLogic(decoratedComponentElement)}>
            {decoratedComponentElement}
          </ShowableAtRender>
        )
      }
    }
    return DisplayDecorator
  }
}
