/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { IngestShapes } from '@regardsoss/shape'
import { sipTableSelectors, sipTableActions } from '../../clients/SIPTableClient'
import SIPListComponent from '../../components/sip/SIPListComponent'
import { processingChainActions, processingChainSelectors } from '../../clients/ProcessingChainClient'
import { sipActions, sipSelectors } from '../../clients/SIPClient'
import { sipSignalActions } from '../../clients/SIPSignalClient'

/**
 * Displays the list of SIPs
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
export class SIPListContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      chains: processingChainSelectors.getList(state),
      meta: sipSelectors.getMetaData(state),
      entitiesLoading: sipSelectors.isFetching(state),
      isEmptySelection: sipTableSelectors.isEmptySelection(state, sipSelectors),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    clearSelection: () => dispatch(sipTableActions.unselectAll()),
    fetchProcessingChains: file => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    deleteSIPBySipId: sip => dispatch(sipActions.deleteEntityWithPayloadResponse(sip.sipId)),
    deleteSIPByProviderId: sip => dispatch(sipActions.deleteEntityWithPayloadResponse(undefined, {}, { providerId: sip.providerId })),
    fetchPage: (pageIndex, pageSize, requestParams) => dispatch(sipActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
    retrySip: sip => dispatch(sipSignalActions.retry(sip.sipId)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      sip: PropTypes.string,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    deleteSIPBySipId: PropTypes.func.isRequired,
    deleteSIPByProviderId: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    retrySip: PropTypes.func.isRequired,
    // from mapStateToProps
    entitiesLoading: PropTypes.bool.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    isEmptySelection: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  state = {
    contextFilters: {},
    urlFilters: {},
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
    this.initializeContextFilters(this.props)
  }

  componentDidMount() {
    this.props.fetchProcessingChains()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.sip !== this.props.params.sip) {
      this.initializeFiltersFromURL()
      this.initializeContextFilters(nextProps)
    }
  }

  onRefresh = (currentFilters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    fetchPage(0, SIPListContainer.PAGE_SIZE * (curentPage + 1), currentFilters)
  }

  onRetrySip = (sip, filters) => {
    Promise.resolve(this.props.retrySip(sip)).then((results) => {
      if (!results.error) {
        this.onRefresh(filters)
      }
    })
  }

  goToSessionAIPsMonitoring = (session) => {
    const { params: { project } } = this.props
    const encodedSessionName = encodeURIComponent(session)
    browserHistory.push(`/admin/${project}/data/acquisition/oais/aip/${encodedSessionName}/list`)
  }

  goToDataSourcesMonitoring = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/datasource/monitor`)
  }

  handleGoBack = (level) => {
    const { params: { project, sip } } = this.props
    if (sip) {
      browserHistory.goBack()
    } else {
      browserHistory.push(`/admin/${project}/data/acquisition/dataprovider/sessions`)
    }
  }

  /** User callback:  */
  onGoToAIP = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/oais/aip/list`
    browserHistory.push(url)
  }

  initializeContextFilters = (props) => {
    const { params: { sip } } = props
    const contextFilters = {}
    if (sip) {
      contextFilters.providerId = sip
    }
    this.setState({ contextFilters })
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ urlFilters: query })
    }
  }

  goToSipHistory = (providerId) => {
    const { params: { project } } = this.props
    const encodedProviderId = encodeURIComponent(providerId)
    const url = `/admin/${project}/data/acquisition/oais/sip/${encodedProviderId}/history`
    browserHistory.push(url)
  }

  render() {
    const {
      meta, fetchPage, deleteSIPBySipId, deleteSIPByProviderId,
      params: { session, sip }, entitiesLoading, isEmptySelection,
    } = this.props
    const { urlFilters, contextFilters } = this.state
    return (
      <SIPListComponent
        chains={this.props.chains}
        session={session}
        sip={sip}
        pageSize={SIPListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        contextFilters={contextFilters}
        isEmptySelection={isEmptySelection}
        initialFilters={urlFilters}
        entitiesLoading={entitiesLoading}
        handleFilter={this.handleFilter}
        onSort={this.onSort}
        onBack={this.handleGoBack}
        onGoToAIP={this.onGoToAIP}
        onRefresh={this.onRefresh}
        onDeleteBySipId={deleteSIPBySipId}
        onDeleteByProviderId={deleteSIPByProviderId}
        onRetry={this.onRetrySip}
        fetchPage={fetchPage}
        goToSipHistory={this.goToSipHistory}
        goToSessionAIPsMonitoring={this.goToSessionAIPsMonitoring}
        goToDataSourcesMonitoring={this.goToDataSourcesMonitoring}
      />
    )
  }
}

export default connect(SIPListContainer.mapStateToProps, SIPListContainer.mapDispatchToProps)(SIPListContainer)
