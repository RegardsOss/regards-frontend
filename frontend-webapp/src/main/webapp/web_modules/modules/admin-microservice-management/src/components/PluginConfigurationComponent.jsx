/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { PluginConfiguration } from '@regardsoss/model'
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardText } from 'material-ui/Card'
import Delete from 'material-ui/svg-icons/action/delete'
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import moduleStyles from '../styles/styles'

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
const styles = moduleStyles().pluginConfiguration

class PluginConfigurationComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  static propTypes = {
    pluginConfiguration: PluginConfiguration.isRequired,
    onActiveToggle: React.PropTypes.func.isRequired,
    onCopyClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onEditClick: React.PropTypes.func.isRequired,
    onDownwardClick: React.PropTypes.func.isRequired,
    onUpwardClick: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleExpandChange = (newExpandedState) => {
    this.setState({
      expanded: newExpandedState,
    })
  }

  render() {
    const { pluginConfiguration, onActiveToggle, onCopyClick, onDeleteClick, onEditClick, onDownwardClick, onUpwardClick } = this.props
    return (
      <Card
        onExpandChange={this.handleExpandChange}
        style={this.state.expanded ? styles.cardExpanded : styles.card}
      >
        <CardActions showExpandableButton>
          <div style={styles.lineWrapper}>
            <div>
              <span>{pluginConfiguration.content.label}</span>
              <span style={styles.version}>{pluginConfiguration.content.version}</span>
            </div>
            <div style={styles.buttonsGroupWrapper}>
              <span style={styles.version}><FormattedMessage id="microservice-management.plugin.configuration.priorityOrder" /> {pluginConfiguration.content.priorityOrder}</span>
              <IconButton
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.increment.priorityOrder" />}
                onTouchTap={onUpwardClick}
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.decrement.priorityOrder" />}
                onTouchTap={onDownwardClick}
              >
                <ArrowDownward />
              </IconButton>
              <IconButton
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.edit" />}
                onTouchTap={onEditClick}
              >
                <ModeEdit />
              </IconButton>
              <IconButton
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.copy" />}
                onTouchTap={onCopyClick}
              >
                <ContentCopy />
              </IconButton>
              <IconButton
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.delete" />}
                onTouchTap={onDeleteClick}
              >
                <Delete />
              </IconButton>
              <Toggle
                onToggle={onActiveToggle}
                toggled={pluginConfiguration.content.active}
                style={styles.toggle}
              />
            </div>
          </div>
        </CardActions>
        <CardText expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Et nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    )
  }
}

export default PluginConfigurationComponent
