/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import IconList from 'material-ui/svg-icons/action/list'
import Filter from 'material-ui/svg-icons/content/filter-list'
import Close from 'material-ui/svg-icons/navigation/close'
import { map, without, union, chain, difference } from 'lodash'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator, HateoasDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { PluginMetaDataList } from '@regardsoss/model'
import PluginTypeActions from '../../model/plugin/PluginTypeActions'
import PluginTypeSelectors from '../../model/plugin/PluginTypeSelectors'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import moduleStyles from '../../styles/styles'
import requiredEndpoints from '../../requiredEndpoints'

const styles = moduleStyles().plugins

/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @autor Xavier-Alexandre Brochard
 */
export class PluginMetaDataListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microserviceName: React.PropTypes.string,
    }),
    // from mapStateToProps
    pluginTypes: React.PropTypes.arrayOf(React.PropTypes.string),
    pluginMetaDataList: PluginMetaDataList,
    // pluginMetaDataListOrganizedByType: React.PropTypes.arrayOf(React.PropTypes.object),
    isPluginMetaDataListFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginTypeList: React.PropTypes.func,
    fetchPluginMetaDataList: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      filterOpen: false,
      displayedTypes: [],
    }
  }

  componentDidMount() {
    const { params: { microserviceName } } = this.props
    this.props.fetchPluginTypeList(microserviceName) // Fetch the plugin types
  }

  componentWillReceiveProps(newProps) {
    const { params: { microserviceName } } = this.props
    const oldPluginTypes = this.props.pluginTypes
    const newPluginTypes = newProps.pluginTypes

    // Only update sate if necessary
    if (newPluginTypes !== oldPluginTypes) {
      this.setState({
        displayedTypes: newProps.pluginTypes.sort(),
      })
    }

    // Fetch the plugin meta data associated to each new plugin type
    difference(newPluginTypes, oldPluginTypes).forEach(pluginType => this.props.fetchPluginMetaDataList(microserviceName, pluginType))
  }

  /**
   * Builds the array of {@link ListItem}.
   */
  getFilterListItems = () => (
    map(this.props.pluginTypes, type => (
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
  )

  /**
   * Builds the grid of tiles.
   */
  getGrid = () => (
    map(this.state.displayedTypes, pluginType => (
      [
        <Subheader>{pluginType}</Subheader>,
        chain(this.props.pluginMetaDataList)
          .filter(pluginMetaData => ['interfaceName', pluginType])
          .map(pluginMetaData => this.getTile(pluginMetaData))
          .value(),
      ]
    ))
  )

  /**
   * Returns a tile displaying the passed plugin.
   *
   * @param plugin
   */
  getTile = plugin => (
    <div className={styles.tile.classes}>
      <Card key={plugin.content.pluginId} style={styles.tile.styles}>
        <CardTitle
          title={plugin.content.pluginId}
          subtitle={`${plugin.content.author} | ${plugin.content.version}`}
        />
        <CardText>
          {plugin.content.description}
        </CardText>
        <CardActions>
          <IconButton
            tooltip={<FormattedMessage id="microservice-management.plugin.list.configurations" />}
            onTouchTap={() => this.handleProjectConfigurationListClick(plugin.content.pluginId)}
          >
            <IconList />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )

  /**
   * Navigate back when clicking on close button
   */
  handleClose = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/microservice/board`
    browserHistory.push(url)
  }

  /**
   * Navigate to the project configuration list when clicking on the corresponding button
   *
   * @param {String} pluginId
   */
  handleProjectConfigurationListClick = (pluginId) => {
    const { params: { project, microserviceName } } = this.props
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/list`
    browserHistory.push(url)
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
    const { params: { microserviceName }, isPluginMetaDataListFetching } = this.props

    return (
      <HateoasDisplayDecorator requiredEndpoints={requiredEndpoints.PluginMetaDataListContainer}>
        <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
          <Paper>
            <AppBar
              title={`${microserviceName} > Plugins`}
              iconElementLeft={<IconButton><Close onTouchTap={this.handleClose} /></IconButton>}
              iconElementRight={
                <IconButton
                  onTouchTap={this.handleFilterSwitch}
                  tooltip={<FormattedMessage id="microservice-management.plugin.list.filter.tooltip" />}
                >
                  <Filter />
                </IconButton>
              }
            />
            <div style={styles.root}>
              <LoadableContentDisplayDecorator isLoading={isPluginMetaDataListFetching}>
                <div style={styles.grid}>
                  {this.getGrid()}
                </div>
              </LoadableContentDisplayDecorator>
            </div>
            <Drawer width={500} openSecondary open={this.state.filterOpen}>
              <AppBar
                iconElementLeft={<IconButton onTouchTap={this.handleFilterSwitch}><Close /></IconButton>}
                title={<FormattedMessage id="microservice-management.plugin.list.filter.title" />}
              />
              <List>
                {this.getFilterListItems()}
              </List>
            </Drawer>
          </Paper>
        </I18nProvider>
      </HateoasDisplayDecorator >
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginTypes: PluginTypeSelectors.getList(state),
  isPluginTypesFetching: PluginTypeSelectors.isFetching(state),
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginTypeList: microserviceName => dispatch(PluginTypeActions.fetchEntityList({ microserviceName })),
  fetchPluginMetaDataList: (microserviceName, pluginType) => dispatch(PluginMetaDataActions.fetchPagedEntityList(0, 100, {
    microserviceName,
    pluginType,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
