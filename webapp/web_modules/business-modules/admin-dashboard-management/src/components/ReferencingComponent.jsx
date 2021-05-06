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
import { browserHistory } from 'react-router'
import { FemDomain, IngestDomain } from '@regardsoss/domain'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { IMPL_TYPE_ENUM } from '../domain/implTypes'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'

/**
 * ReferencingComponent
 * @author Théo Lasserre
 */
class ReferencingComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    relaunchAIP: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onSeeErrors = (type) => {
    const { project } = this.props
    switch (type) {
      case IMPL_TYPE_ENUM.FEM:
        browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/${FemDomain.REQUEST_TYPES_ENUM.CREATION}?state=${FemDomain.REQUEST_STATUS_ENUM.ERROR}`)
        break
      case IMPL_TYPE_ENUM.DP:
        browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.ERROR}`)
        break
      default:
    }
  }

  onSeeReferenced = (type) => {
    const { project } = this.props
    switch (type) {
      case IMPL_TYPE_ENUM.FEM:
        browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor`)
        break
      case IMPL_TYPE_ENUM.DP:
        browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager`)
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
      case IMPL_TYPE_ENUM.FEM:
        this.onRetryFEMErrors()
        break
      case IMPL_TYPE_ENUM.DP:
        relaunchAIP(sessionStep.source, sessionStep.session)
        break
      default:
    }
  }

  onSeeWaiting = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE}`)
  }

  // Case FeatureManager
  displayFEM = (nbErrors) => {
    const { sessionStep } = this.props
    const { intl: { formatMessage }, moduleTheme: { raisedListStyle, selectedSession: { cardContentStyle, cardButtonStyle, listItemStyle } } } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.in' }, { nbIn: sessionStep.in })}
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
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.referenced' }, { nbReferenced: sessionStep.out })}
          disabled
          style={listItemStyle}
        />
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={() => this.onSeeReferenced(IMPL_TYPE_ENUM.FEM)}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbErrors !== 0
            ? (<div style={cardButtonStyle}>
              <RaisedButton
                onClick={() => this.onSeeErrors(IMPL_TYPE_ENUM.FEM)}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={() => this.onRetryErrors(IMPL_TYPE_ENUM.FEM)}
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

  // Case DataProvider
  displayDP = (nbErrors) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSession: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemStyle,
        },
      },
    } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.in' }, { nbIn: sessionStep.properties.total_requests })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.error' }, { nbError: sessionStep.properties.requests_errors })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.referenced' }, { nbReferenced: sessionStep.properties.generated_products })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.version' }, { nbVersion: sessionStep.properties.new_product_versions })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.replaced' }, { nbReplaced: sessionStep.properties.replaced_products })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.ignore' }, { nbIgnored: sessionStep.properties.ignored_products })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.wait' }, { nbWaiting: sessionStep.properties.product_wait_version_mode })}
          disabled
          style={listItemStyle}
        />
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={() => this.onSeeReferenced(IMPL_TYPE_ENUM.FEM)}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        <RaisedButton
          onClick={this.onSeeWaiting}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-waiting' })}
          primary
          style={raisedListStyle}
        />
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={() => this.onSeeErrors(IMPL_TYPE_ENUM.DP)}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={() => this.onRetryErrors(IMPL_TYPE_ENUM.DP)}
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

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSession: {
          cardStyle, cardTitleDivStyle, cardTitleStyle, cardTitleTextStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, 'state.errors', 0)
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
            {sessionStep.stepId === '0' ? this.displayFEM(nbErrors) : this.displayDP(nbErrors)}
          </CardText>
        </Card> : null
    )
  }
}
export default ReferencingComponent
