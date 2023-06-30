/**
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
 **/
import { Link } from 'react-router'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { WorkerDomain, UIDomain } from '@regardsoss/domain'
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

  getErrorsURL = () => {
    const { project, sessionStep: { session, source } } = this.props
    return UIDomain.FiltersPaneHelper.buildLocationDescriptorObject(WorkerDomain.RequestFilters.builder(session, source).withStatusError().build(), [],
      `/admin/${project}/data/acquisition/datapreparation/requests`)
  }

  onRetryErrors = () => {
    const { retryWorkerRequests, sessionStep: { session, source } } = this.props
    const queryParameters = WorkerDomain.RequestFilters.builder(session, source).withStatusError().build()
    return retryWorkerRequests(queryParameters)
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
          raisedListStyle, cardButtonStyle, raisedListLabelStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    return (
      <div style={cardButtonStyle}>
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <Link to={this.getErrorsURL}>
                <RaisedButton
                  label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.button.see-errors' })}
                  primary
                  style={raisedListStyle}
                  labelStyle={raisedListLabelStyle}
                />
              </Link>
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.workers.button.retry-errors' })}
                primary
                style={raisedListStyle}
                labelStyle={raisedListLabelStyle}
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
