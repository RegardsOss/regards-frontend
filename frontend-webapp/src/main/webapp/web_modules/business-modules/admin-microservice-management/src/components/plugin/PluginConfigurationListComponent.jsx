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
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpsortBy from 'lodash/fp/sortBy'
import fpmap from 'lodash/fp/map'
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import { CommonShapes } from '@regardsoss/shape'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import PluginConfigurationContainer from './../../containers/plugin/PluginConfigurationContainer'
import { pluginConfigurationActions } from '../../clients/PluginConfigurationClient'
import moduleStyles from '../../styles/styles'
import messages from '../../i18n'

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
    getBackURL: PropTypes.func.isRequired,
    getAddURL: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getCreateDependencies = microserviceName => [pluginConfigurationActions.getMsDependency(RequestVerbEnum.POST, microserviceName)]

  constructor(props, context) {
    super(props)
    this.styles = moduleStyles(context.muiTheme).plugins
  }

  render() {
    const {
      params: { microserviceName },
      pluginMetaData,
      pluginConfigurationList,
      getAddURL,
      getBackURL,
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
        <Card>
          <CardTitle
            title={`${microserviceName} > Plugins > ${pluginMetaData && pluginMetaData.content.pluginId}`}
          />
          <CardText>
            <div style={this.styles.root}>
              <ShowableAtRender show={!!activeConfs.length}>
                <Subheader>Active</Subheader>
                {activeConfs}
              </ShowableAtRender>
              <ShowableAtRender show={!!inactiveConfs.length}>
                <Subheader>Inactive</Subheader>
                {inactiveConfs}
              </ShowableAtRender>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonUrl={getAddURL()}
              mainButtonLabel={
                <FormattedMessage id="microservice-management.plugin.configuration.list.add" />
              }
              mainHateoasDependencies={PluginConfigurationListComponent.getCreateDependencies(this.props.params.microserviceName)}
              secondaryButtonLabel={<FormattedMessage id="microservice-management.plugin.configuration.list.back" />}
              secondaryButtonUrl={getBackURL()}
            />
          </CardActions>
        </Card>
      </I18nProvider>
    )
  }
}
