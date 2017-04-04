/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { EndpointSelectors } from '@regardsoss/endpoint'
import { DisplayDecorator } from '@regardsoss/display-control'
import allMatchHateoasDisplayLogic from './../logics/allMatchHateoasDisplayLogic'

/**
 * Decorates a React component with Hateoas display logic.
 *
 * @type {function}
 * @param {ResourceList} passedRequiredEndpoints The array of endpoints we require in order the component to display
 * @param {function} hateoasDisplayLogic Function taking two arrays of strings as parameters and returning True or False
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
export default function applyHateoasDisplayLogic(passedRequiredEndpoints, hateoasDisplayLogic = allMatchHateoasDisplayLogic) {
  return function (DecoratedComponent) {
    class ApplyHateoasDisplayLogic extends React.Component {

      static propTypes = {
        hateoasDisplayLogic: React.PropTypes.func.isRequired,
        requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
        availableEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
      }

      render() {
        const { requiredEndpoints, availableEndpoints } = this.props
        const decoratedComponentElement = React.createElement(DecoratedComponent, this.props)
        return (
          <DisplayDecorator displayLogic={() => this.props.hateoasDisplayLogic(requiredEndpoints, availableEndpoints)}>
            {decoratedComponentElement}
          </DisplayDecorator>
        )
      }
    }

    const mapStateToProps = state => ({
      hateoasDisplayLogic,
      requiredEndpoints: passedRequiredEndpoints,
      availableEndpoints: EndpointSelectors.getListOfKeys(state),
    })

    return connect(mapStateToProps)(ApplyHateoasDisplayLogic)
  }
}
