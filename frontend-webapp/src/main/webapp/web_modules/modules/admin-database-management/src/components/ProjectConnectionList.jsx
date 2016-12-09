import { map } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatabaseConnectionTester from './DatabaseConnectionTester'

/**
 * React component to list the data base connections for all microservices of a
 * project.
 */
export class ProjectConnectionList extends React.Component {

  static propTypes = {
    list: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          projectName: React.PropTypes.string,
          microservice: React.PropTypes.string,
          userName: React.PropTypes.string,
          password: React.PropTypes.string,
          driverClassName: React.PropTypes.string,
          url: React.PropTypes.string,
        }),
      }),
    ),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { list } = this.props
    console.log(list)
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="database.list.title" />}
          subtitle={<FormattedMessage id="database.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="database.list.microservice" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.driverClassName" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.url" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.userName" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.password" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="database.list.test" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(list, (connection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{connection.content.microservice}</TableRowColumn>
                  <TableRowColumn>{connection.content.driverClassName}</TableRowColumn>
                  <TableRowColumn>{connection.content.url}</TableRowColumn>
                  <TableRowColumn>{connection.content.userName}</TableRowColumn>
                  <TableRowColumn>{connection.content.password}</TableRowColumn>
                  <TableRowColumn>
                    <DatabaseConnectionTester projectConnection={connection.content} />
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

export default ProjectConnectionList
