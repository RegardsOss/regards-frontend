/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { CommonShapes } from '@regardsoss/shape'
import { StorageDomain } from '@regardsoss/domain'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageSettingsComponent from '../components/StorageSettingsComponent'
import {
  settingsActions, settingsSelectors, storageSettingsActions,
  storageSettingsSelectors,
} from '../clients/StorageSettingsClient'
import { storagesListActions, storagesListSelectors } from '../clients/StoragesListClient'
import { SETTINGS_ENUM } from '../domain/StorageSettings'
import messages from '../i18n'
import styles from '../styles'

/**
 * StorageSettingsContainer
 * @author Théo Lasserre
 */
export class StorageSettingsContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    settings: CommonShapes.SettingsList,
    // eslint-disable-next-line react/no-unused-prop-types
    settingsStorage: CommonShapes.SettingsList,
    storages: CommonShapes.PluginConfigurationArray.isRequired,
    hasErrorSettings: PropTypes.bool.isRequired,
    isFetchingStorages: PropTypes.bool.isRequired,
    hasErrorStorages: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    getStorages: PropTypes.func.isRequired,
    flushSettings: PropTypes.func.isRequired,
    fetchStorageSettings: PropTypes.func.isRequired,
    updateStorageSettings: PropTypes.func.isRequired,
    flushStorageSettings: PropTypes.func.isRequired,
  }

  /**
   * Redux: forEach state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      settings: settingsSelectors.getList(state),
      hasErrorSettings: settingsSelectors.hasError(state),
      storages: storagesListSelectors.getOrderedList(state),
      isFetchingStorages: storagesListSelectors.isFetching(state),
      hasErrorStorages: storagesListSelectors.hasError(state),
      settingsStorage: storageSettingsSelectors.getList(state),
    }
  }

  /**
   * Redux: forEach dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchSettings: () => dispatch(settingsActions.fetchEntityList()),
      updateSettings: (settingName, settingValue) => dispatch(settingsActions.updateEntity(settingName, settingValue)),
      getStorages: (microserviceName, pluginType) => dispatch(storagesListActions.getPluginConfigurationsByType(microserviceName, pluginType)),
      flushSettings: () => dispatch(settingsActions.flush()),
      fetchStorageSettings: () => dispatch(storageSettingsActions.fetchEntityList()),
      updateStorageSettings: (settingName, settingValue) => dispatch(storageSettingsActions.updateEntity(settingName, settingValue)),
      flushStorageSettings: () => dispatch(storageSettingsActions.flush()),
    }
  }

  state = {
    settings: null,
    isFetchingSettings: true,
    settingsStorage: null,
  }

  /**
   * Lifecycle method component did mount, used here to start loading server data
   */
  componentDidMount() {
    const { getStorages, fetchSettings, fetchStorageSettings } = this.props
    const tasks = []
    tasks.push(fetchSettings())
    tasks.push(fetchStorageSettings())
    tasks.push(getStorages(STATIC_CONF.MSERVICES.STORAGE, StorageDomain.PluginTypeEnum.STORAGE))
    Promise.all(tasks)
      .then((actionResults) => {
        if (!find(actionResults, (actionResult) => actionResult.error)) {
          this.setState({
            isFetchingSettings: false,
          })
        }
      })
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  componentWillUnmount() {
    const { flushSettings, flushStorageSettings } = this.props
    flushSettings()
    flushStorageSettings()
  }

  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      settings, settingsStorage,
    } = newProps

    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.settings, settings)) {
      newState.settings = settings
    }
    if (!isEqual(oldProps.settingsStorage, settingsStorage)) {
      newState.settingsStorage = settingsStorage
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
    browserHistory.push(`/admin/${project}/data/acquisition/board`)
  }

  /**
   * On submit callback
   * @param {*} values edited settrings values
   */
  onSubmit = (values) => {
    const { updateSettings, updateStorageSettings } = this.props
    const tasks = map(keys(values), (key) => {
      if (key === SETTINGS_ENUM.CACHE_MAX_SIZE || key === SETTINGS_ENUM.TENANT_CACHE_PATH) {
        return updateStorageSettings(key, values[key])
      }
      return updateSettings(key, values[key])
    })
    Promise.all(tasks)
      .then((actionResults) => {
        if (!find(actionResults, (actionResult) => actionResult.error)) {
          this.onBack()
        }
      })
  }

  render() {
    const {
      hasErrorSettings,
      isFetchingStorages, hasErrorStorages, storages,
    } = this.props
    const {
      settings, isFetchingSettings, settingsStorage,
    } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isFetchingSettings || isFetchingStorages}
            isContentError={hasErrorSettings || hasErrorStorages}
            isEmpty={!settings && !settingsStorage}
          >
            <StorageSettingsComponent
              settings={settings}
              settingsStorage={settingsStorage}
              onBack={this.onBack}
              onSubmit={this.onSubmit}
              storages={storages}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  StorageSettingsContainer.mapStateToProps,
  StorageSettingsContainer.mapDispatchToProps)(StorageSettingsContainer)
