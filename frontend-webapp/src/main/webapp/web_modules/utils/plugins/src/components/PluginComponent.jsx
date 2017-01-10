/**
 * LICENSE_PLACEHOLDER
 **/
import { merge } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Plugin } from '@regardsoss/model'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { loadPlugin } from '../model/PluginActions'
import PluginSelector from '../model/PluginSelector'

class PluginComponent extends React.Component {

  static propTypes = {
    plugin: Plugin.isRequired,
    // Set by mapstatetoprops
    loadedPlugins: React.PropTypes.arrayOf(Plugin),
    loadPlugin: React.PropTypes.func,
  }

  state = {
    loadedPlugins: [],
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.loadPlugin(merge(this.props.plugin, { sourcesPath: '/criterion/string/target/build/plugin.js' }))
  }

  render() {
    if (this.props.loadedPlugins && this.props.loadedPlugins.length > 0) {
      const defaultProps = {}
      console.log('CONTEXT', this.context)
      return React.createElement(this.props.loadedPlugins[0].plugin, defaultProps, this.context)
    } else {
      return <div>Plugin loading ... </div>
    }
  }

}

const mapStateToProps = state => ({
  loadedPlugins: PluginSelector.getPlugins(state),
})

const mapDispatchToProps = dispatch => ({
  loadPlugin: plugin => loadPlugin(plugin, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginComponent)
