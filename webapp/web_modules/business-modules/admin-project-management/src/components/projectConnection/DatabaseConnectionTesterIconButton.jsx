/*
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'material-ui/svg-icons/av/play-arrow'
import Check from 'material-ui/svg-icons/navigation/check'
import Error from 'material-ui/svg-icons/alert/error'
import Warning from 'material-ui/svg-icons/alert/warning'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import OnHoverSwitchIconButton from '@regardsoss/components/src/buttons/OnHoverSwitchIconButton'
import { AdminShapes } from '@regardsoss/shape'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import ConnectionTesterProgress from './ConnectionTesterProgress'

/**
 * An ergonmy button starting a connectivity test for the passed {@link ProjectConnection}.<br>
 * The result of the test is displayed in place of the button, and hovering the result allows to restart the test.
 *
 * @author Xavier-Alexandre Brochard
 */
class DatabaseConnectionTesterIconButton extends React.Component {
  static propTypes = {
    projectConnection: AdminShapes.ProjectConnection.isRequired,
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
    const { intl: { formatMessage } } = this.context
    const testButton = (
      <IconButton
        title={formatMessage({ id: 'database.connectionTester.default.tooltip' })}
        label={<FormattedMessage id="database.connectionTester.start" />}
        onClick={this.handleTouchTap}
      >
        <PlayArrow hoverColor={this.context.muiTheme.palette.primary1Color} />
      </IconButton>
    )

    const switchActions = [this.handleTouchTap, this.handleTouchTap]

    const successButton = (
      <OnHoverSwitchIconButton onClick={switchActions} title={formatMessage({ id: 'database.connectionTester.success.tooltip' })} >
        <Check color={this.context.muiTheme.palette.primary1Color} />
        <PlayArrow />
      </OnHoverSwitchIconButton >)

    const warningButton = (
      <OnHoverSwitchIconButton onClick={switchActions} title={formatMessage({ id: 'database.connectionTester.warn.tooltip' })}>
        <Warning color={this.context.muiTheme.palette.warningColor} />
        <PlayArrow />
      </OnHoverSwitchIconButton>)

    const errorButton = (
      <OnHoverSwitchIconButton onClick={switchActions} title={formatMessage({ id: 'database.connectionTester.error.tooltip' })}>
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
