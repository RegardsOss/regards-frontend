/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { PluginConfigurationList } from '@regardsoss/model'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Subheader from 'material-ui/Subheader'
import { chain } from 'lodash'
import PluginConfigurationComponent from './PluginConfigurationComponent'

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */

const styles = {
  root: {
    padding: '0px 20px 20px 20px',
  },
}

class PluginConfigurationsListComponent extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string.isRequired,
    pluginConfigurationList: PluginConfigurationList.isRequired,
    onBackClick: React.PropTypes.func.isRequired,
    onAddClick: React.PropTypes.func.isRequired,
    onUpwardClick: React.PropTypes.func.isRequired,
    onDownwardClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired,
    onActiveToggle: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { microserviceName, pluginConfigurationList, onBackClick, onAddClick, onUpwardClick, onDownwardClick, onDeleteClick, onActiveToggle } = this.props

    return (
      <Paper>
        <AppBar
          title={`${microserviceName} > Plugins > Kerberos`}
          iconElementLeft={<IconButton onTouchTap={onBackClick}><ArrowBack /></IconButton>}
          iconElementRight={<IconButton onTouchTap={onAddClick}><AddCircle /></IconButton>}
        />
        <div style={styles.root}>
          <Subheader>Active</Subheader>
          {chain(pluginConfigurationList)
            .filter(pluginConfiguration => pluginConfiguration.content.active)
            .sortBy(pluginConfiguration => pluginConfiguration.content.priorityOrder)
            .map(pluginConfiguration => <PluginConfigurationComponent
              key={pluginConfiguration.content.id}
              pluginConfiguration={pluginConfiguration}
              onUpwardClick={onUpwardClick}
              onDownwardClick={onDownwardClick}
              onDeleteClick={onDeleteClick}
              onActiveToggle={onActiveToggle}
            />)
            .value()}
          <Subheader>Inactive</Subheader>
          {chain(pluginConfigurationList)
            .filter(pluginConfiguration => !pluginConfiguration.content.active)
            .sortBy(pluginConfiguration => pluginConfiguration.content.priorityOrder)
            .map(pluginConfiguration => <PluginConfigurationComponent
              key={pluginConfiguration.content.id}
              pluginConfiguration={pluginConfiguration}
              onUpwardClick={onUpwardClick}
              onDownwardClick={onDownwardClick}
              onDeleteClick={onDeleteClick}
              onActiveToggle={onActiveToggle}
            />)
            .value()}
        </div>
      </Paper>
    )
  }
}

export default PluginConfigurationsListComponent
