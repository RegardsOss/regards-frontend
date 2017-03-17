/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import HateoasLinks from '../model/HateoasLinks'
/**
 * Component to display an icon action for a given entity only if the action is available
 * from the entity server returned hateoas links
 *
 * @author Sébastien Binda
 */
class HateoasIconAction extends React.Component {

  static propTypes = {
    entityLinks: React.PropTypes.arrayOf(HateoasLinks).isRequired,
    hateoasKey: React.PropTypes.string.isRequired,
  }

  render() {
    const { entityLinks, hateoasKey } = this.props
    if (find(entityLinks, entity => entity.rel === hateoasKey)) {
      return (
        <IconButton
          {...omit(this.props, ['entityLinks', 'hateoasKey'])}
        />
      )
    }
    return null
  }

}

export default HateoasIconAction
