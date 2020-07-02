/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import root from 'window-or-global'
import { browserHistory } from 'react-router'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AllCriteriaData, pluginStateActions, pluginStateSelectors } from '@regardsoss/plugins'
import { modulesHelper } from '@regardsoss/modules-api'
import { isEqual } from 'date-fns'
import PluginsConfigurationProvider from './PluginsConfigurationProvider'
import FormComponent from '../../components/user/FormComponent'
import { resultsContextSelectors } from '../../clients/ResultsContextClient'

/**
 * Container for module form. It handles:
 * - Plugins configuration initial retrieval (from URL or local storage)
 * - Current state saving in URL and in local storare on search
 * - Initial reserch handling (wait for plugins to be initialized then show results)
 * - FormComponent displaying
 * @author Raphaël Mechali
 */
export class FormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { id }) {
    return {
      resultsContext: resultsContextSelectors.getResultsContext(state, id),
      pluginsState: pluginStateSelectors.getAllCriteriaData(state),
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
      dispatchClearAll: () => dispatch(pluginStateActions.clearAllStates()),
      publishAllStates: pluginsStates => dispatch(pluginStateActions.publishAllStates(pluginsStates)),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    onSearch: PropTypes.func.isRequired,
    // from mapStateToProps
    pluginsState: AllCriteriaData.isRequired,
    resultsContext: PropTypes.oneOfType([
      PropTypes.object, // during initialization
      UIShapes.ResultsContext, // after initialization
    ]),
    // from mapDispatchToProps
    dispatchClearAll: PropTypes.func.isRequired,
    publishAllStates: PropTypes.func.isRequired,
  }

  /** Key in local storage */
  static FORM_STORAGE_KEY = 'seach-form'

  /** Plugins state parameter name for browser URL */
  static PLUGINS_STATE_PARAMETER = 'ps'

  /**
   * Serializes plugins state to a string that can be used for URL and local storage
   * @param {*} pluginsState plugins state
   * @return {string} serialized state
   */
  static serializePluginsState(pluginsState) {
    // stringify that light
    return root.btoa(JSON.stringify(pluginsState))
  }

  /**
   * Deserializes plugins state
   * @param {string} serializedState plugins state
   * @return {*} deserialized state
   */
  static deserializePluginState(serializedState) {
    return JSON.parse(root.atob(serializedState))
  }

  /**
   * Stores plugins state in URL and / or in local storage, according with parameters
   * @param {string} appName application name
   * @param {string} project project name
   * @param {number} moduleId -
   * @param {*} pluginsState plugins state to store
   * @param {boolean} inURL should store in URL?
   * @param {boolean} inLocalStorage should store in brwoser local storage
   */
  static storeState(appName, project, moduleId, pluginsState, inURL = true, inLocalStorage = true) {
    // compute serialized state
    const serializedState = FormContainer.serializePluginsState(pluginsState)

    if (inURL) {
      // Update browser URL so it can be shared with other users
      const { pathname, query = {} } = browserHistory.getCurrentLocation()
      const nextQuery = {
        ...query,
        [FormContainer.PLUGINS_STATE_PARAMETER]: serializedState,
      }
      browserHistory.replace({ pathname, query: nextQuery })
    }

    if (inLocalStorage) {
    // Update local storage update (so user can retrieve form content when browsing through menu)
      UIDomain.LocalStorageData.saveData(appName, project, moduleId, FormContainer.FORM_STORAGE_KEY, serializedState)
    }
  }

  state = {
    configurationQuery: '',
    pluginsProps: { initialQuery: '' },
  }

