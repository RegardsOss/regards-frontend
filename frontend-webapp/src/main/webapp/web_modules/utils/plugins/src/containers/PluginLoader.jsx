/**
 * LICENSE_PLACEHOLDER
 **/
import { IntlProvider } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { Plugin } from '@regardsoss/model'
import { getReducerRegistry, configureReducers } from '@regardsoss/store'
import { i18nSelectors } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ErrorCardComponent } from '@regardsoss/components'
import { loadPlugin } from '../model/LoadPluginActions'
import PluginSelector from '../model/LoadPluginSelector'

/**
 * This component allow to load a given plugin and display it.
 * Display of the plugin is asynchronous and effective when the plugin is loaded.
 * @author Sébastien Binda
 *
 */
class PluginLoader extends React.PureComponent {

  /**
   * pluginId: Indetifier of the plugin to provide
   * pluginConf : Props to add to te plugin rendering element,
   * displayPlugin : Display the plugin component. If false the plugin is only passed as a prop to the children of this provider
   *
   * @type {{pluginId: *, pluginConf: *, displayPlugin: *, children: *, loadedPlugin: *, loadPlugin: *, locale: *}}
   */
  static propTypes = {
    pluginInstanceId: React.PropTypes.number.isRequired,
    pluginPath: React.PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pluginConf: React.PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    pluginProps: React.PropTypes.object,
    displayPlugin: React.PropTypes.bool,
    children: React.PropTypes.element,
    // Set by mapstatetoprops
    loadedPlugin: Plugin,
    loadPlugin: React.PropTypes.func,
    locale: React.PropTypes.string,
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
      console.log('Updating plugin', this.state, this.props)
      const loadedPluginReducerName = `plugins.${nextProps.loadedPlugin.name}`
      const loadedPluginReducer = {}
      this.setState({
        registered: true,
      })
      loadedPluginReducer[loadedPluginReducerName] = configureReducers(nextProps.loadedPlugin.reducer)
      if (!getReducerRegistry().isRegistered(loadedPluginReducer)) {
        console.log('REGISTERED')
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
    const isLoading = this.props.loadedPlugin === undefined || this.props.loadedPlugin === null
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
  loadedPlugin: PluginSelector.getPluginBySourcesPath(ownProps.pluginPath, state),
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
