/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { CardActionsComponent } from '@regardsoss/components'
import { ModuleShape } from '@regardsoss/modules'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to display a given list of modules
 */
class ModuleListComponent extends React.Component {

  static propTypes = {
    moduleList: React.PropTypes.arrayOf(ModuleShape),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const createUrl = 'http://localhost:3000/addmodule'
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
                <TableHeaderColumn><FormattedMessage id="modules.list.table.description" /></TableHeaderColumn>
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
                  <TableRowColumn>{module.content.description}</TableRowColumn>
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
