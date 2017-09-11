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
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { DataManagementShapes } from '@regardsoss/shape'
import { ActionsMenuCell, CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { datasetActions } from '../clients/DatasetClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const actionsBreakpoints = [940, 995]

/**
 * React component to list datasets.
 */
export class DatasetListComponent extends React.Component {

  static propTypes = {
    datasetList: DataManagementShapes.DatasetList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEPENDENCIES = [datasetActions.getDependency(RequestVerbEnum.POST)]

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
    const title = this.context.intl.formatMessage({ id: 'dataset.list.delete.title' }, { name })
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
    const { datasetList, handleEdit, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'dataset.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'dataset.list.subtitle' })}
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
                <TableHeaderColumn><FormattedMessage id="dataset.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="dataset.list.table.model" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="dataset.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(datasetList, (dataset, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{dataset.content.label}</TableRowColumn>
                  <TableRowColumn>{dataset.content.model.name}</TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        entityLinks={dataset.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onTouchTap={() => handleEdit(dataset.content.id)}
                        title={this.context.intl.formatMessage({ id: 'dataset.list.tooltip.edit' })}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={dataset.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onTouchTap={() => this.openDeleteDialog(dataset)}
                        title={this.context.intl.formatMessage({ id: 'dataset.list.tooltip.delete' })}
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
                id="dataset.list.action.add"
              />
            }
            mainHateoasDependencies={DatasetListComponent.DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'dataset.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasetListComponent

