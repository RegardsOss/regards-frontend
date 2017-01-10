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
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

const styles = {
  appBar: {
    title: {

    },
  },
}

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
class MicroservicePluginsTypesComponent extends React.Component {

  static propTypes = {
    microserviceName: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { microserviceName } = this.props

    return (
      <Paper>
        <AppBar
          title={`${microserviceName} > Plugins > Authentication`}
          iconElementLeft={<IconButton><Close /></IconButton>}
        />
        <List>
          <ListItem
            primaryText="Annuary #1"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin configuration')}
          />
          <ListItem
            primaryText="Annuary #2"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin configuration')}
          />
          <ListItem
            primaryText="Annuary #3"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin configuration')}
          />
          <ListItem
            primaryText="Annuary #4"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin configuration')}
          />
          <ListItem
            primaryText="Annuary #5"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin configuration')}
          />
        </List>
      </Paper>
    )
  }
}

export default MicroservicePluginsTypesComponent
