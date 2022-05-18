/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import get from 'lodash/get'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

/**
 * @author Théo Lasserre
 */
class StorageActionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    relaunchStorages: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
  }

  toggleRetryErrorsDialog = () => {
    const { isRetryErrorsDialogOpen } = this.state
    this.setState({
      isRetryErrorsDialogOpen: !isRetryErrorsDialogOpen,
    })
  }

  renderRetryErrorsDialog = (type) => {
    const { intl: { formatMessage } } = this.context
    const { isRetryErrorsDialogOpen } = this.state
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        title={formatMessage({ id: 'dashboard.selectedsession.STORAGE.archival.dialog.retry.title' })}
        message={formatMessage({ id: 'dashboard.selectedsession.STORAGE.archival.dialog.retry.message' })}
        onConfirm={this.onRetryErrors}
        onClose={this.toggleRetryErrorsDialog}
        open={isRetryErrorsDialogOpen}
      />
    )
  }

  onRetryErrors = () => {
    const { relaunchStorages, sessionStep } = this.props
    return relaunchStorages({
      source: sessionStep.source,
      session: sessionStep.session,
    })
  }

  onClick = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/storage/storages`)
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          raisedListStyle, cardButtonStyle, raisedListLabelStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    return (
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={this.onClick}
          label={formatMessage({ id: 'dashboard.selectedsession.STORAGE.archival.button.see-stockage' })}
          primary
          style={raisedListStyle}
          labelStyle={raisedListLabelStyle}
        />
        {
        nbErrors !== 0
          ? <RaisedButton
              onClick={this.toggleRetryErrorsDialog}
              label={formatMessage({ id: 'dashboard.selectedsession.STORAGE.archival.button.retry-errors' })}
              primary
              style={raisedListStyle}
              labelStyle={raisedListLabelStyle}
          /> : null
        }
        {this.renderRetryErrorsDialog()}
      </div>
    )
  }
}
export default StorageActionsComponent
