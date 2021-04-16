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
import { sessionsActions, sessionsSelectors } from '../clients/SessionsClient'
import { sourcesActions, sourcesSelectors } from '../clients/SourcesClient'
import SourcesComponent from '../components/SourcesComponent'
import SessionsComponent from '../components/SessionsComponent'
import SelectedSessionComponent from '../components/SelectedSessionComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * DashboardContainer
 * @author Théo Lasserre
 */
export class DashboardContainer extends React.Component {
  static PAGE_SIZE = 20

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

  getPageSize = (meta) => {
    const lastPage = (meta && meta.number) || 0
    return DashboardContainer.PAGE_SIZE * (lastPage + 1)
  }

  onRefresh = () => {
    const {
      sessionsMeta, sourcesMeta, fetchSessions, fetchSources,
    } = this.props
    const fetchPageSessionsSize = this.getPageSize(sessionsMeta)
    const fetchPageSourcesSize = this.getPageSize(sourcesMeta)
    fetchSessions(0, fetchPageSessionsSize, {}, {})
    fetchSources(0, fetchPageSourcesSize, {}, {})
  }

  onSourceSelected = (source) => {
    const {
      sessionsMeta, fetchSessions,
    } = this.props
    this.setState({
      selectedSource: source,
    })
    const fetchPageSessionsSize = this.getPageSize(sessionsMeta)
    fetchSessions(0, fetchPageSessionsSize, {}, { source })
  }

  onSessionSelected = () => {

  }

  render() {
    const { params: { project } } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        headerStyle: { headerDivStyle, cardTitleStyle, cardActionDivStyle },
        dashboardStyle: { dashboardDivStyle, dashboardComponentsStyle },
      },
    } = this.context
    const selectedSession = { // TODO REMOVE
      content: {
        id: 0,
        source: 'TEST_SOURCE',
        name: 'TEST_NAME',
        creationDate: 'TEST_DATE',
        lastUpdateDate: 'TEST_DATE',
        steps: [{
          stepId: '0',
          source: 'TEST_SOURCE',
          session: 'TEST_SESSION',
          type: 'ACQUISITION',
          in: 1000,
          out: 994,
          state: {
            errors: 2,
            waiting: 3,
            running: true,
          },
          properties: '',
          lastUpdate: 'TEST_DATE',
        }, {
          stepId: '0',
          source: 'TEST_SOURCE',
          session: 'TEST_SESSION',
          type: 'REFERENCEMENT',
          in: 1000,
          out: 994,
          state: {
            errors: 2,
            waiting: 3,
            running: true,
          },
          properties: '',
          lastUpdate: 'TEST_DATE',
        }, {
          stepId: '0',
          source: 'TEST_SOURCE',
          session: 'TEST_SESSION',
          type: 'STORAGE',
          in: 1000,
          out: 994,
          state: {
            errors: 2,
            waiting: 3,
            running: true,
          },
          properties: '',
          lastUpdate: 'TEST_DATE',
        }, {
          stepId: '0',
          source: 'TEST_SOURCE',
          session: 'TEST_SESSION',
          type: 'DISSEMINATION',
          in: 1000,
          out: 994,
          state: {
            errors: 2,
            waiting: 3,
            running: true,
          },
          properties: '',
          lastUpdate: 'TEST_DATE',
        }],
        running: true,
        error: true,
        waiting: true,
      },
    }
    const selectedSource = {
      content: {
        name: 'Test_Source1',
        nbSessions: 1,
        steps: [
          {
            source: 'Test_Source1',
            type: 'ACQUISITION',
            totalIn: 30,
            totalOut: 30,
            state: {
              errors: 3,
              waiting: 2,
              running: true,
            },
          },
          {
            source: 'Test_Source1',
            type: 'REFERENCEMENT',
            totalIn: 30,
            totalOut: 30,
            state: {
              errors: 3,
              waiting: 2,
              running: true,
            },
          },
          {
            source: 'Test_Source1',
            type: 'STORAGE',
            totalIn: 30,
            totalOut: 30,
            state: {
              errors: 3,
              waiting: 2,
              running: true,
            },
          },
          {
            source: 'Test_Source1',
            type: 'DISSEMINATION',
            totalIn: 30,
            totalOut: 30,
            state: {
              errors: 3,
              waiting: 2,
              running: true,
            },
          },
        ],
        lastUpdate: '01/01/21',
        running: true,
        error: true,
        waiting: true,
      },
      links: [],
    }
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
              mainButtonClick={this.onRefresh}
              secondaryButtonLabel={formatMessage({ id: 'dashboard.back' })}
              secondaryButtonClick={this.getBackURL}
            />
          </CardActions>
        </div>
        <CardText>
          <div style={dashboardDivStyle}>
            <div style={dashboardComponentsStyle}>
              <SourcesComponent
                project={project}
                onSourceSelected={this.onSourceSelected}
                selectedSource={selectedSource}
              />
              <SessionsComponent
                project={project}
                onSessionSelected={this.onSessionSelected}
                selectedSession={selectedSession}
              />
            </div>
            <div />
            <SelectedSessionComponent
              selectedSession={selectedSession}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}

export default compose(
  connect(DashboardContainer.mapStateToProps, DashboardContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DashboardContainer)
