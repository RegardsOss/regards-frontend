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
import FlatButton from 'material-ui/FlatButton'
import PlayArrow from 'mdi-material-ui/Play'
import Check from 'mdi-material-ui/Check'
import Error from 'mdi-material-ui/AlertCircle'
import Warning from 'mdi-material-ui/Alert'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Snackbar from 'material-ui/Snackbar'
import { OnHoverSwitchFlatButton } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { EnumConnectivity } from '@regardsoss/domain/admin'
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
    projectConnection: AdminShapes.ProjectConnection.isRequired,
    testConnection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static getSnackBarMessageId(status) {
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

  state = {
    status: this.props.projectConnection.content.connectivity,
    completed: 0,
    snackBarOpen: false,
    snackBarMessageId: 'database.connectionTester.snackbar.warning',
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
              snackBarMessageId: DatabaseConnectionTester.getSnackBarMessageId(result),
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

  handleSnackbarActionClick = () => {
    this.setState({
      snackBarOpen: false,
    })
  }

  render() {
    const { projectConnection } = this.props
    const { intl: { formatMessage } } = this.context
    const styles = moduleStyles(this.context.muiTheme)

    const testButton = (<FlatButton
      label={formatMessage({ id: 'database.connectionTester.start' })}
      icon={<PlayArrow />}
      onClick={this.handleTouchTap}
    />)

    const successButton = (<OnHoverSwitchFlatButton
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      label={[ // eslint wont fix: (same for similar ones below) wrong REGARDS API, should be corrected globally!
        formatMessage({ id: 'database.connectionTester.connected' }),
        formatMessage({ id: 'database.connectionTester.restart' }),
      ]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      icon={[<Check key="check" />, <PlayArrow key="play" />]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      primary={[true, false]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      onClick={[this.handleTouchTap, this.handleTouchTap]}
    />)

    const warningButton = (<OnHoverSwitchFlatButton
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      label={[
        formatMessage({ id: 'database.connectionTester.warning' }),
        formatMessage({ id: 'database.connectionTester.restart' }),
      ]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      icon={[<Warning key="warn" color={styles.palette.warningColor} />, <PlayArrow key="play" />]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      labelStyle={[{ color: styles.palette.warningColor }, null]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      onClick={[this.handleTouchTap, this.handleTouchTap]}
    />)

    const errorButton = (<OnHoverSwitchFlatButton
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      label={[
        formatMessage({ id: 'database.connectionTester.notConnected' }),
        formatMessage({ id: 'database.connectionTester.restart' }),
      ]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      icon={[<Error key="error" />, <PlayArrow key="play" />]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      secondary={[true, false]}
      // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
      onClick={[this.handleTouchTap, this.handleTouchTap]}
    />)

    const pendingProgress = <ConnectionTesterProgress value={this.state.completed} />

    const snackbar = (
      <Snackbar
        open={this.state.snackBarOpen}
        message={formatMessage({ id: this.state.snackBarMessageId }, {
          microservice: projectConnection.content.microservice,
          driverClassName: projectConnection.content.driverClassName,
        })}
        autoHideDuration={4000}
        onRequestClose={this.handleSnackbarRequestClose}
        onActionClick={this.handleSnackbarActionClick}
        action="OK"
      />)

    let result
    switch (this.state.status) {
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
      case EnumConnectivity.NOT_TESTED:
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
