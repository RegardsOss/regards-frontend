import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FormattedMessage } from 'react-intl'
import Snackbar from 'material-ui/Snackbar'
import OnHoverSwitchFlatButton from '@regardsoss/components/src/buttons/OnHoverSwitchFlatButton'
import ConnectionTesterProgress from './ConnectionTesterProgress'

const NOT_TESTED = Symbol('The connection has not been tested yet')
const PENDING = Symbol('The connection is being established')
const SUCCESS = Symbol('The connection has successfuly been established')
const WARNING = Symbol('The connection could be established but errors occured')
const ERROR = Symbol('The connection could not be established')

class DatabaseConnectionTester extends React.Component {

  static propTypes = {
    projectConnection: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        projectName: React.PropTypes.string,
        microservice: React.PropTypes.string,
        userName: React.PropTypes.string,
        password: React.PropTypes.string,
        driverClassName: React.PropTypes.string,
        url: React.PropTypes.string,
      }),
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      status: NOT_TESTED,
      completed: 0,
      snackBarOpen: false,
      snackBarMessageId: 'database.connectionTester.snackbar.warning',
    }
  }

  getSnackBarMessageId = (status) => {
    switch (status) {
      case SUCCESS:
        return 'database.connectionTester.snackbar.connected'
      case WARNING:
        return 'database.connectionTester.snackbar.warning'
      case ERROR:
        return 'database.connectionTester.snackbar.notConnected'
      default:
        return 'database.connectionTester.snackbar.warning'
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: PENDING,
      snackBarOpen: false,
    })
    // Make API call instead
    this.progress(0)
    const possibleResultStates = [SUCCESS, ERROR]
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

    const testButton = (<FlatButton
      label={<FormattedMessage id="database.connectionTester.start" />}
      icon={<PlayArrow />}
      onTouchTap={this.handleTouchTap}
    />)

    const successButton =
      (<OnHoverSwitchFlatButton
        label={[<FormattedMessage id="database.connectionTester.connected" />,
          <FormattedMessage id="database.connectionTester.restart" />]}
        icon={[<Check />, <PlayArrow />]}
        primary={[true, false]}
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      />)

    const warningButton =
      (<OnHoverSwitchFlatButton
        label={[<FormattedMessage id="database.connectionTester.warning" />,
          <FormattedMessage id="database.connectionTester.restart" />]}
        icon={[<Warning color={this.context.muiTheme.palette.warningColor} />, <PlayArrow />]}
        labelStyle={[{ color: this.context.muiTheme.palette.warningColor }, null]}
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      />)

    const errorButton =
      (<OnHoverSwitchFlatButton
        label={[<FormattedMessage id="database.connectionTester.notConnected" />,
          <FormattedMessage id="database.connectionTester.restart" />]}
        icon={[<Error />, <PlayArrow />]}
        secondary={[true, false]}
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      />)

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
      case NOT_TESTED:
        result = testButton
        break
      case PENDING:
        result = pendingProgress
        break
      case SUCCESS:
        result = successButton
        break
      case WARNING:
        result = warningButton
        break
      case ERROR:
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

export default DatabaseConnectionTester
