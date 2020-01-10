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
import { connect } from '@regardsoss/redux'
import { processingChainActions } from '../../clients/ProcessingChainClient'
import { requestSelectors, requestActions } from '../../clients/RequestClient'
import { requestTableActions, requestTableSelectors } from '../../clients/RequestTableClient'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'
import OAISRequestManagerComponent from '../../components/requests/OAISRequestManagerComponent'
import { requestDeleteActions } from '../../clients/RequestDeleteClient'
import { requestRetryActions } from '../../clients/RequestRetryClient'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
class OAISRequestManagerContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      meta: requestSelectors.getMetaData(state),
      tableSelection: requestTableSelectors.getToggledElementsAsList(state),
      selectionMode: requestTableSelectors.getSelectionMode(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    fetchProcessingChains: file => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    fetchPage: (pageIndex, pageSize, pathParams, requestParam, bodyParams) => dispatch(requestActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, requestParam, bodyParams)),
    clearSelection: () => dispatch(requestTableActions.unselectAll()),
    deleteRequests: bodyParams => dispatch(requestDeleteActions.sendSignal('POST', bodyParams)),
    retryRequests: bodyParams => dispatch(requestRetryActions.sendSignal('POST', bodyParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    featureManagerFilters: OAISCriterionShape,
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    // from mapStateToProps
    // tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    selectionMode: PropTypes.string.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  componentDidMount() {
    this.props.fetchProcessingChains()
  }

  /**
   * Callback: on refresh AIP table
   */
  onRefresh = () => {
    const { meta, fetchPage, clearSelection } = this.props
    const { currentFilters } = this.state
    const curentPage = get(meta, 'number', 0)
    clearSelection()
    // TODO add request parameters (sort), make sure body is valid (currentFilters)
    fetchPage(0, OAISRequestManagerContainer.PAGE_SIZE * (curentPage + 1), null, null, currentFilters)
  }

  render() {
    const {
      featureManagerFilters, selectionMode, deleteRequests, retryRequests,
    } = this.props

    return (
      <OAISRequestManagerComponent
        pageSize={OAISRequestManagerContainer.PAGE_SIZE}
        featureManagerFilters={featureManagerFilters}
        onRefresh={this.onRefresh}
        selectionMode={selectionMode}
        deleteRequests={deleteRequests}
        retryRequests={retryRequests}
      />
    )
  }
}

export default connect(OAISRequestManagerContainer.mapStateToProps, OAISRequestManagerContainer.mapDispatchToProps)(OAISRequestManagerContainer)
