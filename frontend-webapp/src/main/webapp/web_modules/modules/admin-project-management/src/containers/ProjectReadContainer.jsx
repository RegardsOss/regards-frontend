
import { connect } from 'react-redux'
import { injectTheme } from '@regardsoss/theme'
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

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

export class ProjectReadContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      project: { projectId: 'dummy', name: 'dummy', description: 'dummy' },
    }
  }

  componentDidMount() {
    const project = this.props.projects[this.props.params.project_id]
    if (project) {
      this.setState({
        project,
      })
    } else {
      throw new Error('Failed to find the corresponding project')
    }
  }

  handleEdit = () => {
    console.log('todo')
  }

  handleDelete = () => {
    console.log('todo')
  }

  handleBackClick = () => {
    browserHistory.goBack()
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

ProjectReadContainer.propTypes = {
  project: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  projects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)).isRequired,
  theme: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
}


const mapStateToProps = (state, ownProps) => ({
  projects: null,
})

const connected = connect(mapStateToProps)(ProjectReadContainer)
const themedAndConnected = injectTheme(connected)
export default themedAndConnected
