/**
 * LICENSE_PLACEHOLDER
 **/
import { map, merge } from 'lodash'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, ErrorTypes } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { ModuleShape, AvailableModules, LazyModuleComponent } from '@regardsoss/modules'

/**
 * React component to display and configure a given layout
 */
class ModuleFormComponent extends React.Component {

  static propTypes = {
    module: ModuleShape,
    containers: React.PropTypes.arrayOf(React.PropTypes.string),
    onSubmit: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
    applicationId: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      creation: this.props.module ? false : true,
      moduleSelected: this.props.module ? true : false,
      module: this.props.module ? this.props.module : {
        active: false,
      },
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    this.props.initialize({ ...this.state.module })
  }

  selectModuleType = (event, index, value, input) => {
    console.log('MODULE PROPS', this.props)
    input.onChange(value)
    this.setState({
      moduleSelected: true,
      module: merge({}, this.state.module, { name: value }),
    })
  }

  render() {
    const { pristine, submitting } = this.props

    let moduleConf = null
    if (this.state.moduleSelected) {
      moduleConf = (
        <Card style={this.context.muiTheme.layout.cardEspaced}>
          <CardText>
            <LazyModuleComponent
              module={this.state.module}
              admin
              appName={this.props.applicationId}
              refresh
            />
          </CardText>
        </Card>
      )
    }

    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="modules/ui-configuration/src/i18n"
      >
        <div>
          <Card>
            <CardTitle
              title={<FormattedMessage
                id={this.state.creation ? 'module.form.title.create' : 'module.form.title.update'}
                values={this.state.creation ? {} : {
                  name: this.state.module.name,
                }}
              />}
            />
            <CardText>
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
                name="container"
                fullWidth
                component={RenderSelectField}
                type="text"
                label={<FormattedMessage id="module.form.container" />}
              >
                {map(this.props.containers, (container, id) => (
                  <MenuItem
                    value={container}
                    key={id}
                    primaryText={container}
                  />
                ))}
              </Field>
              <Field
                name="active"
                component={RenderCheckbox}
                label={<FormattedMessage id="module.form.active" />}
              />
            </CardText>
          </Card>

          {moduleConf}

          <Card style={this.context.muiTheme.layout.cardEspaced}>
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
      </ReduxConnectedForm>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.name || values.name === '') {
    errors.name = ErrorTypes.REQUIRED
  }
  if (!values.description || values.description === '') {
    errors.description = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'edit-module-form',
  validate,
})(ModuleFormComponent)
