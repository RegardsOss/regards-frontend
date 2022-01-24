/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'
import {
  ActionsMenuCell, CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import EditOptionComponent from './EditOptionComponent'
import DuplicateOptionComponent from './DuplicateOptionComponent'
import DeleteOptionComponent from './DeleteOptionComponent'

const actionsBreakpoints = [940, 995, 1065]

/**
 * React component to list themes.
 * @author Léo Mieulet
 */
export class ThemeListComponent extends React.Component {
  static propTypes = {
    themeList: AccessShapes.ThemeList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
  }

  /**
   * User callback: deleted confirmed
   */
  onConfirmDelete = () => {
    const { handleDelete } = this.props
    const { entityToDelete } = this.state
    handleDelete(entityToDelete.content.id)
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
    const { intl: { formatMessage } } = this.context
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.name : ' '
    const title = formatMessage({ id: 'theme.list.delete.title' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      themeList, handleEdit, handleDuplicate, createUrl, backUrl,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'theme.list.title' })}
          subtitle={formatMessage({ id: 'theme.list.subtitle' })}
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
                <TableHeaderColumn>{formatMessage({ id: 'theme.list.table.label' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'theme.list.table.actions' })}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(themeList, (theme, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{theme.content.name}</TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <EditOptionComponent theme={theme} onEdit={handleEdit} />
                      <DuplicateOptionComponent theme={theme} onDuplicate={handleDuplicate} />
                      <DeleteOptionComponent theme={theme} onDelete={this.openDeleteDialog} />
                    </ActionsMenuCell>
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
              formatMessage({ id: 'theme.list.action.add' })
            }
            mainHateoasDependencies={ThemeListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({ id: 'theme.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ThemeListComponent
