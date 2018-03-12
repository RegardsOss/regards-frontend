/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import {
  AuthenticationParametersSelectors,
  AuthenticationParametersActions,
  AuthenticationClient,
} from '@regardsoss/authentication-manager'
import { AdminShapes } from '@regardsoss/shape'
import { borrowableRolesActions, borrowableRolesSelectors } from '../../clients/BorrowableRolesClient'
import { borrowRoleActions, borrowRoleSelectors } from '../../clients/BorrowRoleClient'
import profileDialogActions from '../../model/ProfileDialogActions'
import LoggedUserComponent from '../../components/user/LoggedUserComponent'


/**
 * Component to display action available on connected user.
 * @author Sébastien binda
 */
export class LoggedUserContainer extends React.Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    // from mapStateToProps
    authenticationName: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    borrowableRoles: AdminShapes.RoleList.isRequired,
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
      Promise.resolve(sendBorrowRole(roleName)).then((actionResult) => {
        if (!actionResult.error) {
          this.goToHomePage()
        }
      })
    }
  }

  onLogout = () => {
    Promise.resolve(this.props.onLogout()).then((actionResult) => {
      if (!actionResult.error) {
        this.goToHomePage()
      }
    })
  }

  goToHomePage = () => {
    const { project, appName } = this.props
    let url
    if (this.props.project && this.props.project !== AuthenticationParametersActions.INSTANCE) {
      url = `/${appName}/${project}`
    } else {
      url = `/${appName}`
    }
    browserHistory.push(url)
  }


  render() {
    const {
      authenticationName, currentRole, borrowableRoles,
      showProfileEdition, isInstance,
    } = this.props
    return (
      <LoggedUserComponent
        name={authenticationName}
        showProfileEdition={!isInstance}
        onShowProfileEdition={showProfileEdition}
        onLogout={this.onLogout}
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
