/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator, HateoasDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Drawer from 'material-ui/Drawer'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import IconList from 'material-ui/svg-icons/action/list'
import Filter from 'material-ui/svg-icons/content/filter-list'
import Close from 'material-ui/svg-icons/navigation/close'
import { without, union, chain } from 'lodash'
import PluginMetaDataActions from '../model/PluginMetaDataActions'
import PluginMetaDataSelectors from '../model/PluginMetaDataSelectors'
import moduleStyles from '../styles/styles'
import requiredEndpoints from '../requiredEndpoints'

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
    pluginMetaDataListOrganizedByType: React.PropTypes.arrayOf(React.PropTypes.object),
    isPluginMetaDataListFetching: React.PropTypes.bool,
    // from mapDispatchToProps
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
    this.props.fetchPluginMetaDataList(this.props.params.microserviceName)
  }

  componentWillReceiveProps(newProps) {
    const allTypes = chain(newProps.pluginMetaDataListOrganizedByType).map(plugin => plugin.type).sortedUniq().value()
    this.setState({
      displayedTypes: allTypes,
    })
  }

  /**
   * Builds the array of {@link ListItem}.
   */
  getFilterListItems = () => (
    chain(this.props.pluginMetaDataListOrganizedByType)
      .map(plugin => plugin.type)
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
    chain(this.props.pluginMetaDataListOrganizedByType)
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
   * Returns a grid tile displaying the passed plugin.
   *
   * @param plugin
   */
  getPluginGridTile = plugin => (
    <GridTile key={plugin.content.pluginId}>
      <Card style={{ margin: 20 }}>
        <CardTitle
          title={<span>{plugin.content.pluginClassName}
            <div
              style={{ scolor: this.context.muiTheme.palette.secondaryTextColor }}
            >{plugin.content.version}</div></span>}
          subtitle={plugin.content.author}
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
    </GridTile>
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
    const { params: { microserviceName }, isPluginMetaDataListFetching } = this.props

    return (
      <HateoasDisplayDecorator requiredEndpoints={requiredEndpoints.PluginMetaDataListContainer}>
        <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
          <Paper>
            <AppBar
              title={`${microserviceName} > Plugins`}
              iconElementLeft={<IconButton><Close onTouchTap={this.handleClose} /></IconButton>}
              iconElementRight={<IconButton onTouchTap={this.handleFilterSwitch}><Filter /></IconButton>}
            />
            <div style={styles.root}>
              <LoadableContentDisplayDecorator isLoading={isPluginMetaDataListFetching}>
                <GridList
                  cellHeight={'auto'}
                  cols={3}
                  padding={20}
                  style={styles.gridList}
                >
                  {this.getGridListItems()}
                </GridList>
              </LoadableContentDisplayDecorator>
            </div>
            <Drawer width={200} openSecondary open={this.state.filterOpen}>
              <AppBar
                iconElementLeft={<IconButton onTouchTap={this.handleFilterSwitch}><Close /></IconButton>}
                title={<FormattedMessage id="microservice-management.plugin.list.filters" />}
              />
              <List>
                {this.getFilterListItems(this.state.pluginsOrganizedByType)}
              </List>
            </Drawer>
          </Paper>
        </I18nProvider>
      </HateoasDisplayDecorator >
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginMetaDataListOrganizedByType: PluginMetaDataSelectors.getListWrappedWithType(state),
  isPluginMetaDataFetching: PluginMetaDataSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaDataList: microservice => dispatch(PluginMetaDataActions.fetchPagedEntityList(0, 100, [microservice])),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
