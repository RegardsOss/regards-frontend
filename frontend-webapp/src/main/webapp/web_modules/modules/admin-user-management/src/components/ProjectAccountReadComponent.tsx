import * as React from "react"
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import { Account } from "@regardsoss/models"
// Icons
import IconButton from 'material-ui/IconButton'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Face from 'material-ui/svg-icons/action/face'
import Assignment from 'material-ui/svg-icons/action/assignment'
import Settings from 'material-ui/svg-icons/action/settings'
import Fingerprint from 'material-ui/svg-icons/action/fingerprint'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import Email from 'material-ui/svg-icons/communication/email'
import Lock from 'material-ui/svg-icons/action/lock'
// Switches
import Checkbox from 'material-ui/Checkbox'
import {Tabs, Tab} from 'material-ui/Tabs'
import {List, ListItem} from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import { ThemeInjector } from "@regardsoss/theme"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { browserHistory } from "react-router"
import { map } from "lodash"

import { MainActionButtonComponent, SecondaryActionButtonComponent } from "@regardsoss/components"

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
  }
}

interface ProjectAccountReadProps extends React.Props<ProjectAccountReadComponent> {
  account: Account
  theme: any
}

class ProjectAccountReadComponent extends React.Component<ProjectAccountReadProps, any> {

  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     value: 0,
  //   }
  // }

  // handleChange = (value: any) => {
  //   this.setState({
  //     value: value,
  //   })
  // }
  handleEdit = () => {
    console.log('todo')
  }

  handleDelete = () => {
    console.log('todo')
  }

  handleBackClick = () => {
    browserHistory.goBack()
  }

  handleActive = (tab: any) => {
    console.log(`A tab with this route property ${tab.props['data-route']} was activated.`)
  }

  render (): JSX.Element {
    const nbElement = 6
    const rulesList: Array<Object> = []
    for (let i = 0; i < nbElement; i++) {
      rulesList.push({
        verb: i % 3 === 0 ? 'get' : 'post',
        uri: '/api/foe',
        i
      })
    }

    return (
      <Paper>
        <AppBar
          title="Dufourg Nicolas"
          iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
        />
        <Tabs
          // value={this.state.value}
          // onChange={this.handleChange}
        >
        <Tab
          icon={<Face/>}
          label="Informations"
          value={0}
        >
          <div style={{display:'flex', justifyContent:'flex-end', marginTop:10}}>
            <MainActionButtonComponent
              label={"Editer"}
              onTouchTap={this.handleEdit} />
            <SecondaryActionButtonComponent
              label={"Supprimer"}
              onTouchTap={this.handleDelete} />

          </div>
          <List>
            <Subheader>Personnelles</Subheader>
            <ListItem
              disabled={true}
              leftIcon={<AccountCircle/>} >
              <TextField value={"Dufourg"} floatingLabelText="Nom"/><br />
              <TextField value={"Nicolas"} floatingLabelText="Prénom"/><br />
            </ListItem>
            <ListItem primaryText="ndufourg" leftIcon={<ActionGrade />} />
            <ListItem primaryText="Nicolas.Dufourg@cnes.fr" leftIcon={<Email />} />
            <Divider/>
            <Subheader>Activité</Subheader>
            <ListItem
              disabled={true}
              primaryText={<p>En ligne <span style={{color: 'black'}}>il y a 3 min.</span></p>} />
            <ListItem
              disabled={true}
              primaryText={<p>Profil mis à jour <span style={{color: 'black'}}>il y a 1 an</span></p>} />
          </List>
        </Tab>
        <Tab
          icon={<Assignment/>}
          label="Rôles"
          value={1}
        >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Nom</TableHeaderColumn>
              <TableHeaderColumn>Rôle parent</TableHeaderColumn>
              <TableHeaderColumn>Permissions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={0}>
              <TableRowColumn>Rôle 1</TableRowColumn>
              <TableRowColumn></TableRowColumn>
              <TableRowColumn>Permission 1, Permission 3</TableRowColumn>
            </TableRow>
            <TableRow key={1}>
              <TableRowColumn>Rôle 2</TableRowColumn>
              <TableRowColumn>Rôle 1</TableRowColumn>
              <TableRowColumn>Permission 1, Permission 3</TableRowColumn>
            </TableRow>
            <TableRow key={2}>
              <TableRowColumn>Rôle 3</TableRowColumn>
              <TableRowColumn>Rôle 1</TableRowColumn>
              <TableRowColumn></TableRowColumn>
            </TableRow>
          </TableBody>
          </Table>
        </Tab>
        <Tab
          label="Droits d'accès"
          data-route="/home"
          onActive={this.handleActive}
          icon={<Fingerprint/>}
          value={2}
        >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>HTTP Verb</TableHeaderColumn>
              <TableHeaderColumn>Route Name</TableHeaderColumn>
              <TableHeaderColumn>Access right</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(rulesList, (el: any, i: number) => (
              <TableRow key={i}>
                <TableRowColumn>{el.verb}</TableRowColumn>
                <TableRowColumn>{el.uri}</TableRowColumn>
                <TableRowColumn>
                  <Checkbox
                    label="azertyui"
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Tab>
        <Tab
          label="Gestion du compte"
          icon={<Settings/>}
          value={3}
        >
          <div style={{}}>
            <List>
              <Subheader>Etat du compte</Subheader>
              <ListItem
                primaryText="Compte verrouillé"
                leftIcon={<Lock color={this.props.theme.palette.errorColor}/>}
              />
            </List>
            <Divider />
            <List>
              <Subheader>Verrouillage</Subheader>
              <ListItem
                primaryText="Demande de déverrouillage"
                secondaryText="M'envoyer par email un code pour déverrouiller mon compte"
              />
              <ListItem
                primaryText="Déverrouiller avec un code"
                secondaryText="Si j'ai reçu par email un code de déverrouillage"
              />
            </List>
            <Divider />
            <List>
              <Subheader>Mot de passe</Subheader>
              <ListItem
                primaryText="Demande de réinitialisation du mot de passe"
                secondaryText="M'envoyer par email un code pour réinitialiser mon mot de passe"
              />
              <ListItem
                primaryText="Réinitialiser avec un code"
                secondaryText="Si j'ai reçu par email un code pour réinitialiser mon mot de passe"
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

export default ProjectAccountReadComponent

export class ThemedProjectAccountReadComponent extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <ThemeInjector>
        <ProjectAccountReadComponent theme={null} account={null}/>
      </ThemeInjector>
    )
  }
}
