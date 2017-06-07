/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardText } from 'material-ui/Card'
import Delete from 'material-ui/svg-icons/action/delete'
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { HateoasIconAction, HateoasKeys, HateoasToggle, ResourceIconAction } from '@regardsoss/display-control'
import moduleStyles from '../../styles/styles'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginConfigurationComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginConfiguration: PluginConfiguration,
    pluginMetaData: PluginMetaData,
    onActiveToggle: PropTypes.func.isRequired,
    onCopyClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDownwardClick: PropTypes.func.isRequired,
    onUpwardClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      pluginParameterTypeList: props.pluginMetaData && props.pluginMetaData.content.parameters,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      pluginParameterTypeList: newProps.pluginMetaData && newProps.pluginMetaData.content.parameters,
    })
  }

  handleExpandChange = (newExpandedState) => {
    this.setState({
      expanded: newExpandedState,
    })
  }

  render() {
    const { pluginConfiguration, onActiveToggle, onCopyClick, onDeleteClick, onEditClick, onDownwardClick, onUpwardClick } = this.props

    const styles = moduleStyles(this.context.muiTheme).pluginConfiguration

    const parameters = pluginConfiguration.content.parameters.map(pluginParameter =>
      <ListItem key={pluginParameter.name}>{pluginParameter.name}: {pluginParameter.value.toString()}</ListItem>)

    return (
      <Card
        onExpandChange={this.handleExpandChange}
        style={this.state.expanded ? styles.cardExpanded : styles.card}
      >
        <CardActions showExpandableButton>
          <div style={styles.lineWrapper}>
            <div>
              <span>{pluginConfiguration.content.label}</span>
              <span style={styles.version}>Version {pluginConfiguration.content.version}</span>
            </div>
            <div style={styles.buttonsGroupWrapper}>
              <span style={styles.version}><FormattedMessage
                id="microservice-management.plugin.configuration.priorityOrder"
              /> {pluginConfiguration.content.priorityOrder}</span>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.increment.priorityOrder' })}
                onTouchTap={onUpwardClick}
              >
                <ArrowUpward />
              </HateoasIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.decrement.priorityOrder' })}
                onTouchTap={onDownwardClick}
              >
                <ArrowDownward />
              </HateoasIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.edit' })}
                onTouchTap={onEditClick}
              >
                <ModeEdit />
              </HateoasIconAction>
              <ResourceIconAction
                resourceDependency={PluginConfigurationActions.getMsDependency('POST', this.props.microserviceName)}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.copy' })}
                onTouchTap={onCopyClick}
              >
                <ContentCopy />
              </ResourceIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.DELETE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete' })}
                onTouchTap={onDeleteClick}
              >
                <Delete />
              </HateoasIconAction>
              <HateoasToggle
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                onToggle={onActiveToggle}
                defaultToggled={pluginConfiguration.content.active}
                style={styles.toggle}
              />
            </div>
          </div>
        </CardActions>
        <CardText expandable>
          <List>
            <Subheader><FormattedMessage id="microservice-management.plugin.configuration.parameters" /></Subheader>
            {parameters}
          </List>
        </CardText>
      </Card>
    )
  }
}

export default PluginConfigurationComponent
