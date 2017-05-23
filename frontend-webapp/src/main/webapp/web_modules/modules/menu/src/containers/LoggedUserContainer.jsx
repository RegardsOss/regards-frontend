/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-manager'
import { Role } from '@regardsoss/model'
import { borrowableRolesActions, borrowableRolesSelectors } from '../client/BorrowableRolesClient'
import { borrowRoleActions, borrowRoleSelectors } from '../client/BorrowRoleClient'
import profileDialogActions from '../model/ProfileDialogActions'
import LoggedUserComponent from '../components/LoggedUserComponent'


/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
export class LoggedUserContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    authenticationName: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    borrowableRoles: PropTypes.objectOf(Role).isRequired,
    isSendingBorrowRole: PropTypes.bool.isRequired,
    isInstance: PropTypes.bool.isRequired,
    // also borrowRoleResult, but only used in next props

    // from mapDispatchToProps
    onLogout: PropTypes.func.isRequired,
    fetchBorrowableRoles: PropTypes.func.isRequired,
    sendBorrowRole: PropTypes.func.isRequired,
    dispatchRoleBorrowed: PropTypes.func.isRequired,
    showProfileEdition: PropTypes.func.isRequired,
  }


  componentDidMount = () => {
    // fetch borrowable roles for logged user, but not for instance administrator
    if (!this.props.isInstance) {
      this.props.fetchBorrowableRoles()
    }
  }

  componentWillReceiveProps = ({ isSendingBorrowRole: nextIsSendingBorrowRole, borrowRoleResult }) => {
    const { isSendingBorrowRole, dispatchRoleBorrowed } = this.props
    if (isSendingBorrowRole && !nextIsSendingBorrowRole) {
      // we just finished changing role, notice the authenication state so that he updates with the new state
      dispatchRoleBorrowed(borrowRoleResult)
    }
  }

  onBorrowRole = (roleName) => {
    const { sendBorrowRole, currentRole } = this.props
    if (roleName !== currentRole) {
      sendBorrowRole(roleName)
    }
  }


  render() {
    const { authenticationName, currentRole, borrowableRoles, onLogout,
      showProfileEdition, isInstance } = this.props
    return (
      <LoggedUserComponent
        name={authenticationName}
        showProfileEdition={!isInstance}
        onShowProfileEdition={showProfileEdition}
        onLogout={onLogout}
        currentRole={currentRole}
        borrowableRoles={borrowableRoles}
        onBorrowRole={this.onBorrowRole}
      />)
  }
}

const mapStateToProps = (state) => {
  const isAuthenticated = AuthenticationClient.authenticationSelectors.isAuthenticated(state)
  return {
    currentRole: isAuthenticated ? AuthenticationClient.authenticationSelectors.getAuthentication(state).result.role : '',
    borrowableRoles: borrowableRolesSelectors.getList(state) || {},
    authenticationName: isAuthenticated ? AuthenticationClient.authenticationSelectors.getAuthentication(state).result.sub : '',
    isSendingBorrowRole: borrowRoleSelectors.isFetching(state),
    borrowRoleResult: borrowRoleSelectors.getResult(state),
    isInstance: AuthenticationParametersSelectors.isInstance(state),
  }
}

const mapDispathToProps = dispatch => ({
  onLogout: () => dispatch(AuthenticationClient.authenticationActions.logout()),
  fetchBorrowableRoles: () => dispatch(borrowableRolesActions.fetchEntityList()),
  sendBorrowRole: roleName => dispatch(borrowRoleActions.borrowRole(roleName)),
  dispatchRoleBorrowed: authResult => dispatch(AuthenticationClient.authenticationActions.notifyAuthenticationChanged(authResult)),
  showProfileEdition: () => dispatch(profileDialogActions.showEdition()),
})

export default connect(mapStateToProps, mapDispathToProps)(LoggedUserContainer)
