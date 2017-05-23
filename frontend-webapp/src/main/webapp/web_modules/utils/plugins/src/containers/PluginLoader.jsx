/**
 * LICENSE_PLACEHOLDER
 **/
import { IntlProvider } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { Plugin } from '@regardsoss/model'
import { getReducerRegistry, configureReducers } from '@regardsoss/store'
import { i18nSelectors } from '@regardsoss/i18n'
import { isNil } from 'lodash'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ErrorCardComponent } from '@regardsoss/components'
import { loadPlugin } from '../model/LoadPluginActions'
import PluginSelector from '../model/LoadPluginSelector'

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
   *
   * @type {{pluginId: *, pluginConf: *, displayPlugin: *, children: *, loadedPlugin: *, loadPlugin: *, locale: *}}
   */
  static propTypes = {
    pluginInstanceId: PropTypes.string.isRequired,
    pluginPath: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: PropTypes.object,
    displayPlugin: PropTypes.bool,
    children: PropTypes.element,
    // Set by mapstatetoprops
    loadedPlugin: Plugin,
    loadPlugin: PropTypes.func,
    locale: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      registered: false,
      loadError: false,
    }
  }

  componentWillMount() {
    if (!this.props.loadedPlugin) {
      this.props.loadPlugin(this.props.pluginPath, this.errorCallback)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.registered && nextProps.loadedPlugin && nextProps.loadedPlugin.reducer) {
      const loadedPluginReducerName = `plugins.${nextProps.loadedPlugin.name}`
      const loadedPluginReducer = {}
      this.setState({
        registered: true,
      })
      loadedPluginReducer[loadedPluginReducerName] = configureReducers(nextProps.loadedPlugin.reducer)
      if (!getReducerRegistry().isRegistered(loadedPluginReducer)) {
        getReducerRegistry().register(loadedPluginReducer)
      }
    }
  }

  errorCallback = (deps) => {
    this.setState({
      loadError: true,
      errorDep: deps,
    })
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
          <IntlProvider
            locale={this.props.locale}
            messages={this.props.loadedPlugin.messages[this.props.locale]}
          >
            {element}
          </IntlProvider>
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
  loadedPlugin: PluginSelector.getById(state, ownProps.pluginPath),
  locale: i18nSelectors.getLocale(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPlugin: (sourcePath, errorCallback) => loadPlugin(sourcePath, errorCallback, dispatch),
})

// Export for tests
const UnconnectedPluginLoader = PluginLoader
export {
  UnconnectedPluginLoader,
}
// Default export
const connectedPluginLoader = connect(mapStateToProps, mapDispatchToProps)(PluginLoader)
export default connectedPluginLoader
