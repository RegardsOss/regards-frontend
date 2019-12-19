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
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps = state => ({
    meta: aipSelectors.getMetaData(state),
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
  static mapDispatchToProps = dispatch => ({
    fetchProcessingChains: file => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    fetchPage: (pageIndex, pageSize, pathParams, bodyParams) => dispatch(aipActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, bodyParams)),
    fetchStorages: (bodyParams, pathParams) => dispatch(aipStorageSearchActions.fetchEntityListByPost(bodyParams, pathParams)),
    clearSelection: () => dispatch(aipTableActions.unselectAll()),
    deleteAips: bodyParams => dispatch(aipDeleteActions.sendSignal('POST', bodyParams)),
    modifyAips: bodyParams => dispatch(aipUpdateActions.sendSignal('POST', bodyParams)),
  })

  static propTypes = {
    featureManagerFilters: OAISCriterionShape,
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

  state = {
    // contextFilters: {},
    // urlFilters: {},
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
    this.initializeContextFilters(this.props)
  }

  componentDidMount() {
    this.props.fetchProcessingChains()
    this.props.fetchStorages({}, {})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.aip !== this.props.params.aip) {
      this.initializeFiltersFromURL()
      this.initializeContextFilters(nextProps)
    }
  }

  initializeContextFilters = (props) => {
    const { params: { aip } } = props
    const contextFilters = {}
    if (aip) {
      contextFilters.providerId = aip
    }
    // this.setState({ contextFilters })
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      // this.setState({ urlFilters: query })
    }
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/oais/featureManager`
    browserHistory.push(url)
  }

  onRefresh = () => {
    const { meta, fetchPage, clearSelection } = this.props
    const { currentFilters } = this.state
    const curentPage = get(meta, 'number', 0)
    clearSelection()
    fetchPage(0, OAISPackageManagerContainer.PAGE_SIZE * (curentPage + 1), currentFilters)
  }

  render() {
    const {
      featureManagerFilters,
      tableSelection,
      storages,
      deleteAips,
      selectionMode,
      modifyAips,
    } = this.props

    return (
      <OAISPackageManagerComponent
        pageSize={OAISPackageManagerContainer.PAGE_SIZE}
        featureManagerFilters={featureManagerFilters}
        storages={storages}
        onRefresh={this.onRefresh}
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
