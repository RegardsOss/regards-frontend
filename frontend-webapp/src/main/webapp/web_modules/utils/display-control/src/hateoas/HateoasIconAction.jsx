/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import IconButton from 'material-ui/IconButton'
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
    alwaysDisplayforInstanceUser: PropTypes.bool,
    disableInsteadOfHide : PropTypes.bool,
    // Set by mapStateToProps
    isInstance: PropTypes.bool,
  }

  render() {
    // Remove from otherProps all props that doesn't need to be reinjected in children
    // eslint-disable-next-line no-unused-vars, react/prop-types
    const { entityLinks, hateoasKey, alwaysDisplayforInstanceUser, isInstance, theme, i18n, dispatch, ...otherProps } = this.props
    if ((isInstance && alwaysDisplayforInstanceUser) || (!entityLinks && !hateoasKey) || find(entityLinks, entity => entity.rel === hateoasKey)) {
      return (
        <IconButton
          {...otherProps}
        />
      )
    }
    if (this.props.disableInsteadOfHide) {
      return (
        <IconButton
          disabled
          {...otherProps}
        />
      )
    }
    return <span />
  }

}

HateoasIconAction.defaultProps = {
  alwaysDisplayforInstanceUser: true,
  disableInsteadOfHide: false,
}

const mapStateToProps = state => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

export default connect(mapStateToProps)(HateoasIconAction)
