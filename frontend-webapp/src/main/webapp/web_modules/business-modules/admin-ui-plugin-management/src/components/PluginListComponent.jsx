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
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender } from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)

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

  constructor(props) {
    super(props)
    this.state = {
      deleteDialogOpened: false,
    }
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

  render() {
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }

    const name = this.state.pluginToDelete ? this.state.pluginToDelete.name : ' '
    const title = this.context.intl.formatMessage({ id: 'plugins.list.delete.message' }, { name })

    return (
      <Card>
        <ShowableAtRender
          show={this.state.deleteDialogOpened}
        >
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.DELETE}
            onConfirm={() => { this.props.onDelete(this.state.pluginToDelete) }}
            onClose={this.closeDeleteDialog}
            title={title}
          />
        </ShowableAtRender>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'plugins.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'plugins.list.subtitle' })}
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
                      onTouchTap={() => this.props.onEdit(plugin.content)}
                      title={this.context.intl.formatMessage({ id: 'plugin.form.edit' })}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      entityLinks={plugin.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => this.openDeleteDialog(plugin.content)}
                      title={this.context.intl.formatMessage({ id: 'plugin.form.delete' })}
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
            mainButtonTouchTap={this.props.onCreate}
            mainButtonLabel={
              <FormattedMessage
                id="plugins.list.action.add"
              />
            }
            mainHateoasDependencies={PluginListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'plugins.list.action.cancel' })}
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default PluginListComponent
