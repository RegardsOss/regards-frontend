/*
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import map from 'lodash/map'
import find from 'lodash/find'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import WarningIcon from 'material-ui/svg-icons/alert/warning'
import TimeIcon from 'material-ui/svg-icons/device/access-time'
import CheckedIcon from 'material-ui/svg-icons/action/check-circle'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { FormattedMessage } from 'react-intl'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatabaseConnectionTesterIconButton from './DatabaseConnectionTesterIconButton'

/**
 * React component to list the {@link ProjectConnection}s for all microservices of a project.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionListComponent extends React.Component {

  static propTypes = {
    project: AdminShapes.Project.isRequired,
    projectConnections: AdminShapes.ProjectConnectionList.isRequired,
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
    const { formatMessage } = this.context.intl


    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
    }

    // Find if the connection project/microservice exists
    const connection = find(projectConnections,
      (conn, index) => conn.content.microservice === microserviceName)

    const warnIconStyle = {
      marginRight: 5,
      color: 'Orange',
    }


    const statusStyle = { display: 'flex', alignItems: 'center' }
    let tester = null
    let status = null
    let editAction = null
    if (connection) {
      editAction = (
        <IconButton
          title={formatMessage({ id: 'database.connection.edit.tooltip' })}
          onTouchTap={() => onEdit(connection.content.id)}
        >
          <Edit hoverColor={style.hoverButtonEdit} />
        </IconButton>
      )

      if (connection.content.enabled) {
        const checkIconStyle = { marginRight: 5, color: 'Green' }
        status = (
          <span style={statusStyle}>
            <CheckedIcon
              style={checkIconStyle}
            />
            <FormattedMessage id="project.connection.is.configured" />
          </span>
        )
        tester = (<DatabaseConnectionTesterIconButton
          projectConnection={connection}
          testConnection={this.props.onTestConnection}
          refreshConnection={this.props.refreshConnection}
        />)
      } else {
        const pendingIconStyle = { marginRight: 5, color: this.context.muiTheme.palette.primary1Color }
        status = (
          <span style={statusStyle}>
            <TimeIcon
              style={pendingIconStyle}
            />
            <FormattedMessage id="project.connection.is.not.valid" />
          </span>
        )
      }
    } else {
      status = (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon
            style={warnIconStyle}
          />
          <FormattedMessage id="project.connection.is.not.configured" />
        </span>
      )
      editAction = (
        <IconButton onTouchTap={() => onCreate(microserviceName)}>
          <Edit hoverColor={style.hoverButtonEdit} />
        </IconButton>
      )
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
    const { formatMessage } = this.context.intl
    return (
      <Card className="selenium-projectConnectionList">
        <CardTitle
          title={formatMessage({ id: 'project.connection.list.title' }, { project: this.props.project.content.name })}
          subtitle={formatMessage({ id: 'project.connection.list.subtitle' })}
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
              {map(STATIC_CONF.MSERVICES,
                (microserviceName, i) => this.displayMicroserviceConnection(microserviceName))}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }
}

export default ProjectConnectionListComponent
