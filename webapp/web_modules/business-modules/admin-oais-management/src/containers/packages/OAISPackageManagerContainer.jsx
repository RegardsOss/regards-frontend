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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { IngestShapes } from '@regardsoss/shape'
import { processingChainActions } from '../../clients/ProcessingChainClient'
import { aipSelectors, aipActions } from '../../clients/AIPClient'
import { aipStorageSearchSelectors, aipStorageSearchActions } from '../../clients/AIPStorageSearchClient'
import { aipDeleteActions } from '../../clients/AIPDeleteClient'
import { aipTableActions, aipTableSelectors } from '../../clients/AIPTableClient'
import { aipUpdateActions } from '../../clients/AIPUpdateClient'
import OAISPackageManagerComponent from '../../components/packages/OAISPackageManagerComponent'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
export class OAISPackageManagerContainer extends React.Component {
  static propTypes = {
    featureManagerFilters: OAISCriterionShape,
    productFilters: OAISCriterionShape,
    updateStateFromFeatureManagerFilters: PropTypes.func.isRequired,
    updateStateFromPackageManager: PropTypes.func.isRequired,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    fetchStorages: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteAips: PropTypes.func.isRequired,
    modifyAips: PropTypes.func.isRequired,
    // from mapStateToProps
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    pageLoading: PropTypes.bool,
    storages: PropTypes.arrayOf(PropTypes.string),
    tableSelection: PropTypes.arrayOf(IngestShapes.AIPEntity),
    selectionMode: PropTypes.string.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state) => ({
    meta: aipSelectors.getMetaData(state),
    pageLoading: aipSelectors.isFetching(state),
    storages: aipStorageSearchSelectors.getArray(state),
    tableSelection: aipTableSelectors.getToggledElementsAsList(state),
    selectionMode: aipTableSelectors.getSelectionMode(state),
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchProcessingChains: (file) => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    fetchPage: (pageIndex, pageSize, pathParams, queryParams, bodyParams) => dispatch(aipActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    fetchStorages: (bodyParams, pathParams) => dispatch(aipStorageSearchActions.fetchEntityListByPost(pathParams, null, bodyParams)),
    clearSelection: () => dispatch(aipTableActions.unselectAll()),
    deleteAips: (bodyParams) => dispatch(aipDeleteActions.sendSignal('POST', bodyParams)),
    modifyAips: (bodyParams) => dispatch(aipUpdateActions.sendSignal('POST', bodyParams)),
  })

  static extractStateFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    if (values(query).length > 0) {
      const {
        type, state, storage,
      } = query
      if (type) {
        urlFilters.type = type
      }
      if (state) {
        urlFilters.state = state
      }
      if (storage) {
        urlFilters.storage = storage
      }
    }
    return urlFilters
  }

  state = {
    // contextFilters: {},
    urlFilters: {},
  }

  UNSAFE_componentWillMount() {
    this.initializeFiltersFromURL()
  }

  componentDidMount() {
    this.props.fetchProcessingChains()
    this.props.fetchStorages({}, {})
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      const {
        type, status, storage,
      } = query
      const urlFilters = {}
      if (type) {
        urlFilters.type = type
      }
      if (status) {
        urlFilters.state = status
      }
      if (storage) {
        urlFilters.storage = storage
      }
      this.setState({
        urlFilters,
      })
    }
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/oais/featureManager`
    browserHistory.push(url)
  }

  render() {
    const { urlFilters } = this.state
    const {
      updateStateFromFeatureManagerFilters,
      updateStateFromPackageManager,
      meta,
      pageLoading,
      featureManagerFilters,
      productFilters,
      tableSelection,
      storages,
      deleteAips,
      selectionMode,
      modifyAips,
      fetchPage,
      clearSelection,
    } = this.props

    return (
      <OAISPackageManagerComponent
        updateStateFromFeatureManagerFilters={updateStateFromFeatureManagerFilters}
        updateStateFromPackageManager={updateStateFromPackageManager}
        urlFilters={urlFilters}
        pageSize={OAISPackageManagerContainer.PAGE_SIZE}
        pageMeta={meta}
        pageLoading={pageLoading}
        featureManagerFilters={featureManagerFilters}
        productFilters={productFilters}
        storages={storages}
        fetchPage={fetchPage}
        clearSelection={clearSelection}
        deleteAips={deleteAips}
        tableSelection={tableSelection}
        selectionMode={selectionMode}
        modifyAips={modifyAips}
        onBack={this.onBack}
      />
    )
  }
}

export default connect(OAISPackageManagerContainer.mapStateToProps, OAISPackageManagerContainer.mapDispatchToProps)(OAISPackageManagerContainer)
