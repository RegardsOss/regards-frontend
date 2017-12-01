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
    labelStyles: PropTypes.object,
    pluginList: CommonShapes.PluginMetaDataList,
    defaultSelectedPluginId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static styles = {
    display: 'flex',
    alignItems: 'center',
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
        <div style={this.props.labelStyles}>
          {this.props.title ? this.props.title : null}
        </div>
        <DropDownMenu value={this.state.selectedPluginId} onChange={this.handleSelect} style={{ top: '-7px' }}>
          <MenuItem value={null} primaryText={this.props.selectLabel || 'none'} />
          {map(this.props.pluginList, this.renderItem)}
        </DropDownMenu>
      </div>
    )
  }
}

export default withI18n(messages)(PluginListComponent)
