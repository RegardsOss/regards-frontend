/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { EndpointSelectors } from '@regardsoss/endpoint'
import DisplayDecorator from '@regardsoss/display-control'
import hateoasDisplayLogic from './hateoasDisplayLogic'

/**
 * Decorates a React component with Hateoas display logic.
 *
 * @type {function}
 * @param {String[]} passedRequiredEndpoints The array of endpoints we require in order the component to display
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
export default function applyHateoasDisplayLogic(passedRequiredEndpoints) {
  return function (DecoratedComponent) {
    class HateoasDisplayDecorator extends React.Component {

      static propTypes = {
        requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
        availableEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
      }

      render() {
        const { requiredEndpoints, availableEndpoints } = this.props
        const decoratedComponentElement = React.createElement(DecoratedComponent)
        return (
          <DisplayDecorator displayLogic={() => hateoasDisplayLogic(requiredEndpoints, availableEndpoints)}>
            {decoratedComponentElement}
          </DisplayDecorator>
        )
      }
    }

    const mapStateToProps = state => ({
      requiredEndpoints: passedRequiredEndpoints,
      availableEndpoints: EndpointSelectors.getList(state),
    })

    return connect(mapStateToProps)(HateoasDisplayDecorator)
  }
}
