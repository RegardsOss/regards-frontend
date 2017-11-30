/*
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
 */
import map from 'lodash/map'
import find from 'lodash/find'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Download from 'material-ui/svg-icons/file/file-download'
import { DataManagementShapes } from '@regardsoss/shape'
import { ActionsMenuCell, CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender, HelpMessageComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { fragmentActions } from '../clients/FragmentClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const actionsBreakpoints = [940, 995, 1065]

/**
 * Component to list fragment.
 *
 * @author Léo Mieulet
 */
export class FragmentListComponent extends React.Component {
  static propTypes = {
    fragmentList: DataManagementShapes.FragmentList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [fragmentActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
  }

  getExportUrlFromHateoas = (fragmentLinks) => {
    const { accessToken } = this.props
    const exportLink = find(fragmentLinks, link => (
      link.rel === 'export'
    ))
    return `${exportLink.href}?token=${accessToken}` || ''
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
    const title = this.context.intl.formatMessage({ id: 'fragment.list.delete.title' }, { name })
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
      fragmentList, handleEdit, createUrl, backUrl,
    } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'fragment.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'fragment.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <HelpMessageComponent
            message={this.context.intl.formatMessage({ id: 'fragment.list.delete.conditions' })}
          />
          <Table
            selectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="fragment.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="fragment.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="fragment.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(fragmentList, (fragment, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{fragment.content.name}</TableRowColumn>
                  <TableRowColumn>{fragment.content.description}</TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        entityLinks={fragment.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onTouchTap={() => handleEdit(fragment.content.id)}
                        title={intl.formatMessage({ id: 'fragment.list.action.edit' })}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={fragment.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onTouchTap={() => this.openDeleteDialog(fragment)}
                        title={intl.formatMessage({ id: 'fragment.list.action.delete' })}
                      >
                        <Delete hoverColor={style.hoverButtonDelete} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={fragment.links}
                        hateoasKey="export"
                        href={this.getExportUrlFromHateoas(fragment.links)}
                        title={intl.formatMessage({ id: 'fragment.list.action.export' })}
                      >
                        <Download hoverColor={style.hoverButtonEdit} />
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
                id="fragment.list.action.add"
              />
            }
            mainHateoasDependencies={FragmentListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'fragment.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default FragmentListComponent

