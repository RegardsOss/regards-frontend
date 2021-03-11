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
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import { AdminShapes, DataManagementShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ProjectUserSettingsFormComponent from '../components/ProjectUserSettingsFormComponent'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { projectUserSettingsActions, projectUserSettingsSelectors } from '../clients/ProjectUserSettingsClient'
import messages from '../i18n'
import styles from '../styles'

/**
 * Project user settings form container
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class ProjectUserSettingsFormContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      roleList: roleSelectors.getList(state),
      isFetchingRoleList: roleSelectors.isFetching(state),
      hasErrorRoleList: roleSelectors.hasError(state),
      groupList: accessGroupSelectors.getList(state),
      isFetchingGroupList: accessGroupSelectors.isFetching(state),
      hasErrorGroupList: accessGroupSelectors.hasError(state),
      settings: projectUserSettingsSelectors.getResult(state),
      hasErrorSettings: projectUserSettingsSelectors.hasError(state),
      isFetchingSettings: projectUserSettingsSelectors.isFetching(state),
    }
  }

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of actions ready to be dispatched in the redux store
 */
  static mapDispatchToProps(dispatch) {
    return {
      fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
      fetchGroupList: () => dispatch(accessGroupActions.fetchPagedEntityList()),
      fetchSettings: () => dispatch(projectUserSettingsActions.getSettings()),
      updateSettings: (accountSettings) => dispatch(projectUserSettingsActions.updateSettings(accountSettings)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    roleList: AdminShapes.RoleList,
    isFetchingRoleList: PropTypes.bool.isRequired,
    hasErrorRoleList: PropTypes.bool.isRequired,
    groupList: DataManagementShapes.AccessGroupList,
    isFetchingGroupList: PropTypes.bool.isRequired,
    hasErrorGroupList: PropTypes.bool.isRequired,
    settings: AdminShapes.ProjectUserSettingsWithContent,
    hasErrorSettings: PropTypes.bool.isRequired,
    isFetchingSettings: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchRoleList: PropTypes.func.isRequired,
    fetchGroupList: PropTypes.func.isRequired,
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle method component did mount, used here to start loading server data
   */
  UNSAFE_componentWillMount() {
    this.props.fetchSettings()
    this.props.fetchRoleList()
    this.props.fetchGroupList()
  }

  /**
   * On back button clicked callback
   */
  onBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/user/board`)
  }

  /**
   * On submit callback
   * @param {*} values edited settrings values
   */
  onSubmit = (values) => {
    const { updateSettings, settings } = this.props
    updateSettings({
      // merge current settings info and edited value
      ...settings.content,
      ...values,
    }).then((result) => {
      if (!result.error) { // show back when saved sucessfully
        this.onBack()
      }
    })
  }

  render() {
    const {
      hasErrorSettings, settings, isFetchingSettings, roleList, groupList,
      isFetchingRoleList, hasErrorRoleList, isFetchingGroupList, hasErrorGroupList,
    } = this.props
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isFetchingSettings || isFetchingRoleList || isFetchingGroupList}
            isContentError={hasErrorSettings || hasErrorRoleList || hasErrorGroupList}
            isEmpty={!settings}
          >
            <ProjectUserSettingsFormComponent
              settings={get(settings, 'content', null)}
              onBack={this.onBack}
              onSubmit={this.onSubmit}
              roleList={roleList}
              groupList={groupList}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  ProjectUserSettingsFormContainer.mapStateToProps,
  ProjectUserSettingsFormContainer.mapDispatchToProps)(ProjectUserSettingsFormContainer)
