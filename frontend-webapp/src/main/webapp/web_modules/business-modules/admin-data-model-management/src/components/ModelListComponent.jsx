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
import find from 'lodash/find'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Settings from 'material-ui/svg-icons/action/settings-input-composite'
import Download from 'material-ui/svg-icons/file/file-download'
import { ActionsMenuCell, CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { withHateoasDisplayControl, withResourceDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { modelActions } from '../clients/ModelClient'
import { modelAttributesActions } from '../clients/ModelAttributesClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const ResourceIconAction = withResourceDisplayControl(IconButton)
const actionsBreakpoints = [940, 995, 1065, 1320, 1380]

/**
 * React components to list project.
 */
export class ModelListComponent extends React.Component {
  static propTypes = {
    modelList: DataManagementShapes.ModelList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleBindAttributes: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [modelActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
  }

  getExportUrlFromHateoas = (modelLinks) => {
    const { accessToken } = this.props
    const exportLink = find(modelLinks, link => (
      link.rel === 'export'
    ))
    return `${exportLink.href}?token=${accessToken}` || ''
  }

  getType = (type) => {
    switch (type) {
      case 'COLLECTION':
        return (<FormattedMessage id="model.type.collection" />)
      case 'DOCUMENT':
        return (<FormattedMessage id="model.type.document" />)
      case 'DATA':
        return (<FormattedMessage id="model.type.data" />)
      case 'DATASET':
        return (<FormattedMessage id="model.type.dataset" />)
      default:
        return null
    }
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
    const title = this.context.intl.formatMessage({ id: 'model.list.delete.title' }, { name })
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
    const {
      modelList, handleEdit, handleDuplicate, createUrl, handleBindAttributes, backUrl,
    } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonBindAttribute: this.context.muiTheme.palette.primary3Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'model.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'model.list.subtitle' })}
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
                <TableHeaderColumn><FormattedMessage id="model.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="model.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="model.list.table.type" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="model.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(modelList, (model, i) => (
                <TableRow key={i} className={`selenium-${model.content.name}`}>
                  <TableRowColumn
                    title={model.content.name}
                  >
                    {model.content.name}
                  </TableRowColumn>
                  <TableRowColumn
                    title={model.content.description}
                  >
                    {model.content.description}
                  </TableRowColumn>
                  <TableRowColumn
                    title={model.content.type}
                  >
                    {this.getType(model.content.type)}
                  </TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        entityLinks={model.links}
                        hateoasKey="export"
                        href={this.getExportUrlFromHateoas(model.links)}
                        title={intl.formatMessage({ id: 'model.list.action.export' })}
                      >
                        <Download hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>

                      <ResourceIconAction
                        resourceDependencies={modelAttributesActions.getDependency(RequestVerbEnum.POST)}
                        onClick={() => handleBindAttributes(model.content.name)}
                        title={intl.formatMessage({ id: 'model.list.action.bind' })}
                      >
                        <Settings hoverColor={style.hoverButtonBindAttribute} />
                      </ResourceIconAction>

                      <HateoasIconAction
                        entityLinks={model.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onClick={() => handleEdit(model.content.name)}
                        title={intl.formatMessage({ id: 'model.list.action.edit' })}
                        className="selenium-editButton"
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>

                      <ResourceIconAction
                        resourceDependencies={modelActions.getDependency(RequestVerbEnum.POST)}
                        onClick={() => handleDuplicate(model.content.name)}
                        title={intl.formatMessage({ id: 'model.list.action.duplicate' })}
                      >
                        <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                      </ResourceIconAction>

                      <HateoasIconAction
                        entityLinks={model.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onClick={() => this.openDeleteDialog(model)}
                        title={intl.formatMessage({ id: 'model.list.action.delete' })}
                        className="selenium-deleteButton"
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
                id="model.list.action.add"
              />
            }
            mainHateoasDependencies={ModelListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'model.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ModelListComponent

