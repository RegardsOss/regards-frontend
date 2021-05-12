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
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { FemDomain, IngestDomain } from '@regardsoss/domain'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'
import { INGEST_PROP_TYPE } from '../domain/ingestPropTypes'

const REFERENCING_TYPE = {
  FEATURE: 'feature',
  OAIS: 'oais',
}

/**
 * ReferencingComponent
 * @author Théo Lasserre
 */
class ReferencingComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    selectedSession: AdminShapes.Session,
    relaunchAIP: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
  }

  onSeeErrors = (type) => {
    const { project, selectedSession } = this.props
    switch (type) {
      case REFERENCING_TYPE.FEATURE:
        browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/${FemDomain.REQUEST_TYPES_ENUM.CREATION}?session=${selectedSession.content.name}&state=${FemDomain.REQUEST_STATUS_ENUM.ERROR}`)
        break
      case REFERENCING_TYPE.OAIS:
        browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&session=${selectedSession.content.name}&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR}`)
        break
      default:
    }
  }

  onSeeReferenced = (type) => {
    const { project, selectedSession } = this.props
    switch (type) {
      case REFERENCING_TYPE.FEATURE:
        browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor?session=${selectedSession.content.name}`)
        break
      case REFERENCING_TYPE.OAIS:
        browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=packages&session=${selectedSession.content.name}`)
        break
      default:
    }
  }

  onRetryFEMErrors = () => {
    const { sessionStep, retryRequests } = this.props
    forEach(FemDomain.REQUEST_TYPES, (reqType) => {
      if (reqType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES
        || reqType !== FemDomain.REQUEST_TYPES_ENUM.EXTRACTION) {
        retryRequests({
          filters: {
            session: sessionStep.session,
            source: sessionStep.source,
          },
          requestIdSelectionMode: 'EXCLUDE',
          requestIds: [],
        }, reqType)
      }
    })
  }

  onRetryErrors = (type) => {
    const { relaunchAIP, sessionStep } = this.props
    switch (type) {
      case REFERENCING_TYPE.FEATURE:
        this.onRetryFEMErrors()
        break
      case REFERENCING_TYPE.OAIS:
        relaunchAIP(sessionStep.source, sessionStep.session)
        break
      default:
    }
    this.closeRetryErrorsDialog()
  }

  onSeeWaiting = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE}`)
  }

  // Case FeatureManager
  displayFEM = (nbErrors) => {
    const { sessionStep } = this.props
    const { intl: { formatMessage }, moduleTheme: { raisedListStyle, selectedSessionStyle: { cardContentStyle, cardButtonStyle, listItemStyle } } } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.in' }, { nbIn: sessionStep.inputRelated })}
          style={listItemStyle}
          disabled
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.suppress' }, { nbSuppress: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.maj' }, { nbMaj: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.error' }, { nbError: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.refused' }, { nbRefused: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.referenced' }, { nbReferenced: sessionStep.outputRelated })}
          disabled
          style={listItemStyle}
        />
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={() => this.onSeeReferenced(REFERENCING_TYPE.FEATURE)}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbErrors !== 0
            ? (<div style={cardButtonStyle}>
              <RaisedButton
                onClick={() => this.onSeeErrors(REFERENCING_TYPE.FEATURE)}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={() => this.openRetryErrorsDialog()}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>)
            : null
        }

      </div>
    </div>
  }

  displayIngestListItem = (ingestPropType) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          listItemStyle,
        },
      },
    } = this.context
    const propValue = get(sessionStep, `properties.${ingestPropType}`, false)
    if (propValue) {
      return (
        <ListItem
          key={ingestPropType}
          primaryText={formatMessage({ id: `dashboard.selectedsession.referencing.dp.${ingestPropType}` }, { value: propValue })}
          disabled
          style={listItemStyle}
        />
      )
    }
    return null
  }

  // Case DataProvider
  displayIngest = (nbErrors, nbWaiting, nbRunning) => {
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle,
        },
      },
    } = this.context
    return <div style={cardContentStyle}>
      <div>
        {
          map(INGEST_PROP_TYPE, (propType) => (this.displayIngestListItem(propType)))
        }
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={() => this.onSeeReferenced(REFERENCING_TYPE.OAIS)}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onSeeWaiting}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-waiting' })}
                primary
                style={raisedListStyle}
            /> : null
        }
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={() => this.onSeeErrors(REFERENCING_TYPE.OAIS)}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={() => this.openRetryErrorsDialog()}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>
            : null
        }

      </div>
    </div>
  }

  openRetryErrorsDialog = () => {
    this.setState({
      isRetryErrorsDialogOpen: true,
    })
  }

  closeRetryErrorsDialog = () => {
    this.setState({
      isRetryErrorsDialogOpen: false,
    })
  }

  renderRetryErrorsDialog = (type) => {
    const { intl: { formatMessage } } = this.context
    const { isRetryErrorsDialogOpen } = this.state
    if (isRetryErrorsDialogOpen) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.CONFIRM}
          title={formatMessage({ id: 'dashboard.selectedsession.dialog.retry.title' })}
          onConfirm={() => this.onRetryErrors(type)}
          onClose={() => this.closeRetryErrorsDialog()}
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
          cardStyle, cardTitleDivStyle, cardTitleStyle, cardTitleTextStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, 'state.errors', 0)
    const nbWaiting = get(sessionStep, 'state.waiting', 0)
    const nbRunning = get(sessionStep, 'state.running', 0)
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.referencing.title' })}
              style={cardTitleStyle}
              titleStyle={cardTitleTextStyle}
            />
            <DisplayIconsComponent
              entity={sessionStep}
              displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
            />
          </div>
          <CardText>
            {sessionStep.stepId === REFERENCING_TYPE.FEATURE ? this.displayFEM(nbErrors, nbWaiting, nbRunning) : this.displayIngest(nbErrors, nbWaiting, nbRunning)}
          </CardText>
          {this.renderRetryErrorsDialog(sessionStep.stepId)}
        </Card> : null
    )
  }
}
export default ReferencingComponent
