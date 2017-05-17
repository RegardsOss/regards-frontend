/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import omit from 'lodash/omit'
import MenuItem from 'material-ui/MenuItem'
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import HateoasLinks from '../model/HateoasLinks'

/**
 * Component to display an icon action for a given entity only if the action is available
 * from the entity server returned hateoas links
 *
 * @author Sébastien Binda
 */
class HateoasIconAction extends React.Component {

  static propTypes = {
    entityLinks: PropTypes.arrayOf(HateoasLinks),
    hateoasKey: PropTypes.string,
    // Set by mapStateToProps
    isInstance: PropTypes.bool,
  }

  render() {
    const { entityLinks, hateoasKey } = this.props
    if (this.props.isInstance || (!entityLinks && !hateoasKey) || find(entityLinks, entity => entity.rel === hateoasKey)) {
      return (
        <MenuItem
          {...omit(this.props, ['entityLinks', 'hateoasKey'])}
        />
      )
    }
    return <span />
  }

}

const mapStateToProps = state => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

export default connect(mapStateToProps)(HateoasIconAction)
