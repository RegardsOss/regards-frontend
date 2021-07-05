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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import SourcesContainer from '../containers/SourcesContainer'
import SessionsContainer from '../containers/SessionsContainer'
import SelectedSessionContainer from '../containers/SelectedSessionContainer'
import { COMPONENT_TYPE_ENUM } from '../domain/componentTypes'

/**
 * DashboardComponent
 * @author Théo Lasserre
 */
class DashboardComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    relaunchStorages: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    fetchSelectedSession: PropTypes.func.isRequired,
    getBackURL: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
    flushSelectedSession: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    sourceFilters: SourcesContainer.extractFiltersFromURL(),
    sessionFilters: SessionsContainer.extractFiltersFromURL(),
    selectedSource: null,
    selectedSession: null,
  }

  onApplyFilters = (filters, type) => {
    const { flushSelectedSession } = this.props
    flushSelectedSession()
    let nextState = {}
    nextState = {
      ...this.state,
      selectedSession: null,
    }
    switch (type) {
      case COMPONENT_TYPE_ENUM.SESSION:
        nextState = {
          ...nextState,
          sessionFilters: filters,
        }
        break
      case COMPONENT_TYPE_ENUM.SOURCE:
        nextState = {
          ...nextState,
          selectedSource: null,
          sourceFilters: filters,
        }
        break
      default:
    }
    this.setState(nextState)
  }

  onSelected = (entity, type) => {
    const { fetchSelectedSession, flushSelectedSession } = this.props
    const {
      selectedSource, selectedSession,
    } = this.state
    let newSelectedSession
    switch (type) {
      case COMPONENT_TYPE_ENUM.SESSION:
        newSelectedSession = !isEqual(entity, selectedSession) ? entity : null
        if (newSelectedSession) {
          fetchSelectedSession(entity.content.id)
        } else {
          flushSelectedSession()
        }
        this.setState({
          selectedSession: newSelectedSession,
        })
        break
      case COMPONENT_TYPE_ENUM.SOURCE:
        flushSelectedSession()
        this.setState({
          selectedSource: !isEqual(entity, selectedSource) ? entity : null,
          selectedSession: null,
        })
        break
      default:
    }
  }

  onDeleteSession = (sessionId) => {
    const { deleteSession } = this.props
    const {
      sourceFilters, sessionFilters, selectedSource, selectedSession,
    } = this.state
    deleteSession(sessionId, sourceFilters, sessionFilters, selectedSource, selectedSession)
  }

  render() {
    const {
      project, getBackURL, relaunchProducts, relaunchAIP, retryRequests,
      onRefresh, relaunchStorages,
      retryFEMRequests,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: { headerDivStyle, cardTitleStyle, cardActionDivStyle },
        dashboardStyle: { dashboardDivStyle, dashboardComponentsStyle, cardTextField },
      },
    } = this.context
    const {
      sourceFilters, sessionFilters, selectedSource, selectedSession,
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
              mainButtonClick={() => onRefresh(sourceFilters, sessionFilters, selectedSource, selectedSession)}
              secondaryButtonLabel={formatMessage({ id: 'dashboard.back' })}
              secondaryButtonClick={getBackURL}
            />
          </CardActions>
        </div>
        <CardText style={cardTextField}>
          <div style={dashboardDivStyle}>
            <div style={dashboardComponentsStyle}>
              <SourcesContainer
                project={project}
                onSelected={this.onSelected}
                selectedSource={selectedSource}
                selectedSession={selectedSession}
                onApplyFilters={this.onApplyFilters}
                filters={sourceFilters}
              />
              <SessionsContainer
                project={project}
                onSelected={this.onSelected}
                selectedSession={selectedSession}
                onApplyFilters={this.onApplyFilters}
                selectedSource={selectedSource}
                filters={sessionFilters}
              />
            </div>
            <SelectedSessionContainer
              project={project}
              onSelected={this.onSelected}
              relaunchProducts={relaunchProducts}
              relaunchAIP={relaunchAIP}
              retryRequests={retryRequests}
              relaunchStorages={relaunchStorages}
              deleteSession={this.onDeleteSession}
              sourceFilters={sourceFilters}
              sessionFilters={sessionFilters}
              retryFEMRequests={retryFEMRequests}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DashboardComponent
