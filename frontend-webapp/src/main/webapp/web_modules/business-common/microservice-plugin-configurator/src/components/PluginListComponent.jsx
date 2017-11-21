import find from 'lodash/find'
import map from 'lodash/map'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { CommonShapes } from '@regardsoss/shape'
import { withI18n } from '@regardsoss/i18n'
import messages from '../i18n'

export class PluginListComponent extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    pluginList: CommonShapes.PluginMetaDataList,
    defaultSelectedPluginId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static styles = {
    display: 'flex',
    alignItems: 'baseline',
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedPluginId: props.defaultSelectedPluginId,
    }
  }

  handleSelect = (event, index, pluginId) => {
    this.setState({ selectedPluginId: pluginId })
    const plugin = find(this.props.pluginList, p => p.content.pluginId === pluginId, null)
    this.props.onChange(plugin ? plugin.content : null)
  }

  renderItem = plugin => (
    <MenuItem key={plugin.content.pluginId} value={plugin.content.pluginId} primaryText={plugin.content.pluginId} />
  )

  render() {
    return (
      <div style={PluginListComponent.styles}>
        <span>{this.props.title ? this.props.title : null}</span>
        <DropDownMenu value={this.state.selectedPluginId} onChange={this.handleSelect}>
          <MenuItem value={null} primaryText={this.props.selectLabel || 'none'} />
          {map(this.props.pluginList, this.renderItem)}
        </DropDownMenu>
      </div>
    )
  }
}

export default withI18n(messages)(PluginListComponent)
