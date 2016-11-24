import { Link } from 'react-router'
import { themeContextType } from '@regardsoss/theme'
import { TableRowColumn, TableRow } from 'material-ui/Table'
import { grey900 } from 'material-ui/styles/colors'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
// Containers
/**
 *
 */


/**
 * React component
 */
class ProjectAccountComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  handleDelete = () => {
    this.props.handleDelete()
  }

  /**
   *
   * @returns {any}
   */
  render() {
    const { projectAccount, account, redirectOnSelectTo, children } = this.props
    const { muiTheme } = this.context
    const style = muiTheme.linkWithoutDecoration

    // Manage delete link only if the hateoas delete link is provided
    const deletelink = projectAccount.links.find(link => (
      link.rel === 'delete'
    ))
    let itemDeleteLink = null
    if (deletelink) {
      itemDeleteLink = (
        <MenuItem
          onTouchTap={this.props.handleDelete}
          primaryText={<FormattedMessage id="dropdown.delete" />}
        />
      )
    }

    return (
      <TableRow>
        <TableRowColumn>
          {children}
          <Link to={redirectOnSelectTo} style={style}>
            {account.login}
          </Link>
        </TableRowColumn>
        < TableRowColumn >
          <Link to={redirectOnSelectTo} style={style}>
            {account.firstName}
          </Link>
        </ TableRowColumn >
        <TableRowColumn>
          <Link to={redirectOnSelectTo} style={style}>
            {account.lastName}
          </Link>
        </TableRowColumn>
        < TableRowColumn >
          <Link to={redirectOnSelectTo} style={style}>
            {account.email}
          </Link>
        </ TableRowColumn >
        <TableRowColumn>
          <Link to={redirectOnSelectTo} style={style}>
            {account.status}
          </Link>
        </TableRowColumn>
        < TableRowColumn >
          <IconMenu
            iconButtonElement={
              <IconButton touch>
                {/* Todo: Extract color to the theme*/}
                <MoreVertIcon color={grey900} />
              </IconButton>
                }
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            {itemDeleteLink}
            <MenuItem onTouchTap={this.props.handleView} primaryText={<FormattedMessage id="dropdown.view" />} />
            <MenuItem onTouchTap={this.props.handleEdit} primaryText={<FormattedMessage id="dropdown.edit" />} />
          </IconMenu>

        </ TableRowColumn>
      </TableRow>
    )
  }
}

ProjectAccountComponent.propTypes = {
  handleDelete: React.PropTypes.func.isRequired,
  handleView: React.PropTypes.func.isRequired,
  handleEdit: React.PropTypes.func.isRequired,
  redirectOnSelectTo: React.PropTypes.func.isRequired,
  projectAccount: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  account: React.PropTypes.objectOf(React.PropTypes.string),
  children: React.PropTypes.element.isRequired,
}

export default ProjectAccountComponent
