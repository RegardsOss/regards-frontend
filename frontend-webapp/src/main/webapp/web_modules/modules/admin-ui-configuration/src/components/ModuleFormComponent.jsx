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
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { ModuleShape, AvailableModules, LazyModuleComponent } from '@regardsoss/modules'
import Styles from '../styles/styles'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ModuleFormComponent extends React.Component {

  static propTypes = {
    module: ModuleShape,
    containers: React.PropTypes.arrayOf(React.PropTypes.string),
    onSubmit: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
    applicationId: React.PropTypes.string.isRequired,
    duplication: React.PropTypes.bool,
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
      creation: this.props.duplication || this.props.module === null || this.props.module === undefined,
      moduleSelected: this.props.module !== null && this.props.module !== undefined,
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
    this.props.initialize({ ...this.state.module })
  }

  selectModuleType = (event, index, value, input) => {
    input.onChange(value)
    this.setState({
      moduleSelected: true,
      module: merge({}, this.state.module, { name: value }),
    })
  }

  render() {
    const { pristine, submitting } = this.props
    const style = Styles(this.context.muiTheme)
    let moduleConf = null
    if (this.state.moduleSelected) {
      moduleConf = (
        <Card id="dynamicFields" style={style.cardEspaced}>
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
              <Field
                name="isDefault"
                component={RenderCheckbox}
                label={<FormattedMessage id="module.form.isDefault" />}
              />
            </CardText>
          </Card>

          {moduleConf}

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

function validate(values) {
  const errors = {}
  if (values.name === '') {
    errors.name = ErrorTypes.REQUIRED
  }
  if (values.description === '') {
    errors.description = ErrorTypes.REQUIRED
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
