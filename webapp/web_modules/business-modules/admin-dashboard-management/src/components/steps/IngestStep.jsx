/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { IngestDomain } from '@regardsoss/domain'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { INGEST_PROPERTIES, INGEST_PROPERTIES_ENUM } from '../../domain/ingestProperties'

/**
 * IngestStep
 * @author Théo Lasserre
 */
class IngestStep extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    selectedSession: AdminShapes.Session,
    relaunchAIP: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
  }

  onSeeErrors = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&session=${selectedSession.content.name}&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR}`)
  }

  onSeeReferenced = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=packages&session=${selectedSession.content.name}`)
  }

  onRetryErrors = () => {
    const { relaunchAIP, sessionStep } = this.props
    relaunchAIP(sessionStep.source, sessionStep.session)
    this.toggleRetryErrorsDialog()
  }

  onSeeWaiting = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE}`)
  }

  displayListItem = (property) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          listItemStyle, listItemNoValueStyle, listItemErrorStyle, listItemWaitStyle, listItemWithSpace,
        },
      },
    } = this.context
    const propValue = get(sessionStep, `properties.${property}`, false)
    let style = listItemNoValueStyle
    if (propValue > 0) {
      style = listItemStyle
    }
    if (property === INGEST_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
    } else if (property === INGEST_PROPERTIES_ENUM.PRODUCT_WAIT_VERSION_MODE) {
      // style = propValue > 0 ? listItemWaitStyle : listItemNoValueStyle
      style = listItemWaitStyle
    } else if (property === INGEST_PROPERTIES_ENUM.NEW_PRODUCT_VERSIONS) {
      style = {
        ...style,
        ...listItemWithSpace,
      }
    }
    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.referencing.ingest.${property}` }, { value: propValue || 0 })}
        disabled
        style={style}
      />
    )
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
    if (isRetryErrorsDialogOpen) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.CONFIRM}
          title={formatMessage({ id: 'dashboard.selectedsession.dialog.retry.title' })}
          onConfirm={this.onRetryErrors}
          onClose={this.toggleRetryErrorsDialog}
        />
      )
    }
    return null
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemDivStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, 'state.errors', 0)
    const nbWaiting = get(sessionStep, 'state.waiting', 0)
    return <div style={cardContentStyle}>
      <div style={listItemDivStyle}>
        {
          map(INGEST_PROPERTIES, (property) => (this.displayListItem(property)))
        }
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={this.onSeeReferenced}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.ingest.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onSeeWaiting}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.ingest.button.see-waiting' })}
                primary
                style={raisedListStyle}
            /> : null
        }
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onSeeErrors}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.ingest.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.ingest.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>
            : null
        }
      </div>
      {this.renderRetryErrorsDialog()}
    </div>
  }
}
export default IngestStep
