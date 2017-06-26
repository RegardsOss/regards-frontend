/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import without from 'lodash/without'
import union from 'lodash/union'
import fpmap from 'lodash/fp/map'
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Drawer from 'material-ui/Drawer'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import IconList from 'material-ui/svg-icons/action/list'
import Filter from 'material-ui/svg-icons/content/filter-list'
import Close from 'material-ui/svg-icons/navigation/close'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import moduleStyles from '../../styles/styles'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'

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
    handleClose: PropTypes.func,
    handleProjectConfigurationListClick: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props, context) {
    super(props)
    this.styles = moduleStyles(context.muiTheme).plugins
    this.state = {
      filterOpen: false,
      displayedTypes: props.pluginTypes.sort(),
    }
  }

  /**
   * Builds the array of {@link ListItem}.
   */
  getFilterListItems = () => (
    map(this.props.pluginTypes, type => (
      <ListItem
        key={type.content}
        primaryText={type.content}
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
    map(this.state.displayedTypes, pluginType => (
      [
        <Subheader key="header">{pluginType.content}</Subheader>,
        flow(
          fpfilter((pluginMetaData) => {
            if (pluginMetaData.content && pluginMetaData.content.interfaceNames && pluginMetaData.content.interfaceNames.length > 0) {
              return pluginMetaData.content.interfaceNames.includes(pluginType.content)
            }
            return null
          }),
          fpmap(pluginMetaData => this.getTile(pluginMetaData)),
          )(this.props.pluginMetaDataList),
      ]
   ))
  )

  /**
   * Returns a tile displaying the passed plugin.
   *
   * @param plugin
   */
  getTile = plugin => (
    <div className={this.styles.tile.classes}>
      <Card key={plugin.content.pluginId} style={this.styles.tile.styles}>
        <CardTitle
          title={plugin.content.pluginId}
          subtitle={`${plugin.content.author} | ${plugin.content.version}`}
        />
        <CardText>
          {plugin.content.description}
        </CardText>
        <CardActions>
          <ResourceIconAction
            resourceDependency={PluginConfigurationActions.getMsDependency(RequestVerbEnum.GET_LIST, this.props.microserviceName)}
            tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.configurations' })}
            onTouchTap={() => this.props.handleProjectConfigurationListClick(plugin.content.pluginId)}
          >
            <IconList />
          </ResourceIconAction>
        </CardActions>
      </Card>
    </div>
  )


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
    const { microserviceName } = this.props

    return (
      <Paper>
        <AppBar
          title={`${microserviceName} > Plugins`}
          iconElementLeft={<IconButton><Back onTouchTap={this.props.handleClose} /></IconButton>}
          iconElementRight={
            <IconButton
              onTouchTap={this.handleFilterSwitch}
              tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.filter.tooltip' })}
            >
              <Filter />
            </IconButton>
          }
        />
        <div style={this.styles.root}>
          <div style={this.styles.grid}>
            {this.getGrid()}
          </div>
        </div>
        <Drawer width={500} openSecondary open={this.state.filterOpen}>
          <AppBar
            iconElementLeft={<IconButton onTouchTap={this.handleFilterSwitch}><Close /></IconButton>}
            title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.filter.title' })}
          />
          <List>
            {this.getFilterListItems()}
          </List>
        </Drawer>
      </Paper>
    )
  }
}
