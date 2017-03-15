/*
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import { FormattedMessage } from 'react-intl'
import Snackbar from 'material-ui/Snackbar'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { OnHoverSwitchIconButton } from '@regardsoss/components'
import { Connection } from '@regardsoss/model'
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
    connection: Connection.isRequired,
    handleTestConnection: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      status: states.NOT_TESTED,
      snackBarOpen: false,
    }
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
    Promise.resolve(handleTestConnection(connection.content.id))
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

  handleSnackbarActionTouchTap = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  render() {
    const { connection } = this.props
    const testButton = (
      <IconButton
        label={<FormattedMessage id="database.connectionTester.start" />}
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      >
        <PlayArrow hoverColor={this.context.muiTheme.palette.primary1Color} />
      </IconButton>
    )

    const successButton =
      (<OnHoverSwitchIconButton
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      >
        <Check color={this.context.muiTheme.palette.primary1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const errorButton =
      (<OnHoverSwitchIconButton
        onTouchTap={[this.handleTouchTap, this.handleTouchTap]}
      >
        <Error color={this.context.muiTheme.palette.accent1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const pendingProgress = <ConnectionTesterProgress />

    const snackbar = (<Snackbar
      open={this.state.snackBarOpen}
      message={<FormattedMessage
        id={this.getSnackBarMessageId(this.state.status)}
        values={{
          label: connection.content.label,
        }}
      />}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackbarRequestClose}
      onActionTouchTap={this.handleSnackbarActionTouchTap}
      action="OK"
    />)

    let result = testButton
    switch (this.state.status) {
      case states.NOT_TESTED:
        result = testButton
        break
      case states.PENDING:
        result = pendingProgress
        break
      case states.SUCCESS:
        result = successButton
        break
      case states.ERROR:
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

export default ConnectionTesterIconButton
