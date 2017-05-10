/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import map from 'lodash/map'
import merge from 'lodash/merge'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { themeContextType } from '@regardsoss/theme'
import { Container } from '@regardsoss/model'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, ErrorTypes } from '@regardsoss/form-utils'
import { ModuleShape, AvailableModules } from '@regardsoss/modules'
import DynamicModuleFormComponent from './DynamicModuleFormComponent'
import Styles from '../styles/styles'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ModuleFormComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    module: ModuleShape,
    containers: React.PropTypes.arrayOf(Container),
    onSubmit: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
    applicationId: React.PropTypes.string.isRequired,
    duplication: React.PropTypes.bool,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: React.PropTypes.object,
    }),
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    let dynamicContainerSelected = false
    if (this.props.module) {
      dynamicContainerSelected = find(this.props.containers,
        container => container.id === this.props.module.container && container.dynamicContent)
    }
    this.state = {
      creation: this.props.duplication || this.props.module === null || this.props.module === undefined,
      moduleSelected: this.props.module !== null && this.props.module !== undefined,
      dynamicContainerSelected,
      module: this.props.module ? this.props.module : {
        active: false,
        conf: {},
      },
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    if (this.props.module) {
      const initializeModule = Object.assign({},
        {
          applicationId: this.props.applicationId,
          active: false,
          defaultDynamicModule: false,
        }, this.state.module)
      this.props.initialize(initializeModule)
    }
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
      module: merge({}, this.state.module, { name: value }),
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

  renderStaticModuleConfiguration = style => (
    <div>
      <ShowableAtRender show={this.state.creation}>
        <Field
          name="name"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectModuleType}
          label={<FormattedMessage id="module.form.name" />}
        >
          {map(AvailableModules, (module, id) => (
            <MenuItem
              value={module}
              key={id}
              primaryText={module}
            />
            ))}
        </Field>
      </ShowableAtRender>
      <Field
        name="description"
        fullWidth
        component={RenderTextField}
        type="text"
        label={<FormattedMessage id="module.form.description" />}
      />
      <Field
        style={{ marginBottom: 15 }}
        name="container"
        fullWidth
        component={RenderSelectField}
        type="text"
        onSelect={this.selectContainer}
        label={<FormattedMessage id="module.form.container" />}
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
        label={<FormattedMessage id="module.form.active" />}
      />
      {this.state.dynamicContainerSelected ?
        <Field
          name="defaultDynamicModule"
          component={RenderCheckbox}
          label={<FormattedMessage id="module.form.isDefault" />}
        /> : null }
    </div>
    )
  render() {
    const { pristine, submitting } = this.props
    const style = Styles(this.context.muiTheme)


    let title = 'module.form.title.update'
    if (this.props.duplication) {
      title = 'module.form.title.duplicate'
    } else if (this.state.creation) {
      title = 'module.form.title.create'
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Card>
            <CardTitle
              title={<FormattedMessage
                id={title}
                values={{
                  name: this.state.module.name,
                }}
              />}
            />
            <CardText id="staticFields">
              {this.renderStaticModuleConfiguration(style)}
            </CardText>
          </Card>

          {this.renderDynamicModuleConfiguration(style)}

          <Card style={style.cardEspaced}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={<FormattedMessage
                  id={this.state.creation ? 'module.form.submit.button' : 'module.form.update.button'}
                />}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting}
                secondaryButtonLabel={<FormattedMessage id="module.form.cancel.button" />}
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
