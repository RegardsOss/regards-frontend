/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import without from 'lodash/without'
import union from 'lodash/union'
import fpmap from 'lodash/fp/map'
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import last from 'lodash/fp/last'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import {
  Card, CardActions, CardText, CardTitle,
} from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Drawer from 'material-ui/Drawer'
import AddCircle from 'mdi-material-ui/PlusCircle'
import Back from 'mdi-material-ui/ArrowLeft'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import IconList from 'mdi-material-ui/FormatListBulleted'
import ClearCacheIcon from 'mdi-material-ui/Sync'
import FilterIcon from 'mdi-material-ui/FilterVariant'
import Close from 'mdi-material-ui/Close'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { PluginDescriptionDialog } from '@regardsoss/microservice-plugin-configurator'
import moduleStyles from '../styles/styles'
import { pluginConfigurationActions, pluginConfigurationByPluginIdActions } from '../clients/PluginConfigurationClient'

const ResourceLink = withResourceDisplayControl(Link)

/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @autor Xavier-Alexandre Brochard
 * @author Léo Mieulet
 */
export default class PluginMetaDataListComponent extends React.Component {
  static propTypes = {
    microserviceName: PropTypes.string,
    pluginTypes: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string,
    })),
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    getProjectConfigurationListURL: PropTypes.func.isRequired,
    isFetchingClearPlugin: PropTypes.bool,
    getAddURL: PropTypes.func.isRequired,
    getBackURL: PropTypes.func.isRequired,
    onClearPluginCache: PropTypes.func.isRequired,
    enableConfiguration: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static defaultProps = {
    enableConfiguration: false,
  }

  constructor(props, context) {
    super(props)
    this.styles = moduleStyles(context.muiTheme).plugins
  }

  state = {
    filterOpen: false,
    displayedTypes: this.props.pluginTypes.sort(),
    pluginDesc: null,
  }

  getActions = (plugin) => this.props.enableConfiguration ? (
    <CardActions style={this.styles.tile.actionsStyles}>
      <ResourceLink
        resourceDependencies={pluginConfigurationActions.getMsDependency(RequestVerbEnum.GET_LIST, this.props.microserviceName)}
        title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.configurations' })}
        to={this.props.getProjectConfigurationListURL(plugin.content.pluginId)}
      >
        <IconButton>
          <IconList />
        </IconButton>
      </ResourceLink>
      <ResourceLink
        resourceDependencies={pluginConfigurationByPluginIdActions.getMsDependency(RequestVerbEnum.POST, this.props.microserviceName)}
        title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.list.add' })}
        to={this.props.getAddURL(plugin.content.pluginId)}
      >
        <IconButton>
          <AddCircle />
        </IconButton>
      </ResourceLink>
    </CardActions>
  ) : null

  /**
   * Builds the array of {@link ListItem}.
   */
  getFilterListItems = () => (
    map(this.props.pluginTypes, (type) => (
      <ListItem
        key={type.content}
        primaryText={last(type.content.split('.'))}
        secondaryText={type.content}
        leftCheckbox={
          <Checkbox
            checked={this.state.displayedTypes.includes(type)}
            onCheck={() => this.handleFilterCheck(type)}
          />
        }
      />
    ))
  )

  /**
   * Builds the grid of tiles.
   */
  getGrid = () => (
    map(this.state.displayedTypes, (pluginType) => (
      [
        <Subheader key="header">{pluginType.content}</Subheader>,
        flow(
          fpfilter((pluginMetaData) => {
            if (pluginMetaData.content && pluginMetaData.content.interfaceNames && pluginMetaData.content.interfaceNames.length > 0) {
              return pluginMetaData.content.interfaceNames.includes(pluginType.content)
            }
            return null
          }),
          fpmap((pluginMetaData) => this.getTile(pluginMetaData)),
        )(this.props.pluginMetaDataList),
      ]
    ))
  )

  /**
   * Returns a tile displaying the passed plugin.
   *
   * @param plugin
   */
  getTile = (plugin) => (
    <div key={plugin.content.pluginId} className={this.styles.tile.classes}>
      <Card style={this.styles.tile.styles}>
        <span title={plugin.content.pluginId}>
          <CardTitle
            titleStyle={this.styles.tile.title}
            title={plugin.content.pluginId}
            subtitle={`${plugin.content.author} | ${plugin.content.version}`}
          />
        </span>
        <CardText>
          {plugin.content.description}

          {plugin.content.markdown
            ? <div>
              <br />
              <a
                style={this.styles.moreInfoLink}
                onClick={() => this.handleOpenDescriptionDialog(plugin.content)}
                href="#"
              >
                {this.context.intl.formatMessage({ id: 'plugin.description.more' })}
              </a>
            </div>
            : null}

        </CardText>
        {this.getActions(plugin)}
      </Card>
    </div>
  )

  handleOpenDescriptionDialog = (plugin) => {
    this.setState({
      pluginDesc: plugin,
    })
  }

  handleCloseDescriptionDialog = () => {
    this.setState({
      pluginDesc: null,
    })
  }

  /**
   * Adds the filter element to the displayed type if not present or add it if absent.
   *
   * @param type
   */
  handleFilterCheck = (type) => {
    this.setState({
      displayedTypes: this.state.displayedTypes.includes(type) ? without(this.state.displayedTypes, type).sort() : union(this.state.displayedTypes, [type]).sort(),
    })
  }

  /**
   * Sets the filterOpen state value to {@code true} if {@code false} or {@code false} if {@code true}
   */
  handleFilterSwitch = () => {
    this.setState({
      filterOpen: !this.state.filterOpen,
    })
  }

  render() {
    const { microserviceName, onClearPluginCache, isFetchingClearPlugin } = this.props

    return (
      <Paper>
        <AppBar
          title={`${microserviceName} > Plugins`}
          iconElementLeft={
            <Link to={this.props.getBackURL}>
              <IconButton><Back /></IconButton>
            </Link>
          }
          iconElementRight={
            <div>
              {/* Clear server cache option */}
              <IconButton
                disabled={isFetchingClearPlugin}
                onClick={onClearPluginCache}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.clear.cache.tooltip' })}
              >
                <ClearCacheIcon />
              </IconButton>
              {/* Show filters panel option */}
              <IconButton
                onClick={this.handleFilterSwitch}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.filter.tooltip' })}
              >
                <FilterIcon />
              </IconButton>
            </div>
          }
        />
        <div style={this.styles.root}>
          <div style={this.styles.grid}>
            {this.getGrid()}
          </div>
        </div>
        <Drawer
          width={500}
          openSecondary
          open={this.state.filterOpen}
        >
          <AppBar
            iconElementLeft={<IconButton onClick={this.handleFilterSwitch}><Close /></IconButton>}
            title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.filter.title' })}
          />
          <List>
            {this.getFilterListItems()}
          </List>
        </Drawer>
        {this.state.pluginDesc
          ? <PluginDescriptionDialog
              opened
              pluginMetaData={this.state.pluginDesc}
              onClose={this.handleCloseDescriptionDialog}
          /> : null}
      </Paper>
    )
  }
}
