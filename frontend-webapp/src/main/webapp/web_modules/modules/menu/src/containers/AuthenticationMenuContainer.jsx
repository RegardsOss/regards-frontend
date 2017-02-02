/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { LazyModuleComponent } from '@regardsoss/modules'
import { isAuthenticated, logout, AuthenticationSelectors, AuthenticateShape } from '@regardsoss/authentication-manager'
import AuthenticationDialogComponent from '../components/AuthenticationDialogComponent'
import LoginButton from '../components/LoginButton'
import LoggedUserComponent from '../components/LoggedUserComponent'

/**
 * Manage connection to the store to handle authentication.
 * This container display the login button and the modal with login informations.
 */
class AuthenticationMenuContainer extends React.Component {

  /**
   *
   * @type {{appName: *, authentication: *}}
   */
  static propTypes = {
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    // from mapDispatchToProps
    onLogout: React.PropTypes.func,
    authentication: AuthenticateShape,
  }

  static contextTypes = {
    intl: intlShape,
  }

  constructor(props) {
    super(props)
    this.state = {
      dialogOpened: false,
    }
  }

  /**
   * Open the dialog by setting the state property to true
   */
  openDialog = () => {
    if (!this.state.dialogOpened) {
      this.setState({
        dialogOpened: true,
      })
    }
  }

  /**
   * Close the dialog by setting the state property to false
   */
  closeDialog = () => {
    if (this.state.dialogOpened) {
      this.setState({
        dialogOpened: false,
      })
    }
  }

  render() {
    const { authentication } = this.props
    const userAuthenticated = isAuthenticated(authentication)

    // If dialog is opened and user not authenticated, then display modal with login information
    if (this.state.dialogOpened && !userAuthenticated) {
      const module = {
        name: 'authentication',
        active: true,
        conf: {
          title: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
          cancelButton: true,
          onCancelAction: this.closeDialog,
          project: this.props.project,
        },
      }
      return (
        <div>
          <LoginButton style={{}} onLoginAction={this.openDialog} />
          <AuthenticationDialogComponent
            onRequestClose={buttonClicked => this.setState({ dialogOpened: false })}
            open
          >
            <LazyModuleComponent
              module={module}
              appName={this.props.appName}
            />
          </AuthenticationDialogComponent>
        </div>
      )
    } else if (userAuthenticated) {
      // Else, if user is authenticated, display is name
      return (
        <LoggedUserComponent name={authentication.user.sub} onLogout={this.props.onLogout} />
      )
    }
    // Else, Display only login button
    return (
      <LoginButton
        style={{}}
        onLoginAction={this.openDialog}
      />
    )
  }
}

const mapStateToProps = state => ({
  authentication: AuthenticationSelectors.getAuthentication(state),
})

const mapDispathToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispathToProps)(AuthenticationMenuContainer)
