import * as React from "react"
import { connect } from "react-redux"
import { ProjectAccount, Account } from "@regardsoss/models"
import ProjectAccountRowComponent from "../components/ProjectAccountRowComponent"
import { browserHistory } from "react-router"
import { find } from "lodash"
import Actions from "../model/projectAccount.actions"
import ProjectAccountDeleteComponent from "../components/ProjectAccountDeleteComponent"

interface ProjectAccountRowProps extends React.Props<ProjectAccountRowContainer> {
  projectAccount: ProjectAccount,
  projectName: string,
  // From mapStateToProps
  account?: Account,
  // From mapDispatchToProps
  deleteProjectAccount?: (linkDeleteProjectAccount: string) => void
}

/**
 * Show the list of users for the current project
 */
export class ProjectAccountRowContainer extends React.Component<ProjectAccountRowProps, any> {

  state: any = {
    openDeleteDialog: false
  }

  generateUserProfileUrl = (projectAccount: ProjectAccount) => {
    return "/admin/" + this.props.projectName + "/users/" + projectAccount.account
  }

  /**
   *
   * @param user
   */
  handleDeleteUserDropdown = () => {
    this.setState({
      openDeleteDialog: true
    })
  }

  deleteUser = () => {
    const account = this.props.account
    const LINK_TYPE_DELETE = "role" // TODO: to change
    const userDeleteLink: any = find(account.links, {"rel": LINK_TYPE_DELETE})
    if (userDeleteLink) {
      this.props.deleteProjectAccount(userDeleteLink.href)
    } else {
      throw new Error("insufficient permission")
      // TODO: How to display to the user he does not have the right to delete somebody else ?
    }
  }

  handleDeleteUserDialog = () => {
    this.deleteUser()
    this.handleCloseDeleteDialog()
  }

  /**
   *
   */
  handleCloseDeleteDialog = () => {
    this.setState({
      openDeleteDialog: false
    })
  }

  handleView = () => {
    const user = this.props.account
    const urlTo = "/admin/" + this.props.projectName + "/users/" + user.accountId
    browserHistory.push(urlTo)
  }

  handleEdit = () => {
    const user = this.props.account
    const urlTo = "/admin/" + this.props.projectName + "/users/" + user.accountId + "/edit"
    browserHistory.push(urlTo)
  }

  render (): JSX.Element {
    const {projectAccount, account} = this.props
    let dialog: JSX.Element
    if (this.state.openDeleteDialog) {
      dialog = <ProjectAccountDeleteComponent
        onClose={this.handleCloseDeleteDialog}
        onDelete={this.handleDeleteUserDialog}
      />
    }
    return (
      <ProjectAccountRowComponent
        account={account}
        projectAccount={projectAccount}
        handleView={this.handleView}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDeleteUserDropdown}
        redirectOnSelectTo={this.generateUserProfileUrl(projectAccount)}
      >

      </ProjectAccountRowComponent>
    )
  }
}

const mapStateToProps = (state: any, ownProps: ProjectAccountRowProps) => {
  const account = null
  return {
    account: account
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  deleteUser: (linkDeleteUser: string) => dispatch(Actions.deleteUser(linkDeleteUser))
})
export default connect<{}, {}, ProjectAccountRowProps>(mapStateToProps, mapDispatchToProps)(ProjectAccountRowContainer)
