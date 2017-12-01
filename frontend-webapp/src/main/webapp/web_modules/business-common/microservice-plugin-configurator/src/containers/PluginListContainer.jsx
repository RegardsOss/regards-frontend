import get from 'lodash/get'
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { PluginMetaDataConfiguration } from '@regardsoss/api'
import { pluginMetadataActions } from '../clients/PluginMetadataClient'
import PluginListComponent from '../components/PluginListComponent'

export class PluginListContainer extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    labelStyles: PropTypes.object,
    microserviceName: PropTypes.string.isRequired,
    pluginType: PropTypes.string.isRequired,
    selectedPluginId: PropTypes.string,
    handleSelect: PropTypes.func.isRequired,
    // Set by connect
    fetchPlugins: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      pluginList: {},
    }
  }

  componentDidMount() {
    this.props.fetchPlugins(this.props.microserviceName, this.props.pluginType)
      .then((actionResult) => {
        if (!actionResult.error && get(actionResult, 'payload.entities', null)) {
          const pluginList = actionResult.payload.entities[PluginMetaDataConfiguration.normalizrKey]
          this.setState({
            pluginList,
          })
          if (this.props.selectedPluginId) {
            const plugin = find(pluginList, p => p.content.pluginId === this.props.selectedPluginId)
            this.props.handleSelect(plugin.content)
          }
        }
      })
  }

  render() {
    return (
      <PluginListComponent
        title={this.props.title}
        selectLabel={this.props.selectLabel}
        labelStyles={this.props.labelStyles}
        onChange={this.props.handleSelect}
        pluginList={this.state.pluginList}
        defaultSelectedPluginId={this.props.selectedPluginId}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
  fetchPlugins: (microserviceName, pluginType) =>
    dispatch(pluginMetadataActions.fetchEntityList({ microserviceName }, { pluginType })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginListContainer)
