/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import React from 'react'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'mdi-material-ui/Play'
import Check from 'mdi-material-ui/Check'
import Error from 'mdi-material-ui/AlertCircle'
import Snackbar from 'material-ui/Snackbar'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { OnHoverSwitchIconButton } from '@regardsoss/components'
import { DataManagementShapes } from '@regardsoss/shape'
import ConnectionTesterProgress from './ConnectionTesterProgress'

const states = {
  NOT_TESTED: 'not_tested',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}
/**
 * An ergonmy button starting a connectivity test for the passed {@link Connection}.<br>
 * The result of the test is displayed in place of the button, and hovering the result allows to restart the test.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 */
class ConnectionTesterIconButton extends React.Component {
  static propTypes = {
    connection: DataManagementShapes.Connection.isRequired,
    handleTestConnection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    status: states.NOT_TESTED,
    snackBarOpen: false,
  }

  getSnackBarMessageId = (status) => {
    switch (status) {
      case states.SUCCESS:
        return 'connection.connectionTester.snackbar.success'
      case states.ERROR:
        return 'connection.connectionTester.snackbar.error'
      default:
        return 'connection.connectionTester.snackbar.success'
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: states.PENDING,
      snackBarOpen: false,
    })
    const { handleTestConnection, connection } = this.props
    Promise.resolve(handleTestConnection(connection.content.businessId))
      .then((resultingAction) => {
        if (resultingAction.error) {
          this.setState({
            status: states.ERROR,
            snackBarOpen: true,
          })
        } else {
          this.setState({
            status: states.SUCCESS,
            snackBarOpen: true,
          })
        }
      })
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  handleSnackbarActionClick = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  render() {
    const { connection } = this.props
    const testButton = (
      <IconButton
        label={this.context.intl.formatMessage({ id: 'database.connectionTester.start' })}
        onClick={this.handleTouchTap}
        className="selenium-testButton"
      >
        <PlayArrow hoverColor={this.context.muiTheme.palette.primary1Color} />
      </IconButton>
    )

    const switchActions = [this.handleTouchTap, this.handleTouchTap]
    const successButton = (
      <OnHoverSwitchIconButton
        onClick={switchActions}
      >
        <Check color={this.context.muiTheme.palette.primary1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const errorButton = (
      <OnHoverSwitchIconButton
        onClick={switchActions}
      >
        <Error color={this.context.muiTheme.palette.accent1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const pendingProgress = <ConnectionTesterProgress />

    const snackbar = (<Snackbar
      open={this.state.snackBarOpen}
      message={this.context.intl.formatMessage({ id: this.getSnackBarMessageId(this.state.status) }, { label: connection.content.label })}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackbarRequestClose}
      onActionClick={this.handleSnackbarActionClick}
      action="OK"
    />)

    let result
    switch (this.state.status) {
      case states.PENDING:
        result = pendingProgress
        break
      case states.SUCCESS:
        result = successButton
        break
      case states.ERROR:
        result = errorButton
        break
      case states.NOT_TESTED:
      default:
        result = testButton
    }
    return (
      <span>
        {result}
        {snackbar}
      </span>
    )
  }
}

export default ConnectionTesterIconButton
