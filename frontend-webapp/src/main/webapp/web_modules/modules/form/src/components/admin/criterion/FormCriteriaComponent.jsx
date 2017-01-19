/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { PluginDefinition, PluginConf, AttributeModel } from '@regardsoss/model'
import { ContainerHelper } from '@regardsoss/layout'
import { PluginProvider } from '@regardsoss/plugins'
import CriterionActions from '../../../models/criterion/CriterionActions'
import CriterionSelector from '../../../models/criterion/CriterionSelector'
import CriteriaConfigurationComponent from './CriteriaConfigurationComponent'

/**
 * Component to display a creation or edition of a criterion
 */
class FormCriteriaComponent extends React.Component {

  static propTypes = {
    // Criteria to edit or null to create a new one.
    criteria: PluginConf,
    // Callback to submit the current criteria
    saveCriteria: React.PropTypes.func,
    // Cancel criteria edition
    cancel: React.PropTypes.func,
    // Form layout
    layout: React.PropTypes.string,
    // All selectable attributes for the current form
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    // Set by React Redux connection
    availableCriterion: React.PropTypes.objectOf(React.PropTypes.shape({
      content: PluginDefinition,
    })),
    criterionFetching: React.PropTypes.bool,
    fetchCriterion: React.PropTypes.func,
  }

  /**
   * Init values to null or with the given criteria to edit
   * @param props
   */
  constructor(props) {
    super()
    this.state = {
      selectedCriteria: props.criteria ? props.criteria.pluginId : null,
      selectedContainer: props.criteria ? props.criteria.container : null,
      pluginConf: props.criteria ? props.criteria.pluginConf : null,
    }
  }

  /**
   * Load available criterion plugins
   */
  componentWillMount() {
    // Load available criterion plugins
    this.props.fetchCriterion()
  }

  /**
   * Action to cancel the current criteria edition
   */
  onCancel = () => {
    this.props.cancel()
  }

  /**
   * Action to update the current criteria configuration
   */
  updateCriteria = () => {
    this.props.saveCriteria({
      pluginId: this.state.selectedCriteria,
      container: this.state.selectedContainer,
      pluginConf: this.state.pluginConf,
    })
  }

  /**
   * Callback when a container is selected
   * @param event
   * @param index
   * @param value
   */
  selectContainer = (event, index, value) => {
    this.setState({
      selectedContainer: value,
    })
  }

  /**
   * Callback used when a criteria plugin is selected
   * @param event
   * @param index
   * @param value
   */
  selectCriteria = (event, index, value) => {
    this.setState({
      selectedCriteria: value,
    })
  }

  /**
   * Action to update the locale plugin configuration before saving see updateCriteria.
   * @param conf
   */
  updatePluginConf = (conf) => {
    this.setState({
      pluginConf: conf,
    })
  }

  /**
   * Render all avaiable criterion plugins for selection.
   * @returns {Array}
   */
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

  /**
   * Render all available containers from the given layout
   * @returns {Array}
   */
  renderContainersList = () => {
    const items = []
    try {
      if (this.props.layout) {
        const containers = ContainerHelper.getAvailableContainersInLayout(JSON.parse(this.props.layout))
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

  /**
   * Render the specific criterion plugin configuration form
   * @returns {*}
   */
  renderCriteriaConfiguration = () => {
    if (this.state.selectedCriteria && !this.props.criterionFetching) {
      return (
        <PluginProvider pluginId={this.state.selectedCriteria}>
          <CriteriaConfigurationComponent
            selectableAttributes={this.props.selectableAttributes}
            criteriaConf={this.state.pluginConf}
            updatePluginConf={this.updatePluginConf}
          />
        </PluginProvider>
      )
    }
    return null
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <SelectField
          key="criterion"
          floatingLabelText={<FormattedMessage id="form.criterion.criteria.select.criteria.label" />}
          value={this.state.selectedCriteria}
          onChange={this.selectCriteria}
        >
          <MenuItem value={null} primaryText="" />
          {this.renderCriterionTypesList()}
        </SelectField>
        <SelectField
          key="containers"
          floatingLabelText={<FormattedMessage id="form.criterion.criteria.select.container.label" />}
          value={this.state.selectedContainer}
          onChange={this.selectContainer}
        >
          <MenuItem value={null} primaryText="" />
          {this.renderContainersList()}
        </SelectField>
        {this.renderCriteriaConfiguration()}
        <CardActionsComponent
          mainButtonLabel={<FormattedMessage id="form.criterion.criteria.submit.button.label" />}
          mainButtonTouchTap={this.updateCriteria}
          secondaryButtonLabel={<FormattedMessage id="form.criterion.criteria.cancel.button.label" />}
          secondaryButtonTouchTap={this.onCancel}
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
