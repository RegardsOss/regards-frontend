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
class MicroservicePluginTypesComponent extends React.Component {

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
    }
  }

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
        <List>
          <Subheader>Authentication</Subheader>
          <ListItem
            primaryText="Annuary"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin type')}
          />
          <ListItem
            primaryText="LDAP"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin type')}
          />
          <ListItem
            primaryText="Kerberos"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin type')}
          />
          <Divider />
          <Subheader>Security</Subheader>
          <ListItem
            primaryText="Proxy"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin type')}
          />
          <ListItem
            primaryText="DMZ"
            leftIcon={<Edit />}
            onTouchTap={() => console.log('edit this plugin type')}
          />
        </List>
        <Drawer width={200} openSecondary open={this.state.filterOpen}>
          <AppBar
            iconElementLeft={<IconButton onTouchTap={this.handleFilterSwitch}><Close /></IconButton>}
            title={'Filters'}
          />
          <List>
            <ListItem primaryText="Authentication" leftCheckbox={<Checkbox checked />} />
            <ListItem primaryText="Security" leftCheckbox={<Checkbox checked />} />
          </List>
        </Drawer>
      </Paper>
    )
  }
}

export default MicroservicePluginTypesComponent
