/*
 * LICENSE_PLACEHOLDER
 */
import map from 'lodash/map'
import find from 'lodash/find'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import CheckedIcon from 'material-ui/svg-icons/action/check-circle'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { FormattedMessage } from 'react-intl'
import { Project } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import ProjectConnectionList from '@regardsoss/model/src/admin/ProjectConnection'
import DatabaseConnectionTesterIconButton from './DatabaseConnectionTesterIconButton'

/**
 * React component to list the {@link ProjectConnection}s for all microservices of a project.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionListComponent extends React.Component {

  static propTypes = {
    project: Project.isRequired,
    projectConnections: ProjectConnectionList.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onTestConnection: PropTypes.func.isRequired,
    refreshConnection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  displayMicroserviceConnection = (microserviceName) => {
    const { projectConnections, onEdit, onCreate } = this.props

    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
    }

    // Find if the connection project/microservice exists
    const connection = find(projectConnections,
      (conn, index) => conn.content.microservice === microserviceName)

    let tester = null
    let status = (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <WarningIcon
          style={{
            marginRight: 5,
            color: 'Orange',
          }}
        />
        <FormattedMessage id="project.connection.is.not.configured" />
      </span>
    )
    let editAction = (
      <IconButton onTouchTap={() => onCreate(microserviceName)}>
        <Edit hoverColor={style.hoverButtonEdit} />
      </IconButton>
    )
    if (connection && connection.content.enabled) {
      editAction = (
        <IconButton onTouchTap={() => onEdit(connection.content.id)}>
          <Edit hoverColor={style.hoverButtonEdit} />
        </IconButton>
      )
      status = (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <CheckedIcon
            style={{
              marginRight: 5,
              color: 'Green',
            }}
          />
          <FormattedMessage id="project.connection.is.configured" />
        </span>
      )
      tester = (<DatabaseConnectionTesterIconButton
        projectConnection={connection}
        testConnection={this.props.onTestConnection}
        refreshConnection={this.props.refreshConnection}
      />)
    } else if (connection && !connection.content.enabled) {
      editAction = (
        <IconButton onTouchTap={() => onEdit(connection.content.id)}>
          <Edit hoverColor={style.hoverButtonEdit} />
        </IconButton>
      )
      status = (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <ErrorIcon
            style={{
              marginRight: 5,
              color: 'Green',
            }}
          />
          <FormattedMessage id="project.connection.is.not.valid" />
        </span>
      )
      tester = (<DatabaseConnectionTesterIconButton
        projectConnection={connection}
        testConnection={this.props.onTestConnection}
        refreshConnection={this.props.refreshConnection}
      />)
    }
    return (
      <TableRow className={`selenium-connection-${microserviceName}`} key={microserviceName}>
        <TableRowColumn>{microserviceName}</TableRowColumn>
        <TableRowColumn>{status}</TableRowColumn>
        <TableRowColumn>
          {editAction}
          {tester}
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {
    return (
      <Card className="selenium-projectConnectionList">
        <CardTitle
          title={<FormattedMessage
            id="project.connection.list.title"
            values={{ project: this.props.project.content.name }}
          />}
          subtitle={this.context.intl.formatMessage({ id: 'project.connection.list.subtitle' })}
        />
        <CardText>
          <Table selectable>
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="project.connection.list.microservice" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="project.connection.list.status" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="project.connection.list.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(STATIC_CONFIGURATION.microservices,
                (microserviceName, i) => this.displayMicroserviceConnection(microserviceName))}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }
}

export default ProjectConnectionListComponent
