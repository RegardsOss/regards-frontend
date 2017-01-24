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
import { PluginDefinition } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, ErrorTypes } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { ReduxConnectedForm } from '@regardsoss/redux'

/**
 * React component to display and configure a given layout
 */
class pluginFormComponent extends React.Component {

  static propTypes = {
    plugin: PluginDefinition,
    onSubmit: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
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
      creation: this.props.plugin === null || this.props.plugin === undefined,
      pluginSelected: this.props.plugin !== null && this.props.plugin !== undefined,
      plugin: this.props.plugin
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    this.props.initialize({ ...this.state.plugin })
  }

  render() {
    const { pristine, submitting } = this.props

    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="plugins/admin-ui-plugins-management/src/i18n"
      >
        <div>
          <Card>
            <CardTitle
              title={<FormattedMessage
                id={this.state.creation ? 'plugin.form.title.create' : 'plugin.form.title.update'}
                values={this.state.creation ? {} : {
                  name: this.state.plugin.name,
                }}
              />}
            />
            <CardText id="staticFields">
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="plugin.form.sourcePath" />}
              />
              <Field
                name="sourcePath"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="plugin.form.sourcePath" />}
              />
            </CardText>
          </Card>

          {pluginConf}

          <Card style={style.cardEspaced}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={<FormattedMessage
                  id={this.state.creation ? 'plugin.form.submit.button' : 'plugin.form.update.button'}
                />}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting}
                secondaryButtonLabel={<FormattedMessage id="plugin.form.cancel.button" />}
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

const UnconnectedpluginFormComponent = pluginFormComponent
export {
  UnconnectedpluginFormComponent,
}

export default reduxForm({
  form: 'edit-plugin-form',
  validate,
})(pluginFormComponent)
