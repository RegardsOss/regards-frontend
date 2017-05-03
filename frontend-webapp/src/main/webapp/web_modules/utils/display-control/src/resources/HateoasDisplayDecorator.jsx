/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { EndpointSelectors } from '@regardsoss/endpoint'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import allMatchHateoasDisplayLogic from './../logics/allMatchHateoasDisplayLogic'
import DisplayDecorator from './../DisplayDecorator'

/**
 * Component controlling the display of its children with Hateoas display logic
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
export class HateoasDisplayDecorator extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    hateoasDisplayLogic: React.PropTypes.func,
    requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
    // from mapStateToProps
    availableEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
    isInstance: React.PropTypes.bool,
  }

  static defaultProps = {
    hateoasDisplayLogic: allMatchHateoasDisplayLogic,
    requiredEndpoints: [],
  }

  render() {
    const { isInstance, children, hateoasDisplayLogic, requiredEndpoints, availableEndpoints } = this.props
    if (isInstance) {
      return children
    }
    return (
      <DisplayDecorator displayLogic={() => hateoasDisplayLogic(requiredEndpoints, availableEndpoints)}>
        {children}
      </DisplayDecorator>
    )
  }
}

const mapStateToProps = state => ({
  availableEndpoints: EndpointSelectors.getListOfKeys(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

export default connect(mapStateToProps)(HateoasDisplayDecorator)
