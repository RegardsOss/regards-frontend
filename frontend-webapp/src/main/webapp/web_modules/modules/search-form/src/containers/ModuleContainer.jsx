/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, forEach, cloneDeep, reduce, isEqual, values, unionBy } from 'lodash'
import { browserHistory } from 'react-router'
import { LazyModuleComponent } from '@regardsoss/modules'
import { connect } from '@regardsoss/redux'
import { AttributeModel } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfiguration from '../models/ModuleConfiguration'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import FormComponent from '../components/user/FormComponent'


/**
 * Main container to display module form.
 * @author Sébastien binda
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    // Props supplied by LazyModuleComponent
    appName: React.PropTypes.string,
    project: React.PropTypes.string,
    // Module configuration
    moduleConf: ModuleConfiguration.isRequired,
    // Set by mapDispatchToProps
    fetchAttribute: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributeModels: React.PropTypes.objectOf(AttributeModel),
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.criterionValues = {}
    this.state = {
      searchQuery: '',
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

    this.setState({
      searchQuery: q ? this.createFullSearchParameters(q) : '',
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
    const pluginsAttributesToLoad = chain(this.props.moduleConf.criterion)
      .map(criteria => criteria.pluginConf && criteria.pluginConf.attributes)
      .map(attribute => values(attribute))
      .flatten()
      .uniq()
      .value()

    const attributesToLoad = chain(this.props.moduleConf.attributes)
      .map(attribute => values(attribute.id))
      .flatten()
      .uniq()
      .value()


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
    browserHistory.push(`${browserHistory.getCurrentLocation().pathname}?q=${query}`)
  }

  renderForm() {
    if (this.props.moduleConf.layout) {
      try {
        const layoutObj = JSON.parse(this.props.moduleConf.layout)

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
    if (!this.props.moduleConf.preview) {
      const module = {
        name: 'search-results',
        active: true,
        applicationId: this.props.appName,
        conf: {
          resultType: this.props.moduleConf.resultType,
          attributesConf: this.props.moduleConf.attributes,
          attributesRegroupementsConf: this.props.moduleConf.attributesRegroupements,
          selectableAttributes: this.props.attributeModels,
          enableFacettes: this.props.moduleConf.enableFacettes,
          searchQuery: this.state.searchQuery,
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
  attributeModels: AttributeModelSelector.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(AttributeModelActions.fetchEntity(attributeId, {}, { queryable: 'true' })),
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
