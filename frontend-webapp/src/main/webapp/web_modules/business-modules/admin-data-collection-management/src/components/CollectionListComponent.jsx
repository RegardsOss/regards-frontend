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
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender, ActionsMenuCell } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, withResourceDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { collectionActions } from '../clients/CollectionClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const ResourceIconAction = withResourceDisplayControl(IconButton)
const actionsBreakpoints = [940, 995, 1065]

/**
 * React component to list collections.
 */
export class CollectionListComponent extends React.Component {

  static propTypes = {
    collectionList: DataManagementShapes.CollectionList,
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

  static DEPENDENCY = collectionActions.getDependency(RequestVerbEnum.POST)

  static DEPENDENCIES_ARRAY = [collectionActions.getDependency(RequestVerbEnum.POST)]

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
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.label : ' '
    const title = this.context.intl.formatMessage({ id: 'collection.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.id)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }


  render() {
    const { collectionList, handleEdit, handleDuplicate, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'collection.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'collection.list.subtitle' })}
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
                <TableHeaderColumn><FormattedMessage id="collection.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.model" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="collection.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(collectionList, (collection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{collection.content.label}</TableRowColumn>
                  <TableRowColumn>{collection.content.model.name}</TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        entityLinks={collection.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onTouchTap={() => handleEdit(collection.content.id)}
                        title={intl.formatMessage({ id: 'collection.list.action.edit' })}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <ResourceIconAction
                        resourceDependencies={CollectionListComponent.DEPENDENCY}
                        onTouchTap={() => handleDuplicate(collection.content.id)}
                        title={intl.formatMessage({ id: 'collection.list.action.duplicate' })}
                      >
                        <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                      </ResourceIconAction>
                      <HateoasIconAction
                        entityLinks={collection.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onTouchTap={() => this.openDeleteDialog(collection)}
                        title={intl.formatMessage({ id: 'collection.list.action.delete' })}
                      >
                        <Delete hoverColor={style.hoverButtonDelete} />
                      </HateoasIconAction>
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
              <FormattedMessage
                id="collection.list.action.add"
              />
            }
            mainHateoasDependencies={CollectionListComponent.DEPENDENCIES_ARRAY}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'collection.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default CollectionListComponent

