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
import isNil from 'lodash/isNil'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { ErrorCardComponent } from '@regardsoss/components'
import { loadPlugin, initLoadedPlugin } from '../model/LoadPluginActions'
import LoadPluginSelector from '../model/LoadPluginSelector'

/**
 * This component allows to load a given plugin and display it.
 * Display of the plugin is asynchronous and effective when the plugin is loaded.
 * Global workflow :
 * 1. doLoadPlugin : Thanks to scriptjs, load the given javascript file
 * 2. Add a listener on 'plugin' event.
 * 3. If the plugin is a valid plugin, it send a 'plugin' event.
 * 4. On reception of the plugin event, add the plugin as loadedPlugin in the store.
 * 5. After all, when scriptjs notify that the file is loaded (callback), we check that the plugin is well set in store as loaded.
 *    If not, we set the plugin as loaded error in store.
 * 6. Display the loadedPlugin or display error if there is a load error (file does not exits or is not a valid plugin).
 *
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
    // eslint-disable-next-line react/no-unused-prop-types
    pluginPath: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    displayPlugin: PropTypes.bool,
    children: PropTypes.element,
    // eslint-disable-next-line react/no-unused-prop-types
    onErrorCallback: PropTypes.func,
    // Set by mapstatetoprops
    loadedPlugin: AccessShapes.UIPluginInstanceContent,
    // eslint-disable-next-line react/no-unused-prop-types
    doLoadPlugin: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    doInitPlugin: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      loadedPlugin, pluginPath, pluginInstanceId,
      doLoadPlugin, onErrorCallback, doInitPlugin,
    } = newProps
    if ((!loadedPlugin || loadedPlugin.loadError) && oldProps.pluginPath !== newProps.pluginPath) {
      // Step 1: Load new plugin
      doLoadPlugin(pluginPath, this.errorCallback)
    } else if (loadedPlugin && !loadedPlugin.loadError && !loadedPlugin.initialized) {
      // Step 2: when plugin is loadeded but not yet initilized, perform initialization and mark it done
      doInitPlugin(loadedPlugin, pluginPath, pluginInstanceId) // install reducer
    } else if (loadedPlugin && loadedPlugin.loadError && onErrorCallback) {
      // Error after load run error callback if any
      if (onErrorCallback) onErrorCallback()
    }
  }

  errorCallback = () => {
    if (this.props.onErrorCallback) this.props.onErrorCallback()
  }

  renderPlugin() {
    const { loadedPlugin } = this.props
    if (loadedPlugin && loadedPlugin.initialized && !loadedPlugin.loadError) {
      let element = null
      if (this.props.displayPlugin) {
        element = React.createElement(this.props.loadedPlugin.plugin, {
          pluginInstanceId: this.props.pluginInstanceId,
          ...this.props.pluginConf,
          ...this.props.pluginProps,
        })
        return (
          <I18nProvider messages={this.props.loadedPlugin.messages}>
            <ModuleStyleProvider module={this.props.loadedPlugin.styles}>
              {element}
            </ModuleStyleProvider>
          </I18nProvider>
        )
      } if (this.props.children) {
        return React.cloneElement(this.props.children, { plugin: this.props.loadedPlugin })
      }
      console.warn('No children defined for plugin provider')
      return null
    }
    return null
  }

  render() {
    const { loadedPlugin, pluginPath } = this.props
    // loading when plugin is not loaded and has not failed
    const loadError = !isNil(loadedPlugin) && loadedPlugin.loadError
    const errorCause = loadedPlugin && loadedPlugin.errorCause ? loadedPlugin.errorCause : 'Unknown'
    const isLoading = !loadError && isNil(this.props.loadedPlugin)
    if (loadError) {
      return (
        <ErrorCardComponent
          message={`Error loading plugin ${pluginPath}. Cause: ${errorCause}`}
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
  doLoadPlugin: (sourcePath, errorCallback) => loadPlugin(sourcePath, errorCallback, dispatch),
  doInitPlugin: (loadedPlugin, sourcePath, pluginInstanceId) => initLoadedPlugin(loadedPlugin, sourcePath, pluginInstanceId, dispatch),
})

// Export for tests
const UnconnectedPluginLoader = PluginLoader
export { UnconnectedPluginLoader }
// Default export
const connectedPluginLoader = connect(mapStateToProps, mapDispatchToProps)(PluginLoader)
export default connectedPluginLoader