  /**
   * Lifecycle method: component will mount.
   * It attempts to restore search context:
   * - from URL, if plugins state parameter is present (externally pasted URL)
   * - from local storage (ie values as user left them previously)
   */
  componentWillMount() {
    const {
      publishAllStates, appName, project, id, onSearch,
      moduleConf: { preview },
    } = this.props

    // 0 - Block this behavior in preview
    if (preview) {
      return
    }

    // A. Recover initial state from URL or local storage
    // A.1. If initial state is in URL, restore it and trigger a research ASAP
    // A.2. If initial state is local storage, restore it but don't trigger a research
    // A.3. Else: no initial state
    let initialPluginsState = {}
    let searchImmediately = false
    const psFromURL = get(browserHistory.getCurrentLocation(), `query.${FormContainer.PLUGINS_STATE_PARAMETER}`, null)
    const psFromLocalStorage = UIDomain.LocalStorageData.getData(appName, project, id, FormContainer.FORM_STORAGE_KEY)

    if (psFromURL) { // Case 1. Restore from URL
      searchImmediately = true
      initialPluginsState = FormContainer.deserializePluginState(psFromURL)
    } else if (psFromLocalStorage) { // case 2.
      searchImmediately = true
      initialPluginsState = FormContainer.deserializePluginState(psFromLocalStorage)
      // When restoring from local storage, update URL immediately to ensure URL can be shared
      FormContainer.storeState(appName, project, id, initialPluginsState, true, false)
    } // else: empty initial state (3)

    // B. Dispatch Redux plugins state initialization
    publishAllStates(initialPluginsState)
    // C - Search immediately when a previous research could be restored
    if (searchImmediately) {
      onSearch(initialPluginsState, true)
    }
    // D - Initialize state if context is already available
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const nextState = { ...this.state }
    const oldConfigurationRestrictions = get(oldProps, `resultsContext.tabs.${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}.criteria.configurationRestrictions`)
    const newConfigurationRestrictions = get(newProps, `resultsContext.tabs.${UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS}.criteria.configurationRestrictions`, [])
    if (!isEqual(oldConfigurationRestrictions, newConfigurationRestrictions)) {
      const configurationParameters = UIDomain.ResultsContextHelper.getQueryParametersFromCriteria(newConfigurationRestrictions)
      nextState.configurationQuery = configurationParameters[CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME] || ''
      nextState.pluginsProps = { initialQuery: nextState.configurationQuery }
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }


  /**
   * On search callback
   */
  onSearch = () => {
    const {
      appName, project, id, pluginsState, onSearch,
      moduleConf: { preview },
    } = this.props

    // 0 - Block this behavior in preview
    if (preview) {
      return
    }

    // store state in URL and local storage
    FormContainer.storeState(appName, project, id, pluginsState)

    // let parent handle objects research
    onSearch(pluginsState)
  }

  /** Clear all callback: clears URL, local state and redux shared plugins state */
  onClearAll = () => {
    const {
      appName, project, id, dispatchClearAll, moduleConf: { preview },
    } = this.props
    // 0 - Block this behavior in preview
    if (preview) {
      return
    }

    // 1 - clear URL
    const browserPath = browserHistory.getCurrentLocation().pathname
    const browserQuery = {
      ...(browserHistory.getCurrentLocation().query || {}),
      [FormContainer.PLUGINS_STATE_PARAMETER]: '',
    }
    browserHistory.replace({ pathname: browserPath, query: browserQuery })
    // 2 - Clear local storage
    UIDomain.LocalStorageData.clearData(appName, project, id, FormContainer.FORM_STORAGE_KEY, {})
    // 3 - Dispatch clear redux state
    dispatchClearAll()
  }

  render() {
    const { moduleConf } = this.props
    const { configurationQuery, pluginsProps } = this.state
    return (
      <PluginsConfigurationProvider
        criteria={moduleConf.criterion}
        preview={moduleConf.preview}
        contextQuery={configurationQuery}
      >
        <FormComponent
          pluginsProps={pluginsProps}
          onSearch={this.onSearch}
          onClearAll={this.onClearAll}
          {...modulesHelper.getReportedUserModuleProps(this.props)}
        />
      </PluginsConfigurationProvider>
    )
  }
}
export default connect(FormContainer.mapStateToProps, FormContainer.mapDispatchToProps)(FormContainer)
