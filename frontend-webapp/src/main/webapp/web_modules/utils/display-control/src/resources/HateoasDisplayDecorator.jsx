/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import allMatchHateoasDisplayLogic from '../logics/allMatchHateoasDisplayLogic'
import DisplayDecorator from './../DisplayDecorator'

/**
 * Component controlling the display of its children with Hateoas display logic
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
export class HateoasDisplayDecorator extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    hateoasDisplayLogic: PropTypes.func,
    requiredEndpoints: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
    // from mapStateToProps
    availableEndpoints: PropTypes.arrayOf(PropTypes.string),
    isInstance: PropTypes.bool,
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
  availableEndpoints: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

export default connect(mapStateToProps)(HateoasDisplayDecorator)
