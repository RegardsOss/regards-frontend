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
import { connect } from '@regardsoss/redux'
import compose from 'lodash/fp/compose'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card, CardText, CardTitle, CardActions,
} from 'material-ui/Card'
import {
  sessionsActions, sessionsSelectors, sessionsRelaunchProductActions, sessionsRelaunchAIPActions,
  sessionDeleteActions,
} from '../clients/SessionsClient'
import { sourcesActions, sourcesSelectors } from '../clients/SourcesClient'
import { requestRetryActions } from '../clients/RequestRetryClient'
import SourcesComponent from '../components/SourcesComponent'
import SessionsComponent from '../components/SessionsComponent'
import SelectedSessionComponent from '../components/SelectedSessionComponent'
import { CELL_TYPE_ENUM } from '../domain/cellTypes'
import messages from '../i18n'
import styles from '../styles'

/**
 * DashboardContainer
 * @author Théo Lasserre
 */
export class DashboardContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    sessionsMeta: PropTypes.shape({
      number: PropTypes.number,
    }),
    sourcesMeta: PropTypes.shape({
      number: PropTypes.number,
    }),
    // from mapDispatchToProps
    fetchSessions: PropTypes.func.isRequired,
    fetchSources: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    sessionsMeta: sessionsSelectors.getMetaData(state),
    sourcesMeta: sourcesSelectors.getMetaData(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchSessions: (pageIndex, pageSize, pathParams, queryParams) => dispatch(sessionsActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchSources: (pageIndex, pageSize, pathParams, queryParams) => dispatch(sourcesActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    relaunchProducts: (source, session) => dispatch(sessionsRelaunchProductActions.relaunchProducts(source, session)),
    relaunchAIP: (source, session) => dispatch(sessionsRelaunchAIPActions.relaunchProducts(source, session)),
    retryRequests: (payload, type) => dispatch(requestRetryActions.relaunchProducts('POST', payload, { type })),
    deleteSession: (sessionId) => dispatch(sessionDeleteActions.deleteSession(sessionId)),
  })

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    selectedSource: null,
    selectedSession: null,
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/board`
  }

  getPageSize = (type) => {
    const {
      sessionsMeta, sourcesMeta,
    } = this.props
    let meta
    switch (type) {
      case CELL_TYPE_ENUM.SOURCE:
        meta = sourcesMeta
        break
      case CELL_TYPE_ENUM.SESSION:
        meta = sessionsMeta
        break
      default:
        meta = sourcesMeta
    }
    const lastPage = (meta && meta.number) || 0
    return STATIC_CONF.TABLE.PAGE_SIZE * (lastPage + 1)
  }

  onRefresh = (selectedSession) => {
    const {
      fetchSessions, fetchSources,
    } = this.props
    const fetchPageSessionsSize = this.getPageSize(CELL_TYPE_ENUM.SESSION)
    const fetchPageSourcesSize = this.getPageSize(CELL_TYPE_ENUM.SOURCE)
    fetchSessions(0, fetchPageSessionsSize, {}, { session: selectedSession ? selectedSession.content.name : null })
    fetchSources(0, fetchPageSourcesSize, {}, {})
  }

  onSelected = (entity, type) => {
    const {
      fetchSessions,
    } = this.props
    const {
      selectedSource, selectedSession,
    } = this.state
    let fetchPageSessionsSize
    let nextState = { ...this.state }
    switch (type) {
      case CELL_TYPE_ENUM.SESSION:
        nextState = {
          selectedSession: selectedSession === entity || !entity ? null : entity,
        }
        this.onRefresh(nextState.selectedSession)
        break
      case CELL_TYPE_ENUM.SOURCE:
        nextState = {
          selectedSource: selectedSource !== entity ? entity : null,
        }
        if (nextState.selectedSource !== null) {
          fetchPageSessionsSize = this.getPageSize(CELL_TYPE_ENUM.SESSION, selectedSession)
          fetchSessions(0, fetchPageSessionsSize, {}, { source: nextState.selectedSource.content.name })
        }
        break
      default:
    }
    this.setState(nextState)
  }

  render() {
    const {
      params: { project }, relaunchProducts, relaunchAIP, retryRequests,
      deleteSession,
    } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: { headerDivStyle, cardTitleStyle, cardActionDivStyle },
        dashboardStyle: { dashboardDivStyle, dashboardComponentsStyle, cardTextField },
      },
    } = this.context
    const {
      selectedSource, selectedSession,
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
              mainButtonClick={() => this.onRefresh(selectedSession)}
              secondaryButtonLabel={formatMessage({ id: 'dashboard.back' })}
              secondaryButtonClick={this.getBackURL}
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
              />
              <SessionsComponent
                project={project}
                onSelected={this.onSelected}
                selectedSession={selectedSession}
              />
            </div>
            {this.state.selectedSession
              ? <SelectedSessionComponent
                  project={project}
                  selectedSession={this.state.selectedSession}
                  onSelected={this.onSelected}
                  relaunchProducts={relaunchProducts}
                  relaunchAIP={relaunchAIP}
                  retryRequests={retryRequests}
                  deleteSession={deleteSession}
              />
              : null}
          </div>
        </CardText>
      </Card>
    )
  }
}

export default compose(
  connect(DashboardContainer.mapStateToProps, DashboardContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DashboardContainer)
