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
 **/
import values from 'lodash/values'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Delete from 'material-ui/svg-icons/action/delete'
import { fieldInputPropTypes } from 'redux-form'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../styles'
import {
  pluginParameterConfigurationActions,
  pluginParameterMetaDataActions,
} from '../clients/PluginParameterClient'

/**
 * Component displaying a menu allowing to pick a plugin configuration for the passed plugin paramater.
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class RenderPluginPluginParameterField extends React.Component {
  /**
  * Redux: map dispatch to props function
  * @param {*} dispatch: redux dispatch function
  * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapDispatchToProps = dispatch => ({
    fetchPluginConfigurationList: (pluginType, microserviceName) =>
      dispatch(pluginParameterConfigurationActions.fetchEntityList({ microserviceName }, { pluginType })),
    fetchPluginMetadataList: (microserviceName, pluginType) => dispatch(pluginParameterMetaDataActions.fetchEntityList({ microserviceName }, { pluginType })),
  })

  static propTypes = {
    label: PropTypes.string.isRequired,
    microserviceName: PropTypes.string.isRequired,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    // From redux field
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    // form mapStateToProps
    fetchPluginMetadataList: PropTypes.func.isRequired,
    fetchPluginConfigurationList: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
      pluginMetaDataList: [],
      pluginConfigurationList: [],
    }
  }

  componentDidMount() {
    const {
      pluginParameterType, fetchPluginConfigurationList, fetchPluginMetadataList, microserviceName,
    } = this.props
    const pluginParameter = this.props.input.value

    if (pluginParameterType.type) {
      // 1. Retrieve pluginMetadatas for the microservice.
      fetchPluginMetadataList(microserviceName, pluginParameterType.type).then((actionResults) => {
        this.setState({
          pluginMetaDataList: values(get(actionResults, 'payload.entities.pluginMetaData', {})),
        })
      })

      // 2. Retrieve all plugin configuration available for the plugin type.
      fetchPluginConfigurationList(pluginParameterType.type, microserviceName).then((actionResults) => {
        const pluginConfigurationList = values(get(actionResults, 'payload.entities.pluginConfiguration', {}))
        const selectedPluginConfiguration = find(pluginConfigurationList, el => el.content.id === get(pluginParameter, 'pluginConfiguration.id'))
        this.setState({
          pluginConfigurationList,
          selectedPluginConfiguration,
        })
      })
    }
  }

  /**
   * Function to open the plugin selector menu.
   */
  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  /**
   * Function to set the selected plugin from the menu
   */
  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
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

  handleChange = (value) => {
    const { pluginConfigurationList } = this.state
    const { input } = this.props
    this.setState({
      value,
      selectedPluginConfiguration: find(pluginConfigurationList, el => el.content.id === value),
    })
    input.onChange(value ? value.toString() : null)
  }

  render() {
    const {
      pluginMetaDataList, pluginConfigurationList, selectedPluginConfiguration, openMenu,
    } = this.state
    const { label } = this.props
    const { moduleTheme: { pluginParameter }, intl } = this.context

    return (
      <div style={pluginParameter.wrapper}>
        <Subheader style={pluginParameter.label}>{label}</Subheader>
        <div>
          <RaisedButton
            label={selectedPluginConfiguration ? selectedPluginConfiguration.content.label : intl.formatMessage({ id: 'plugin.parameter.plugin.choose' })}
            onTouchTap={this.handleOpenMenu}
            style={pluginParameter.pluginButton}
          />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            open={openMenu}
            onRequestChange={this.handleOnRequestChange}
            desktop
            autoWidth
            style={pluginParameter.iconMenu}
          >
            {map(pluginMetaDataList, (pmd) => {
              const pluginConfigurationListForThisPluginMetaData = filter(pluginConfigurationList, pc => pc.content.pluginId === pmd.content.pluginId)
              const pluginConfigurationListIsEmpty = isEmpty(pluginConfigurationListForThisPluginMetaData)
              return (
                <MenuItem
                  key={pmd.content.pluginId}
                  primaryText={this.buildMenuItemPrimaryText(pmd.content.pluginId, pmd.content.version)}
                  rightIcon={<ArrowDropRight />}
                  disabled={pluginConfigurationListIsEmpty}
                  menuItems={
                    map(pluginConfigurationListForThisPluginMetaData, pc =>
                      (<MenuItem
                        key={pc.content.id}
                        primaryText={this.buildMenuItemPrimaryText(pc.content.label, pc.content.version)}
                        onTouchTap={() => this.handleChange(pc.content.id)}
                        checked={pc.content.id === this.state.value}
                      />))
                  }
                />
              )
            })}
            <Divider />
            <MenuItem
              key="none"
              primaryText={intl.formatMessage({ id: 'plugin.parameter.plugin.empty.menu.item' })}
              onTouchTap={() => this.handleChange(undefined)}
              rightIcon={<Delete />}
            />
          </IconMenu>
        </div>
      </div>
    )
  }
}

const connectedComponent = connect(null, RenderPluginPluginParameterField.mapDispatchToProps)(RenderPluginPluginParameterField)
export default withModuleStyle(styles)(connectedComponent)
