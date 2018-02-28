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
import fpmap from 'lodash/fp/map'
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import { Link } from 'react-router'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import IconButton from 'material-ui/IconButton'
import IconList from 'material-ui/svg-icons/action/list'
import { StorageDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { CardActionsComponent } from '@regardsoss/components'
import moduleStyles from '../styles/styles'
import { pluginConfigurationActions, pluginConfigurationByPluginIdActions } from '../clients/PluginConfigurationClient'
import PluginSecurityActiveTesterContainer from '../containers/PluginSecurityActiveTesterContainer'


const ResourceLink = withResourceDisplayControl(Link)

/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 */
export default class PluginMetaDataListComponent extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string,
    pluginType: PropTypes.string,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    getProjectConfigurationListURL: PropTypes.func.isRequired,
    getAddConfURL: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props, context) {
    super(props)
    this.styles = moduleStyles(context.muiTheme)
  }

  /**
   * Builds the grid of tiles.
   */
  getGrid = () => (
    flow(
      fpfilter((pluginMetaData) => {
        if (pluginMetaData.content && pluginMetaData.content.interfaceNames && pluginMetaData.content.interfaceNames.length > 0) {
          return pluginMetaData.content.interfaceNames.includes(this.props.pluginType)
        }
        return null
      }),
      fpmap(pluginMetaData => this.getTile(pluginMetaData)),
    )(this.props.pluginMetaDataList)
  )

  /**
   * Returns a tile displaying the passed plugin.
   *
   * @param plugin
   */
  getTile = plugin => (
    <div key={plugin.content.pluginId} className={this.styles.tile.classes}>
      <Card key={plugin.content.pluginId} style={this.styles.tile.styles}>
        <CardTitle
          titleStyle={this.styles.tile.title}
          title={plugin.content.pluginId}
          subtitle={`${plugin.content.author} | ${plugin.content.version}`}
        />
        <CardText>
          {plugin.content.description}
        </CardText>
        <CardActions style={this.styles.tile.actionsStyles}>
          <ResourceLink
            resourceDependencies={pluginConfigurationActions.getMsDependency(RequestVerbEnum.GET_LIST, this.props.microserviceName)}
            title={this.context.intl.formatMessage({ id: 'storage.plugin.list.configurations' })}
            to={this.props.getProjectConfigurationListURL(plugin.content.pluginId)}
          >
            <IconButton>
              <IconList />
            </IconButton>
          </ResourceLink>
          <ResourceLink
            resourceDependencies={pluginConfigurationByPluginIdActions.getMsDependency(RequestVerbEnum.POST, this.props.microserviceName)}
            title={this.context.intl.formatMessage({ id: 'storage.plugin.configuration.list.add' })}
            to={this.props.getAddConfURL(plugin.content.pluginId)}
          >
            <IconButton>
              <AddCircle />
            </IconButton>
          </ResourceLink>
        </CardActions>
      </Card>
    </div>
  )

  getSecurityIssuePanel = (checkSecurity) => {
    const { pluginType } = this.props
    if (checkSecurity) {
      return (
        <PluginSecurityActiveTesterContainer
          pluginType={pluginType}
        />
      )
    }
    return null
  }

  render() {
    const { intl } = this.context
    let title
    let subtitle
    let checkSecurity = false
    switch (this.props.pluginType) {
      case StorageDomain.PluginTypeEnum.STORAGE:
        title = intl.formatMessage({ id: 'storage.locations.configuration.title' })
        subtitle = intl.formatMessage({ id: 'storage.locations.configuration.subtitle' })
        break
      case StorageDomain.PluginTypeEnum.SECURITY_DELEGATION:
        title = intl.formatMessage({ id: 'storage.security.configuration.title' })
        subtitle = intl.formatMessage({ id: 'storage.security.configuration.subtitle' })
        checkSecurity = true
        break
      case StorageDomain.PluginTypeEnum.ALLOCATION_STRATEGY:
        title = intl.formatMessage({ id: 'storage.allocations.configuration.title' })
        subtitle = intl.formatMessage({ id: 'storage.allocations.configuration.subtitle' })
        break
      default:
        title = 'Plugin not supported'
        subtitle = 'Plugin not supported'
    }
    return (
      <Card>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        {this.getSecurityIssuePanel(checkSecurity)}
        <CardText style={this.styles.root}>
          <div style={this.styles.grid}>
            {this.getGrid()}
          </div>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonLabel={intl.formatMessage({ id: 'storage.back.button' })}
            mainButtonClick={this.props.onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
