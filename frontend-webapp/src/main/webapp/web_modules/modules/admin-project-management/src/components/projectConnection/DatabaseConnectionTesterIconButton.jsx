/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import { FormattedMessage } from 'react-intl'
import Snackbar from 'material-ui/Snackbar'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import OnHoverSwitchIconButton from '@regardsoss/components/src/buttons/OnHoverSwitchIconButton'
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import ConnectionTesterProgress from './ConnectionTesterProgress'

/**
 * An ergonmy button starting a connectivity test for the passed {@link ProjectConnection}.<br>
 * The result of the test is displayed in place of the button, and hovering the result allows to restart the test.
 *
 * @author Xavier-Alexandre Brochard
 */
class DatabaseConnectionTesterIconButton extends React.Component {

  static propTypes = {
    projectConnection: ProjectConnection.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      status: props.projectConnection.content.connectivity,
      completed: 0,
      snackBarOpen: false,
      snackBarMessageId: 'database.connectionTester.snackbar.warning',
    }
  }

  getSnackBarMessageId = (status) => {
    switch (status) {
      case EnumConnectivity.SUCCESS:
        return 'database.connectionTester.snackbar.connected'
      case EnumConnectivity.WARNING:
        return 'database.connectionTester.snackbar.warning'
      case EnumConnectivity.ERROR:
        return 'database.connectionTester.snackbar.notConnected'
      default:
        return 'database.connectionTester.snackbar.warning'
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: EnumConnectivity.PENDING,
      snackBarOpen: false,
    })
    // Make API call instead
    this.progress(0)
    const possibleResultStates = [EnumConnectivity.SUCCESS, EnumConnectivity.ERROR]
    const randomResult = possibleResultStates[Math.floor(Math.random() * possibleResultStates.length)]
    setTimeout(() => {
      this.setState({
        status: randomResult,
        completed: 0,
        snackBarOpen: true,
        snackBarMessageId: this.getSnackBarMessageId(randomResult),
      })
      clearTimeout(this.timer)
    }, 1000)
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 })
    } else {
      this.setState({ completed })
      const diff = Math.random() * 10
      setTimeout(() => this.progress(completed + diff), 10)
    }
  }

  handleSnackbarRequestClose = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  handleSnackbarActionTouchTap = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  render() {
    const { projectConnection } = this.props

    const testButton = (
      <IconButton
        label={<FormattedMessage id="database.connectionTester.start" />}
        onTouchTap={this.handleTouchTap}
      >
        <PlayArrow hoverColor={this.context.muiTheme.palette.primary1Color} />
      </IconButton>
    )

    const successButton =
      (<OnHoverSwitchIconButton onTouchTap={[this.handleTouchTap, this.handleTouchTap]}>
        <Check color={this.context.muiTheme.palette.primary1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const warningButton =
      (<OnHoverSwitchIconButton onTouchTap={[this.handleTouchTap, this.handleTouchTap]}>
        <Warning color={this.context.muiTheme.palette.warningColor} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const errorButton =
      (<OnHoverSwitchIconButton onTouchTap={[this.handleTouchTap, this.handleTouchTap]}>
        <Error color={this.context.muiTheme.palette.accent1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const pendingProgress = <ConnectionTesterProgress value={this.state.completed} />

    const snackbar =
      (<Snackbar
        open={this.state.snackBarOpen}
        message={<FormattedMessage
          id={this.state.snackBarMessageId} values={{
            microservice: projectConnection.content.microservice,
            driverClassName: projectConnection.content.driverClassName,
          }}
        />}
        autoHideDuration={4000}
        onRequestClose={this.handleSnackbarRequestClose}
        onActionTouchTap={this.handleSnackbarActionTouchTap}
        action="OK"
      />)

    let result = testButton
    switch (this.state.status) {
      case EnumConnectivity.NOT_TESTED:
        result = testButton
        break
      case EnumConnectivity.PENDING:
        result = pendingProgress
        break
      case EnumConnectivity.SUCCESS:
        result = successButton
        break
      case EnumConnectivity.WARNING:
        result = warningButton
        break
      case EnumConnectivity.ERROR:
        result = errorButton
        break
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

export default DatabaseConnectionTesterIconButton
