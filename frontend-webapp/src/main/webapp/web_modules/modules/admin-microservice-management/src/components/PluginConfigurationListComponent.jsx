/**
 * LICENSE_PLACEHOLDER
 **/
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { PluginConfigurationList } from '@regardsoss/model'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Subheader from 'material-ui/Subheader'
import { chain } from 'lodash'
import PluginConfigurationComponent from './PluginConfigurationComponent'
import moduleStyles from '../styles/styles'

const styles = moduleStyles().pluginConfiguration
console.log(styles)
/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginConfigurationListComponent extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string.isRequired,
    pluginConfigurationList: PluginConfigurationList,
    isLoading: React.PropTypes.bool.isRequired,
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
    const { microserviceName, pluginConfigurationList, isLoading, onBackClick, onAddClick, onUpwardClick, onDownwardClick, onDeleteClick, onActiveToggle } = this.props

    return (
      <Paper>
        <AppBar
          title={`${microserviceName} > Plugins > Kerberos`}
          iconElementLeft={<IconButton onTouchTap={onBackClick}><ArrowBack /></IconButton>}
          iconElementRight={<IconButton onTouchTap={onAddClick}><AddCircle /></IconButton>}
        />
        <div style={styles.root}>
          <LoadableContentDisplayDecorator isLoading={isLoading}>
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
          </LoadableContentDisplayDecorator>
        </div>
      </Paper>
    )
  }
}

export default PluginConfigurationListComponent
