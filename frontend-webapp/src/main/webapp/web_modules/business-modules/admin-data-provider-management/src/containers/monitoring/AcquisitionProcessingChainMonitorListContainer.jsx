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
import { connect } from '@regardsoss/redux'
import { AcquisitionProcessingChainMonitorActions } from '../../clients/AcquisitionProcessingChainMonitorClient'
import AcquisitionProcessingChainMonitorListComponent from '../../components/monitoring/AcquisitionProcessingChainMonitorListComponent'

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
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchPage: (pageIndex, pageSize) => dispatch(AcquisitionProcessingChainMonitorActions.fetchPagedEntityList(pageIndex, pageSize)),
      runChain: chainId => dispatch(),
    }
  }

  static propTypes = {
    // from mapStateToProps
    // from mapDispatchToProps
    fetchPage: PropTypes.func.isRequired,
    runChain: PropTypes.func.isRequired,
  }

  state = {
    errorMessage: null,
  }

  runChainAction = (chainId) => {
    const { runChain, fetchPage } = this.props
    runChain.then((actionResult) => {
      if (actionResult.error) {
        this.setState({
          errorMessage: 'generation-chain.monitor.list.run.error',
        })
      } else {
        fetchPage()
        this.setState({
          errorMessage: null,
        })
      }
    })
  }

  render() {
    const { fetchPage } = this.props
    const { errorMessage } = this.state
    return (
      <AcquisitionProcessingChainMonitorListComponent
        errorMessage={errorMessage}
        fetchPage={fetchPage}
        onRunChain={this.runChainAction}
      />
    )
  }
}
export default connect(
  AcquisitionProcessingChainMonitorListContainer.mapStateToProps,
  AcquisitionProcessingChainMonitorListContainer.mapDispatchToProps)(AcquisitionProcessingChainMonitorListContainer)
