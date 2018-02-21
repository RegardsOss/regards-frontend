/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import SIPSessionListComponent from '../components/monitoring/session/SIPSessionListComponent'
import { sessionActions, sessionSelectors } from '../clients/SessionClient'

/**
* Displays the selection of session in order to list SIPs
* @author Maxime Bouveron
*/
export class SIPSessionListContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      meta: sessionSelectors.getMetaData(state),
      entitiesLoading: sessionSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = dispatch => ({
    deleteSession: session => dispatch(sessionActions.deleteEntity(session.id)),
    fetchPage: (pageIndex, pageSize, queryParams) =>
      dispatch(sessionActions.fetchPagedEntityList(pageIndex, pageSize, {}, queryParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    entitiesLoading: PropTypes.bool.isRequired,
    deleteSession: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  state = {
    initialFilters: {},
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onRefresh = () => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    fetchPage(0, SIPSessionListContainer.PAGE_SIZE * (curentPage + 1), this.state.appliedFilters)
  }

  handleOpen = (session, isError = false) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/${session}/list${isError ? '?state=STORE_ERROR' : ''}`
    browserHistory.push(url)
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ initialFilters: query })
    }
  }

  render() {
    const {
      meta, deleteSession, fetchPage, entitiesLoading,
    } = this.props
    const { initialFilters } = this.state
    return (
      <SIPSessionListComponent
        pageSize={SIPSessionListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        handleOpen={this.handleOpen}
        onBack={this.onBack}
        onRefresh={this.onRefresh}
        entitiesLoading={entitiesLoading}
        deleteSession={deleteSession}
        fetchPage={fetchPage}
        initialFilters={initialFilters}
      />
    )
  }
}

export default connect(SIPSessionListContainer.mapStateToProps,
  SIPSessionListContainer.mapDispatchToProps)(SIPSessionListContainer)
