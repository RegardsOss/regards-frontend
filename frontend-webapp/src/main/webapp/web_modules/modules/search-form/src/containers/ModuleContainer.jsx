/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, forEach, cloneDeep, reduce, isEqual, values, unionBy } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import SearchResultsComponent from '../components/user/SearchResultsComponent'
import FormComponent from '../components/user/FormComponent'
import { DATAOBJECT_RESULTS } from '../components/admin/parameters/ResultTypesEnum'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
import AttributeConfiguration from '../models/attributes/AttributeConfiguration'
import AttributesRegroupementConfiguration from '../models/attributes/AttributesRegroupementConfiguration'


const TARGET_PARAMETER = 'target'
/**
 * Main container to display module form.
 * @author Sébastien binda
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    layout: React.PropTypes.string.isRequired,
    criterion: React.PropTypes.arrayOf(PluginConf),
    resultType: React.PropTypes.string,
    attributes: React.PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupements: React.PropTypes.arrayOf(AttributesRegroupementConfiguration),
    // Set by mapDispatchToProps
    fetchAttribute: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: React.PropTypes.objectOf(AttributeModel),
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModelsFetching: React.PropTypes.bool,
    preview: React.PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    const target = props.resultType === DATAOBJECT_RESULTS ? 'DATAOBJECT' : 'DATASET'
    this.criterionValues = {}
    this.state = {
      searchQuery: '',
      target,
    }
  }

  componentWillMount() {
    this.loadCriterionAttributeModels()

    // Read query parameters form current URL
    const query = browserHistory.getCurrentLocation().query
    let target = this.state.target
    let q = this.getInitialQuery()
    if (query && query.target) {
      target = query.target
    }

    if (query && query.q) {
      q = query.q
    }

    this.setState({
      type: target,
      searchQuery: q ? this.createFullSearchParameters(q, target) : '',
    })
  }

  componentWillReceiveProps(nextProps) {
    /**
     * If criterion props changed, so load missing attributeModels
     */
    if (!isEqual(this.props.criterion, nextProps.criterion)) {
    // if (this.props.criterion !== nextProps.criterion) {
      this.loadCriterionAttributeModels()
    }
  }


  /**
   * Get the default query for this form at initialization
   */
  getInitialQuery = () => {
    // Add form associated dataset urn
    const tags = reduce(this.props.datasets.selectedDatasets, (result, dataset) => {
      if (result && dataset != undefined) {
        return `${result} OR ${dataset}`
      } else if (dataset != undefined) {
        return dataset
      }
    }, '')
    if (tags && tags.length > 0) {
      return `tags:(${tags})`
    }
    return ''
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
   * Add the attributeModels properties to the criterion conf
   * @returns {*}
   */
  getCriterionWithAttributeModels = () => {
    const criterionWithAttributtes = cloneDeep(this.props.criterion)
    // For each criteria of this form
    forEach(criterionWithAttributtes, (criteria) => {
      // For each attributeModels of the criteria
      forEach(criteria.pluginConf.attributes, (attributeId, key) => {
        // If the associated attribute has already been retrieved from server, the update the criteria
        if (this.props.attributeModels[attributeId]) {
          // eslint-disable-next-line no-param-reassign
          criteria.pluginConf.attributes[key] = this.props.attributeModels[attributeId].content
        }
      })
    })
    return criterionWithAttributtes
  }

  /**
   * Search attributeModels associated to criterion
   */
  loadCriterionAttributeModels = () => {
    // Get uniq list of criterion attributeModels id to load
    const pluginsAttributesToLoad = chain(this.props.criterion)
      .map(criteria => criteria.pluginConf && criteria.pluginConf.attributes)
      .map(attribute => values(attribute))
      .flatten()
      .uniq()
      .value()

    const attributesToLoad = chain(this.props.attributes)
      .map(attribute => values(attribute.id))
      .flatten()
      .uniq()
      .value()


      // Fetch each form server
    forEach(unionBy(pluginsAttributesToLoad, attributesToLoad), (attribute => this.props.fetchAttribute(attribute)))
  }

  /**
   * Format the given search query for opensearch format
   * @param query
   * @returns {string}
   */
  formatSearchQuery = query => `q=(${query})`

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
    const tags = reduce(this.props.datasets.selectedDatasets, (result, dataset) => {
      if (result && dataset != undefined) {
        return `${result} OR ${dataset}`
      } else if (dataset != undefined) {
        return dataset
      }
    }, '')

    if (query && query.length > 0) {
      query = `${query} AND (tags:(${tags})`
    } else {
      query = `tags:(${tags})`
    }

    if (query && query.length > 0) {
      return this.formatSearchQuery(query)
    }
    return ''
  }

  /**
   * Create full search request parameters with :
   * q : query
   * target : results target type
   * @returns {string}
   */
  createFullSearchParameters = (query, target) => {
    if (!query) {
      return `${this.createSearchQueryFromCriterion()}&${TARGET_PARAMETER}=${this.state.target}`
    } else if (!target) {
      return `${this.formatSearchQuery(query)}&${TARGET_PARAMETER}=${this.state.target}`
    }
    return `${this.formatSearchQuery(query)}&${TARGET_PARAMETER}=${target}`
  }

  /**
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    const query = this.createFullSearchParameters()
    this.setState({
      searchQuery: query,
    })
    browserHistory.push(`${browserHistory.getCurrentLocation().pathname}?${query}`)
  }

  renderForm() {
    if (this.props.layout) {
      try {
        const layoutObj = JSON.parse(this.props.layout)

        const pluginsProps = {
          onChange: this.onCriteriaChange,
        }
        const criterionWithAttributes = this.getCriterionWithAttributeModels()
        return (
          <FormComponent
            layout={layoutObj}
            plugins={criterionWithAttributes}
            pluginsProps={pluginsProps}
            handleSearch={this.handleSearch}
          />
        )
      } catch (error) {
        console.error('Invalid layout for form FormComponent', error)
        return null
      }
    }
    return <LoadingComponent />
  }

  renderResults() {
    if (!this.props.preview) {
      return (
        <SearchResultsComponent
          searchQuery={this.state.searchQuery}
          attributesConf={this.props.attributes}
          attributesRegroupementsConf={this.props.attributesRegroupements}
          attributeModels={this.props.attributeModels}
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
  attributeModels: AttributeModelSelector.getList(state),
  attributeModelsFetching: AttributeModelSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(AttributeModelActions.fetchEntity(attributeId, {}, { queryable: 'true' })),
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
