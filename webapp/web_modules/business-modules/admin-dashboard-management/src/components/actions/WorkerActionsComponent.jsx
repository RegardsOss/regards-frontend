/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ConfirmDialogComponent, ConfirmDialogComponentTypes, TableSelectionModes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { WorkerDomain, CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

/**
   * @author Théo Lasserre
   */
class WorkerActionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    retryWorkerRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
  }

  onSeeErrors = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/datapreparation/requests?${WorkerDomain.REQUEST_FILTERS.STATUSES}=${WorkerDomain.REQUEST_STATUS_ENUM.ERROR}`)
  }

  onSeeWaiting = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/datapreparation/requests?${WorkerDomain.REQUEST_FILTERS.STATUSES}=${WorkerDomain.REQUEST_STATUS_ENUM.TO_DISPATCH}`)
  }

  onRetryErrors = () => {
    const { retryWorkerRequests } = this.props
    return retryWorkerRequests({
      [WorkerDomain.REQUEST_FILTERS.STATUSES]: {
        [CommonDomain.REQUEST_PARAMETERS.VALUES]: WorkerDomain.REQUEST_STATUS_ENUM.ERROR,
        [CommonDomain.REQUEST_PARAMETERS.MODE]: TableSelectionModes.INCLUDE,
      },
    })
  }

  toggleRetryErrorsDialog = () => {
    const { isRetryErrorsDialogOpen } = this.state
    this.setState({
      isRetryErrorsDialogOpen: !isRetryErrorsDialogOpen,
    })
  }

  renderRetryErrorsDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { isRetryErrorsDialogOpen } = this.state
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        title={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.dialog.retry.title' })}
        message={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.dialog.retry.message' })}
        onConfirm={this.onRetryErrors}
        onClose={this.toggleRetryErrorsDialog}
        open={isRetryErrorsDialogOpen}
      />
    )
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          raisedListStyle, cardButtonStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    const nbWaiting = get(sessionStep, `state.${ICON_TYPE_ENUM.WAITING}`, 0)
    return (
      <div style={cardButtonStyle}>
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onSeeWaiting}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.button.see-waiting' })}
                primary
                style={raisedListStyle}
            />
            : null
        }
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onSeeErrors}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>
            : null
        }
        {this.renderRetryErrorsDialog()}
      </div>
    )
  }
}
export default WorkerActionsComponent
