/**
 * LICENSE_PLACEHOLDER
 **/
import { MainActionButtonComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { FormattedMessage } from 'react-intl'

/**
 * Component to display a login button
 */
class LoginButton extends React.Component {

  static propTypes = {
    onLoginAction: React.PropTypes.func.isRequired,
  }

  static contextTypes= {
    ...themeContextType,
  }

  render() {
    return (
      <MainActionButtonComponent
        label={<FormattedMessage id="loginButtonLabel" />}
        onTouchTap={this.props.onLoginAction}
      />
    )
  }
}

export default LoginButton
