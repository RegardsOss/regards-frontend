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
    testConnection: PropTypes.func.isRequired,
    refreshConnection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      status: EnumConnectivity.NOT_TESTED,
      completed: 0,
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: EnumConnectivity.PENDING,
      completed: 0,
    }, () => {
      Promise.resolve(this.props.testConnection(this.props.projectConnection))
      .then((ActionResult) => {
        if (ActionResult) {
          const result = ActionResult.error ? EnumConnectivity.ERROR : EnumConnectivity.SUCCESS
          this.setState({
            status: result,
            completed: 100,
          }, () => {
            this.props.refreshConnection(this.props.projectConnection.content.id)
          })
        }
      })
    })
  }

  render() {
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
      </span>
    )
  }
}

export default DatabaseConnectionTesterIconButton
