/**
 * @module admin-user-management
 */
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { find } from 'lodash'
import ProjectAccountRowComponent from '../components/ProjectAccountRowComponent'
import Actions from '../model/projectAccount.actions'
import ProjectAccountDeleteComponent from '../components/ProjectAccountDeleteComponent'


/**
 * Show the list of users for the current project
 */
export class ProjectAccountRowContainer extends React.Component {

  state = {
    openDeleteDialog: false,
  }

  generateUserProfileUrl = projectAccount => (
    `/admin/${this.props.projectName}/users/${projectAccount.account}`
  )

  /**
   *
   * @param user
   */
  handleDeleteUserDropdown = () => {
    this.setState({
      openDeleteDialog: true,
    })
  }

  deleteUser = () => {
    const account = this.props.account
    const LINK_TYPE_DELETE = 'role' // TODO: to change
    const userDeleteLink = find(account.links, { rel: LINK_TYPE_DELETE })
    if (userDeleteLink) {
      this.props.deleteProjectAccount(userDeleteLink.href)
    } else {
      throw new Error('insufficient permission')
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
      openDeleteDialog: false,
    })
  }

  handleView = () => {
    const user = this.props.account
    const urlTo = `/admin/${this.props.projectName}/users/${user.accountId}`
    browserHistory.push(urlTo)
  }

  handleEdit = () => {
    const user = this.props.account
    const urlTo = `/admin/${this.props.projectName}/users/${user.accountId}/edit`
    browserHistory.push(urlTo)
  }

  render() {
    const { projectAccount, account } = this.props
    let dialog
    if (this.state.openDeleteDialog) {
      dialog = (<ProjectAccountDeleteComponent
        onClose={this.handleCloseDeleteDialog}
        onDelete={this.handleDeleteUserDialog}
      />)
    }
    return (
      <ProjectAccountRowComponent
        account={account}
        projectAccount={projectAccount}
        handleView={this.handleView}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDeleteUserDropdown}
        redirectOnSelectTo={this.generateUserProfileUrl(projectAccount)}
      />
    )
  }
}
ProjectAccountRowContainer.propTypes = {
  projectAccount: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  projectName: React.PropTypes.string.isRequired,
  account: React.PropTypes.objectOf(React.PropTypes.string),
  deleteProjectAccount: React.PropTypes.func,
}
const mapStateToProps = (state, ownProps) => {
  const account = null
  return {
    account,
  }
}
const mapDispatchToProps = dispatch => ({
  deleteUser: linkDeleteUser => dispatch(Actions.deleteUser(linkDeleteUser)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectAccountRowContainer)
