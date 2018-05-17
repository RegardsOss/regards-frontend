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
import flatten from 'lodash/flatten'
import flow from 'lodash/flow'
import forEach from 'lodash/forEach'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isInteger from 'lodash/isInteger'
import keys from 'lodash/keys'
import merge from 'lodash/merge'
import reduce from 'lodash/reduce'
import uniq from 'lodash/fp/uniq'
import values from 'lodash/values'
import unionBy from 'lodash/unionBy'
import { browserHistory } from 'react-router'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { modulesHelper } from '@regardsoss/modules-api'
import { connect } from '@regardsoss/redux'
import { AccessDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { LoadingComponent, LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import DatasetSelectionTypes from '../domain/DatasetSelectionTypes'
import AttributeModelClient from '../clients/AttributeModelClient'
import ModuleConfiguration from '../shapes/ModuleConfiguration'
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
    // Set by mapDispatchToProps
    fetchAttribute: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: DataManagementShapes.AttributeModelList,
    attributesLoading: PropTypes.bool,
    attributeModelsError: PropTypes.bool,
    dispatchExpandResults: PropTypes.func.isRequired,
    dispatchCollapseForm: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

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

  componentWillMount() {
    this.loadCriterionAttributeModels(this.props)

    // Read query parameters form current URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null

    let q = this.getInitialQuery()

    if (query && query.q) {
      ({ q } = query)
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

  componentWillReceiveProps(nextProps) {
    /**
     * If criterion props changed, so load missing attributeModels
     */
    if (!isEqual(this.props.moduleConf.criterion, nextProps.moduleConf.criterion)) {
      this.loadCriterionAttributeModels(nextProps)
    }

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
          } else if (dataset !== undefined) {
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
          } else if (modelId !== undefined) {
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

  /**
   * Add the attributeModels properties to the criterion conf
   * @returns {*}
   */
  getCriterionWithAttributeModels = () => (this.props.moduleConf.criterion || [])
    .reduce((acc, criteria) => {
      const { active, conf, ...otherProps } = criteria
      if (active) {
        const attributes = get(conf, 'attributes', {})
        // resolve criterion attributes, filter the attributes that have not yet been retrieved
        const resolvedAttributes = reduce(attributes, (resolved, attributeId, localKey) => {
          // server attributes are resolved on ID and standard ones on key
          const resolvedAttribute = get(this.props, `attributeModels.${attributeId}.content`) ||
            get(AccessDomain.AttributeConfigurationController.getStandardAttributeConf(attributeId), 'content')
          return {
            ...resolved,
            [localKey]: resolvedAttribute,
          }
        }, {})
        return [
          ...acc, {
            active,
            conf: { // replace attributes by resolved attributes content
              attributes: resolvedAttributes,
            },
            ...otherProps,
          },
        ]
      }
      return acc
    }, [])

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
    this.clearFunctions.forEach(func => func())
    browserHistory.push({ pathname: browserHistory.getCurrentLocation().pathname })
    this.setState({
      searchQuery: this.getInitialQuery(),
    })
    this.criterionValues = {}
  }

  /**
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    const { dispatchCollapseForm, dispatchExpandResults } = this.props
    const query = this.createSearchQueryFromCriterion()
    this.setState({
      searchQuery: query,
    })
    this.criterionValues = {}
    const browserPath = browserHistory.getCurrentLocation().pathname
    const browserQuery = merge({}, browserHistory.getCurrentLocation().query || {}, { q: query })
    browserHistory.push({ pathname: browserPath, query: browserQuery })
    // make sure search results are opened and close form
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
        } else if (criteria) {
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
    } else if (initialQuery.length > 0) {
      return initialQuery
    }

    return ''
  }

  /**
   * Search attributeModels associated to criterion
   * @param {*} props considered component properties
   */
  loadCriterionAttributeModels = (props) => {
    const { moduleConf, fetchAttribute } = props
    // Get unique list of criterion attributeModels id to load
    const pluginsAttributesToLoad = flow(
      fpmap(criteria => criteria.conf && criteria.conf.attributes),
      fpmap(attribute => values(attribute)),
      flatten,
      fpfilter(isInteger),
      uniq,
    )(moduleConf.criterion)

    const attributesToLoad = flow(fpmap(attribute => values(attribute.id)), flatten, uniq)(
      moduleConf.attributes,
    )

    // Fetch each form server
    forEach(unionBy(pluginsAttributesToLoad, attributesToLoad), attribute =>
      fetchAttribute(attribute),
    )
  }

  renderForm() {
    if (this.props.moduleConf.layout) {
      const pluginsProps = {
        onChange: this.onCriteriaChange,
        initialValues: this.getInitialValues(),
        initialQuery: this.getInitialQuery(),
        registerClear: this.registerClear,
      }
      const criterionWithAttributes = this.getCriterionWithAttributeModels()
      return (
        <LoadableContentDisplayDecorator
          isLoading={this.props.attributesLoading}
          isContentError={this.props.attributeModelsError}
        >
          <FormComponent
            plugins={criterionWithAttributes}
            pluginsProps={pluginsProps}
            handleSearch={this.handleSearch}
            handleClearAll={this.handleClearAll}
            {...modulesHelper.getReportedUserModuleProps(this.props)}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return <LoadingComponent />
  }

  renderResults() {
    const {
      project,
      appName, moduleConf: { datasets, preview, searchResult },
    } = this.props

    if (preview) {
      // no render when in form preview or when user has not yet clicked search
      return null
    }
    const { intl: { formatMessage } } = this.context
    const { searchQuery } = this.state

    // resolve datasets context from this form configuration
    let restrictedDatasetsIpIds = null
    if (datasets.type === DatasetSelectionTypes.DATASET_TYPE) {
      restrictedDatasetsIpIds = datasets.selectedDatasets
    }

    const module = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
      description: formatMessage({ id: 'results.module.title' }), // replaces page definition
      conf: {
        ...searchResult,
        searchQuery,
        restrictedDatasetsIpIds,
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
  attributeModels: AttributeModelClient.AttributeModelSelectors.getList(state),
  attributesLoading: AttributeModelClient.AttributeModelSelectors.isFetching(state),
  attributeModelsError: AttributeModelClient.AttributeModelSelectors.hasError(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(AttributeModelClient.AttributeModelActions.fetchEntity(attributeId)),
  dispatchCollapseForm: () => dispatch(moduleExpandedStateActions.setMinimized(modulesManager.AllDynamicModuleTypes.SEARCH_FORM)),
  dispatchExpandResults: () => dispatch(moduleExpandedStateActions.setNormal(modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS)),
})

const UnconnectedModuleContainer = ModuleContainer
export { UnconnectedModuleContainer }

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
