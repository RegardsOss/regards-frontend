/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { AuthenticateShape, AuthenticateSelectors } from '@regardsoss/authentication-manager'
import AuthenticationDialogComponent from '../components/AuthenticationDialogComponent'
import SessionLockedFormComponent from '../components/SessionLockedFormComponent'

/**
* Session management container: if session times out, shows the session locking pane in dialog,
* otherwise renders below authentication panes
*/
export class SessionManagementContainer extends React.Component {

  static propTypes = {
    showLoginWindow: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func,
    children: React.PropTypes.element,
    // TODO do something with that
    // isLocked: React.PropTypes.bool.isRequired,
    // from parent map state
    authentication: AuthenticateShape,
    // from mapStateToProps
    isSessionLocked: React.PropTypes.bool,
  }

  unlockSession = (formValues) => {
    console.error(this.props.authentication)
    // TODO
  }

  render() {
    const { isSessionLocked, onRequestClose, showLoginWindow, children } = this.props
    return (
      <AuthenticationDialogComponent
        onRequestClose={isSessionLocked ? null : onRequestClose}
        open={showLoginWindow || !!isSessionLocked}
      >
        {
          isSessionLocked ?
            <SessionLockedFormComponent onUnlock={this.unlockSession} /> :
            children
        }
      </AuthenticationDialogComponent>
    )
  }
}

const mapStateToProps = state => ({
  isSessionLocked: AuthenticateSelectors.isAuthenticated(state),
  authentication: AuthenticateSelectors.getAuthentication(state),
})


export default connect(mapStateToProps)(SessionManagementContainer)
