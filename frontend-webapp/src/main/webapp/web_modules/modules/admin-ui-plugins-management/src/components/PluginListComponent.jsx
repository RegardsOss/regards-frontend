/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent, ConfirmDialogComponent, ShowableAtRender } from '@regardsoss/components'
import { PluginDefinition } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * React component to display a given list of plugins
 */
class PluginListComponent extends React.Component {

  static propTypes = {
    plugins: React.PropTypes.objectOf({
      content: PluginDefinition
    }).isRequired,
    onCreate: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired
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
            onDelete={() => { this.props.onDelete(this.state.pluginToDelete) }}
            onClose={this.closeDeleteDialog}
            title={title}
          />
        </ShowableAtRender>
        <CardTitle
          title={<FormattedMessage id="plugins.list.title" />}
          subtitle={<FormattedMessage id="plugins.list.subtitle" />}
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
          />
        </CardActions>
      </Card>
    )
  }
}

export default PluginListComponent
