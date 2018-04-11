/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { ErrorCardComponent } from '@regardsoss/components'
import { loadPlugin } from '../model/LoadPluginActions'
import LoadPluginSelector from '../model/LoadPluginSelector'
import pluginReducerHelper from '../helpers/PluginReducerHelper'

/**
 * This component allows to load a given plugin and display it.
 * Display of the plugin is asynchronous and effective when the plugin is loaded.
 * @author Sébastien Binda
 * @author Léo Mieulet
 *
 */
class PluginLoader extends React.Component {
  /**
   * pluginInstanceId: An unique identifier of the plugin to provide, in  case you're loading multiple plugins on the same page
   * pluginConf : Props to add to the plugin rendered,
   * pluginProps : Props to add to the plugin rendered (legacy),
   * displayPlugin : Display the plugin component. If false the plugin is only passed as a prop to the children of this provider
   */
  static propTypes = {
    pluginInstanceId: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
    pluginPath: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    displayPlugin: PropTypes.bool,
    children: PropTypes.element,
    onErrorCallback: PropTypes.func,
    // Set by mapstatetoprops
    loadedPlugin: AccessShapes.UIPluginInstanceContent,
    loadPlugin: PropTypes.func,
  }

  state = {
    registered: false,
    loadError: false,
    errorDep: undefined,
  }

  componentWillMount() {
    if (!this.props.loadedPlugin) {
      this.props.loadPlugin(this.props.pluginPath, this.errorCallback)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pluginPath !== nextProps.pluginPath) {
      this.setState({
        loadError: false,
        errorDep: undefined,
      })
      nextProps.loadPlugin(nextProps.pluginPath, this.errorCallback)
    }
    if (!this.state.registered && nextProps.loadedPlugin) {
      const { loadedPlugin, pluginInstanceId } = nextProps
      // install reducer
      pluginReducerHelper.initializePluginReducer(loadedPlugin, pluginInstanceId)
      // mark as ready to display (registered)
      this.setState({
        registered: true,
      })
    }
  }

  errorCallback = (deps) => {
    this.setState({
      loadError: true,
      errorDep: deps,
    })
    if (this.props.onErrorCallback) {
      this.props.onErrorCallback()
    }
  }

  renderPlugin() {
    if (this.props.loadedPlugin) {
      let element = null
      if (this.props.displayPlugin) {
        element = React.createElement(this.props.loadedPlugin.plugin, {
          pluginInstanceId: this.props.pluginInstanceId,
          ...this.props.pluginConf,
          ...this.props.pluginProps,
        })
        return (
          <I18nProvider messages={this.props.loadedPlugin.messages} >
            <ModuleStyleProvider module={this.props.loadedPlugin.styles} >
              {element}
            </ModuleStyleProvider>
          </I18nProvider>
        )
      } else if (this.props.children) {
        return React.cloneElement(this.props.children, { plugin: this.props.loadedPlugin })
      }
      console.warn('No children defined for plugin provider')
      return null
    }
    return null
  }

  render() {
    const isLoading = isNil(this.props.loadedPlugin)
    if (this.state.loadError) {
      return (
        <ErrorCardComponent
          message={`Error loading plugin ${this.state.errorDep}`}
        />
      )
    }
    return (
      <LoadableContentDisplayDecorator
        isLoading={isLoading}
      >
        {this.renderPlugin()}
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  loadedPlugin: LoadPluginSelector.getById(state, ownProps.pluginPath),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPlugin: (sourcePath, errorCallback) => loadPlugin(sourcePath, errorCallback, dispatch),
})

// Export for tests
const UnconnectedPluginLoader = PluginLoader
export { UnconnectedPluginLoader }
// Default export
const connectedPluginLoader = connect(mapStateToProps, mapDispatchToProps)(PluginLoader)
export default connectedPluginLoader
