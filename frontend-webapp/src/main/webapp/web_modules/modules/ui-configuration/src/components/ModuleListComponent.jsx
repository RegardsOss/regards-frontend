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
import { CardActionsComponent } from '@regardsoss/components'
import { ModuleShape } from '@regardsoss/modules'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * React component to display a given list of modules
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    moduleList: React.PropTypes.arrayOf(ModuleShape),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  handleActication = (moduleName) => {

  }

  handleEdit = (moduleName) => {

  }

  handleDelete = (moduleName) => {

  }

  render() {
    const createUrl = 'http://localhost:3000/addmodule'

    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }

    return (
      <Card>
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
              {map(this.props.moduleList, (module, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{module.content.name}</TableRowColumn>
                  <TableRowColumn>
                    <Toggle
                      defaultToggled={module.content.active}
                      onToggle={() => this.handleActication(module.content.id)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>{module.content.description}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => this.handleEdit(module.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => this.handleDelete(module.content.id)}>
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
            mainButtonUrl={createUrl}
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
