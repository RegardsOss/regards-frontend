/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Edit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import { FormattedMessage } from 'react-intl'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { HateoasKeys } from '@regardsoss/display-control'
import {
  CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, HateoasIconAction, ShowableAtRender,
} from '@regardsoss/components'
import { uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'

/**
 * React component to display a given list of plugins
 * @author Sébastien Binda
 */
class PluginListComponent extends React.Component {
  static propTypes = {
    plugins: AccessShapes.UIPluginDefinitionList,
    onCreate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [uiPluginDefinitionActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
  }

  openDeleteDialog = (plugin) => {
    this.setState({
      deleteDialogOpened: true,
      pluginToDelete: plugin,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      pluginToDelete: null,
    })
  }

  /**
   * User callback: on delete
   */
  onDelete = () => {
    const { onDelete } = this.props
    const { pluginToDelete } = this.state
    onDelete(pluginToDelete)
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }

    const name = this.state.pluginToDelete ? this.state.pluginToDelete.name : ' '

    return (
      <Card>
        <ShowableAtRender
          show={this.state.deleteDialogOpened}
        >
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.DELETE}
            onConfirm={this.onDelete}
            onClose={this.closeDeleteDialog}
            title={formatMessage({ id: 'plugins.list.delete.message' }, { name })}
          />
        </ShowableAtRender>
        <CardTitle
          title={formatMessage({ id: 'plugins.list.title' })}
          subtitle={formatMessage({ id: 'plugins.list.subtitle' })}
        />
        <CardText>
          <Table
            selectable
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="plugins.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="plugins.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(this.props.plugins, (plugin, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{plugin.content.name}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={plugin.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onClick={() => this.props.onEdit(plugin.content)}
                      title={formatMessage({ id: 'plugin.form.edit' })}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      entityLinks={plugin.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onClick={() => this.openDeleteDialog(plugin.content)}
                      title={formatMessage({ id: 'plugin.form.delete' })}
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
            mainButtonClick={this.props.onCreate}
            mainButtonLabel={
              <FormattedMessage
                id="plugins.list.action.add"
              />
            }
            mainHateoasDependencies={PluginListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({ id: 'plugins.list.action.cancel' })}
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default PluginListComponent
