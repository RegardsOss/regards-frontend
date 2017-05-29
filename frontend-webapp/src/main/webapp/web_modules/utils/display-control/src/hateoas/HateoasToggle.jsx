/**
 * LICENSE_PLACEHOLDER
 **/
import Toggle from 'material-ui/Toggle'
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import HateoasLinks from '../model/HateoasLinks'

/**
 * React component to display a ToggleButton with hateoas condition on activation
 * @author Sébastien Binda
 */
class HateoasToggle extends React.Component {

  static propTypes = {
    entityLinks: PropTypes.arrayOf(HateoasLinks).isRequired,
    hateoasKey: PropTypes.string.isRequired,
    // Set by mapStateToProps
    isInstance: PropTypes.bool,
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { entityLinks, hateoasKey, isInstance, theme, i18n, dispatch, ...otherProps } = this.props
    if (isInstance) {
      return (
        <Toggle
          {...otherProps}
        />
      )
    }
    if (find(entityLinks, entity => entity.rel === hateoasKey)) {
      return (
        <Toggle
          {...otherProps}
        />
      )
    }
    return (<Toggle
      {...otherProps}
      disabled
    />)
  }

}

const mapStateToProps = state => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

export default connect(mapStateToProps)(HateoasToggle)
