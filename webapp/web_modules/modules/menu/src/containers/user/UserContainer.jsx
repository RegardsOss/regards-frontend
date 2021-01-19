/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { AuthenticationClient, AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { borrowableRolesActions, borrowableRolesSelectors } from '../../clients/BorrowableRolesClient'
import MainMenuComponent from '../../components/user/MainMenuComponent'

// default selector instance to get currently displayed dynamic module ID
const selectedDynamicModuleIdSelectors = UIClient.getSelectedDynamicModuleSelectors()

/**
 * Main container of module menu (user part). It fetches / re-initializes borrowable roles on user change, as they are shared by
 * many sub components
 * @author Sébastien binda
 **/
export class UserContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    const isAuthenticated = AuthenticationClient.authenticationSelectors.isAuthenticated(state)
    return {
      currentModuleId: selectedDynamicModuleIdSelectors.getDynamicModuleId(state),
      authenticationName: isAuthenticated ? AuthenticationClient.authenticationSelectors.getAuthentication(state).result.sub : '',
      userRole: isAuthenticated ? AuthenticationClient.authenticationSelectors.getAuthentication(state).result.role : '',
      borrowableRoles: borrowableRolesSelectors.getList(state),
      isInstance: AuthenticationParametersSelectors.isInstance(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchBorrowableRoles: () => dispatch(borrowableRolesActions.fetchEntityList()),
      flushBorrowableRoles: () => dispatch(borrowableRolesActions.flush()),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration,
    // from map state to props
    currentModuleId: PropTypes.number,
    authenticationName: PropTypes.string,
    userRole: PropTypes.string,
    borrowableRoles: AdminShapes.RoleList.isRequired,
    isInstance: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchBorrowableRoles: PropTypes.func.isRequired,
    flushBorrowableRoles: PropTypes.func.isRequired,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      isInstance, fetchBorrowableRoles, flushBorrowableRoles, authenticationName,
    } = newProps
    if (!isInstance && !isEqual(oldProps.authenticationName, authenticationName)) {
      // when user changes, fetch or clear roles (not on instance as that functionnality should not be used here)
      if (authenticationName) {
        fetchBorrowableRoles()
      } else {
        flushBorrowableRoles()
      }
    }
  }

  render() {
    const {
      currentModuleId, userRole, borrowableRoles, moduleConf, ...remainingProps
    } = this.props
    // nota: we keep borrowable role list and role list separatated fro preview mode, where the real list is fetched from server
    // as instance admin cannot borrow any role...
    // One is used by borrow role functionnality, the other to resolve the visible modules by user role
    return (
      <MainMenuComponent
        currentRole={moduleConf.displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW ? moduleConf.previewRole : userRole}
        roleList={moduleConf.displayMode === UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW ? moduleConf.roleList : borrowableRoles}
        borrowableRoles={borrowableRoles}
        currentModuleId={currentModuleId}
        moduleConf={moduleConf}
        {...remainingProps}
      />
    )
  }
}

export default connect(
  UserContainer.mapStateToProps,
  UserContainer.mapDispatchToProps)(UserContainer)
