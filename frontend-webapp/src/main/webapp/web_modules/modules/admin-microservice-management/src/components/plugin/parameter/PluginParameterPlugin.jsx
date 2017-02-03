/**
 * LICENSE_PLACEHOLDER
 **/
import { map, chain, isEmpty, filter, find } from 'lodash'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import { ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Delete from 'material-ui/svg-icons/action/delete'
import { connect } from '@regardsoss/redux'
import { PluginParameterType, PluginMetaDataList, PluginConfiguration } from '@regardsoss/model'
import PluginMetaDataSelectors from '../../../model/plugin/PluginMetaDataSelectors'
import PluginConfigurationSelectors from '../../../model/plugin/PluginConfigurationSelectors'
import { buildMenuItemPrimaryText } from './utils'

// validation functions
const required = value => value == null ? 'Required' : undefined

/**
 * Component displaying a menu allowing to pick a plugin configuration for the passed plugin paramater.
 * Connected to redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterPlugin extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    pluginParameterType: PluginParameterType,
    mode: React.PropTypes.oneOf(['view', 'edit']),
    change: React.PropTypes.func, // Callback provided by redux-form in order to manually change a field value
    // form mapStateToProps
    pluginMetaDataList: PluginMetaDataList,
    isPluginMetaDataListFetching: React.PropTypes.bool,
    pluginConfigurationList: React.PropTypes.arrayOf(PluginConfiguration),
    isPluginConfigurationListFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginMetaDataList: React.PropTypes.func,
    fetchPluginConfigurationList: React.PropTypes.func,
  }

  static defaultProps = {
    mode: 'view',
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
      openMenu: false,
      value: undefined,
      selectedPluginConfiguration: undefined,
    }
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    })
  }

  handleChange = (value) => {
    this.setState({
      value,
      selectedPluginConfiguration: find(this.props.pluginConfigurationList, el => el.content.id === value),
    })
    this.props.change(this.props.name, value)
  }

  render() {
    const { name, value, mode, pluginParameterType, pluginMetaDataList, pluginConfigurationList } = this.props
    const { openMenu, selectedPluginConfiguration } = this.state

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {selectedPluginConfiguration && selectedPluginConfiguration.content.label}</ListItem>
      case 'edit':
        return (
          <div>
            {name}:
            <RaisedButton
              label={selectedPluginConfiguration ? selectedPluginConfiguration.content.label : <FormattedMessage id="microservice-management.plugin.parameter.plugin.choose" />}
              onTouchTap={this.handleOpenMenu}
              style={{ marginLeft: 10 }}
            />
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              open={openMenu}
              onRequestChange={this.handleOnRequestChange}
              desktop
              autoWidth
              style={{ visibility: 'hidden' }}
            >
              {map(pluginMetaDataList, (pluginMetaData) => {
                const pluginConfigurationListForThisPluginMetaData = filter(pluginConfigurationList, pluginConfiguration => pluginConfiguration.content.pluginId === pluginMetaData.content.pluginId)
                const pluginConfigurationListIsEmpty = isEmpty(pluginConfigurationListForThisPluginMetaData)
                return (
                  <MenuItem
                    key={pluginMetaData.content.pluginId}
                    primaryText={buildMenuItemPrimaryText(pluginMetaData.content.pluginId, pluginMetaData.content.version)}
                    rightIcon={<ArrowDropRight />}
                    disabled={pluginConfigurationListIsEmpty}
                    menuItems={
                      chain(pluginConfigurationListForThisPluginMetaData)
                        .map(pluginConfiguration =>
                          <MenuItem
                            key={pluginConfiguration.content.id}
                            primaryText={buildMenuItemPrimaryText(pluginConfiguration.content.label, pluginConfiguration.content.version)}
                            onTouchTap={() => this.handleChange(pluginConfiguration.content.id)}
                            checked={pluginConfiguration.content.id === this.state.value}
                          />,
                        )
                        .value()
                    }
                  />
                )
              })}
              <Divider />
              <MenuItem
                key={'none'}
                primaryText={<FormattedMessage id="microservice-management.plugin.parameter.plugin.empty.menu.item" />}
                onTouchTap={() => this.handleChange(undefined)}
                rightIcon={<Delete />}
              />
            </IconMenu>
          </div>
        )
      default:
        return <ListItem>{name}: {value.toString()}</ListItem>
    }
  }
}
// {pluginParameterType ? <Subheader>{pluginParameterType.type}</Subheader> : null}
const mapStateToProps = (state, ownProps) => ({
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
  pluginConfigurationList: PluginConfigurationSelectors.getListActiveAndSorted(state),
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

export default connect(mapStateToProps)(PluginParameterPlugin)
