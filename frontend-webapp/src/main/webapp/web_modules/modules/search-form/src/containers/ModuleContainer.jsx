/**
 * LICENSE_PLACEHOLDER
 **/
import flow from 'lodash/flow'
import fpmap from 'lodash/fp/map'
import uniq from 'lodash/fp/uniq'
import flatten from 'lodash/flatten'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import reduce from 'lodash/reduce'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import unionBy from 'lodash/unionBy'
import { browserHistory } from 'react-router'
import { LazyModuleComponent } from '@regardsoss/modules'
import { connect } from '@regardsoss/redux'
import { AttributeModel } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
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
    attributeModels: PropTypes.objectOf(AttributeModel),
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.criterionValues = {}
    this.state = {
      searchQuery: '',
      expanded: true,
    }
  }

  componentWillMount() {
    this.loadCriterionAttributeModels()

    // Read query parameters form current URL
    const query = browserHistory ? browserHistory.getCurrentLocation().query : null
    const expanded = !query || !query.q

    let q = this.getInitialQuery()

    if (query && query.q) {
      q = query.q
    }

    this.setState({
      searchQuery: q ? this.createFullSearchParameters(q) : '',
      expanded,
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
        expanded: false,
        resetCriterion: true,
      })
      this.criterionValues = {}
    } else if (!query.q && this.state.searchQuery !== this.getInitialQuery()) {
      // NO query specified, display the search form open and run initial Query search
      this.setState({
        searchQuery: this.getInitialQuery(),
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
    // Add form associated dataset urn
    if (this.props.moduleConf.datasets && this.props.moduleConf.datasets.selectedDatasets) {
      const tags = reduce(this.props.moduleConf.datasets.selectedDatasets, (result, dataset) => {
        if (result && dataset !== undefined) {
          return `${result} OR ${dataset}`
        } else if (dataset !== undefined) {
          return dataset
        }
        return result
      }, '')
      if (tags && tags.length > 0) {
        return `tags:(${tags})`
      }
    }
    return ''
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
      if (criteria.pluginConf && criteria.pluginConf.attributes) {
        forEach(criteria.pluginConf.attributes, (attributeId, key) => {
          // If the associated attribute has already been retrieved from server, the update the criteria
          if (this.props.attributeModels[attributeId]) {
            // eslint-disable-next-line no-param-reassign
            criteria.pluginConf.attributes[key] = this.props.attributeModels[attributeId].content
          }
        })
      }
    })
    return criterionWithAttributtes
  }

  /**
   * Search attributeModels associated to criterion
   */
  loadCriterionAttributeModels = () => {
    // Get uniq list of criterion attributeModels id to load
    const pluginsAttributesToLoad = flow(
      fpmap(criteria => criteria.pluginConf && criteria.pluginConf.attributes),
      fpmap(attribute => values(attribute)),
      flatten,
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

  /**
   * Create query for the search from all the configured criterion
   */
  createSearchQueryFromCriterion = () => {
    let query = reduce(this.criterionValues, (result, criteria) => {
      if (result && criteria && criteria.length > 0) {
        return `${result} AND ${criteria}`
      } else if (criteria) {
        return criteria
      }
      return result
    }, '')

    // Add form associated dataset urn
    let tags = ''
    if (this.props.moduleConf.datasets && this.props.moduleConf.datasets.selectedDatasets) {
      tags = reduce(this.props.moduleConf.datasets.selectedDatasets, (result, dataset) => {
        if (result && dataset !== undefined) {
          return `${result} OR ${dataset}`
        } else if (dataset !== undefined) {
          return dataset
        }
        return result
      }, '')
    }

    if (tags.length > 0) {
      if (query && query.length > 0) {
        query = `${query} AND (tags:(${tags})`
      } else {
        query = `tags:(${tags})`
      }
    }

    if (query && query.length > 0) {
      return query
    }
    return ''
  }

  /**
   * Create full search request parameters with :
   * q : query
   * @returns {string}
   */
  createFullSearchParameters = (query) => {
    if (!query) {
      return `${this.createSearchQueryFromCriterion()}`
    }
    return query
  }

  /**
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    const query = this.createFullSearchParameters()
    this.setState({
      searchQuery: query,
    })
    this.criterionValues = {}
    browserHistory.push(`${browserHistory.getCurrentLocation().pathname}?q=${query}`)
  }

  renderForm() {
    // If a search query is set, hide form component
    /* if (this.state.searchQuery && this.state.searchQuery !== this.getInitialQuery()) {
      return null
    }*/
    if (this.props.moduleConf.layout) {
      const pluginsProps = {
        onChange: this.onCriteriaChange,
      }
      const criterionWithAttributes = this.getCriterionWithAttributeModels()
      return (
        <FormComponent
          expanded={this.state.expanded}
          description={this.props.description}
          layout={this.props.moduleConf.layout}
          plugins={criterionWithAttributes}
          pluginsProps={pluginsProps}
          handleSearch={this.handleSearch}
        />
      )
    }
    return <LoadingComponent />
  }

  renderResults() {
    if (!this.props.moduleConf.preview) {
      // is single dataset?
      const { type, selectedDatasets } = this.props.moduleConf.datasets || {}
      const singleDatasetIpId = (type === DatasetSelectionType.DATASET_TYPE && null && selectedDatasets && selectedDatasets.length === 1 &&
        selectedDatasets[0]) || null

      const module = {
        type: 'search-results',
        active: true,
        applicationId: this.props.appName,
        conf: {
          resultType: this.props.moduleConf.resultType,
          attributes: this.props.moduleConf.attributes,
          attributesRegroupements: this.props.moduleConf.attributesRegroupements,
          selectableAttributes: this.props.attributeModels,
          enableFacettes: this.props.moduleConf.enableFacettes,
          searchQuery: this.state.searchQuery,
          breadcrumbInitialContextLabel: this.props.description,
          singleDatasetIpId,
        },
      }

      return (
        <LazyModuleComponent
          project={this.props.project}
          appName={this.props.appName}
          module={module}
        />
      )
    }
    return null
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        <div style={{ marginTop: 10 }} />
        {this.renderResults()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  attributeModels: AttributeModelClient.AttributeModelSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(AttributeModelClient.AttributeModelActions.fetchEntity(attributeId)),
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
