/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach, find, cloneDeep } from 'lodash'
import { connect } from '@regardsoss/redux'
import { PluginConf, AttributeModel } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import FormComponent from '../components/user/FormComponent'
import ModelAttributeActions from '../models/attributes/ModelAttributeActions'
import ModelAttributeSelector from '../models/attributes/ModelAttributeSelector'
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
            this.props.fetchAttribute(attribute)
          }
        })
      }
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
    return <div>Loading ... </div>
  }
}

const mapStateToProps = state => ({
  attributes: ModelAttributeSelector.getList(state),
  attributesFetching: ModelAttributeSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAttribute: attributeId => dispatch(ModelAttributeActions.fetchEntity(attributeId, dispatch, [''])),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
