import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Key from 'material-ui/svg-icons/communication/vpn-key'
import { CardActionsComponent, ConfirmDialogComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Role } from '@regardsoss/model'
import { roleActions } from '../clients/RoleClient'

/**
 * React components to list project.
 */
export class RoleListComponent extends React.Component {

  static propTypes = {
    roleList: PropTypes.objectOf(Role),
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
          dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
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
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="role.list.title" />}
          subtitle={<FormattedMessage id="role.list.subtitle" />}
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
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEditResourceAccess(role.content.name)}
                    >
                      <Key />
                    </HateoasIconAction>

                    <HateoasIconAction
                      entityLinks={role.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(role.content.name)}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>

                    <HateoasIconAction
                      entityLinks={role.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => this.openDeleteDialog(role)}
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
            mainHateoasDependency={roleActions.getDependency(RequestVerbEnum.POST)}
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

