/*
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import find from 'lodash/find'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'
import WarningIcon from 'mdi-material-ui/Alert'
import TimeIcon from 'mdi-material-ui/ClockOutline'
import RefreshIcon from 'mdi-material-ui/Refresh'
import CheckedIcon from 'mdi-material-ui/CheckCircle'
import IconButton from 'material-ui/IconButton'
import Edit from 'mdi-material-ui/Pencil'

import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent } from '@regardsoss/components'
import { ProjectConnectionStateEnum } from '@regardsoss/domain/admin'
import DatabaseConnectionTesterIconButton from './DatabaseConnectionTesterIconButton'

/**
 * React component to list the {@link ProjectConnection}s for all microservices of a project.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
export class ProjectConnectionListComponent extends React.Component {
  static propTypes = {
    project: AdminShapes.Project.isRequired,
    projectConnections: AdminShapes.ProjectConnectionList.isRequired,
    onEdit: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onReCreateConnection: PropTypes.func.isRequired,
    onTestConnection: PropTypes.func.isRequired,
    refreshConnection: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static iconColorWarn = {
    marginRight: 5,
    color: 'Orange',
  }

  static iconColorError = {
    marginRight: 5,
    color: 'Red',
  }

  static iconColorGood = {
    marginRight: 5,
    color: 'Green',
  }

  static statusStyle = {
    display: 'flex',
    alignItems: 'center',
  }

  static errorStatusStyle = {
    display: 'flex',
    flexDirection: 'column',
  }

  getStatus = (microserviceName, connection) => {
    const { intl: { formatMessage } } = this.context
    const pendingIconStyle = { marginRight: 5, color: this.context.muiTheme.palette.primary1Color }
    switch (get(connection, 'content.state', ProjectConnectionStateEnum.NOT_DEFINED)) {
      case ProjectConnectionStateEnum.DISABLED:
        return (
          <span style={ProjectConnectionListComponent.statusStyle}>
            <TimeIcon
              style={pendingIconStyle}
            />
            {formatMessage({ id: 'project.connection.is.disabled' })}
          </span>
        )
      case ProjectConnectionStateEnum.CONNECTING:
        return (
          <span style={ProjectConnectionListComponent.statusStyle}>
            <TimeIcon
              style={ProjectConnectionListComponent.iconColorGood}
            />
            {formatMessage({ id: 'project.connection.is.connecting' })}
          </span>
        )
      case ProjectConnectionStateEnum.ERROR:
        return (
          <span style={ProjectConnectionListComponent.errorStatusStyle}>
            <span style={ProjectConnectionListComponent.statusStyle}>
              <WarningIcon
                style={ProjectConnectionListComponent.iconColorError}
              />
              {formatMessage({ id: 'project.connection.is.not.valid' })}
            </span>
            {connection.content.errorCause}
          </span>
        )
      case ProjectConnectionStateEnum.ENABLED:
        return (
          <span style={ProjectConnectionListComponent.statusStyle}>
            <CheckedIcon
              style={ProjectConnectionListComponent.iconColorGood}
            />
            {formatMessage({ id: 'project.connection.is.configured' })}
          </span>
        )
      // Microservice doesn't have any connection at all (new microservice?)
      case ProjectConnectionStateEnum.NOT_DEFINED:
        return (
          <span style={ProjectConnectionListComponent.statusStyle}>
            <WarningIcon
              style={ProjectConnectionListComponent.iconColorWarn}
            />
            {formatMessage({ id: 'project.connection.is.not.defined' })}
          </span>
        )
      default:
        throw new Error('State not supported')
    }
  }

  getEditButton = (microserviceName, connection) => {
    const { formatMessage } = this.context.intl
    const { onEdit, onCreate } = this.props

    if (connection) {
      return (
        <IconButton
          title={formatMessage({ id: 'database.connection.edit.tooltip' })}
          onClick={() => onEdit(connection.content.id)}
        >
          <Edit hoverColor={this.context.muiTheme.palette.primary1Color} />
        </IconButton>
      )
    }
    return (
      <IconButton onClick={() => onCreate(microserviceName)}>
        <Edit hoverColor={this.context.muiTheme.palette.primary1Color} />
      </IconButton>
    )
  }

  getTesterButton = (connection) => {
    // Retrieve the project connection state, or use NOT_DEFINED
    const projectConnectionState = get(connection, 'content.state', ProjectConnectionStateEnum.NOT_DEFINED)
    //
    switch (projectConnectionState) {
      case ProjectConnectionStateEnum.ENABLED:
        return (<DatabaseConnectionTesterIconButton
          projectConnection={connection}
          testConnection={this.props.onTestConnection}
          refreshConnection={this.props.refreshConnection}
        />)
      case ProjectConnectionStateEnum.DISABLED:
      case ProjectConnectionStateEnum.ERROR:
        return (
          <IconButton
            onClick={() => this.props.onReCreateConnection(connection)}
          >
            <RefreshIcon hoverColor={this.context.muiTheme.palette.primary1Color} />
          </IconButton>)
      default:
        return null
    }
  }

  displayMicroserviceConnection = (microserviceName) => {
    const { projectConnections } = this.props

    // Find if the connection project/microservice exists
    const connection = find(
      projectConnections,
      (conn, index) => conn.content.microservice === microserviceName,
    )

    return (
      <TableRow
        className={`selenium-connection-${microserviceName}`}
        key={microserviceName}
      >
        <TableRowColumn>{microserviceName}</TableRowColumn>
        <TableRowColumn>{this.getStatus(microserviceName, connection)}</TableRowColumn>
        <TableRowColumn>
          {this.getEditButton(microserviceName, connection)}
          {this.getTesterButton(connection)}
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
                <TableHeaderColumn>{formatMessage({ id: 'project.connection.list.microservice' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'project.connection.list.status' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'project.connection.list.actions' })}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(
                STATIC_CONF.MSERVICES,
                (microserviceName, i) => this.displayMicroserviceConnection(microserviceName),
              )}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={this.props.backUrl}
            mainButtonLabel={this.context.intl.formatMessage({ id: 'project.connection.list.action.back' })}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectConnectionListComponent
