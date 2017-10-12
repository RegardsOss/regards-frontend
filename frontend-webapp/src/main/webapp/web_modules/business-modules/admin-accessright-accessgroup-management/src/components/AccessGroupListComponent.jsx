/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Settings from 'material-ui/svg-icons/action/settings-input-component'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { HateoasKeys, withHateoasDisplayControl, withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { accessRightDependencies } from '@regardsoss/admin-accessright-dataaccess-management'
import { accessGroupActions } from '../clients/AccessGroupClient'
import moduleStyles from '../styles/styles'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * React component to list accessgroups.
 */
export class AccessGroupListComponent extends React.Component {

  static propTypes = {
    accessGroupList: DataManagementShapes.AccessGroupList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleEditAccessRights: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [accessGroupActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
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
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.name : ' '
    const title = this.context.intl.formatMessage({ id: 'group.list.delete.message' }, { name })
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
    const { accessGroupList, handleEdit, handleEditAccessRights, handleDuplicate, createUrl, backUrl } = this.props
    const { intl } = this.context
    const styles = moduleStyles(this.context.muiTheme)
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }

    return (
      <Card>
        <CardTitle
          title={intl.formatMessage({ id: 'group.list.title' })}
          subtitle={intl.formatMessage({ id: 'group.list.subtitle' })}
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
                <TableHeaderColumn>{intl.formatMessage({ id: 'group.list.table.name' })}</TableHeaderColumn>
                <TableHeaderColumn>{intl.formatMessage({ id: 'group.list.table.nbUser' })}</TableHeaderColumn>
                <TableHeaderColumn>{intl.formatMessage({ id: 'group.list.table.actions' })}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(accessGroupList, (accessGroup, i) => (
                <TableRow className={`selenium-group-${accessGroup.content.name}`} key={i}>
                  <TableRowColumn style={styles.nameCell}>
                    {accessGroup.content.name}
                    {accessGroup.content.isPublic ? <Chip>Public</Chip> : null}
                  </TableRowColumn>
                  <TableRowColumn>{accessGroup.content.users.length}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      title={intl.formatMessage({ id: 'group.list.table.actions.edit' })}
                      entityLinks={accessGroup.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(accessGroup.content.name)}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <ResourceIconAction
                      title={intl.formatMessage({ id: 'group.list.table.actions.accessrights' })}
                      resourceDependencies={accessRightDependencies.listAccessGroupAccessRightsDeps}
                      onTouchTap={() => handleEditAccessRights(accessGroup.content.name)}
                    >
                      <Settings hoverColor={style.hoverButtonEdit} />
                    </ResourceIconAction>
                    <HateoasIconAction
                      title={intl.formatMessage({ id: 'group.list.table.actions.duplicate' })}
                      entityLinks={accessGroup.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleDuplicate(accessGroup.content.name)}
                    >
                      <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      title={intl.formatMessage({ id: 'group.list.table.actions.delete' })}
                      entityLinks={accessGroup.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => this.openDeleteDialog(accessGroup)}
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
                id="group.list.action.add"
              />
            }
            mainButtonClassName="selenium-createButton"
            mainHateoasDependencies={AccessGroupListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'group.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccessGroupListComponent

