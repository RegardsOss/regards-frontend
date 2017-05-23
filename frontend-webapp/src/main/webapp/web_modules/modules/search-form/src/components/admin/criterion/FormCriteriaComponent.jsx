/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { RenderSelectField, Field, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { PluginDefinition, PluginConf, AttributeModel, Container as ContainerShape } from '@regardsoss/model'
import { ContainerHelper } from '@regardsoss/layout'
import { PluginProvider } from '@regardsoss/plugins'

import CriteriaConfigurationComponent from './CriteriaConfigurationComponent'

/**
 * Component to display a creation or edition of a criterion
 * @author Sébastien binda
 */
class FormCriteriaComponent extends React.Component {

  static propTypes = {
    // Criteria to edit or null to create a new one.
    criteria: PluginConf,
    // Callback to submit the current criteria
    saveCriteria: PropTypes.func,
    // Cancel criteria edition
    cancel: PropTypes.func,
    // Form layout
    layout: ContainerShape,
    // All selectable attributes for the current form
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    // Set by React Redux connection
    availableCriterion: PropTypes.objectOf(PluginDefinition),
    criterionFetching: PropTypes.bool,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  /**
   * Init values to null or with the given criteria to edit
   * @param props
   */
  constructor(props) {
    super()
    this.state = {
      selectedCriteria: props.criteria ? props.criteria.pluginId : null,
    }
  }

  componentWillMount() {
    this.handleInitialize()
  }

  /**
   * Action to cancel the current criteria edition
   */
  onCancel = () => {
    this.props.cancel()
  }

  /**
   * Initialize redux-form fields
   */
  handleInitialize = () => {
    if (this.props.criteria) {
      this.props.initialize({ ...this.props.criteria })
    }
  }

  /**
   * Callback used when a criteria plugin is selected
   * @param event
   * @param index
   * @param value
   */
  selectCriteria = (event, index, value, input) => {
    input.onChange(value)
    this.setState({
      selectedCriteria: value,
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
          <MenuItem key={idx} value={criterion.content.id} primaryText={criterion.content.name} />,
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
        const containers = ContainerHelper.getAvailableContainersInLayout(this.props.layout)
        if (containers && containers.length > 0) {
          forEach(containers, (container) => {
            items.push(
              <MenuItem key={container.id} value={container.id} primaryText={container.id} />,
            )
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
    return items
  }

  /**
   * Render the specific criterion plugin configuration form
   * @returns {*}
   */
  renderCriteriaConfiguration = () => {
    if (this.state.selectedCriteria !== null
      && this.state.selectedCriteria !== undefined
      && !this.props.criterionFetching) {
      return (
        <PluginProvider
          key={this.state.selectedCriteria}
          pluginInstanceId={'add-criteria'}
          pluginId={this.state.selectedCriteria}
          displayPlugin={false}
        >
          <CriteriaConfigurationComponent
            selectableAttributes={this.props.selectableAttributes}
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
    const { pristine, submitting } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.saveCriteria)}
      >
        <div>
          <Field
            name="pluginId"
            fullWidth
            component={RenderSelectField}
            type="text"
            onSelect={this.selectCriteria}
            label={<FormattedMessage id="form.criterion.criteria.select.criteria.label" />}
          >
            {this.renderCriterionTypesList()}
          </Field>
          <Field
            name="container"
            fullWidth
            component={RenderSelectField}
            type="text"
            label={<FormattedMessage id="form.criterion.criteria.select.container.label" />}
          >
            {this.renderContainersList()}
          </Field>

          {this.renderCriteriaConfiguration()}

          <CardActionsComponent
            mainButtonLabel={<FormattedMessage id="form.criterion.criteria.submit.button.label" />}
            mainButtonType="submit"
            isMainButtonDisabled={pristine || submitting}
            secondaryButtonLabel={<FormattedMessage id="form.criterion.criteria.cancel.button.label" />}
            secondaryButtonTouchTap={this.onCancel}
          />
        </div>
      </form>
    )
  }
}

const UnconnectedFormCriteriaComponent = FormCriteriaComponent
export {
  UnconnectedFormCriteriaComponent,
}

export default reduxForm({
  form: 'edit-module-criteria-form',
})(FormCriteriaComponent)

