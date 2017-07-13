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
import { CommonShapes } from '@regardsoss/shape'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Subheader from 'material-ui/Subheader'
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpsortBy from 'lodash/fp/sortBy'
import fpmap from 'lodash/fp/map'
import PluginConfigurationContainer from './../../containers/plugin/PluginConfigurationContainer'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'
import moduleStyles from '../../styles/styles'
import messages from '../../i18n'

const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * Container connecting the plugin configuration list to the redux store and handling user interface actions.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 */
export default class PluginConfigurationListComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
      pluginId: PropTypes.string,
      pluginConfigurationId: PropTypes.string,
    }),
    pluginMetaData: CommonShapes.PluginMetaData,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    handleBackClick: PropTypes.func,
    handleAddClick: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props)
    this.styles = moduleStyles(context.muiTheme).plugins
  }

  render() {
    const {
      params: { microserviceName },
      pluginMetaData,
      pluginConfigurationList,
    } = this.props

    const activeConfs = flow(
      fpfilter(pluginConfiguration => pluginConfiguration.content.active),
      fpsortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder),
      fpmap(pluginConfiguration => (<PluginConfigurationContainer
        key={pluginConfiguration.content.id}
        params={this.props.params}
        pluginConfiguration={pluginConfiguration}
        pluginMetaData={pluginMetaData}
      />)))(pluginConfigurationList)

    const inactiveConfs = flow(
      fpfilter(pluginConfiguration => !pluginConfiguration.content.active),
      fpsortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder),
      fpmap(pluginConfiguration => (<PluginConfigurationContainer
        key={pluginConfiguration.content.id}
        params={this.props.params}
        pluginConfiguration={pluginConfiguration}
        pluginMetaData={pluginMetaData}
      />)))(pluginConfigurationList)

    return (
      <I18nProvider messages={messages}>
        <Paper>
          <AppBar
            title={`${microserviceName} > Plugins > ${pluginMetaData && pluginMetaData.content.pluginId}`}
            iconElementLeft={<IconButton onTouchTap={this.props.handleBackClick}><ArrowBack /></IconButton>}
            iconElementRight={
              <ResourceIconAction
                resourceDependencies={PluginConfigurationActions.getMsDependency(RequestVerbEnum.POST, microserviceName)}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.list.add' })}
                onTouchTap={this.props.handleAddClick}
              >
                <AddCircle />
              </ResourceIconAction>
            }
          />
          <div style={this.styles.root}>
            <Subheader>Active</Subheader>
            {activeConfs}
            <Subheader>Inactive</Subheader>
            {inactiveConfs}
          </div>
        </Paper>
      </I18nProvider>
    )
  }
}
