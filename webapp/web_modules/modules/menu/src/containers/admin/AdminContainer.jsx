/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { adminModuleActions, adminModuleSelectors } from '../../clients/ModulesListClient'
import { adminLayoutActions, adminLayoutSelectors } from '../../clients/LayoutListClient'
import { roleActions, roleSelectors } from '../../clients/RoleClient'
import DynamicModulesProviderContainer from '../common/DynamicModulesProviderContainer'
import ModuleFormComponent from '../../components/admin/ModuleFormComponent'

/**
 * Admin root container for menu module
 * @author Sébastien binda
 */
export class AdminContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      roleList: roleSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, props) {
    return {
      fetchLayout: () => dispatch(adminLayoutActions.fetchEntity(props.appName)),
      fetchModules: () => dispatch(adminModuleActions.fetchPagedEntityList(0, null, { applicationId: props.appName }, { sort: 'id,ASC' })),
      fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
    }
  }

  static propTypes = {
    project: PropTypes.string,
    roleList: AdminShapes.RoleList,
    // default module properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // from map dispatch to props
    fetchLayout: PropTypes.func.isRequired,
    fetchModules: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle method component did mount. Used here to fetch layout and modules data (not fetched in common redux store by admin application)
   */
  componentDidMount = () => {
    const {
      fetchLayout, fetchModules, fetchRoleList, appName,
    } = this.props
    // fetch corresponding user application layout, modules and roles, except when editing portal menu as it doesn't use
    // related functionnalities
    if (appName !== UIDomain.APPLICATIONS_ENUM.PORTAL) {
      fetchLayout()
      fetchModules()
      // fetch role list for form edition
      fetchRoleList()
    }
  }

  render() {
    const {
      appName, project, adminForm, roleList,
    } = this.props
    if (isEmpty(roleList) && appName !== UIDomain.APPLICATIONS_ENUM.PORTAL) {
      // prevent displayed before roles were fetched, except if portal (as portal doesn't show that option)
      return null
    }
    return (
      <DynamicModulesProviderContainer
        moduleSelectors={adminModuleSelectors}
        layoutSelectors={adminLayoutSelectors}
        keepOnlyActive={false}
      >
        <ModuleFormComponent
          appName={appName}
          project={project}
          adminForm={adminForm}
          roleList={roleList}
        />
      </DynamicModulesProviderContainer>)
  }
}

export default connect(
  AdminContainer.mapStateToProps,
  AdminContainer.mapDispatchToProps)(AdminContainer)
