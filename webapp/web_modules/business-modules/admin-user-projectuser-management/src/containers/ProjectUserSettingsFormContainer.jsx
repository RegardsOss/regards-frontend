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
import keys from 'lodash/keys'
import every from 'lodash/every'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import { browserHistory } from 'react-router'
import { AdminShapes, DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ProjectUserSettingsFormComponent from '../components/ProjectUserSettingsFormComponent'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { projectUserSettingsActions, projectUserSettingsSelectors, updateSettingActions } from '../clients/ProjectUserSettingsClient'
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
      hasErrorRoleList: roleSelectors.hasError(state),
      groupList: accessGroupSelectors.getList(state),
      hasErrorGroupList: accessGroupSelectors.hasError(state),
      settings: projectUserSettingsSelectors.getList(state),
      hasErrorSettings: projectUserSettingsSelectors.hasError(state),
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
      fetchSettings: () => dispatch(projectUserSettingsActions.fetchEntityList()),
      updateSettings: (settingName, settingValue) => dispatch(updateSettingActions.updateSetting(settingName, settingValue)),
      flushSettings: () => dispatch(projectUserSettingsActions.flush()),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    roleList: AdminShapes.RoleList,
    hasErrorRoleList: PropTypes.bool.isRequired,
    groupList: DataManagementShapes.AccessGroupList,
    hasErrorGroupList: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    settings: CommonShapes.SettingsList,
    hasErrorSettings: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchRoleList: PropTypes.func.isRequired,
    fetchGroupList: PropTypes.func.isRequired,
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    flushSettings: PropTypes.func.isRequired,
  }

  state = {
    settings: null,
    isFetching: true,
  }

  /**
   * Lifecycle method component did mount, used here to start loading server data
   */
  componentDidMount() {
    const tasks = []
    tasks.push(this.props.fetchSettings())
    tasks.push(this.props.fetchRoleList())
    tasks.push(this.props.fetchGroupList())
    Promise.all(tasks)
      .then((actionResults) => {
        if (every(actionResults, (actionResult) => !actionResult.error)) {
          this.setState({
            isFetching: false,
          })
        }
      })
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  componentWillUnmount = () => {
    const { flushSettings } = this.props
    flushSettings()
  }

  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      settings,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.settings, settings)) {
      newState.settings = settings
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
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
    const { updateSettings } = this.props
    const tasks = map(keys(values), (key) => updateSettings(key, values[key]))
    Promise.all(tasks)
      .then((actionResults) => {
        if (every(actionResults, (actionResult) => !actionResult.error)) {
          this.onBack()
        }
      })
  }

  render() {
    const {
      hasErrorSettings, roleList, groupList,
      hasErrorRoleList, hasErrorGroupList,
    } = this.props
    const {
      settings, isFetching,
    } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isFetching}
            isContentError={hasErrorSettings || hasErrorRoleList || hasErrorGroupList}
          >
            <ProjectUserSettingsFormComponent
              settings={settings}
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
