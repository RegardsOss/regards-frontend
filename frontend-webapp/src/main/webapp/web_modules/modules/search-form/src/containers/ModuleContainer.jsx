/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach, find, cloneDeep, reduce } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel } from '@regardsoss/model'
import { LoadableContentDisplayDecorator, LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import SearchResultsComponent from '../components/user/SearchResultsComponent'
import FormComponent from '../components/user/FormComponent'
import { DATAOBJECT_RESULTS } from '../components/admin/parameters/ResultTypesEnum'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
/**
 * Main container to display module form.
 * @author Sébastien binda
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    layout: React.PropTypes.string.isRequired,
    criterion: React.PropTypes.arrayOf(PluginConf),
    resultType: React.PropTypes.string,
    // Set by mapDispatchToProps
    fetchAttribute: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: React.PropTypes.objectOf(AttributeModel),
    attributesFetching: React.PropTypes.bool,
    preview: React.PropTypes.bool,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    const type = props.resultType === DATAOBJECT_RESULTS ? 'DATAOBJECT' : 'DATASET'
    this.state = {
      searchQuery: `type=${type}`,
      criterionValues: {},
    }
  }


  componentWillMount() {
    this.loadCriterionAttributes()
  }

  componentWillReceiveProps(nextProps) {
    /**
     * If criterion props changed, so load missing attributes
     */
    if (this.props.criterion !== nextProps.criterion) {
      this.loadCriterionAttributes()
    }
  }

  /**
   * Search attributes associated to criterion
   */
  loadCriterionAttributes = () => {
    const attributesToLoad = []
    forEach(this.props.criterion, (criteriaPlugin) => {
      if (criteriaPlugin && criteriaPlugin.pluginConf) {
        forEach(criteriaPlugin.pluginConf.attributes, (attribute) => {
          // Load attributes only once
          if (!find(attributesToLoad, attr => attr === attribute) && !this.props.attributes[attribute]) {
            attributesToLoad.push(attribute)
          }
        })
      }
    })
    forEach(attributesToLoad, (attr) => {
      // Fetch entity from server
      this.props.fetchAttribute(attr)
    })
  }

  /**
   * Criteria plugin callback to update there criteria values for the current search
   * @param criteria
   * @param pluginId
   */
  onCriteriaChange = (criteria, pluginId) => {
    const clone = Object.assign({}, this.state.criterionValues)
    clone[pluginId] = criteria
    this.setState({
      criterionValues: clone,
    })
  }


  /**
   * Add the attributes properties to the criterion conf
   * @returns {*}
   */
  getCriterionWithAttributes = () => {
    const criterionWithAttributtes = cloneDeep(this.props.criterion)
    // For each criteria of this form
    forEach(criterionWithAttributtes, (criteria) => {
      // For each attributes of the criteria
      forEach(criteria.pluginConf.attributes, (attributeId, key) => {
        // If the associated attribute has already been retrieved from server, the update the criteria
        if (this.props.attributes[attributeId]) {
          // eslint-disable-next-line no-param-reassign
          criteria.pluginConf.attributes[key] = this.props.attributes[attributeId].content
        }
      })
    })
    return criterionWithAttributtes
  }

  /**
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    // TODO Manage search
    let query = reduce(this.state.criterionValues, (result, criteria, key) => {
      if (result && criteria.value) {
        return `${result}&attributes.${criteria.attribute.name}=${criteria.value}`
      } else if (criteria.value) {
        return `attributes.${criteria.attribute.name}=${criteria.value}`
      }
      return result
    }, '')

    const type = this.props.resultType === DATAOBJECT_RESULTS ? 'DATAOBJECT' : 'DATASET'
    query = `${query}&type=${type}`


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
        const criterionWithAttributes = this.getCriterionWithAttributes()
        return (
          <LoadableContentDisplayDecorator
            isLoading={this.props.attributesFetching}
          >
            <FormComponent
              layout={layoutObj}
              plugins={criterionWithAttributes}
              pluginsProps={pluginsProps}
              handleSearch={this.handleSearch}
            />
          </LoadableContentDisplayDecorator>
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
      console.log('Running search ', this.state.searchQuery)
      return (
        <SearchResultsComponent
          searchQuery={this.state.searchQuery}
        />
      )
    }
    return null
  }

  render() {
    return (
      <div>
        {this.renderForm()}
        <div style={{ marginTop: 50 }} />
        {this.renderResults()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  attributes: AttributeModelSelector.getList(state),
  attributesFetching: AttributeModelSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(AttributeModelActions.fetchEntity(attributeId, { queryParam: '' })),
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
