/** @module Common.DisplayControl */

import { connect } from 'react-redux'
import { ShowableAtRender } from '@regardsoss/components'
import { IDisplayController } from '@regardsoss/display-control'
import { HateoasDisplayController } from './HateoasDisplayController'
import EndpointSelectors from './endpoints/EndpointSelectors'
/**
 * Generic decorator for controlling display
 * Use this decorator on a React.Component class in order to control its display
 * with the passed controller logic.
 * You can also pass mapStateToProps/mapDispatchToProps methods in order to
 * connect the decorated component.
 *
 * @type {function}
 * @param {IDisplayController} controller The controller in charge of supervising the display
 * @param {function} mapStateToProps method to connect the decorated component to the redux store
 * @param {function} mapDispatchToProps method to connect the decorated component to the dispatch
 * @return {React.Component<any, any>}
 */
export function applyDisplayControl(controller, mapStateToProps, mapDispatchToProps) {
  return function (DecoratedComponent) {
    class DisplayControlDecorator extends React.Component {

      render() {
        // Instanciate the component before in order to to pass it
        // to the controller
        const decoratedComponentElement = React.createElement(
          DecoratedComponent,
          this.props
        )

        return (
          <ShowableAtRender show={controller(decoratedComponentElement)}>
            {decoratedComponentElement}
          </ShowableAtRender>
        )
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(DisplayControlDecorator)
  }
}

/**
 * Shortcut method to decorate a component with Hateoas display control logic
 *
 * @type {function}
 * @param {React.ComponentClass<any>} DecoratedComponent The controller in charge of supervising the display
 * @return {React.Component<any, any>}
 */
export function applyHateoasDisplayControl(DecoratedComponent) {
  const mapStateToProps = state => ({
    endpoints: EndpointSelectors.getEndpointsItems(state),
  })
  const mapDispatchToProps = dispatch => ({})
  return applyDisplayControl(HateoasDisplayController, mapStateToProps, mapDispatchToProps)(DecoratedComponent)
}
