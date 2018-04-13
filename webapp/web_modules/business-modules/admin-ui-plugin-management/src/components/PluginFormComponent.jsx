/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import has from 'lodash/has'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent, FormErrorMessage } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { RenderTextField, Field, ErrorTypes, reduxForm, validUrl } from '@regardsoss/form-utils'
import { formValueSelector } from 'redux-form'
import { PluginLoader } from '@regardsoss/plugins'
import PluginDefinitionComponent from './PluginDefinitionComponent'

/**
 * React component to display and configure a given layout
 * @author Sébastien Binda
 */
class pluginFormComponent extends React.Component {
  static propTypes = {
    plugin: AccessShapes.UIPluginDefinition,
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
    iconField: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      path: null,
      creation: isNil(this.props.plugin),
      plugin: this.props.plugin ? this.props.plugin : {},
    }
  }

  componentDidMount() {
    this.handleInitialize()
    if (has(this.props.plugin, 'content.sourcePath')) {
      this.searchPlugin(this.props.plugin.content.sourcePath)
    }
    this.loadIcon(get(this.props.plugin, 'content.iconUrl', null))
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
      // Fix static plugin definition values from the plugin info
      this.props.change('name', plugin.info.name)
      this.props.change('type', plugin.info.type)

      if (plugin.info.conf && plugin.info.conf.applicationModes) {
        this.props.change('applicationModes', plugin.info.conf.applicationModes)
      }
      if (plugin.info.conf && plugin.info.conf.entityTypes) {
        this.props.change('entityTypes', plugin.info.conf.entityTypes)
      }
      this.setState({
        pluginIsValid: true,
      })
    } else {
      this.setState({
        pluginIsValid: false,
      })
    }
  }

  loadIcon = (path) => {
    const { iconField } = this.props
    if (iconField) {
      this.setState({
        loadedIcon: iconField,
      })
    } else if (path) {
      this.setState({
        loadedIcon: path,
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

  renderIcon = () => {
    const { plugin } = this.props
    const { loadedIcon } = this.state
    if (loadedIcon) {
      return <img src={loadedIcon} alt="" width="75" height="75" />
    } else if (get(plugin, 'content.iconUrl', null)) {
      return <img src={plugin.content.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  render() {
    const { pristine, submitting } = this.props
    let title
    if (this.state.creation) {
      title = this.context.intl.formatMessage({ id: 'plugin.form.title.create' })
    } else {
      title = this.context.intl.formatMessage({ id: 'plugin.form.title.update' }, { name: this.state.plugin.content.name })
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Card>
            <CardTitle
              title={title}
              subtitle={this.context.intl.formatMessage({ id: 'plugin.form.subtitle' })}
            />
            <CardText>
              {this.renderErrorMessage()}
            </CardText>
            <CardText id="staticFields">
              <div>
                {this.renderIcon()}
              </div>
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
                  label={this.context.intl.formatMessage({ id: 'plugin.form.sourcesPath' })}
                  validate={validUrl}
                />
                <IconButton
                  tooltip="Search plugin"
                  onClick={this.searchPlugin}
                  disabled={!this.props.pathField || this.props.pathField === ''}
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Field
                  name="iconUrl"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={this.context.intl.formatMessage({ id: 'plugin.form.icon' })}
                />
                <IconButton
                  tooltip="Display icon"
                  onClick={this.loadIcon}
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
                mainButtonLabel={this.context.intl.formatMessage({ id: this.state.creation ? 'plugin.form.submit.button' : 'plugin.form.update.button' })}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting || !this.state.pluginIsValid || this.state.path !== this.props.pathField}
                secondaryButtonLabel={this.context.intl.formatMessage({ id: 'plugin.form.cancel.button' })}
                secondaryButtonClick={this.props.onBack}
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
export { UnconnectedPluginFormComponent }
const selector = formValueSelector('edit-plugin-form')
const mapStateToProps = state => ({
  pathField: selector(state, 'sourcePath'),
  iconField: selector(state, 'iconUrl'),
})
const ConnectedComponent = connect(mapStateToProps)(pluginFormComponent)

export default reduxForm({
  form: 'edit-plugin-form',
  validate,
})(ConnectedComponent)
