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
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { IngestDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

/**
  * @author Théo Lasserre
  */
class IngestActionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    relaunchAIP: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
  }

  getIngestURL = (status = null) => `/admin/${this.props.project}/data/acquisition/oais/featureManager?display=requests&sessionOwner=${encodeURIComponent(this.props.sessionStep.source)}&session=${encodeURIComponent(this.props.sessionStep.session)}${status ? `&state=${status}` : ''}`

  onSeeErrors = () => browserHistory.push(this.getIngestURL(IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR))

  onSeeReferenced = () => browserHistory.push(`/admin/${this.props.project}/data/acquisition/oais/featureManager?display=packages&sessionOwner=${encodeURIComponent(this.props.sessionStep.source)}&session=${encodeURIComponent(this.props.sessionStep.session)}`)

  onSeeWaiting = () => browserHistory.push(this.getIngestURL(IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE))

  onRetryErrors = () => {
    const { relaunchAIP, sessionStep } = this.props
    relaunchAIP(sessionStep.source, sessionStep.session)
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
        title={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.dialog.retry.title' })}
        message={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.dialog.retry.message' })}
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

    return (<div style={cardButtonStyle}>
      <RaisedButton
        onClick={this.onSeeReferenced}
        label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.see-referenced' })}
        primary
        style={raisedListStyle}
      />
      {
        nbWaiting !== 0
          ? <RaisedButton
              onClick={this.onSeeWaiting}
              label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.see-waiting' })}
              primary
              style={raisedListStyle}
          /> : null
      }
      {
        nbErrors !== 0
          ? <div style={cardButtonStyle}>
            <RaisedButton
              onClick={this.onSeeErrors}
              label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.see-errors' })}
              primary
              style={raisedListStyle}
            />
            <RaisedButton
              onClick={this.toggleRetryErrorsDialog}
              label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.retry-errors' })}
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
export default IngestActionsComponent
