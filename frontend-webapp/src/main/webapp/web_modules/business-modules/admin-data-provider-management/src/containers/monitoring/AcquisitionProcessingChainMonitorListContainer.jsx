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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { AcquisitionProcessingChainMonitorActions, AcquisitionProcessingChainMonitorSelectors }
  from '../../clients/AcquisitionProcessingChainMonitorClient'
import { RunAcquisitionProcessingChainActions } from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainMonitorListComponent
  from '../../components/monitoring/acquisitionProcessingChain/AcquisitionProcessingChainMonitorListComponent'

/**
* Container to handle monitoring AcquisitionProcessingChains.
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainMonitorListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      meta: AcquisitionProcessingChainMonitorSelectors.getMetaData(state),
      entitiesLoading: AcquisitionProcessingChainMonitorSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchPage: (pageIndex, pageSize, requestParams) => dispatch(AcquisitionProcessingChainMonitorActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
      runChain: chainId => dispatch(RunAcquisitionProcessingChainActions.run(chainId)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    entitiesLoading: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchPage: PropTypes.func.isRequired,
    runChain: PropTypes.func.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 100

  /**
   * Callback to return to the acquisition board
   */
  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onRefresh = (filters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    return fetchPage(0, AcquisitionProcessingChainMonitorListContainer.PAGE_SIZE * (curentPage + 1), filters)
  }

  render() {
    const {
      meta, entitiesLoading, runChain, params: { project },
    } = this.props
    return (
      <AcquisitionProcessingChainMonitorListComponent
        project={project}
        onRefresh={this.onRefresh}
        onBack={this.onBack}
        onRunChain={runChain}
        pageSize={AcquisitionProcessingChainMonitorListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        entitiesLoading={entitiesLoading}
      />
    )
  }
}
export default connect(
  AcquisitionProcessingChainMonitorListContainer.mapStateToProps,
  AcquisitionProcessingChainMonitorListContainer.mapDispatchToProps)(AcquisitionProcessingChainMonitorListContainer)
