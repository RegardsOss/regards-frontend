/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import merge from 'lodash/merge'
import reduce from 'lodash/reduce'
import { browserHistory } from 'react-router'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { modulesHelper } from '@regardsoss/modules-api'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { LoadingComponent } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import { AuthenticationClient, AuthenticateShape } from '@regardsoss/authentication-utils'
import DatasetSelectionTypes from '../domain/DatasetSelectionTypes'
import ModuleConfiguration from '../shapes/ModuleConfiguration'
import PluginsConfigurationProvider from './user/PluginsConfigurationProvider'
import FormComponent from '../components/user/FormComponent'

/** Module pane state actions default instance */
const moduleExpandedStateActions = new UIClient.ModuleExpandedStateActions()

/**
 * Main container to display module form.
 * @author Sébastien binda
 */
class ModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    // Set by mapStateToProps
    authentication: AuthenticateShape,
    attributeModels: DataManagementShapes.AttributeModelList,
    // Set by mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchExpandResults: PropTypes.func.isRequired,
    dispatchCollapseForm: PropTypes.func.isRequired,
    dispatchInitializeWithOpenedResults: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Key in local storage */
  static FORM_STORAGE_KEY = 'seach-form'

  static DATASET_MODEL_IDS_PARAM = 'datasetModelIds'

  static TAGS_PARAM = 'tags'

  /** Property keys to be reported onto the DynamicModulePane component */
  static MODULE_PROPS = keys(AccessShapes.runtimeDispayModuleFields)

  constructor(props) {
    super(props)
    this.criterionValues = {}
    this.clearFunctions = []
    this.state = {
      searchQuery: '',
    }
  }

  /**
   * Lifecycle method: component will mount. In search form, it attempts to restore from URL the form values. If none were found, it
   * searches then in local storage some data associated with this, for current user in current module. Finally, if none was
   * found either, it initializes with the default query
   */
  componentWillMount() {
    const {
      appName, project, id, dispatchInitializeWithOpenedResults,
    } = this.props
    // build default query
    let q
    // Read query parameters form current URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null
    // Is there a query in browser?
    if (query && query.q) {
      // yes: user pasted some search from another REGARDS (higher priority), initialize with results visible
      ({ q } = query)
      dispatchInitializeWithOpenedResults()
    } else {
      const initialUserData = UIDomain.LocalStorageUserData.getUserData(appName, project, this.getUser(), id, ModuleContainer.FORM_STORAGE_KEY)
      if (initialUserData) {
        q = initialUserData // default values from local storage
        const browserPath = browserHistory.getCurrentLocation().pathname
        browserHistory.replace({ pathname: browserPath, query: { q } })
      } else {
        q = this.getInitialQuery() // no default values
      }
    }
    q = q && q.length > 0 ? q : this.createSearchQueryFromCriterion()

    this.setState({
      searchQuery: q,
    })

    if (browserHistory) {
      this.browserHistoryListener = browserHistory.listen((event) => {
        if (event.action === 'POP') this.handleURLChange() // Change URL is back or forward button is used
      })
    }
  }

  /**
   * Lifecycle method: component will receive new properties. Used here to check URL changes and update search fields
   * @param {*} nextProps next properties
   */
  componentWillReceiveProps(nextProps) {
    this.handleURLChange()
  }

  componentWillUnmount() {
    this.browserHistoryListener()
  }

  /**
   * Criteria plugin callback to update there criteria values for the current search
   * @param criteria
   * @param pluginId
   */
  onCriteriaChange = (criteria, pluginId) => {
    this.criterionValues[pluginId] = criteria
  }

  /** @return {string} current user if any */
  getUser = () => get(this.props, 'authentication.sub')

  /**
   * Get the default query for this form at initialization
   */
  getInitialQuery = () => {
    let query = ''
    // Add form associated dataset urn
    let tags = ''
    const { type, selectedDatasets, selectedModels } = this.props.moduleConf.datasets || {}
    if (type === DatasetSelectionTypes.DATASET_TYPE && selectedDatasets) {
      tags = reduce(
        selectedDatasets,
        (result, dataset) => {
          if (result && dataset !== undefined) {
            return `${result} OR "${dataset}"`
          } if (dataset !== undefined) {
            return `"${dataset}"`
          }
          return result
        },
        '',
      )
    }

    let modelIds = ''
    if (type === DatasetSelectionTypes.DATASET_MODEL_TYPE && selectedModels) {
      modelIds = reduce(
        selectedModels,
        (result, modelId) => {
          if (result && modelId !== undefined) {
            return `${result} OR ${modelId}`
          } if (modelId !== undefined) {
            return `${modelId}`
          }
          return result
        },
        '',
      )
    }

    if (tags.length > 0) {
      if (query && query.length > 0) {
        query = `${query} AND (${ModuleContainer.TAGS_PARAM}:(${tags}))`
      } else {
        query = `${ModuleContainer.TAGS_PARAM}:(${tags})`
      }
    }

    if (modelIds.length > 0) {
      if (query && query.length > 0) {
        query = `${query} AND ${ModuleContainer.DATASET_MODEL_IDS_PARAM}:(${modelIds})`
      } else {
        query = `${ModuleContainer.DATASET_MODEL_IDS_PARAM}:(${modelIds})`
      }
    }

    return query
  }


  getInitialValues = () => {
    const parameters = this.state.searchQuery.match(/[^ ]*:["([][^")\]]*[")\]]|[^ ]*/g)
    const initialValues = {}
    if (parameters && parameters.length > 0) {
      parameters.forEach((parameter) => {
        const matchingKeys = parameter.match(/([^ :]*):(.*)$/)
        if (matchingKeys && matchingKeys.length === 3) {
          initialValues[matchingKeys[1]] = matchingKeys[2]
        }
      })
    }
    return initialValues
  }

  handleURLChange = () => {
    // If query changed from URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null
    if (query && query.q && query.q !== this.state.searchQuery) {
      this.setState({
        searchQuery: query.q,
      })
      this.criterionValues = {}
    } else if (!query.q && this.state.searchQuery !== this.getInitialQuery()) {
      // NO query specified, display the search form open and run initial Query search
      this.setState({
        searchQuery: this.getInitialQuery(),
      })
      this.criterionValues = {}
    }
  }

  registerClear = (clearFunc, remove) => {
    if (remove) {
      this.clearFunctions = this.clearFunctions.filter(func => func !== clearFunc)
    } else {
      this.clearFunctions.push(clearFunc)
    }
  }

  handleClearAll = () => {
    const { appName, project, id } = this.props
    // 1 - clear each plugin
    this.clearFunctions.forEach(func => func())
    // 2 - clear browser URL
    browserHistory.replace({ pathname: browserHistory.getCurrentLocation().pathname })
    // 3 - update local storage
    UIDomain.LocalStorageUserData.clearUserDataUserData(appName, project, this.getUser(), id, ModuleContainer.FORM_STORAGE_KEY)
    // 4 - update local state
    this.setState({
      searchQuery: this.getInitialQuery(),
    })
    this.criterionValues = {}
  }

  /**
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    const {
      appName, project, id, dispatchCollapseForm, dispatchExpandResults,
    } = this.props
    // 0 - build the query
    const query = this.createSearchQueryFromCriterion()
    // 1 - save query in user data
    UIDomain.LocalStorageUserData.saveUserData(appName, project, this.getUser(), id, ModuleContainer.FORM_STORAGE_KEY, query)
    // 2 - Update state
    this.setState({
      searchQuery: query,
    })
    this.criterionValues = {}
    // 3 - update browser URL
    const browserPath = browserHistory.getCurrentLocation().pathname
    const browserQuery = merge({}, browserHistory.getCurrentLocation().query || {}, { q: query })
    browserHistory.push({ pathname: browserPath, query: browserQuery })
    // 4 - make sure search results are opened and close form
    dispatchExpandResults()
    dispatchCollapseForm()
  }

  /**
   * Create query for the search from all the configured criterion
   */
  createSearchQueryFromCriterion = () => {
    const query = reduce(
      this.criterionValues,
      (result, criteria) => {
        if (result && criteria && criteria.length > 0) {
          return `${result} AND ${criteria}`
        } if (criteria) {
          return criteria
        }
        return result
      },
      '',
    )

    const initialQuery = this.getInitialQuery()
    if (query.length > 0) {
      if (initialQuery.length > 0) {
        return `${query} AND ${initialQuery}`
      }
      return `${query}`
    } if (initialQuery.length > 0) {
      return initialQuery
    }

    return ''
  }

  renderForm() {
    const { moduleConf, authentication } = this.props
    if (moduleConf.layout) {
      const initialQuery = this.getInitialQuery()
      const pluginsProps = {
        onChange: this.onCriteriaChange,
        initialValues: this.getInitialValues(),
        initialQuery,
        registerClear: this.registerClear,
      }
      return (
        <PluginsConfigurationProvider
          criteria={moduleConf.criterion}
          preview={moduleConf.preview}
          initialQuery={initialQuery}
          authentication={authentication}
        >
          <FormComponent
            pluginsProps={pluginsProps}
            handleSearch={this.handleSearch}
            handleClearAll={this.handleClearAll}
            {...modulesHelper.getReportedUserModuleProps(this.props)}
          />
        </PluginsConfigurationProvider>
      )
    }
    return <LoadingComponent />
  }

  renderResults() {
    const {
      project, appName, id,
      moduleConf: { datasets, preview, searchResult },
    } = this.props

    if (preview) {
      // no render when in form preview or when user has not yet clicked search
      return null
    }
    const { intl: { formatMessage } } = this.context
    const { searchQuery } = this.state

    // resolve datasets context from this form configuration
    let restrictedDatasetsIds = null
    if (datasets.type === DatasetSelectionTypes.DATASET_TYPE) {
      restrictedDatasetsIds = datasets.selectedDatasets
    }
    const module = {
      id,
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
      description: formatMessage({ id: 'results.module.title' }), // replaces page definition
      conf: {
        ...searchResult,
        searchQuery,
        restrictedDatasetsIds,
      },
    }

    return (
      <React.Fragment>
        {/* Separare sub module */}
        <HorizontalAreasSeparator />
        {/* Render sub module */}
        <LazyModuleComponent
          project={project}
          appName={appName}
          module={module}
        />
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
        {this.renderResults()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
})

const mapDispatchToProps = (dispatch, { id, conf }) => {
  // build keys for module sub panes (both share the module id)
  const searchFormPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_FORM, id)
  const searchResultsPaneKey = UIClient.ModuleExpandedStateActions.getPresentationModuleKey(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, id)
  return {
    dispatchCollapseForm: () => dispatch(moduleExpandedStateActions.setMinimized(searchFormPaneKey)),
    dispatchExpandResults: () => dispatch(moduleExpandedStateActions.setNormal(searchResultsPaneKey)),
    dispatchInitializeWithOpenedResults: () => {
      // 1 - compute expansible state from conf
      const searchFormExpansible = UIDomain.isModulePaneExpansible(get(conf, 'primaryPane')) // true by default
      const searchResultsExpansible = UIDomain.isModulePaneExpansible(get(conf, 'searchResults.primaryPane')) // true by default
      dispatch(moduleExpandedStateActions.initialize(searchFormPaneKey, searchFormExpansible, !searchFormExpansible))
      dispatch(moduleExpandedStateActions.initialize(searchResultsPaneKey, searchResultsExpansible, true))
    },
  }
}

const UnconnectedModuleContainer = ModuleContainer
export { UnconnectedModuleContainer }

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
