/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import map from 'lodash/map'
import merge from 'lodash/merge'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { reduxForm } from 'redux-form'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, ErrorTypes } from '@regardsoss/form-utils'
import { AccessShapes } from '@regardsoss/shape'
import DynamicModuleFormComponent from './DynamicModuleFormComponent'
import Styles from '../styles/styles'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ModuleFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    module: AccessShapes.Module,
    availableModuleTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    containers: PropTypes.arrayOf(AccessShapes.ContainerContent),
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    applicationId: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: PropTypes.object,
    }),
    // from reduxForm
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    module: {
      active: false,
      conf: {},
    },
  }

  constructor(props) {
    super(props)
    let dynamicContainerSelected
    const moduleSelected = props.adminForm.isEditing || props.adminForm.isDuplicating
    if (moduleSelected) {
      dynamicContainerSelected = find(
        this.props.containers,
        container => container.id === this.props.module.container && container.dynamicContent,
      )
    }
    this.state = {
      moduleSelected,
      dynamicContainerSelected,
      module: this.props.module,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const initializeModule = Object.assign(
      {},
      {
        applicationId: this.props.applicationId,
        active: false,
        defaultDynamicModule: false,
      }, this.state.module,
    )
    this.props.initialize(initializeModule)
  }

  selectContainer = (event, index, containerId, input) => {
    const container = find(this.props.containers, cont => cont.id === containerId)
    input.onChange(containerId)
    this.setState({
      dynamicContainerSelected: container.dynamicContent,
    })
  }

  selectModuleType = (event, index, value, input) => {
    input.onChange(value)
    this.setState({
      moduleSelected: true,
      module: merge({}, this.state.module, { type: value }),
    })
  }

  renderDynamicModuleConfiguration = (style) => {
    if (this.state.moduleSelected) {
      return (<DynamicModuleFormComponent
        project={this.props.project}
        appName={this.props.applicationId}
        adminForm={this.props.adminForm}
        module={this.state.module}
        styles={style.cardEspaced}
      />)
    }
    return null
  }

  renderStaticModuleConfiguration = (style) => {
    const containerFieldStyle = { marginBottom: 15 }
    return (
      <div>
        <Field
          name="type"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectModuleType}
          label={this.context.intl.formatMessage({ id: 'module.form.name' })}
          disabled={!this.props.adminForm.isCreating}
        >
          {map(this.props.availableModuleTypes, (module, id) => (
            <MenuItem
              value={module}
              key={id}
              primaryText={module}
            />
          ))
          }
        </Field>
        <Field
          name="description"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'module.form.description' })}
        />
        <Field
          style={containerFieldStyle}
          name="container"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectContainer}
          label={this.context.intl.formatMessage({ id: 'module.form.container' })}
        >
          {map(this.props.containers, container => (
            <MenuItem
              value={container.id}
              key={container.id}
              primaryText={container.dynamicContent ? `${container.id} (dynamic)` : container.id}
            />
          ))}
        </Field>
        <Field
          name="active"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'module.form.active' })}
        />
        {this.state.dynamicContainerSelected ?
          <Field
            name="defaultDynamicModule"
            component={RenderCheckbox}
            label={this.context.intl.formatMessage({ id: 'module.form.isDefault' })}
          /> : null}
      </div>
    )
  }
  render() {
    const { pristine, submitting, invalid } = this.props
    const style = Styles(this.context.muiTheme)
    const { isDuplicating, isCreating } = this.props.adminForm

    let title = 'module.form.title.update'
    if (isDuplicating) {
      title = 'module.form.title.duplicate'
    } else if (isCreating) {
      title = 'module.form.title.create'
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Card>
            <CardTitle
              title={this.context.intl.formatMessage({ id: title }, { name: this.state.module.name })}
            />
            <CardText id="staticFields">
              {this.renderStaticModuleConfiguration(style)}
            </CardText>
          </Card>

          {this.renderDynamicModuleConfiguration(style)}

          <Card style={style.cardEspaced}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={this.context.intl.formatMessage({ id: isCreating ? 'module.form.submit.button' : 'module.form.update.button' })}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting || invalid}
                secondaryButtonLabel={this.context.intl.formatMessage({ id: 'module.form.cancel.button' })}
                secondaryButtonTouchTap={this.props.onBack}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.name || values.name === '') {
    errors.name = ErrorTypes.REQUIRED
  }
  if (!values.description || values.description === '') {
    errors.description = ErrorTypes.REQUIRED
  }
  if (!values.container || values.container === '') {
    errors.container = ErrorTypes.REQUIRED
  }
  if (!values.applicationId || values.applicationId === '') {
    errors.applicationId = ErrorTypes.REQUIRED
  }
  return errors
}

const UnconnectedModuleFormComponent = ModuleFormComponent
export {
  UnconnectedModuleFormComponent,
}

export default reduxForm({
  form: 'edit-module-form',
  validate,
})(ModuleFormComponent)
