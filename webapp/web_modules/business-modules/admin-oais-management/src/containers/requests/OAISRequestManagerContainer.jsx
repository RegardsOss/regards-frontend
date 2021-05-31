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
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { IngestShapes } from '@regardsoss/shape'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { processingChainActions } from '../../clients/ProcessingChainClient'
import { requestSelectors, requestActions } from '../../clients/RequestClient'
import { requestTableActions, requestTableSelectors } from '../../clients/RequestTableClient'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'
import OAISRequestManagerComponent from '../../components/requests/OAISRequestManagerComponent'
import { requestDeleteActions } from '../../clients/RequestDeleteClient'
import { requestRetryActions } from '../../clients/RequestRetryClient'
import { requestSelectVersionModeActions } from '../../clients/RequestSelectVersionModeClient'
import dependencies from '../../dependencies'
import { requestAbortActions } from '../../clients/RequestAbortClient'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
export class OAISRequestManagerContainer extends React.Component {
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
    pageLoading: PropTypes.bool.isRequired,
    featureManagerFilters: OAISCriterionShape,
    requestFilters: OAISCriterionShape,
    updateStateFromRequestManager: PropTypes.func.isRequired,
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    selectVersionOption: PropTypes.func.isRequired,
    abortRequests: PropTypes.func.isRequired,
    // from mapStateToProps
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    selectionMode: PropTypes.string.isRequired,
    availableDependencies: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  /** Dependencies to select a version mode, when a treatment is waiting */
  static SELECT_VERSION_DEPENDENCIES = [dependencies.selectVersionModeDependency]

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      meta: requestSelectors.getMetaData(state),
      pageLoading: requestSelectors.isFetching(state),
      tableSelection: requestTableSelectors.getToggledElementsAsList(state),
      selectionMode: requestTableSelectors.getSelectionMode(state),
      availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchProcessingChains: () => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    fetchPage: (pageIndex, pageSize, pathParams, requestParam, bodyParams) => dispatch(requestActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, requestParam, bodyParams)),
    clearSelection: () => dispatch(requestTableActions.unselectAll()),
    deleteRequests: (bodyParams) => dispatch(requestDeleteActions.sendSignal('POST', bodyParams)),
    retryRequests: (bodyParams) => dispatch(requestRetryActions.sendSignal('POST', bodyParams)),
    abortRequests: () => dispatch(requestAbortActions.sendSignal('PUT')),
    selectVersionOption: (versionBodyParams) => dispatch(requestSelectVersionModeActions.sendSignal('PUT', versionBodyParams)),
  })

  static extractStateFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    if (values(query).length > 0) {
      const { type, state } = query
      if (type) {
        urlFilters.type = type
      }
      if (state) {
        urlFilters.state = state
      }
    }
    return urlFilters
  }

  /** Initial state */
  state = {
    modeSelectionAllowed: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  componentDidMount() {
    this.props.fetchProcessingChains()
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { availableDependencies } = this.props
    const nextState = { ...this.state }
    if (!isEqual(oldProps.availableDependencies, newProps.availableDependencies)) {
      // resources changed, update modeSelectionAllowed
      nextState.modeSelectionAllowed = allMatchHateoasDisplayLogic(OAISRequestManagerContainer.SELECT_VERSION_DEPENDENCIES, availableDependencies)
    }
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }

  render() {
    const {
      featureManagerFilters, requestFilters, tableSelection, selectionMode,
      selectVersionOption, deleteRequests, retryRequests, abortRequests,
      updateStateFromRequestManager, meta, fetchPage, clearSelection, pageLoading,
    } = this.props
    const { modeSelectionAllowed } = this.state

    return (
      <OAISRequestManagerComponent
        pageSize={OAISRequestManagerContainer.PAGE_SIZE}
        pageMeta={meta}
        pageLoading={pageLoading}
        featureManagerFilters={featureManagerFilters}
        requestFilters={requestFilters}
        modeSelectionAllowed={modeSelectionAllowed}
        updateStateFromRequestManager={updateStateFromRequestManager}
        fetchPage={fetchPage}
        clearSelection={clearSelection}
        tableSelection={tableSelection}
        selectionMode={selectionMode}
        selectVersionOption={selectVersionOption}
        retryRequests={retryRequests}
        deleteRequests={deleteRequests}
        abortRequests={abortRequests}
      />
    )
  }
}

export default connect(OAISRequestManagerContainer.mapStateToProps, OAISRequestManagerContainer.mapDispatchToProps)(OAISRequestManagerContainer)
