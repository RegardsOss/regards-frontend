/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Copy from 'material-ui/svg-icons/content/content-copy'
import { FormattedMessage } from 'react-intl'
import { ActionsMenuCell, CardActionsComponent, ConfirmDialogComponent, ShowableAtRender } from '@regardsoss/components'
import { ModuleShape } from '@regardsoss/modules'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HateoasIconAction, HateoasToggle, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { moduleActions } from '../client/ModuleClient'

/**
 * React component to display a given list of modules
 * @author Sébastien binda
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    modules: PropTypes.objectOf(ModuleShape).isRequired,
    backUrl: PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onActivation: PropTypes.func.isRequired,
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

    const { intl } = this.context
    const name = this.state.moduleToDelete ? this.state.moduleToDelete.name : ' '
    const title = this.context.intl.formatMessage({ id: 'modules.list.delete.message' }, { name })

    const sortedModules = sortBy(this.props.modules, module => module.content.description)

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
                <TableHeaderColumn><FormattedMessage id="modules.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.active" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(sortedModules, (module, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{module.content.description}</TableRowColumn>
                  <TableRowColumn>{module.content.type}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasToggle
                      entityLinks={module.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      toggled={module.content.active}
                      onToggle={() => this.props.onActivation(module.content)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell>
                      <HateoasIconAction
                        title={intl.formatMessage({ id: 'modules.list.table.action.edit.tooltip' })}
                        entityLinks={module.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onTouchTap={() => this.props.onEdit(module.content)}
                        breakpoint={460}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        title={intl.formatMessage({ id: 'modules.list.table.action.duplicate.tooltip' })}
                        entityLinks={module.links}
                        hateoasKey={HateoasKeys.CREATE}
                        onTouchTap={() => this.props.onDuplicate(module.content)}
                        breakpoint={945}
                      >
                        <Copy hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        title={intl.formatMessage({ id: 'modules.list.table.action.delete.tooltip' })}
                        entityLinks={module.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onTouchTap={() => this.openDeleteDialog(module.content)}
                        breakpoint={945}
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
            mainButtonTouchTap={this.props.onCreate}
            mainButtonLabel={
              <FormattedMessage
                id="modules.list.action.add"
              />
            }
            mainHateoasDependency={moduleActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={<FormattedMessage id="layout.cancel" />}
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ModuleListComponent
