/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'mdi-material-ui/Magnify'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent, FormErrorMessage } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import {
  RenderTextField, RenderSelectField, Field, ErrorTypes, reduxForm,
} from '@regardsoss/form-utils'
import { formValueSelector } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { PluginLoader } from '@regardsoss/plugins'
import { ShowableAtRender } from '@regardsoss/display-control'
import { AccessDomain } from '@regardsoss/domain'
import PluginDefinitionComponent from './PluginDefinitionComponent'

/**
 * React component to display and configure a given layout
 * @author Sébastien Binda
 */
class PluginFormComponent extends React.Component {
  static propTypes = {
    plugin: AccessShapes.UIPluginDefinition,
    roleList: AdminShapes.RoleList,
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

  static SEPARATOR_STYLE = {
    display: 'flex',
    alignItems: 'flex-end',
  }

  /**
   * Validates the plugin path field
   * @param {*} path current path
   * @return {string} error i18, key if any error, undefined otherwise
   */
  static validatePluginField(path) {
    if (!path) {
      return ErrorTypes.REQUIRED
    }
    if (!path.endsWith('.js')) {
      return 'plugin.form.invalid.source.path'
    }
    return undefined // no error
  }

  /**
   * React lifecycle method UNSAFE_componentWillMount. Used here to initialize form state and values
   */
  UNSAFE_componentWillMount() {
    const { plugin, initialize } = this.props
    // initialize state
    this.setState({
      path: get(plugin, 'content.pluginPath', null),
      creation: isNil(plugin),
    })
    // initialize form values
    const defaultValues = {
      // Set default role to PUBLIC
      roleName: 'PUBLIC',
      ...get(plugin, 'content', {}),
    }
    initialize(defaultValues)
  }

  /**
   * React lifecycle method componentDidMount. Used here to load icons and plugin when in edition mode
   */
  componentDidMount() {
    const { plugin } = this.props
    if (plugin) {
      this.searchPlugin(get(plugin, 'content.sourcePath'))
      this.loadIcon(get(plugin, 'content.iconUrl'))
    }
  }

  shouldRenderRoleField = () => {
    const { pluginIsValid, pluginInfo } = this.state
    return pluginIsValid && pluginInfo.type === AccessDomain.UI_PLUGIN_INFO_TYPES_ENUM.SERVICE
  }

  getRoleName = (name = 'empty') => {
    const formated = this.context.intl.formatMessage({ id: `role.name.${name}` })
    if (formated !== `role.name.${name}`) {
      return formated
    }
    return name
  }

  /**
   * Method to start loading a plugin through entered path
   * @param {string} pluginPath plugin path, to use while the corresponding field is not set
   */
  searchPlugin = (pluginPath) => {
    const { pathField } = this.props
    const pathToLoad = pathField || pluginPath // initially, pluginPath field is not set
    if (pathToLoad) {
      this.setState({
        path: pathToLoad,
        pluginIsValid: false,
      })
    }
  }

  /**
   * Callback: Plugin was loaded sucessfully (and is currently rendered)
   * @param plugin loaded plugin
   */
  handlePluginValid = (plugin) => {
    if (plugin && plugin.info) {
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
        pluginInfo: plugin.info,
      })
    }
  }

  /**
   * Loads icon by its path in form values
   * @param {string} iconPath icon path, to use while the corresponding field is not set
   */
  loadIcon = (iconPath) => {
    const { iconField } = this.props
    const pathToLoad = iconField || iconPath // initially, iconField path is not set
    if (pathToLoad) {
      this.setState({
        loadedIcon: pathToLoad,
      })
    }
  }

  /**
   * Renders the plugin if available
   */
  renderPlugin = () => {
    const { path } = this.state
    if (path) { // when plugin is not yet loaded or invalid, let plugin loader show it
      return (
        <Card>
          <CardText>
            <PluginLoader
              pluginInstanceId={path}
              pluginPath={path}
              displayPlugin={false}
              checkPluginExistence
            >
              <PluginDefinitionComponent
                key={path}
                handlePluginValid={this.handlePluginValid}
              />
            </PluginLoader>
          </CardText>
        </Card>
      )
    }
    // plugin loading failed
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
    } if (get(plugin, 'content.iconUrl', null)) {
      return <img src={plugin.content.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  render() {
    const { roleList, pristine, submitting } = this.props
    const { intl: { formatMessage } } = this.context

    let title
    if (this.state.creation) {
      title = formatMessage({ id: 'plugin.form.title.create' })
    } else {
      title = formatMessage({ id: 'plugin.form.title.update' }, { name: this.props.plugin.content.name })
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Card>
            <CardTitle
              title={title}
              subtitle={formatMessage({ id: 'plugin.form.subtitle' })}
            />
            <CardText>
              {this.renderErrorMessage()}
            </CardText>
            <CardText id="staticFields">
              <div>
                {this.renderIcon()}
              </div>
              <div
                style={PluginFormComponent.SEPARATOR_STYLE}
              >
                <Field
                  name="sourcePath"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={formatMessage({ id: 'plugin.form.sourcesPath' })}
                  validate={PluginFormComponent.validatePluginField}
                />
                <IconButton
                  tooltip="Search plugin"
                  onClick={this.searchPlugin}
                  disabled={!!PluginFormComponent.validatePluginField(this.props.pathField)} // disabled when there are error
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <div
                style={PluginFormComponent.SEPARATOR_STYLE}
              >
                <Field
                  name="iconUrl"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={formatMessage({ id: 'plugin.form.icon' })}
                />
                <IconButton
                  tooltip="Display icon"
                  onClick={this.loadIcon}
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <ShowableAtRender show={this.shouldRenderRoleField()}>
                <Field
                  name="roleName"
                  fullWidth
                  component={RenderSelectField}
                  label={formatMessage({ id: 'plugin.form.role' })}
                >
                  {map(roleList, (role, id) => (
                    <MenuItem
                      value={role.content.name}
                      key={id}
                      primaryText={this.getRoleName(role.content.name)}
                    />
                  ))}
                </Field>
              </ShowableAtRender>
            </CardText>
          </Card>

          {this.renderPlugin()}

          <Card>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={formatMessage({ id: this.state.creation ? 'plugin.form.submit.button' : 'plugin.form.update.button' })}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting || !this.state.pluginIsValid || this.state.path !== this.props.pathField}
                secondaryButtonLabel={formatMessage({ id: 'plugin.form.cancel.button' })}
                secondaryButtonClick={this.props.onBack}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }
}

const UnconnectedPluginFormComponent = PluginFormComponent
export { UnconnectedPluginFormComponent }
const selector = formValueSelector('edit-plugin-form')
const mapStateToProps = (state) => ({
  pathField: selector(state, 'sourcePath'),
  iconField: selector(state, 'iconUrl'),
})
const ConnectedComponent = connect(mapStateToProps)(PluginFormComponent)

export default reduxForm({
  form: 'edit-plugin-form',
})(ConnectedComponent)
