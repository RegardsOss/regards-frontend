/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isNil from 'lodash/isNil'
import NoDataIcon from 'mdi-material-ui/Settings'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import {
  RenderSelectField, Field, reduxForm, ValidationHelpers,
} from '@regardsoss/form-utils'
import { CardActionsComponent, NoContentComponent } from '@regardsoss/components'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { ContainerHelper } from '@regardsoss/layout'
import { PluginProvider } from '@regardsoss/plugins'
import { themeContextType } from '@regardsoss/theme'
import CriteriaConfigurationComponent from './CriteriaConfigurationComponent'

/**
 * Component to display a creation or edition of a criterion
 * @author Sébastien binda
 */
class FormCriteriaComponent extends React.Component {
  static propTypes = {
    // Current form criterion list
    criterion: AccessShapes.UIPluginConfArray,
    // Criteria to edit or null to create a new one.
    criteria: AccessShapes.UIPluginConf,
    // Callback to submit the current criteria
    saveCriteria: PropTypes.func,
    // Cancel criteria edition
    cancel: PropTypes.func,
    // Form layout
    layout: AccessShapes.ContainerContent,
    // All selectable attributes for the current form
    selectableAttributes: DataManagementShapes.AttributeModelList,
    // Set by React Redux connection
    availableCriterion: AccessShapes.UIPluginDefinitionList,
    criterionFetching: PropTypes.bool,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static defaultProps = {
    criterion: [],
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Init values to null or with the given criteria to edit
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      selectedCriteria: props.criteria ? props.criteria.pluginId : null,
      selectedIndex: props.criteria ? props.criterion.indexOf(this.props.criteria) : props.criterion.length,
    }
  }

  state = {
    pluginLoadError: false,
  }

  componentWillMount() {
    this.handleInitialize()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.criteria && nextProps.criteria) {
      this.handleInitialize()
    }
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
    let initializationValues = {
      label: 'criteria',
      active: true,
      conf: {},
      position: this.state.selectedIndex,
    }
    if (this.props.criteria) {
      initializationValues = {
        ...initializationValues,
        ...this.props.criteria,
      }
    }
    this.props.initialize(initializationValues)
  }

  pluginLoadError = () => this.setState({ pluginLoadError: true })

  onSubmit = ({ position, ...criterion }) => {
    this.props.saveCriteria(criterion, position)
  }

  /**
   * Callback used when a criteria plugin is selected
   * @param event
   * @param index
   * @param value
   */
  selectCriteria = (event, index, value, input) => {
    const { change } = this.props
    input.onChange(value) // update selector value
    change('conf', {}) // regards/regards#417 - reset attributes to remove previous attributes
    this.setState({ // update state
      selectedCriteria: value,
      pluginLoadError: false,
    })
  }

  /**
   * Render all available criterion plugins for selection.
   * @returns {Array}
   */
  renderCriterionTypesList = () => {
    if (!this.props.criterionFetching && this.props.availableCriterion) {
      return map(this.props.availableCriterion, (criterion, idx) => <MenuItem key={idx} value={criterion.content.id} primaryText={criterion.content.name} />)
    }
    return []
  }

  /**
   * Render all available containers from the given layout
   * @returns {Array}
   */
  renderContainersList = () => {
    try {
      if (this.props.layout) {
        const containers = ContainerHelper.getAvailableContainersInLayout(this.props.layout, true)
        if (containers && containers.length > 0) {
          return map(containers, container => (
            <MenuItem key={container.id} value={container.id} primaryText={container.id} />
          ))
        }
      }
    } catch (e) {
      console.error(e)
    }
    return []
  }

  /**
   * Render the specific criterion plugin configuration form
   * @returns {*}
   */
  renderCriteriaConfiguration = () => {
    const { intl: { formatMessage } } = this.context

    if (!isNil(this.state.selectedCriteria) && !this.props.criterionFetching) {
      return (
        <PluginProvider
          key={this.state.selectedCriteria}
          pluginInstanceId="add-criteria"
          pluginId={this.state.selectedCriteria}
          displayPlugin={false}
          onErrorCallback={this.pluginLoadError}
        >
          <CriteriaConfigurationComponent
            selectableAttributes={this.props.selectableAttributes}
          />
        </PluginProvider>
      )
    }
    return <NoContentComponent
      titleKey="form.criterion.criteria.no.config.title"
      messageKey="form.criterion.criteria.no.config.message"
      Icon={NoDataIcon}
    />
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    const {
      pristine, submitting, invalid, criterion, criteria, handleSubmit,
    } = this.props
    const { criteria: criteriaStyle } = this.context.moduleTheme
    const { intl: { formatMessage } } = this.context
    const { selectedIndex } = this.state

    const required = [ValidationHelpers.required]

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <div style={criteriaStyle.wrapper}>
          <div style={criteriaStyle.mainConfiguration}>
            <div style={criteriaStyle.title}>
              {formatMessage({ id: `form.criterion.criteria.${criteria ? 'existing' : 'new'}.title` })}
            </div>
            <div style={criteriaStyle.subtitle}>{ formatMessage({ id: 'form.criterion.criteria.subtitle' }) }</div>
            <Field
              name="pluginId"
              fullWidth
              component={RenderSelectField}
              onSelect={this.selectCriteria}
              label={formatMessage({ id: 'form.criterion.criteria.select.criteria.label' })}
              validate={required}
            >
              {this.renderCriterionTypesList()}
            </Field>
            <Field
              name="container"
              fullWidth
              component={RenderSelectField}
              label={formatMessage({ id: 'form.criterion.criteria.select.container.label' })}
              validate={required}
            >
              {this.renderContainersList()}
            </Field>
            <Field
              name="position"
              component={RenderSelectField}
              label={formatMessage({ id: 'form.criterion.criteria.select.position.label' })}
              fullWidth
            >
              {[ // First position option
                <MenuItem
                  key="first"
                  value={0}
                  primaryText={formatMessage({ id: 'form.criterion.criteria.select.position.first' })}
                />, // After other attribute elements option
                ...criterion.map((attribute, index) => index === selectedIndex
                  ? null : ( // do not propose self position =)
                    <MenuItem
                      // eslint-disable-next-line react/no-array-index-key
                      key={index} // index is ok as list cannot change before unmount
                      value={// value is final position in table (remove this element index if it was before current attribute)
                        selectedIndex < index ? index : index + 1
                      }
                      selected={selectedIndex === index}
                      primaryText={`${selectedIndex < index ? index + 1 : index + 2} - ${formatMessage({ id: 'form.criterion.criteria.select.position.after' })} ${this.props.availableCriterion[attribute.pluginId].content.name}`}
                    />)),
              ]}
            </Field>
          </div>
          <div style={criteriaStyle.criteriaConfiguration}>
            {this.renderCriteriaConfiguration()}
          </div>
        </div>
        <CardActionsComponent
          mainButtonLabel={formatMessage({ id: `form.criterion.criteria.${criteria ? 'edit' : 'submit'}.button.label` })}
          mainButtonType="submit"
          isMainButtonDisabled={pristine || submitting || invalid || this.state.pluginLoadError}
          secondaryButtonLabel={formatMessage({ id: 'form.criterion.criteria.cancel.button.label' })}
          secondaryButtonClick={this.onCancel}
        />
      </form>
    )
  }
}


const UnconnectedFormCriteriaComponent = FormCriteriaComponent
export { UnconnectedFormCriteriaComponent }

export default reduxForm({
  form: 'edit-module-criteria-form',
})(FormCriteriaComponent)
