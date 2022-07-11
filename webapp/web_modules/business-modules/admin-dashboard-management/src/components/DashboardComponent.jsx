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
import { browserHistory } from 'react-router'
import get from 'lodash/get'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'
import RaisedButton from 'material-ui/RaisedButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import SourcesContainer from '../containers/SourcesContainer'
import SessionsContainer from '../containers/SessionsContainer'
import SelectedSessionContainer from '../containers/SelectedSessionContainer'
import DashboardFiltersComponent from './DashboardFiltersComponent'
import { ENTITY_ENUM } from '../domain/entityTypes'
import { SOURCE_FILTER_PARAMS, SESSION_FILTER_PARAMS } from '../domain/filters'
import { STATUS_TYPES_ENUM } from '../domain/statusTypes'

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
    sourceFilters: {},
    sessionFilters: {},
    [ENTITY_ENUM.SOURCE]: '', // id of the currently selected source
    [ENTITY_ENUM.SESSION]: '', // id of the currently selected session
    isPaneOpened: false,
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
            ...omitBy(currentQuery, (value, key) => key === ENTITY_ENUM.SESSION),
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
            ...omitBy(currentQuery, (value, key) => key === ENTITY_ENUM.SESSION),
            [ENTITY_ENUM.SOURCE]: selectedElementId,
          }
        } else {
          newQuery = {
            ...omitBy(currentQuery, (value, key) => key === ENTITY_ENUM.SESSION || key === ENTITY_ENUM.SOURCE),
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
      search: new URLSearchParams(newQuery).toString(),
      query: newQuery,
    })
    this.setState(newState)
  }

  handleFiltersPane = () => {
    this.setState({
      isPaneOpened: !this.state.isPaneOpened,
    })
  }

  updateRequestParameters = (requestParameters) => {
    this.setState({
      sourceFilters: {
        [SOURCE_FILTER_PARAMS.NAME]: get(requestParameters, `${SOURCE_FILTER_PARAMS.NAME}`, ''),
        [SOURCE_FILTER_PARAMS.STATUS]: get(requestParameters, `${SOURCE_FILTER_PARAMS.STATUS}`, STATUS_TYPES_ENUM.ALL),
      },
      sessionFilters: {
        [SESSION_FILTER_PARAMS.NAME]: get(requestParameters, `${SESSION_FILTER_PARAMS.NAME}`, ''),
        [SESSION_FILTER_PARAMS.STATUS]: get(requestParameters, `${SESSION_FILTER_PARAMS.STATUS}`, STATUS_TYPES_ENUM.ALL),
      },
    })
  }

  render() {
    const {
      project, getBackURL, relaunchProducts, relaunchAIP, retryWorkerRequests,
      onRefresh, relaunchStorages,
      retryFEMRequests, fetchSelectedSession,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: {
          headerDivStyle, cardTitleStyle, cardActionDivStyle, filterButtonStyle,
        },
        dashboardStyle: { dashboardDivStyle, dashboardComponentsStyle, cardTextField },
      },
    } = this.context
    const {
      sourceFilters, sessionFilters, isPaneOpened,
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
            <RaisedButton
              onClick={this.handleFiltersPane}
              label={formatMessage({ id: 'dashboard.filter' })}
              secondary
              style={filterButtonStyle}
            />
          </CardActions>
        </div>
        <DashboardFiltersComponent
          isPaneOpened={isPaneOpened}
          onCloseFiltersPane={this.handleFiltersPane}
          updateRequestParameters={this.updateRequestParameters}
        />
        <CardText style={cardTextField}>
          <div style={dashboardDivStyle}>
            <div style={dashboardComponentsStyle}>
              <SourcesContainer
                project={project}
                onSelected={this.onSelected}
                filters={sourceFilters}
                selectedSessionId={selectedSessionId}
                selectedSourceId={selectedSourceId}
              />
              <SessionsContainer
                project={project}
                onSelected={this.onSelected}
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
              retryFEMRequests={retryFEMRequests}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}
export default DashboardComponent
