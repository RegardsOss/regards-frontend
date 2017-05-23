/**
 * LICENSE_PLACEHOLDER
 */
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'

import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Delete from 'material-ui/svg-icons/action/delete'
import { PluginMetaDataList, PluginConfiguration } from '@regardsoss/model'
import ShowableAtRender from '../cards/ShowableAtRender'

class PluginConfigurationPickerComponent extends React.Component {

  static propTypes = {
    // Callback provided by redux-form in order to manually change a field value
    onChange: PropTypes.func,
    currentPluginConfiguration: PluginConfiguration,
    pluginMetaDataList: PluginMetaDataList,
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
  }

  constructor(props) {
    super(props)
    this.state = {
      currentPluginConfiguration: props.currentPluginConfiguration,
    }
  }

  getStyle = () => ({
    pluginButton: {
      marginLeft: 10,
    },
    iconMenu: {
      visibility: 'hidden',
    },
    field: {
      display: 'none',
    },
  })

  handleChange = (value) => {
    this.setState({
      currentPluginConfiguration: find(this.props.pluginConfigurationList, el => el.content.id === value),
    })
    this.setState({
      openMenu: false,
    })
    this.props.onChange(value)
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    })
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  buildMenuItemPrimaryText = (leftContent, rightContent) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {leftContent}
      <span style={{ color: '#bdbdbd' }}>
        {rightContent}
      </span>
    </div>
  )

  render() {
    const { pluginMetaDataList, pluginConfigurationList } = this.props
    const { openMenu, currentPluginConfiguration } = this.state
    const styles = this.getStyle()
    return (
      <div>
        <RaisedButton
          label={currentPluginConfiguration ? currentPluginConfiguration.content.label : <FormattedMessage id="component.plugin-parameter.action.choose-plugin" />}
          onTouchTap={this.handleOpenMenu}
          style={styles.pluginButton}
        />
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          open={openMenu}
          onRequestChange={this.handleOnRequestChange}
          desktop
          autoWidth
          style={styles.iconMenu}
        >
          {map(pluginMetaDataList, (pluginMetaData) => {
            const pluginConfigurationListForThisPluginMetaData = filter(pluginConfigurationList, pluginConfiguration => pluginConfiguration.content.pluginId === pluginMetaData.content.pluginId)
            const isPluginConfigurationListEmpty = isEmpty(pluginConfigurationListForThisPluginMetaData)
            return (
              <MenuItem
                key={pluginMetaData.content.pluginId}
                primaryText={this.buildMenuItemPrimaryText(pluginMetaData.content.pluginId, pluginMetaData.content.version)}
                rightIcon={<ArrowDropRight />}
                disabled={isPluginConfigurationListEmpty}
                menuItems={
                  map(pluginConfigurationListForThisPluginMetaData, pluginConfiguration =>
                    (<MenuItem
                      key={pluginConfiguration.content.id}
                      primaryText={this.buildMenuItemPrimaryText(pluginConfiguration.content.label, pluginConfiguration.content.version)}
                      onTouchTap={() => this.handleChange(pluginConfiguration.content.id)}
                      checked={currentPluginConfiguration && pluginConfiguration.content.id === currentPluginConfiguration.content.id}
                    />),
                  )
                }
              />
            )
          })}
          <ShowableAtRender show={currentPluginConfiguration != null}>
            <Divider />
            <MenuItem
              key={'none'}
              primaryText={<FormattedMessage id="component.plugin-parameter.action.reset" />}
              onTouchTap={() => this.handleChange(null)}
              rightIcon={<Delete />}
            />
          </ShowableAtRender>
        </IconMenu>
      </div>
    )
  }
}

export default PluginConfigurationPickerComponent
