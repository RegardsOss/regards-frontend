/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import IconButton from 'material-ui/IconButton'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import HateoasDisplayDecorator from './../resources/HateoasDisplayDecorator'

/**
 * Component to display an icon action only if the action is authorized
 * from the server using the resources access list returned for the current user
 * Bypass this mecanism is the user's role is instance admin
 *
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
class ResourceIconAction extends React.Component {

  static propTypes = {
    resourceDependency: React.PropTypes.string,
    resourceDependencies: React.PropTypes.arrayOf(React.PropTypes.string.isRequired),
    // Set by mapStateToProps
    isInstance: React.PropTypes.bool,
  }

  static defaultProps = {
    resourceDependencies: [],
  }

  render() {
    const { resourceDependency, resourceDependencies, isInstance, ...others } = this.props
    if (isInstance) {
      return <IconButton {...others} />
    }
    return (
      <HateoasDisplayDecorator
        requiredEndpoints={[resourceDependency, ...resourceDependencies]}
      >
        <IconButton {...others} />
      </HateoasDisplayDecorator>
    )
  }
}

const mapStateToProps = state => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

export default connect(mapStateToProps)(ResourceIconAction)
