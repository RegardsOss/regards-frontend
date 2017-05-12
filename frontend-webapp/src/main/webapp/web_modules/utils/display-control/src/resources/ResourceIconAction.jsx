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
    resourceDependency: PropTypes.string,
    resourceDependencies: PropTypes.arrayOf(PropTypes.string.isRequired),
    // Set by mapStateToProps
    isInstance: PropTypes.bool,
  }

  static defaultProps = {
    resourceDependencies: [],
  }

  render() {
    // Remove from otherProps all props that doesn't need to be reinjected in children
    // eslint-disable-next-line no-unused-vars, react/prop-types
    const { resourceDependency, resourceDependencies, isInstance, theme, i18n, dispatch, ...others } = this.props
    if (!resourceDependency && resourceDependencies.length === 0) {
      console.error('ResourceIconAction requires either a resourceDependency or a resourceDependencies array')
    }
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
