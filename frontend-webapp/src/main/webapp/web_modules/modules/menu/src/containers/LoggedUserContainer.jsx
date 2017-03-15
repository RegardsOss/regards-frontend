/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { connect } from '@regardsoss/redux'
import { AuthenticateActions, AuthenticateSelectors } from '@regardsoss/authentication-manager'
import { Role } from '@regardsoss/model'
import BorrowableRolesActions from '../model/BorrowableRolesActions'
import BorrowableRolesSelectors from '../model/BorrowableRolesSelectors'
import BorrowRoleActions from '../model/BorrowRoleActions'
import BorrowRoleSelectors from '../model/BorrowRoleSelectors'
import LoggedUserComponent from '../components/LoggedUserComponent'


/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
class LoggedUserContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    authenticationName: React.PropTypes.string.isRequired,
    currentRole: React.PropTypes.string.isRequired,
    borrowableRoles: React.PropTypes.objectOf(Role).isRequired,
    isSendingBorrowRole: React.PropTypes.bool.isRequired,
    // also borrowRoleResult, but only used in next props

    // from mapDispathToProps
    onLogout: React.PropTypes.func.isRequired,
    fetchBorrowableRoles: React.PropTypes.func.isRequired,
    sendBorrowRole: React.PropTypes.func.isRequired,
    dispatchRoleBorrowed: React.PropTypes.func.isRequired,
  }


  componentDidMount = () => {
    // fetch borrowable roles for logged user
    this.props.fetchBorrowableRoles()
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
    const { authenticationName, currentRole, borrowableRoles, onLogout } = this.props
    return (
      <LoggedUserComponent
        name={authenticationName}
        onLogout={onLogout}
        currentRole={currentRole}
        borrowableRoles={borrowableRoles}
        onBorrowRole={this.onBorrowRole}
      />)
  }
}

const mapStateToProps = (state) => {
  const isAuthenticated = AuthenticateSelectors.isAuthenticated(state)
  return {
    currentRole: isAuthenticated ? AuthenticateSelectors.getAuthentication(state).result.role : '',
    borrowableRoles: BorrowableRolesSelectors.getList(state) || {},
    authenticationName: isAuthenticated ? AuthenticateSelectors.getAuthentication(state).result.sub : '',
    isSendingBorrowRole: BorrowRoleSelectors.isFetching(state),
    borrowRoleResult: BorrowRoleSelectors.getResult(state),
  }
}

const mapDispathToProps = dispatch => ({
  onLogout: () => dispatch(AuthenticateActions.logout()),
  fetchBorrowableRoles: () => dispatch(BorrowableRolesActions.fetchEntityList()),
  sendBorrowRole: roleName => dispatch(BorrowRoleActions.borrowRole(roleName)),
  dispatchRoleBorrowed: authResult => dispatch(AuthenticateActions.notifyAuthenticationChanged(authResult)),
})

export default connect(mapStateToProps, mapDispathToProps)(LoggedUserContainer)
