/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { RenderSelectField, Field } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { PluginDefinition, PluginConf, AttributeModel } from '@regardsoss/model'
import { ContainerHelper } from '@regardsoss/layout'
import { PluginProvider } from '@regardsoss/plugins'
import { ReduxConnectedForm } from '@regardsoss/redux'

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
    saveCriteria: React.PropTypes.func,
    // Cancel criteria edition
    cancel: React.PropTypes.func,
    // Form layout
    layout: React.PropTypes.string,
    // All selectable attributes for the current form
    selectableAttributes: React.PropTypes.objectOf(AttributeModel),
    // Set by React Redux connection
    availableCriterion: React.PropTypes.objectOf(PluginDefinition),
    criterionFetching: React.PropTypes.bool,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
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
   * Callback when a container is selected
   * @param event
   * @param index
   * @param value
   */
  selectContainer = (event, index, value, input) => {
    input.onChange(value)
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
          pluginInstanceId={0}
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
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.saveCriteria)}
        i18nMessagesDir="modules/search-form/src/i18n"
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
            onSelect={this.selectContainer}
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
      </ReduxConnectedForm>
    )
  }
}

const UnconnectedFormCriteriaComponent = FormCriteriaComponent
export {
  UnconnectedFormCriteriaComponent,
}

const validate = (values) => {
  const errors = {}
  return errors
}
export default reduxForm({
  form: 'edit-module-criteria-form',
  validate,
})(FormCriteriaComponent)

