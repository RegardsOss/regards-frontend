/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import IconButton from 'material-ui/IconButton'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import HateoasDisplayDecorator from './../resources/HateoasDisplayDecorator'

/**
 * Component to display an icon action for a given entity only if the action is available
 * from the entity server returned hateoas links
 *
 * @author Sébastien Binda
 */
class ResourceIconAction extends React.Component {

  static propTypes = {
    resourceDependencies: React.PropTypes.string.isRequired,
    // Set by mapStateToProps
    isInstance: React.PropTypes.bool,
  }

  render() {
    const { resourceDependencies, isInstance, ...others } = this.props
    if (isInstance) {
      return <IconButton {...others} />
    }
    return (
      <HateoasDisplayDecorator
        requiredEndpoints={[resourceDependencies]}
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
