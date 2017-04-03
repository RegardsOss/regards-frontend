/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import HateoasDisplayDecorator from './../resources/HateoasDisplayDecorator'
import HateoasLinks from '../model/HateoasLinks'
/**
 * Component to display an icon action for a given entity only if the action is available
 * from the entity server returned hateoas links
 *
 * @author Sébastien Binda
 */
class ResourceIconAction extends React.Component {

  static propTypes = {
    resourceDependencies: React.PropTypes.string.isRequired,
  }

  render() {
    const { resourceDependencies, ...others } = this.props
    return (
      <HateoasDisplayDecorator
        requiredEndpoints={[resourceDependencies]}
      >
        <IconButton {...others} />
      </HateoasDisplayDecorator>
    )
  }
}

export default ResourceIconAction
