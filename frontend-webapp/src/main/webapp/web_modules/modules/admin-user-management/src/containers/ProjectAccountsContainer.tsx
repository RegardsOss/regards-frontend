import * as React from "react"
import { connect } from "react-redux"
import { Card, CardTitle, CardText } from "material-ui/Card"
import { map, values } from "lodash"
import { ProjectAccount, Account } from "@regardsoss/models"
import Actions from "../model/projectAccount.actions"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { I18nProvider } from "@regardsoss/i18n"
import { FormattedMessage } from "react-intl"
import { browserHistory } from "react-router"
import IconButton from "material-ui/IconButton"
import Edit from "material-ui/svg-icons/editor/mode-edit"
import Delete from "material-ui/svg-icons/action/delete"

const URL_PROJECTS_ACCOUNTS = "http://localhost:8080/api/projectAccounts"

interface ProjectAccountsProps {
  // From mapStateToProps
  projectAccounts?: Array<ProjectAccount>
  accounts?: Array<Account>
  // From mapDispatchToProps
  fetchProjectAccounts?: (urlProjectAccounts: string) => void
  deleteProjectAccount?: (linkDeleteProjectAccount: string) => void
  // From router
  params: any
}

/**
 * Show the list of users for the current project
 */
export class ProjectAccountsContainer extends React.Component<ProjectAccountsProps, any> {

  constructor (props: any) {
    super(props)
    // Fetch users for the current project when the containers is created
    this.props.fetchProjectAccounts(URL_PROJECTS_ACCOUNTS)
  }

  handleView = (selectedRows: number[] | string) => {
    if (selectedRows instanceof String)
      throw new Error('Only a single row should be selected in the table')
    if (selectedRows instanceof Array && selectedRows.length !== 1)
      throw new Error('Exactly one row is expected to be selected in the table')

    const account = this.props.accounts[selectedRows[0]]
    const url = "/admin/" + "cdpp" + "/users/" + account.accountId
    browserHistory.push(url)
  }

  handleEdit = () => {
    console.log("You clicked on edit button, Yay!")
  }

  handleDelete = () => {
    console.log("You clicked on delete button, Yay!")
  }

  render (): JSX.Element {

    const {projectAccounts, params} = this.props

    // // Manage delete link only if the hateoas delete link is provided
    // const deletelink = projectAccount.links.find((link) => {
    //   return link.rel === 'delete'
    // })
    // let itemDeleteLink: JSX.Element = null
    // if (deletelink) {
    //   itemDeleteLink =
    //     <MenuItem onTouchTap={this.handleDelete} primaryText={<FormattedMessage id="dropdown.delete"/>}/>
    // }

    return (
      <I18nProvider messageDir='modules/admin-user-management/src/i18n'>
        <Card
          initiallyExpanded={true}>
          <CardTitle
            title={<FormattedMessage id="userlist.title"/>}
            subtitle={<FormattedMessage id="userlist.subtitle"/>}
          />
          <CardText>
            <Table
              selectable={true}
              onRowSelection={this.handleView}
            >
              <TableHeader
                enableSelectAll={false}
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn><FormattedMessage id="userlist.login"/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id="userlist.firstName"/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id="userlist.lastName"/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id="userlist.email"/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id="userlist.status"/></TableHeaderColumn>
                  <TableHeaderColumn><FormattedMessage id="userlist.action"/></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                preScanRows={false}
                showRowHover={true}
              >
                {map(this.props.accounts, (account: Account, id: string) => (
                  <TableRow key={id}>
                    <TableRowColumn>
                      {account.login}
                    </TableRowColumn>
                    <TableRowColumn>
                      {account.firstName}
                    </TableRowColumn>
                    <TableRowColumn>
                      {account.lastName}
                    </TableRowColumn>
                    <TableRowColumn>
                      {account.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      {account.status}
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton tooltip="Font Icon">
                        <Edit onTouchTap={this.handleEdit}/>
                      </IconButton>
                      <IconButton tooltip="Supprimer">
                        <Delete onTouchTap={this.handleDelete}/>
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </CardText>
        </Card>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  projectAccounts: null as any,
  accounts: values(null)
})
const mapDispatchToProps = (dispatch: any) => ({
  fetchProjectAccounts: (urlProjectAccounts: string) => dispatch(Actions.fetchProjectAccounts(urlProjectAccounts))
})
export default connect<{}, {}, ProjectAccountsProps>(mapStateToProps, mapDispatchToProps)(ProjectAccountsContainer)
