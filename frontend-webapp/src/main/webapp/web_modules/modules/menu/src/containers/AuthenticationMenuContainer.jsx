/**
 * LICENSE_PLACEHOLDER
 **/
import { intlShape } from 'react-intl'
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
   * On click, display the dialog
   */
  openDialog = () => {
    this.setState({
      dialogOpened: true,
    })
  }

  closeDialog = () => {
    this.setState({
      dialogOpened: false,
    })
  }

  render() {
    const { authentication } = this.props
    const userAuthenticated = isAuthenticated(authentication)

    // If dialog is opened and user not authenticated, then display modal with login information
    if (this.state.dialogOpened && !userAuthenticated) {
      const dialogConf = {
        open: true,
        onRequestClose: buttonClicked => this.setState({ dialogOpened: false }),
      }
      const moduleConf = {
        title: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
        cancelButton: true,
        onCancelAction: this.closeDialog,
      }
      return (
        <div>
          <LoginButton style={{}} onLoginAction={this.openDialog} />
          <LazyModuleComponent
            moduleId={'authentication'}
            appName={this.props.appName}
            decorator={{ element: Dialog, conf: dialogConf }}
            moduleConf={moduleConf}
          />
        </div>
      )
    } else if (userAuthenticated) {
      // Else, if user is authenticated, display is name
      return (
        <LoggedUserComponent name={authentication.user.sub} />
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

export default connect(mapStateToProps)(AuthenticationMenuComponent)
