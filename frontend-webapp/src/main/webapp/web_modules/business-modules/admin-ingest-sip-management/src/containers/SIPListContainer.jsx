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
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { IngestShapes } from '@regardsoss/shape'
import SIPListComponent from '../components/SIPListComponent'
import { processingChainActions, processingChainSelectors } from '../clients/ProcessingChainClient'
import { sipActions, sipSelectors } from '../clients/SIPClient'

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
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = dispatch => ({
    fetchProcessingChains: file => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    deleteSIPByIpId: sip => dispatch(sipActions.deleteEntity(sip.ipId)),
    deleteSIPBySipId: sip => dispatch(sipActions.deleteEntity(undefined, {}, { sipId: sip.sipId })),
    fetchPage: (pageIndex, pageSize, requestParams) => dispatch(sipActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    deleteSIPByIpId: PropTypes.func.isRequired,
    deleteSIPBySipId: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    // from mapStateToProps
    chains: IngestShapes.IngestProcessingChainList.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  constructor(props) {
    super(props)
    this.state = {
      appliedFilters: {
        sessionId: props.params.session,
      },
    }
  }


  componentDidMount() {
    this.props.fetchProcessingChains()
  }

  onRefresh = () => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    fetchPage(0, SIPListContainer.PAGE_SIZE * (curentPage + 1), this.state.appliedFilters)
  }

  getInitialFilters = () => ({
    sessionId: this.props.params.session,
  })

  handleGoBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/session`
    browserHistory.push(url)
  }

  handleFilter = (filters) => {
    const { chainFilter, dateFilter, stateFilter } = filters
    const newFilters = {}
    if (chainFilter) {
      newFilters.processing = chainFilter
    }
    if (dateFilter) {
      newFilters.from = dateFilter.toISOString()
    }
    if (stateFilter) {
      newFilters.state = stateFilter
    }
    this.setState({
      appliedFilters: {
        ...this.getInitialFilters(),
        ...newFilters,
      },
    })
  }

  render() {
    const {
      meta, fetchPage, deleteSIPByIpId, deleteSIPBySipId,
    } = this.props
    return (
      <SIPListComponent
        chains={this.props.chains}
        pageSize={SIPListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        appliedFilters={this.state.appliedFilters}
        handleFilter={this.handleFilter}
        onBack={this.handleGoBack}
        onRefresh={this.onRefresh}
        onDeleteByIpId={deleteSIPByIpId}
        onDeleteBySipId={deleteSIPBySipId}
        fetchPage={fetchPage}
      />
    )
  }
}

export default connect(SIPListContainer.mapStateToProps, SIPListContainer.mapDispatchToProps)(SIPListContainer)
