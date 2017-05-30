/**
 * LICENSE_PLACEHOLDER
 **/
import { MainActionButtonComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Component to display a login button
 * @author Sébastien binda
 */
class LoginButton extends React.Component {

  static propTypes = {
    onLoginAction: PropTypes.func.isRequired,
  }

  static contextTypes= {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    return (
      <MainActionButtonComponent
        label={this.context.intl.formatMessage({ id: 'loginButtonLabel' })}
        onTouchTap={this.props.onLoginAction}
      />
    )
  }
}

export default LoginButton
