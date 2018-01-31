/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'
import get from 'lodash/get'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Delete from 'material-ui/svg-icons/action/delete'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/display-control'

class PluginConfigurationPickerComponent extends React.Component {
  static propTypes = {
    // Callback provided by redux-form in order to manually change a field value
    // must return a promise
    onChange: PropTypes.func,
    currentPluginConfiguration: CommonShapes.PluginConfiguration,
    pluginMetaDataList: PropTypes.oneOfType([CommonShapes.PluginMetaDataList, CommonShapes.PluginMetaDataArray]),
    pluginConfigurationList: PropTypes.oneOfType([CommonShapes.PluginConfigurationList, CommonShapes.PluginConfigurationArray]),
  }

  static contextTypes = {
    ...i18nContextType,
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
      openMenu: false,
    })
    this.props.onChange(value)
      .then((actionResults) => {
        if (!actionResults.error) {
          const currentPluginConfiguration = find(this.props.pluginConfigurationList, el => el.content.id === value)
          this.setState({
            currentPluginConfiguration: get(currentPluginConfiguration, 'content', undefined),
          })
        }
        return actionResults
      })
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
    const hasNoPlugin = isEmpty(pluginMetaDataList) || isEmpty(pluginConfigurationList)
    return (
      <div>
        <RaisedButton
          label={currentPluginConfiguration ? currentPluginConfiguration.label : <FormattedMessage id="component.plugin-parameter.action.choose-plugin" />}
          onClick={this.handleOpenMenu}
          style={styles.pluginButton}
          disabled={hasNoPlugin}
          title={hasNoPlugin ? this.context.intl.formatMessage({ id: 'component.plugin-parameter.no-plugin-available' }) : null}
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
                      onClick={() => this.handleChange(pluginConfiguration.content.id)}
                      checked={currentPluginConfiguration && pluginConfiguration.content.id === currentPluginConfiguration.id}
                    />))
                }
              />
            )
          })}
          <ShowableAtRender show={currentPluginConfiguration != null}>
            <Divider />
            <MenuItem
              key="none"
              primaryText={this.context.intl.formatMessage({ id: 'component.plugin-parameter.action.reset' })}
              onClick={() => this.handleChange(null)}
              rightIcon={<Delete />}
            />
          </ShowableAtRender>
        </IconMenu>
      </div>
    )
  }
}

export default PluginConfigurationPickerComponent
