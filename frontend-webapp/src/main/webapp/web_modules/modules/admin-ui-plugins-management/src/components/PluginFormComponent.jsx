/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { connect, ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { PluginDefinition } from '@regardsoss/model'
import { RenderTextField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { reduxForm, formValueSelector } from 'redux-form'
import { PluginLoader } from '@regardsoss/plugins'
import PluginDefinitionComponent from './PluginDefinitionComponent'

/**
 * React component to display and configure a given layout
 */
class pluginFormComponent extends React.Component {

  static propTypes = {
    plugin: React.PropTypes.shape({
      content: PluginDefinition,
    }),
    onSubmit: React.PropTypes.func.isRequired,
    onBack: React.PropTypes.func.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    pathField: React.PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      path: null,
      creation: this.props.plugin === null || this.props.plugin === undefined,
      pluginSelected: this.props.plugin !== null && this.props.plugin !== undefined,
      plugin: this.props.plugin ? this.props.plugin : {},
    }
  }

  componentDidMount() {
    this.handleInitialize()
    if (this.props.plugin && this.props.plugin.content && this.props.plugin.content.sourcesPath) {
      this.searchPlugin(this.props.plugin.content.sourcesPath)
    }
  }

  handleInitialize = () => {
    this.props.initialize({ ...this.state.plugin.content })
  }

  searchPlugin = (path) => {
    if (this.props.pathField && this.props.pathField !== '') {
      this.setState({
        path: this.props.pathField,
        pluginIsValid: false,
      })
    } else if (path) {
      this.setState({
        path,
        pluginIsValid: false,
      })
    }
  }

  handlePluginValid = (plugin) => {
    if (plugin) {
      this.props.change('name', plugin.info.name)
      this.props.change('type', plugin.info.type)
      this.setState({
        pluginIsValid: true,
      })
    } else {
      this.setState({
        pluginIsValid: false,
      })
    }
  }

  renderPlugin = () => {
    if (this.state.path) {
      return (
        <Card>
          <CardText>
            <PluginLoader
              key={this.state.path}
              pluginPath={this.state.path}
              displayPlugin={false}
            >
              <PluginDefinitionComponent
                handlePluginValid={this.handlePluginValid}
              />
            </PluginLoader>
          </CardText>
        </Card>
      )
    }
    return null
  }

  render() {
    const { pristine, submitting } = this.props

    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="modules/admin-ui-plugins-management/src/i18n"
      >
        <div>
          <Card>
            <CardTitle
              title={<FormattedMessage
                id={this.state.creation ? 'plugin.form.title.create' : 'plugin.form.title.update'}
                values={this.state.creation ? {} : {
                  name: this.state.plugin.content.name,
                }}
              />}
              subtitle={<FormattedMessage id={'plugin.form.subtitle'} />}
            />
            <CardText id="staticFields">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Field
                  name="sourcesPath"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={<FormattedMessage id="plugin.form.sourcesPath" />}
                />
                <IconButton tooltip="Search plugin" onTouchTap={this.searchPlugin}>
                  <SearchIcon />
                </IconButton>
              </div>
            </CardText>
          </Card>

          {this.renderPlugin()}

          <Card>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={<FormattedMessage
                  id={this.state.creation ? 'plugin.form.submit.button' : 'plugin.form.update.button'}
                />}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting || !this.state.pluginIsValid || this.state.path !== this.props.pathField}
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

const validate = (values) => {
  const errors = {}
  if (values.name === '') {
    errors.name = ErrorTypes.REQUIRED
  }
  if (values.type === '') {
    errors.type = ErrorTypes.REQUIRED
  }
  if (values.sourcesPath === '') {
    errors.sourcesPath = ErrorTypes.REQUIRED
  }
  return errors
}

const UnconnectedPluginFormComponent = pluginFormComponent
export {
  UnconnectedPluginFormComponent,
}
const selector = formValueSelector('edit-plugin-form')
const mapStateToProps = state => ({
  pathField: selector(state, 'sourcesPath'),
})
const ConnectedComponent = connect(mapStateToProps)(pluginFormComponent)

export default reduxForm({
  form: 'edit-plugin-form',
  validate,
})(ConnectedComponent)
