
import { connect } from 'react-redux'
import { PluginComponent } from '@regardsoss/plugins'


class PluginContainer extends React.Component {

  render() {
    console.log('PLOP')
    // this.props : parameters passed by react component
    // this.props.params : parameters passed by react router
    const { params, plugins } = this.props

    if (plugins) {
      const plugin = plugins.find(plug => (
        plug.name === params.plugin
      ))
      // Get plugin from store
      return <PluginComponent plugin={plugin} />
    }
    return null
  }
}
PluginContainer.propTypes = {
  params: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
  plugins: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
}
const mapStateToProps = state => ({
  plugins: state.common.plugins.items,
})

export default connect(mapStateToProps)(PluginContainer)
