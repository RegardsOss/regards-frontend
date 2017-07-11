import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Settings from 'material-ui/svg-icons/action/settings-input-component'
import { CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { roleActions } from '../clients/RoleClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

/**
 * React components to list project.
 */
export class RoleListComponent extends React.Component {

  static propTypes = {
    roleList: AdminShapes.RoleList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleEditResourceAccess: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      deleteDialogOpened: false,
    }
  }

  getBooleanAsString = (value) => {
    if (value) {
      return (<FormattedMessage id="role.list.value.true" />)
    }
    return (<FormattedMessage id="role.list.value.false" />)
  }

  /**
   * Return the parent role as string
   * @param parentRole Role
   * @returns {string}
   */
  getParentRoleName = (parentRole) => {
    if (parentRole) {
      return parentRole.name
    }
    return ''
  }

  /**
   *
   * @param isDeleted
   * @returns {*}
   */
  getState = (isDeleted) => {
    if (isDeleted) {
      return (<FormattedMessage id="projects.table.isDeleted" />)
    }
    return (null)
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'role.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.name)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const { roleList, handleEdit, createUrl, handleEditResourceAccess } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    const linkRoleResourceIconTitle = this.context.intl.formatMessage({ id: 'role.edit.resource.action.title' })
    const editRoleIconTitle = this.context.intl.formatMessage({ id: 'role.edit.action.title' })
    const deleteRoleIconTitle = this.context.intl.formatMessage({ id: 'role.delete.action.title' })
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'role.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'role.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <Table
            selectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="role.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.parentRole" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(roleList, (role, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{role.content.name}</TableRowColumn>
                  <TableRowColumn>{this.getParentRoleName(role.content.parentRole)}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={role.links}
                      hateoasKey="manage-resource-access"
                      onTouchTap={() => handleEditResourceAccess(role.content.name)}
                      title={linkRoleResourceIconTitle}
                    >
                      <Settings />
                    </HateoasIconAction>

                    <HateoasIconAction
                      entityLinks={role.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(role.content.name)}
                      title={editRoleIconTitle}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>

                    <HateoasIconAction
                      entityLinks={role.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => this.openDeleteDialog(role)}
                      title={deleteRoleIconTitle}
                    >
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </HateoasIconAction>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              <FormattedMessage
                id="role.list.action.add"
              />
            }
            mainHateoasDependencies={[roleActions.getDependency(RequestVerbEnum.POST)]}
            secondaryButtonLabel={
              <FormattedMessage
                id="role.list.action.cancel"
              />
            }
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default RoleListComponent

