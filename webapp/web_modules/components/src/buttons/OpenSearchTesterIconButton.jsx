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
import compose from 'lodash/fp/compose'
import get from 'lodash/get'
import Check from 'mdi-material-ui/Check'
import Error from 'mdi-material-ui/AlertCircle'
import Snackbar from 'material-ui/Snackbar'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import messages from './i18n'
import styles from './styles'

const states = {
  NOT_TESTED: 'not_tested',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
}
/**
 * An ergonmy button starting a connectivity test for th  14:10  error  'Connection' is defined but never used                             no-unused-vars
e passed {@link Connection}.<br>
 * The result of the test is displayed in place of the button, and hovering the result allows to restart the test.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 * @author Théo Lasserre
 */
class OpenSearchTesterIconButton extends React.Component {
  static propTypes = {
    openSearchRequest: PropTypes.string,
    handleTestOpenSearchRequest: PropTypes.func.isRequired,
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
        return 'opensearch.tester.button.snackbar.success'
      case states.ERROR:
        return 'opensearch.tester.button.snackbar.error'
      default:
        return 'opensearch.tester.button.snackbar.success'
    }
  }

  handleTouchTap = () => {
    this.setState({
      status: states.PENDING,
      snackBarOpen: false,
    })
    const { handleTestOpenSearchRequest, openSearchRequest } = this.props
    Promise.resolve(handleTestOpenSearchRequest(openSearchRequest))
      .then((resultingAction) => {
        if (resultingAction.error || !get(resultingAction, 'payload.validity', false)) {
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
    const { moduleTheme: { openSearchTesterStyle: { progressIconStyle } } } = this.context
    const testButton = (
      <RaisedButton
        label={this.context.intl.formatMessage({ id: 'opensearch.tester.button.label' })}
        secondary
        onClick={this.handleTouchTap}
      />)

    const successButton = (<RaisedButton
      label={this.context.intl.formatMessage({ id: 'opensearch.tester.button.label' })}
      icon={<Check color={this.context.muiTheme.palette.primary3Color} />}
      secondary
      onClick={this.handleTouchTap}
    />)

    const errorButton = (<RaisedButton
      label={this.context.intl.formatMessage({ id: 'opensearch.tester.button.label' })}
      icon={<Error color={this.context.muiTheme.palette.accent1Color} />}
      secondary
      onClick={this.handleTouchTap}
    />)

    const pendingProgress = <CircularProgress size={24} style={progressIconStyle} thickness={2.5} />

    const snackbar = (<Snackbar
      open={this.state.snackBarOpen}
      message={this.context.intl.formatMessage({ id: this.getSnackBarMessageId(this.state.status) })}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackbarRequestClose}
      onActionClick={this.handleSnackbarActionClick}
      action="OK"
    />)

    let result = testButton
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

export default compose(withI18n(messages), withModuleStyle(styles))(OpenSearchTesterIconButton)
