/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach, find, cloneDeep } from 'lodash'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel } from '@regardsoss/model'
import { LoadableContentDisplayDecorator, LoadingComponent } from '@regardsoss/display-control'
import FormComponent from '../components/user/FormComponent'
import AttributeModelActions from '../models/attributes/AttributeModelActions'
import AttributeModelSelector from '../models/attributes/AttributeModelSelector'
/**
 * Main container to display module form.
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    layout: React.PropTypes.string.isRequired,
    criterion: React.PropTypes.arrayOf(PluginConf),
    // Set by mapDispatchToProps
    fetchAttribute: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: React.PropTypes.objectOf(AttributeModel),
    attributesFetching: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      criterion: this.props.criterion,
      criterionValues: {},
    }
  }

  /**
   * Search attributes associated to criterions
   */
  componentWillMount() {
    const attributesToLoad = []
    forEach(this.props.criterion, (criteriaPlugin) => {
      if (criteriaPlugin && criteriaPlugin.pluginConf) {
        forEach(criteriaPlugin.pluginConf.attributes, (attribute) => {
          // Load attributes only once
          if (!find(attributesToLoad, attr => attr === attribute)) {
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
   * Load attributes associated by their id to the criterion plugins of this form
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    let updateState = false
    const newCriterion = cloneDeep(this.state.criterion)
    // For each criteria of this form
    forEach(newCriterion, (newCriteria) => {
      // For each attributes of the criteria
      forEach(newCriteria.pluginConf.attributes, (attributeId, key) => {
        // If the associated attribute has already been retrieved from server, the update the criteria
        if (nextProps.attributes[attributeId]) {
          updateState = true
          // eslint-disable-next-line no-param-reassign
          newCriteria.pluginConf.attributes[key] = nextProps.attributes[attributeId].content
        }
      })
    })

    if (updateState) {
      this.setState({
        criterion: newCriterion,
      })
    }
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
   * Run form search with the stored criteria values in the state.criterion
   */
  handleSearch = () => {
    // TODO Manage search
    console.log('Running search', this.state.criterionValues)
  }

  render() {
    if (this.props.layout) {
      const layoutObj = JSON.parse(this.props.layout)

      const pluginsProps = {
        onChange: this.onCriteriaChange,
      }

      return (
        <LoadableContentDisplayDecorator
          isLoading={this.props.attributesFetching}
        >
          <FormComponent
            layout={layoutObj}
            plugins={this.state.criterion}
            pluginsProps={pluginsProps}
            handleSearch={this.handleSearch}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return <LoadingComponent />
  }
}

const mapStateToProps = state => ({
  attributes: AttributeModelSelector.getList(state),
  attributesFetching: AttributeModelSelector.isFetching(state),
  // Fix to handle a prop change when a new element is added to the list,
  // Without this, the attributes prop is not enought
  attributesSize: AttributeModelSelector.getSize(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(AttributeModelActions.fetchEntity(attributeId, { queryParam: '' })),
})

const UnconnectedModuleContainer = ModuleContainer
export {
  UnconnectedModuleContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
