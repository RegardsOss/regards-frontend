/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { getFormValues } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { MainActionButtonComponent } from '@regardsoss/components'
import { PluginDefinition } from '@regardsoss/model'
import { ContainerHelper } from '@regardsoss/layout'
import { PluginProvider } from '@regardsoss/plugins'
import CriterionActions from '../../../models/criterion/CriterionActions'
import CriterionSelector from '../../../models/criterion/CriterionSelector'
import CriteriaConfigurationComponent from './CriteriaConfigurationComponent'
import { Model } from '@regardsoss/model'

/**
 * Component to display a creation or edition of a criterion
 */
class FormCriteriaComponent extends React.Component {

  static propTypes = {
    addCriteria: React.PropTypes.func,
    layout: React.PropTypes.string,
    selectableModels: React.PropTypes.arrayOf(Model),
    // Set by React Redux connection
    availableCriterion: React.PropTypes.objectOf(React.PropTypes.shape({
      content: PluginDefinition,
    })),
    criterionFetching: React.PropTypes.bool,
    fetchCriterion: React.PropTypes.func,
  }

  state = {
    selectedCriterion: null,
    selectedContainer: null,
  }

  componentWillMount() {
    // Load available criterion plugins
    this.props.fetchCriterion()
  }

  selectCriterion = (event, index, value) => {
    this.setState({
      selectedCriterion: value,
    })
  }

  selectContainer = (event, index, value) => {
    this.setState({
      selectedContainer: value,
    })
  }

  updateCriteria = () => {
    this.props.addCriteria({
      pluginId: this.state.selectedCriterion,
      container: this.state.selectedContainer,
    })
  }

  renderCriterionTypesList = () => {
    const items = []
    if (!this.props.criterionFetching && this.props.availableCriterion) {
      forEach(this.props.availableCriterion, (criterion, idx) => {
        items.push(
          <MenuItem key={idx} value={criterion.content.name} primaryText={criterion.content.name} />,
        )
      })
    }
    return items
  }

  renderContainersList = () => {
    const items = []
    try {
      if (this.props.module && this.props.module.conf && this.props.module.conf.layout) {
        const containers = ContainerHelper.getAvailableContainersInLayout(JSON.parse(this.props.module.conf.layout))
        if (containers && containers.length > 0) {
          forEach(containers, (container, idx) => {
            items.push(
              <MenuItem key={idx} value={container} primaryText={container} />,
            )
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
    return items
  }

  renderCriteriaConfiguration = () => {
    if (this.state.selectedCriterion && !this.props.criterionFetching) {
      return (
        <PluginProvider pluginId={this.state.selectedCriterion}>
          <CriteriaConfigurationComponent
            selectableModels={this.props.selectableModels}
          />
        </PluginProvider>
      )
    }
    return null
  }

  render() {
    return (
      <div>
        <SelectField
          key="criterion"
          floatingLabelText="Select a criterion ... "
          value={this.state.selectedCriterion}
          onChange={this.selectCriterion}
        >
          <MenuItem value={null} primaryText="" />
          {this.renderCriterionTypesList()}
        </SelectField>
        <SelectField
          key="containers"
          floatingLabelText="Select a container ... "
          value={this.state.selectedContainer}
          onChange={this.selectContainer}
        >
          <MenuItem value={null} primaryText="" />
          {this.renderContainersList()}
        </SelectField>
        {this.renderCriteriaConfiguration()}
        <MainActionButtonComponent
          label={'Create'}
          onTouchTap={this.updateCriteria}
        />
      </div>
    )
  }

}

const mapStateToProps = state => ({
  availableCriterion: CriterionSelector.getList(state),
  criterionFetching: CriterionSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCriterion: () => dispatch(CriterionActions.fetchPagedEntityList(dispatch, 0, 100)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FormCriteriaComponent)
