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
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import { AdminShapes } from '@regardsoss/shape'
import SourcesComponent from './SourcesComponent'
import SessionsComponent from './SessionsComponent'
import SelectedSessionComponent from './SelectedSessionComponent'
import { CELL_TYPE_ENUM } from '../domain/cellTypes'

/**
 * DashboardComponent
 * @author Théo Lasserre
 */
class DashboardComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    selectedSession: AdminShapes.Session,
    selectedSource: AdminShapes.Source,
    fetchSelectedSession: PropTypes.func.isRequired,
    fetchSelectedSource: PropTypes.func.isRequired,
    getBackURL: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onFlushSelectedSession: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    sourceFilters: SourcesComponent.DEFAULT_FILTERS_STATE,
    sessionFilters: SessionsComponent.DEFAULT_FILTERS_STATE,
  }

  onApplyFilters = (filters, type) => {
    let nextState = {
      ...this.state,
    }
    switch (type) {
      case CELL_TYPE_ENUM.SESSION:
        nextState = {
          ...this.state,
          sessionFilters: filters,
        }
        break
      case CELL_TYPE_ENUM.SOURCE:
        nextState = {
          ...this.state,
          sourceFilters: filters,
        }
        break
      default:
    }
    this.setState(nextState)
  }

  onSelected = (entity, type) => {
    const {
      fetchSelectedSession, fetchSelectedSource, selectedSource, selectedSession, onFlushSelectedSession,
    } = this.props
    const {
      sessionFilters,
    } = this.state
    switch (type) {
      case CELL_TYPE_ENUM.SESSION:
        onFlushSelectedSession()
        fetchSelectedSession(entity && !isEqual(entity, selectedSession) ? entity.content.id : null)
        break
      case CELL_TYPE_ENUM.SOURCE:
        fetchSelectedSource(!isEqual(entity, selectedSource) ? entity : null, sessionFilters)
        break
      default:
    }
  }

  onDeleteSession = (sessionId) => {
    const { deleteSession } = this.props
    const { sourceFilters, sessionFilters } = this.state
    deleteSession(sessionId, sourceFilters, sessionFilters)
  }

  render() {
    const {
      project, getBackURL, relaunchProducts, relaunchAIP, retryRequests,
      onRefresh, selectedSession, selectedSource,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: { headerDivStyle, cardTitleStyle, cardActionDivStyle },
        dashboardStyle: { dashboardDivStyle, dashboardComponentsStyle, cardTextField },
      },
    } = this.context
    const {
      sourceFilters, sessionFilters,
    } = this.state
    return (
      <Card>
        <div style={headerDivStyle}>
          <CardTitle
            title={formatMessage({ id: 'dashboard.title' })}
            style={cardTitleStyle}
          />
          <CardActions style={cardActionDivStyle}>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'dashboard.refresh' })}
              mainButtonType="submit"
              mainButtonClick={() => onRefresh(sourceFilters, sessionFilters)}
              secondaryButtonLabel={formatMessage({ id: 'dashboard.back' })}
              secondaryButtonClick={getBackURL}
            />
          </CardActions>
        </div>
        <CardText style={cardTextField}>
          <div style={dashboardDivStyle}>
            <div style={dashboardComponentsStyle}>
              <SourcesComponent
                project={project}
                onSelected={this.onSelected}
                selectedSource={selectedSource}
                selectedSession={selectedSession}
                onApplyFilters={this.onApplyFilters}
              />
              <SessionsComponent
                project={project}
                onSelected={this.onSelected}
                selectedSession={selectedSession}
                onApplyFilters={this.onApplyFilters}
              />
            </div>
            {!isEmpty(selectedSession)
              ? <SelectedSessionComponent
                  project={project}
                  selectedSession={selectedSession}
                  onSelected={this.onSelected}
                  relaunchProducts={relaunchProducts}
                  relaunchAIP={relaunchAIP}
                  retryRequests={retryRequests}
                  deleteSession={this.onDeleteSession}
                  sourceFilters={sourceFilters}
                  sessionFilters={sessionFilters}
              />
              : null}
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DashboardComponent
