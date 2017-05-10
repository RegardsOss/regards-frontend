/*
 * LICENSE_PLACEHOLDER
 */
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
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import ConnectionTesterProgress from './ConnectionTesterProgress'
import moduleStyles from '../../styles/styles'

/**
 * An ergonmy button starting a connectivity test for the passed {@link ProjectConnection}.<br>
 * The result of the test is displayed in place of the button, and hovering the result allows to restart the test.
 *
 * @author Xavier-Alexandre Brochard
 */
class DatabaseConnectionTester extends React.Component {

  static propTypes = {
    projectConnection: ProjectConnection.isRequired,
    testConnection: React.PropTypes.func.isRequired,
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
      completed: 0,
      snackBarOpen: false,
    }, () => {
      Promise.resolve(this.props.testConnection(this.props.projectConnection))
        .then((ActionResult) => {
          if (ActionResult) {
            const result = ActionResult.error ? EnumConnectivity.ERROR : EnumConnectivity.SUCCESS
            this.setState({
              status: result,
              completed: 100,
              snackBarOpen: true,
              snackBarMessageId: this.getSnackBarMessageId(result),
            })
          }
        })
    })
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
    const styles = moduleStyles(this.context.muiTheme)

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
        icon={[<Warning color={styles.palette.warningColor} />, <PlayArrow />]}
        labelStyle={[{ color: styles.palette.warningColor }, null]}
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

export default DatabaseConnectionTester
