/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { Connection } from '@regardsoss/model'
import { CardActionsComponent, ConfirmDialogComponent, ShowableAtRender, ActionsMenuCell } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { connectionActions } from '../clients/ConnectionClient'
import ConnectionTesterIconButton from './ConnectionTesterIconButton'

/**
 * React component to list collections.
 */
export class ConnectionListComponent extends React.Component {

  static propTypes = {
    connectionList: PropTypes.objectOf(Connection),
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleTestConnection: PropTypes.func.isRequired,
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

  printIsActive = (active) => {
    if (active) {
      return (<FormattedMessage id="connection.list.isActive.true" />)
    }
    return (<FormattedMessage id="connection.list.isActive.false" />)
  }

  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.label : ' '
    const title = this.context.intl.formatMessage({ id: 'connection.list.delete.title' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
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
    const { connectionList, handleEdit, handleTestConnection, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }
    const { intl } = this.context
    return (
      <Card>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'connection.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'connection.list.subtitle' })}
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
                <TableHeaderColumn><FormattedMessage id="connection.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="connection.list.table.isActive" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="connection.list.table.test" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="connection.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(connectionList, (connection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{connection.content.label}</TableRowColumn>
                  <TableRowColumn>{this.printIsActive(connection.content.active)}</TableRowColumn>
                  <TableRowColumn><ConnectionTesterIconButton connection={connection} handleTestConnection={handleTestConnection} /></TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell>
                      <HateoasIconAction
                        entityLinks={connection.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onTouchTap={() => handleEdit(connection.content.id)}
                        breakpoint={940}
                        title={intl.formatMessage({ id: 'connection.list.action.edit' })}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={connection.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onTouchTap={() => this.openDeleteDialog(connection)}
                        breakpoint={995}
                        title={intl.formatMessage({ id: 'connection.list.action.delete' })}
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
                id="connection.list.action.add"
              />
            }
            mainHateoasDependencies={[connectionActions.getDependency(RequestVerbEnum.POST)]}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'connection.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ConnectionListComponent

