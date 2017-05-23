/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent, ConfirmDialogComponent, ShowableAtRender } from '@regardsoss/components'
import { PluginDefinition } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'

/**
 * React component to display a given list of plugins
 * @author Sébastien Binda
 */
class PluginListComponent extends React.Component {

  static propTypes = {
    plugins: PropTypes.objectOf(PluginDefinition),
    onCreate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
            dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
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
                    <IconButton onTouchTap={() => this.props.onEdit(plugin.content)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => this.openDeleteDialog(plugin.content)}>
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </IconButton>
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
            mainHateoasDependency={uiPluginDefinitionActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'plugins.list.action.cancel' })}
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default PluginListComponent
