/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import Close from 'material-ui/svg-icons/navigation/close'
import Filter from 'material-ui/svg-icons/content/filter-list'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import { GridList, GridTile } from 'material-ui/GridList'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import IconList from 'material-ui/svg-icons/action/list'
import { without, union, chain } from 'lodash'
import moduleStyles from '../styles/styles'

const styles = moduleStyles().plugins

const type1Plugins = [
  {
    'id': 0,
    'pluginClassName': 'Kerberos',
    'author': 'Jules Verne',
    'version': '0.0.5',
    'description': 'Allows the users to log in with their usual email and password.',
  },
  {
    'id': 2,
    'pluginClassName': 'Toto',
    'author': 'Jean-Paul Sartre',
    'version': '2.0.0',
    'description': 'This plugin is pretty useless actually.',
  },
  {
    'id': 3,
    'pluginClassName': 'Titi',
    'author': 'Victor Hugo',
    'version': '2.0.5',
    'description': 'This plugin is pretty useless actually.',
  },
  {
    'id': 4,
    'pluginClassName': 'Toto',
    'author': 'Jean-Paul Sartre',
    'version': '2.0.0',
    'description': 'This plugin is pretty useless actually.',
  },
  {
    'id': 5,
    'pluginClassName': 'Titi',
    'author': 'Victor Hugo',
    'version': '2.0.5',
    'description': 'This plugin is pretty useless actually.',
  },
]

const type2Plugins = [
  {
    'id': 6,
    'pluginClassName': 'Kerberos',
    'author': 'Jules Verne',
    'version': '0.0.5',
    'description': 'Allows the users to log in with their usual email and password.',
  },
  {
    'id': 7,
    'pluginClassName': 'Toto',
    'author': 'Jean-Paul Sartre',
    'version': '2.0.0',
    'description': 'This plugin is pretty useless actually.',
  },
  {
    'id': 8,
    'pluginClassName': 'Titi',
    'author': 'Victor Hugo',
    'version': '2.0.5',
    'description': 'This plugin is pretty useless actually.',
  },
]

const types = [
  {
    type: 'Authentification',
    items: type1Plugins,
  },
  {
    type: 'Other',
    items: type2Plugins,
  },
]

/**
 * React component displaying the list of available plugins for the passed microservice.
 * The plugins are sorted by type.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginsListComponent extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      filterOpen: false,
      displayedTypes: ['Authentification', 'Other'],
    }
  }

  /**
   * Returns a grid tile displaying the passed plugin.
   *
   * @param plugin
   */
  getPluginGridTile = plugin => (
    <GridTile key={plugin.id}>
      <Card style={{ margin: 20 }}>
        <CardTitle
          title={<span>{plugin.pluginClassName}
            <div style={{ color: 'grey' }}>{plugin.version}</div></span>}
          subtitle={plugin.author}
        />
        <CardText>
          {plugin.description}
        </CardText>
        <CardActions>
          <IconButton
            tooltip={'Configurations'}
            onTouchTap={() => alert('go to plugin\'s confugrations)')}
          >
            <IconList />
          </IconButton>
        </CardActions>
      </Card>
    </GridTile>
  )

  /**
   * Builds the array of {@link ListItem}.
   */
  getFilterListItems = () => (
    chain(types)
      .map(type => type.type)
      .map(type => (
        <ListItem
          key={type}
          primaryText={type}
          leftCheckbox={
            <Checkbox
              checked={this.state.displayedTypes.includes(type)}
              onCheck={() => this.handleFilterCheck(type)}
            />
          }
        />
      ))
      .value()
  )

  /**
   * Builds the array of {@link GridList}.
   */
  getGridListItems = () => (
    chain(types)
      .filter(type => this.state.displayedTypes.includes(type.type))
      .map(el => (
        [
          <Subheader>{el.type}</Subheader>,
          el.items.map(plugin => this.getPluginGridTile(plugin)),
        ]
      ))
      .value()
  )

  /**
   * Adds the filter element to the displayed type if not present or add it if absent.
   *
   * @param type
   */
  handleFilterCheck = (type) => {
    this.setState({
      displayedTypes: this.state.displayedTypes.includes(type) ? without(this.state.displayedTypes, type) : union(this.state.displayedTypes, [type]),
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
          iconElementLeft={<IconButton><Close /></IconButton>}
          iconElementRight={<IconButton onTouchTap={this.handleFilterSwitch}><Filter /></IconButton>}
        />
        <div style={styles.root}>
          <GridList
            cellHeight={'auto'}
            cols={3}
            padding={20}
            style={styles.gridList}
          >
            {this.getGridListItems()}
          </GridList>
        </div>

        <Drawer width={200} openSecondary open={this.state.filterOpen}>
          <AppBar
            iconElementLeft={<IconButton onTouchTap={this.handleFilterSwitch}><Close /></IconButton>}
            title={'Filters'}
          />
          <List>
            {this.getFilterListItems()}
          </List>
        </Drawer>
      </Paper>
    )
  }
}

export default PluginsListComponent
