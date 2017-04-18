/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { LazyModuleComponent } from '@regardsoss/modules'
import { AuthenticationClient, routeHelpers } from '@regardsoss/authentication-manager'
import LoginButton from '../components/LoginButton'
import LoggedUserContainer from './LoggedUserContainer'

/**
 * Manages authentication state machine. The callbacks are provided by parent
 * This container display the login button and the modal with login informations.
 * @author Sébastien binda
 */
class AuthenticationMenuContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    // from mapStateToProps
    isAuthenticated: React.PropTypes.bool,
  }

  static contextTypes = {
    intl: intlShape,
    // router injection
    router: React.PropTypes.any,
  }

  // when user access interface from mail (like reset password), he should see dialog initially
  componentWillMount = () => this.setAuthenticationVisible(routeHelpers.isBackFromAuthenticationMail())

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated && this.state && this.state.authenticationVisible) {
      // user logged in, hide the dialog
      this.onCloseDialog()
    }
  }

  // forbid closing when we are in a specific authentication URL (to avoid inconsistent states)
  onCloseDialog = () => this.setAuthenticationVisible(false)

  /**
   * Shows and hide authentication dialog
   * @param authenticationVisible is visible in next state?
   */
  setAuthenticationVisible = (authenticationVisible) => {
    if (!this.state || this.state.authenticationVisible !== authenticationVisible) {
      this.setState({ authenticationVisible })
    }
  }

  render() {
    const { isAuthenticated } = this.props
    const { authenticationVisible } = this.state
    return (
      <div>
        {
          // in bar: render user status or connection button
          isAuthenticated ?
            <LoggedUserContainer /> :
            <LoginButton style={{}} onLoginAction={() => this.setAuthenticationVisible(true)} />
        }
        <LazyModuleComponent
          module={{
            name: 'authentication',
            active: true,
            conf: {
              showLoginWindow: authenticationVisible,
              loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
              // show cancel button only when not in a specific authentication URL
              showCancel: !routeHelpers.isBackFromAuthenticationMail(),
              showAskProjectAccess: true,
              onCancelAction: this.onCloseDialog,
            },
          }}
          appName={this.props.appName}
          project={this.props.project}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
})

export default connect(mapStateToProps)(AuthenticationMenuContainer)
