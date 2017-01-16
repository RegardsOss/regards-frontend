/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Plugin } from '@regardsoss/model'
import { i18nSelectors } from '@regardsoss/i18n'
import { loadPlugin } from '../model/PluginActions'
import { IntlProvider } from 'react-intl'
import PluginSelector from '../model/PluginSelector'

/**
 * This component allow to load a given plugin and display it.
 * Display of the plugin is asynchrone and effective when the plugin is loaded.
 *
 */
class PluginProvider extends React.Component {

  /**
   * pluginId: Indetifier of the plugin to provide
   * pluginConf : Props to add to te plugin rendering element,
   * displayPlugin : Display the plugin component. If false the plugin is only passed as a prop to the children of this provider
   *
   * @type {{pluginId: *, pluginConf: *, displayPlugin: *, children: *, loadedPlugin: *, loadPlugin: *, locale: *}}
   */
  static propTypes = {
    pluginId: React.PropTypes.string.isRequired,
    pluginConf: React.PropTypes.any,
    displayPlugin: React.PropTypes.bool,
    children: React.PropTypes.element,
    // Set by mapstatetoprops
    loadedPlugin: Plugin,
    loadPlugin: React.PropTypes.func,
    locale: React.PropTypes.string,
  }

  componentWillMount() {
    if (!this.props.loadedPlugin) {
      this.props.loadPlugin('/criterion/string/target/build/plugin.js')
    }
  }

  render() {
    if (this.props.loadedPlugin) {
      let element = null
      if (this.props.displayPlugin) {
        element = React.createElement(this.props.loadedPlugin.plugin)
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
      } else {
        console.warn('No children defined for plugin provider')
        return null
      }
    } else {
      return <div>Plugin loading ... </div>
    }
  }

}

const mapStateToProps = (state, ownProps) => ({
  loadedPlugin: PluginSelector.getPluginByName(ownProps.pluginId, state),
  locale: i18nSelectors.getLocale(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPlugin: sourcePath => loadPlugin(ownProps.pluginId, sourcePath, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginProvider)
