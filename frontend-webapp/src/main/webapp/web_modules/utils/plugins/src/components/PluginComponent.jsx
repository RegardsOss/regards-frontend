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
 */
class PluginComponent extends React.Component {

  static propTypes = {
    pluginId: React.PropTypes.string,
    pluginConf: React.PropTypes.any,
    // Set by mapstatetoprops
    loadedPlugin: Plugin,
    loadPlugin: React.PropTypes.func,
    locale: React.PropTypes.string,
  }

  componentWillMount() {
    this.props.loadPlugin('/criterion/string/target/build/plugin.js')
  }

  render() {
    if (this.props.loadedPlugin) {
      const defaultProps = {}
      const element = React.createElement(this.props.loadedPlugin.plugin)
      return (
        <IntlProvider
          locale={this.props.locale}
          messages={this.props.loadedPlugin.messages[this.props.locale]}
        >
          {element}
        </IntlProvider>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(PluginComponent)
