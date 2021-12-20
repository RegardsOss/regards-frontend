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
import { browserHistory } from 'react-router'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import SourcesContainer from '../containers/SourcesContainer'
import SessionsContainer from '../containers/SessionsContainer'
import SelectedSessionContainer from '../containers/SelectedSessionContainer'
import { ENTITY_ENUM } from '../domain/entityTypes'

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
    retryWorkerRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    getBackURL: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
    fetchSelectedSession: PropTypes.func.isRequired,
    flushSelectedSession: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    sourceFilters: SourcesContainer.extractFiltersFromURL(),
    sessionFilters: SessionsContainer.extractFiltersFromURL(),
    [ENTITY_ENUM.SOURCE]: '', // id of the currently selected source
    [ENTITY_ENUM.SESSION]: '', // id of the currently selected session
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    // Extract session & source parameters from url
    const { query: currentQuery } = browserHistory.getCurrentLocation()
    let newState = {}
    const selectedSessionId = get(currentQuery, ENTITY_ENUM.SESSION, '')
    const selectedSourceId = get(currentQuery, ENTITY_ENUM.SOURCE, '')
    if (!isEmpty(selectedSessionId)) {
      newState = {
        ...newState,
        [ENTITY_ENUM.SESSION]: selectedSessionId,
      }
    }
    if (!isEmpty(selectedSourceId)) {
      newState = {
        ...newState,
        [ENTITY_ENUM.SOURCE]: selectedSourceId,
      }
    }
    this.setState(newState)
  }

  /**
   * Apply new filters. Either source filters or session filters
   * @param {*} filters
   * @param {*} type
   */
  onApplyFilters = (filters, type) => {
    let nextState = {
      ...this.state,
      [ENTITY_ENUM.SESSION]: '',
    }
    this.onSelected(null, ENTITY_ENUM.SESSION) // clear selected session
    switch (type) {
      case ENTITY_ENUM.SESSION:
        nextState = {
          ...nextState,
          sessionFilters: filters,
        }
        break
      case ENTITY_ENUM.SOURCE:
        nextState = {
          ...nextState,
          sourceFilters: filters,
          [ENTITY_ENUM.SOURCE]: '',
        }
        this.onSelected(null, ENTITY_ENUM.SOURCE) // clear selected source
        break
      default:
    }
    this.setState(nextState)
  }

  /**
   * Get entity id. Depends on a type.
   * @param {*} entity
   * @param {*} type : either source or session
   * @returns
   */
  getEntityId = (entity, type) => type === ENTITY_ENUM.SESSION ? get(entity, 'content.name', -1).toString() : get(entity, 'content.name', '')

  /**
   * Get user selected entity id. Must be different than currently selected. If not, return empty string.
   * Allow to clear url and component state when a user select twice the same entity.
   * @param {*} entity: new entity
   * @param {*} entityId : new entity's id
   * @param {*} selectedEntityId : current selected entity id
   * @returns
   */
  getSelectedEntityId = (entity, entityId, selectedEntityId) => entity && entityId !== selectedEntityId ? entityId : ''

  /**
   * Handle source and session selection
   * @param {*} entity selected
   * @param {*} selectedEntityId previous entity selected id
   * @param {*} type or source or session
   */
  onSelected = (entity, type) => {
    const { flushSelectedSession } = this.props
    const { pathname, query: currentQuery } = browserHistory.getCurrentLocation()
    const entityId = this.getEntityId(entity, type)
    const selectedElementId = this.getSelectedEntityId(entity, entityId, this.state[type])
    let newQuery = {}
    let newState = {}
    let source = ''

    switch (type) {
      case ENTITY_ENUM.SESSION:
        source = entity ? get(entity, 'content.source') : this.state[ENTITY_ENUM.SOURCE]
        if (!isEmpty(selectedElementId)) { // a session is selected
          newQuery = {
            ...currentQuery,
            [ENTITY_ENUM.SESSION]: selectedElementId,
            [ENTITY_ENUM.SOURCE]: source,
          }
        } else if (isEmpty(selectedElementId) && !isEmpty(this.state[ENTITY_ENUM.SOURCE])) { // a session is unselected and a source exist
          newQuery = {
            [ENTITY_ENUM.SOURCE]: this.state[ENTITY_ENUM.SOURCE],
          }
          flushSelectedSession()
        }
        newState = {
          ...this.state,
          [ENTITY_ENUM.SESSION]: selectedElementId,
          [ENTITY_ENUM.SOURCE]: source,
        }
        break
      case ENTITY_ENUM.SOURCE:
        if (!isEmpty(selectedElementId)) { // a source is selected
          newQuery = {
            [ENTITY_ENUM.SOURCE]: selectedElementId,
          }
        }
        newState = {
          ...this.state,
          [ENTITY_ENUM.SOURCE]: selectedElementId,
          [ENTITY_ENUM.SESSION]: '',
        }
        flushSelectedSession()
        break
      default:
    }

    // Update url & state
    browserHistory.replace({
      pathname,
      query: newQuery,
    })
    this.setState(newState)
  }

  render() {
    const {
      project, getBackURL, relaunchProducts, relaunchAIP, retryWorkerRequests,
      onRefresh, relaunchStorages,
      retryFEMRequests, deleteSession, fetchSelectedSession,
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
    const selectedSourceId = this.state[ENTITY_ENUM.SOURCE]
    const selectedSessionId = this.state[ENTITY_ENUM.SESSION]
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
              mainButtonClick={() => onRefresh(sourceFilters, sessionFilters, selectedSourceId, selectedSessionId)}
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
                onApplyFilters={this.onApplyFilters}
                filters={sourceFilters}
                selectedSessionId={selectedSessionId}
                selectedSourceId={selectedSourceId}
              />
              <SessionsContainer
                project={project}
                onSelected={this.onSelected}
                onApplyFilters={this.onApplyFilters}
                filters={sessionFilters}
                selectedSessionId={selectedSessionId}
                selectedSourceId={selectedSourceId}
                fetchSelectedSession={fetchSelectedSession}
              />
            </div>
            <SelectedSessionContainer
              project={project}
              onSelected={this.onSelected}
              relaunchProducts={relaunchProducts}
              relaunchAIP={relaunchAIP}
              retryWorkerRequests={retryWorkerRequests}
              relaunchStorages={relaunchStorages}
              deleteSession={deleteSession}
              retryFEMRequests={retryFEMRequests}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DashboardComponent
