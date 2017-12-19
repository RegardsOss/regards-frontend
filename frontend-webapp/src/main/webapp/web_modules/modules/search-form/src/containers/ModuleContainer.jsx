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
import merge from 'lodash/merge'
import flow from 'lodash/flow'
import fpmap from 'lodash/fp/map'
import fpfilter from 'lodash/fp/filter'
import uniq from 'lodash/fp/uniq'
import flatten from 'lodash/flatten'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import reduce from 'lodash/reduce'
import isEqual from 'lodash/isEqual'
import isInteger from 'lodash/isInteger'
import values from 'lodash/values'
import unionBy from 'lodash/unionBy'
import { browserHistory } from 'react-router'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadingComponent, LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HorizontalAreasSeparator } from '@regardsoss/components'
import DatasetSelectionType from '../models/datasets/DatasetSelectionTypes'
import ModuleConfiguration from '../models/ModuleConfiguration'
import FormComponent from '../components/user/FormComponent'
import AttributeModelClient from '../clients/AttributeModelClient'

/**
 * Main container to display module form.
 * @author Sébastien binda
 */
class ModuleContainer extends React.Component {
  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: PropTypes.string,
    project: PropTypes.string,
    description: PropTypes.string,
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
    // Set by mapDispatchToProps
    fetchAttribute: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: DataManagementShapes.AttributeModelList,
    attributesLoading: PropTypes.bool,
    attributeModelsError: PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  static DATASET_MODEL_IDS_PARAM = 'datasetModelIds'
  static TAGS_PARAM = 'tags'

  constructor(props) {
    super(props)
    this.criterionValues = {}
    this.state = {
      searchQuery: '',
      expanded: true,
      hasSearched: false,
    }
  }

  componentWillMount() {
    this.loadCriterionAttributeModels()

    // Read query parameters form current URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null

    let q = this.getInitialQuery()

    if (query && query.q) {
      q = query.q
    }

    q = q && q.length > 0 ? q : this.createSearchQueryFromCriterion()

    this.setState({
      searchQuery: q,
      expanded: true,
      hasSearched: false,
    })
  }

