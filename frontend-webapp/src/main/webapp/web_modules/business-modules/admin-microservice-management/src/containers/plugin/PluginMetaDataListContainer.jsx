/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import fpmap from 'lodash/fp/map'
import fpfilter from 'lodash/fp/filter'
import without from 'lodash/without'
import union from 'lodash/union'
import flow from 'lodash/flow'
import { browserHistory } from 'react-router'
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
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator, ResourceIconAction } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { PluginMetaDataList } from '@regardsoss/model'
import PluginTypeActions from '../../model/plugin/PluginTypeActions'
import PluginTypeSelectors from '../../model/plugin/PluginTypeSelectors'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import moduleStyles from '../../styles/styles'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'

/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @autor Xavier-Alexandre Brochard
 */
export class PluginMetaDataListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
    }),
    // from mapStateToProps
    pluginTypes: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string,
    })),
    pluginMetaDataList: PluginMetaDataList,
    // pluginMetaDataListOrganizedByType: PropTypes.arrayOf(PropTypes.object),
    isPluginMetaDataListFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginTypeList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
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
      displayedTypes: [],
    }
  }

  componentDidMount() {
    const { params: { microserviceName } } = this.props
    this.props.fetchPluginTypeList(microserviceName) // Fetch the plugin types
    this.props.fetchPluginMetaDataList(microserviceName)
  }

  componentWillReceiveProps(newProps) {
    const oldPluginTypes = this.props.pluginTypes
    const newPluginTypes = newProps.pluginTypes

    // Only update sate if necessary
    if (newPluginTypes !== oldPluginTypes) {
      this.setState({
        displayedTypes: newProps.pluginTypes.sort(),
      })
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
        <Subheader>{pluginType.content}</Subheader>,
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
      ),
    )
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
            resourceDependency={PluginConfigurationActions.getMsDependency(RequestVerbEnum.GET_LIST, this.props.params.microserviceName)}
            tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.list.configurations' })}
            onTouchTap={() => this.handleProjectConfigurationListClick(plugin.content.pluginId)}
          >
            <IconList />
          </ResourceIconAction>
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
      <I18nProvider messageDir="business-modules/admin-microservice-management/src/i18n">
        <Paper>
          <AppBar
            title={`${microserviceName} > Plugins`}
            iconElementLeft={<IconButton><Close onTouchTap={this.handleClose} /></IconButton>}
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
            <LoadableContentDisplayDecorator isLoading={isPluginMetaDataListFetching}>
              <div style={this.styles.grid}>
                {this.getGrid()}
              </div>
            </LoadableContentDisplayDecorator>
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
      </I18nProvider>
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
  fetchPluginMetaDataList: microserviceName => dispatch(PluginMetaDataActions.fetchEntityList({ microserviceName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
