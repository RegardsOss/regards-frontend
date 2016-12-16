/**
 * LICENSE_PLACEHOLDER
 **/
import connect from '@regardsoss/redux'
import { LazyModuleComponent } from '@regardsoss/modules-manager'
import { isAuthenticated, AuthenticationSelectors, AuthenticateShape } from '@regardsoss/authentication-manager'
import Dialog from 'material-ui/Dialog'
import LoginButton from '../components/LoginButton'
import LoggedUserComponent from '../components/LoggedUserComponent'

/**
 * Manage connection to the store to handle authentication.
 * This container display the login button and the modal with login informations.
 */
class AuthenticationMenuComponent extends React.Component {

  /**
   *
   * @type {{appName: *, authentication: *}}
   */
  static propTypes = {
    appName: React.PropTypes.string.isRequired,
    authentication: AuthenticateShape,
  }

  constructor(props) {
    super(props)
    this.state = {
      dialogOpened: false,
    }
  }

  /**
   * On click, display the dialog
   */
  onLoginAction = () => {
    this.setState({
      dialogOpened: true,
    })
  }

  render() {
    const { authentication } = this.props
    const userAuthenticated = isAuthenticated(authentication)

    // If dialog is opened and user not authenticated, then display modal with login informations
    if (this.state.dialogOpened && !userAuthenticated) {
      const dialogConf = {
        open: true,
        onRequestClose: buttonClicked => this.setState({ dialogOpened: false }),
      }
      return (
        <div>
          <div onClick={this.handleClick}>Login ...</div>
          <LazyModuleComponent
            moduleId={'authentication'}
            appName={this.props.appName}
            decorator={{ element: Dialog, conf: dialogConf }}
          />
        </div>
      )
    }
    // Else, if user is authenticated, display is name
    else if (userAuthenticated) {
      return (
        <LoggedUserComponent name={authentication.user.sub} />
      )
    }
    // Else, Display only login button
    return (
      <LoginButton
        style={{}}
        onLoginAction={this.onLoginAction}
      />
    )
  }
}

const mapStateToProps = state => ({
  authentication: AuthenticationSelectors.getAuthentication(state),
})

export default connect(mapStateToProps)(AuthenticationMenuComponent)
