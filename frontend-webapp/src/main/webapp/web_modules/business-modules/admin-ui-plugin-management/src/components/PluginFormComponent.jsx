/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { PluginDefinition } from '@regardsoss/model'
import { RenderTextField, Field, ErrorTypes, reduxForm, FormErrorMessage } from '@regardsoss/form-utils'
import { formValueSelector } from 'redux-form'
import { PluginLoader } from '@regardsoss/plugins'
import PluginDefinitionComponent from './PluginDefinitionComponent'

/**
 * React component to display and configure a given layout
 * @author Sébastien Binda
 */
class pluginFormComponent extends React.Component {

  static propTypes = {
    plugin: PropTypes.shape({
      content: PluginDefinition,
    }),
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    pathField: PropTypes.string,
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
    if (this.props.plugin && this.props.plugin.content && this.props.plugin.content.sourcePath) {
      this.searchPlugin(this.props.plugin.content.sourcePath)
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
              pluginInstanceId={this.state.path}
              pluginPath={this.state.path}
              displayPlugin={false}
            >
              <PluginDefinitionComponent
                key={this.state.path}
                handlePluginValid={this.handlePluginValid}
              />
            </PluginLoader>
          </CardText>
        </Card>
      )
    }
    return null
  }

  renderErrorMessage = () => {
    if (this.props.submitError) {
      const errorMessage = this.context.intl.formatMessage({ id: this.props.submitError })
      return (
        <FormErrorMessage>
          {errorMessage}
        </FormErrorMessage>
      )
    }
    return null
  }

  render() {
    const { pristine, submitting } = this.props

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
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
            <CardText>
              {this.renderErrorMessage()}
            </CardText>
            <CardText id="staticFields">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Field
                  name="sourcePath"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={<FormattedMessage id="plugin.form.sourcesPath" />}
                />
                <IconButton
                  tooltip="Search plugin"
                  onTouchTap={this.searchPlugin}
                  disabled={!this.props.pathField || this.props.pathField === ''}
                >
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
      </form>
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
  if (values.sourcePath === '') {
    errors.sourcePath = ErrorTypes.REQUIRED
  } else if (values.sourcePath && !values.sourcePath.endsWith('.js')) {
    errors.sourcePath = ErrorTypes.INVALID_URL
  }
  return errors
}

const UnconnectedPluginFormComponent = pluginFormComponent
export {
  UnconnectedPluginFormComponent,
}
const selector = formValueSelector('edit-plugin-form')
const mapStateToProps = state => ({
  pathField: selector(state, 'sourcePath'),
})
const ConnectedComponent = connect(mapStateToProps)(pluginFormComponent)

export default reduxForm({
  form: 'edit-plugin-form',
  validate,
})(ConnectedComponent)
