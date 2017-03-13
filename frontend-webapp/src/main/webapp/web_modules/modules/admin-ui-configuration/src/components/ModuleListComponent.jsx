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
import Copy from 'material-ui/svg-icons/content/content-copy'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent, ConfirmDialogComponent, ShowableAtRender } from '@regardsoss/components'
import { ModuleShape } from '@regardsoss/modules'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * React component to display a given list of modules
 * @author Sébastien binda
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    modules: React.PropTypes.objectOf(ModuleShape).isRequired,
    onCreate: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onDuplicate: React.PropTypes.func.isRequired,
    onActivation: React.PropTypes.func.isRequired,
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

  openDeleteDialog = (module) => {
    this.setState({
      deleteDialogOpened: true,
      moduleToDelete: module,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      moduleToDelete: null,
    })
  }

  render() {
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }

    const name = this.state.moduleToDelete ? this.state.moduleToDelete.name : ' '
    const title = this.context.intl.formatMessage({ id: 'modules.list.delete.message' }, { name })

    return (
      <Card>
        <ShowableAtRender
          show={this.state.deleteDialogOpened}
        >
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
            onConfirm={() => { this.props.onDelete(this.state.moduleToDelete) }}
            onClose={this.closeDeleteDialog}
            title={title}
          />
        </ShowableAtRender>
        <CardTitle
          title={<FormattedMessage id="modules.list.title" />}
          subtitle={<FormattedMessage id="modules.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="modules.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.active" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(this.props.modules, (module, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{module.content.name}</TableRowColumn>
                  <TableRowColumn>
                    <Toggle
                      toggled={module.content.active}
                      onToggle={() => this.props.onActivation(module.content)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>{module.content.description}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => this.props.onEdit(module.content)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => this.props.onDuplicate(module.content)}>
                      <Copy hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => this.openDeleteDialog(module.content)}>
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
                id="modules.list.action.add"
              />
            }
          />
        </CardActions>
      </Card>
    )
  }
}

export default ModuleListComponent
