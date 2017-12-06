import find from 'lodash/find'
import map from 'lodash/map'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { CommonShapes } from '@regardsoss/shape'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import messages from '../i18n'
import moduleStyles from '../styles'

export class PluginListComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    pluginList: CommonShapes.PluginMetaDataList,
    defaultSelectedPluginId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errorText: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static styles = {
    display: 'flex',
    alignItems: 'center',
  }

  static menuStyles = { top: '-7px' }

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
    const { moduleTheme: { renderer: { errorStyle } } } = this.context
    return (
      <div style={PluginListComponent.styles}>
        <div>
          {this.props.title ? this.props.title : null}
        </div>
        <DropDownMenu
          value={this.state.selectedPluginId}
          onChange={this.handleSelect}
          style={PluginListComponent.menuStyles}
        >
          <MenuItem value={null} primaryText={this.props.selectLabel || 'none'} />
          {map(this.props.pluginList, this.renderItem)}
        </DropDownMenu>
        <div style={errorStyle}>
          {this.props.errorText}
        </div>
      </div>
    )
  }
}

export default withModuleStyle(moduleStyles)(withI18n(messages)(PluginListComponent))