  componentWillReceiveProps(nextProps) {
    /**
     * If criterion props changed, so load missing attributeModels
     */
    if (!isEqual(this.props.moduleConf.criterion, nextProps.moduleConf.criterion)) {
      // if (this.props.criterion !== nextProps.criterion) {
      this.loadCriterionAttributeModels()
    }

    // If query changed from URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null
    if (query && query.q && query.q !== this.state.searchQuery) {
      this.setState({
        searchQuery: query.q,
        expanded: true,
        hasSearched: false,
        resetCriterion: true,
      })
      this.criterionValues = {}
    } else if (!query.q && this.state.searchQuery !== this.getInitialQuery()) {
      // NO query specified, display the search form open and run initial Query search
      this.setState({
        searchQuery: this.getInitialQuery(),
        hasSearched: false,
        expanded: true,
      })
      this.criterionValues = {}
    }
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
    if (type === DatasetSelectionType.DATASET_TYPE && selectedDatasets) {
      tags = reduce(selectedDatasets, (result, dataset) => {
        if (result && dataset !== undefined) {
          return `${result} OR "${dataset}"`
        } else if (dataset !== undefined) {
          return `"${dataset}"`
        }
        return result
      }, '')
    }

    let modelIds = ''
    if (type === DatasetSelectionType.DATASET_MODEL_TYPE && selectedModels) {
      modelIds = reduce(selectedModels, (result, modelId) => {
        if (result && modelId !== undefined) {
          return `${result} OR ${modelId}`
        } else if (modelId !== undefined) {
          return `${modelId}`
        }
        return result
      }, '')
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
  getCriterionWithAttributeModels = () => {
    const criterionWithAttributtes = cloneDeep(this.props.moduleConf.criterion)
    // For each criteria of this form
    forEach(criterionWithAttributtes, (criteria) => {
      // For each attributeModels of the criteria
      if (criteria.conf && criteria.conf.attributes) {
        forEach(criteria.conf.attributes, (attributeId, key) => {
          // If the associated attribute has already been retrieved from server, the update the criteria
          if (this.props.attributeModels[attributeId]) {
            // eslint-disable-next-line no-param-reassign
            criteria.conf.attributes[key] = this.props.attributeModels[attributeId].content
          } else if (DamDomain.AttributeModelController.standardAttributes[attributeId]) {
            const standardAttribute = DamDomain.AttributeModelController.standardAttributes[attributeId]
            // standard attribute
            // eslint-disable-next-line no-param-reassign
            criteria.conf.attributes[key] = {
              label: standardAttribute.label,
              name: attributeId,
              jsonPath: standardAttribute.entityPathName,
              type: standardAttribute.type,
            }
          }
        })
      }
    })
    return criterionWithAttributtes
  }

  getInitialValues = () => {
    const parameters = this.state.searchQuery.match(/[^ ]*:["([][^")\]]*[")\]]|[^ ]*/g)
    const initialValues = {}
    if (parameters && parameters.length > 0) {
      parameters.forEach((parameter) => {
        const keys = parameter.match(/([^ :]*):(.*)$/)
        if (keys && keys.length === 3) {
          initialValues[keys[1]] = keys[2]
        }
      })
    }
    return initialValues
  }

  /**
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    const query = this.createSearchQueryFromCriterion()
    this.setState({
      hasSearched: true, // first search performed
      searchQuery: query,
    })
    this.criterionValues = {}
    const browserPath = browserHistory.getCurrentLocation().pathname
    const browserQuery = merge({}, browserHistory.getCurrentLocation().query || {}, { q: query })
    browserHistory.push({ pathname: browserPath, query: browserQuery })
  }

  /**
   * Create query for the search from all the configured criterion
   */
  createSearchQueryFromCriterion = () => {
    const query = reduce(this.criterionValues, (result, criteria) => {
      if (result && criteria && criteria.length > 0) {
        return `${result} AND ${criteria}`
      } else if (criteria) {
        return criteria
      }
      return result
    }, '')

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
   */
  loadCriterionAttributeModels = () => {
    // Get unique list of criterion attributeModels id to load
    const pluginsAttributesToLoad = flow(
      fpmap(criteria => criteria.conf && criteria.conf.attributes),
      fpmap(attribute => values(attribute)),
      flatten,
      fpfilter(isInteger),
      uniq,
    )(this.props.moduleConf.criterion)

    const attributesToLoad = flow(
      fpmap(attribute => values(attribute.id)),
      flatten,
      uniq,
    )(this.props.moduleConf.attributes)

    // Fetch each form server
    forEach(unionBy(pluginsAttributesToLoad, attributesToLoad), (attribute => this.props.fetchAttribute(attribute)))
  }

  renderForm() {
    // If a search query is set, hide form component
    /* if (this.state.searchQuery && this.state.searchQuery !== this.getInitialQuery()) {
      return null
    } */
    if (this.props.moduleConf.layout) {
      const pluginsProps = {
        onChange: this.onCriteriaChange,
        initialValues: this.getInitialValues(),
      }
      const criterionWithAttributes = this.getCriterionWithAttributeModels()
      return (
        <LoadableContentDisplayDecorator
          isLoading={this.props.attributesLoading}
          isContentError={this.props.attributeModelsError}
        >
          <FormComponent
            expanded={this.state.expanded}
            description={this.props.description}
            layout={this.props.moduleConf.layout}
            plugins={criterionWithAttributes}
            pluginsProps={pluginsProps}
            handleSearch={this.handleSearch}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return <LoadingComponent />
  }

  renderResults() {
    if (this.props.moduleConf.preview || !this.state.hasSearched) {
      // no render when in form preview or when user has not yet clicked search
      return null
    }
    const { intl: { formatMessage } } = this.context

    // is single dataset?
    const { type, selectedDatasets } = this.props.moduleConf.datasets || {}
    const singleDatasetIpId = (type === DatasetSelectionType.DATASET_TYPE && null && selectedDatasets && selectedDatasets.length === 1 &&
      selectedDatasets[0]) || null

    const module = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
      description: this.props.description,
      conf: {
        resultType: this.props.moduleConf.resultType,
        attributes: this.props.moduleConf.attributes,
        attributesRegroupements: this.props.moduleConf.attributesRegroupements,
        datasetAttributes: this.props.moduleConf.datasetAttributes,
        selectableAttributes: this.props.attributeModels,
        enableFacettes: this.props.moduleConf.enableFacettes,
        displayDatasets: this.props.moduleConf.displayDatasets,
        displayMode: this.props.moduleConf.displayMode,
        searchQuery: this.state.searchQuery,
        breadcrumbInitialContextLabel: formatMessage({ id: 'results.module.title' }),
        singleDatasetIpId,
      },
    }

    return (
      <div>
        {/* Separare sub module */}
        <HorizontalAreasSeparator />
        {/* Render sub module */}
        <LazyModuleComponent
          project={this.props.project}
          appName={this.props.appName}
          module={module}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        {this.renderResults()}
      </div>
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
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
