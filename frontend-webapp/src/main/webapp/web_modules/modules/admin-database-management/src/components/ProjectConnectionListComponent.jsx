/*
 * LICENSE_PLACEHOLDER
 */
import { map } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import ProjectConnectionList from '@regardsoss/model/src/admin/ProjectConnection'
import DatabaseConnectionTesterIconButton from './DatabaseConnectionTesterIconButton'

/**
 * React component to list the {@link ProjectConnection}s for all microservices of a project.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ProjectConnectionListComponent extends React.Component {

  static propTypes = {
    projectConnections: ProjectConnectionList.isRequired,
    onEdit: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { projectConnections, onEdit } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="database.list.title" />}
          subtitle={<FormattedMessage id="database.list.subtitle" />}
        />
        <CardText>
          <Table selectable>
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="database.list.project" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.microservice" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.action" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(projectConnections, (connection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{connection.content.project.name}</TableRowColumn>
                  <TableRowColumn>{connection.content.microservice}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => onEdit(connection.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <DatabaseConnectionTesterIconButton projectConnection={connection} />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }
}

export default ProjectConnectionListComponent
