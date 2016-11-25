import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { browserHistory } from 'react-router'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import InfoOutline from 'material-ui/svg-icons/action/info-outline'
import Settings from 'material-ui/svg-icons/action/settings'
import Lock from 'material-ui/svg-icons/action/lock'
import SupervisorAccount from 'material-ui/svg-icons/action/supervisor-account'
import { Tabs, Tab } from 'material-ui/Tabs'
import { MainActionButtonComponent, SecondaryActionButtonComponent } from '@regardsoss/components'


export class ProjectEditComponent extends React.Component {
  static propTypes = {
    project:React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        isPublic: React.PropTypes.bool,
      }),
    }).isRequired,
    backUrl: React.PropTypes.string.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
  }


  handleEdit = () => {
    console.log('todo')
  }

  handleDelete = () => {
    console.log('todo')
  }


  render() {
    return (
      <Paper>
        <AppBar
          title={this.state.project.name}
          iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
        />
        <Tabs>
          <Tab
            icon={<InfoOutline />}
            label="Informations"
            value={0}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <MainActionButtonComponent
                label={'Editer'}
                onTouchTap={this.handleEdit}
              />
              <SecondaryActionButtonComponent
                label={'Supprimer'}
                onTouchTap={this.handleDelete}
              />

            </div>
            <List>
              <Subheader>Description</Subheader>
            </List>
          </Tab>
          <Tab
            icon={<SupervisorAccount />}
            label="Administrateurs"
            value={0}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <MainActionButtonComponent
                label={'Editer'}
                onTouchTap={this.handleEdit}
              />
              <SecondaryActionButtonComponent
                label={'Supprimer'}
                onTouchTap={this.handleDelete}
              />

            </div>
            <List>
              <Subheader>Description</Subheader>
            </List>
          </Tab>
          <Tab
            label="Gestion du projet"
            icon={<Settings />}
            value={3}
          >
            <div style={{}}>
              <List>
                <Subheader>Etat du projet</Subheader>
                <ListItem
                  primaryText="Information sur l'étatxt du projet"
                  leftIcon={<Lock color={this.props.theme.palette.errorColor} />}
                />
              </List>
              <Divider />
              <List>
                <Subheader>Actions</Subheader>
                <ListItem
                  primaryText="Action 1"
                  secondaryText="Effectuer l'action 1 sur le projet"
                />
                <ListItem
                  primaryText="Action 2"
                  secondaryText="Effectuer l'action 2 sur le projet"
                />
              </List>
              <Divider />
            </div>
          </Tab>
        </Tabs>
      </Paper>
    )
  }
}
