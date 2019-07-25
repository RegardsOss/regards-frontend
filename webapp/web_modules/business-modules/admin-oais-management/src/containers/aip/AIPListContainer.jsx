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
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { TableSelectionModes } from '@regardsoss/components'
import { browserHistory } from 'react-router'
import { aipSelectors, aipActions } from '../../clients/AIPClient'
import { tableSelectors, tableActions } from '../../clients/TableClient'
import { aipTagActions } from '../../clients/AIPTagClient'
import AIPListComponent from '../../components/aip/AIPListComponent'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * Displays the list of AIPs
 * @author Léo Mieulet
 */
export class AIPListContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      meta: aipSelectors.getMetaData(state),
      entitiesLoading: aipSelectors.isFetching(state),
      dataStorages: aipSelectors.getDataStorages(state),
      isEmptySelection: tableSelectors.isEmptySelection(state, aipSelectors),
      selectionMode: tableSelectors.getSelectionMode(state),
      elementsSelected: tableSelectors.getToggledElementsAsList(state),
      areAllSelected: tableSelectors.areAllSelected(state, aipSelectors),
    }
  }


  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    clearSelection: () => dispatch(tableActions.unselectAll()),
    onRetry: aip => dispatch(aipTagActions.storeRetry(aip.aip.id)),
    fetchCommonTags: requestParams => dispatch(aipTagActions.fetchCommonTags(requestParams)),
    removeTags: body => dispatch(aipTagActions.removeTags(body)),
    fetchPage: (pageIndex, pageSize, contextFilters) => dispatch(aipActions.fetchPagedEntityList(pageIndex, pageSize, contextFilters)),
    addTags: body => dispatch(aipTagActions.addTags(body)),
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
    dataStorages: PropTypes.arrayOf(StorageShapes.PrioritizedDataStorageContent),
    // from mapDistpathToProps
    clearSelection: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    fetchCommonTags: PropTypes.func.isRequired,
    addTags: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,
    // from mapStateToProps
    entitiesLoading: PropTypes.bool.isRequired,
    isEmptySelection: PropTypes.bool.isRequired,
    selectionMode: PropTypes.string,
    elementsSelected: PropTypes.arrayOf(StorageShapes.AIPWithStorages),
    areAllSelected: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  state = {
    contextFilters: {},
    currentFilters: {},
    // Store tags for delete dialog
    tags: [],
    searchingTags: false,
    // Store all tags related to current session
    sessionTags: [],
    searchingSessionTags: true,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  componentDidMount() {
    // fetch session tags
    this.props.fetchCommonTags(this.getAIPRequestBody()).then((actionResults) => {
      this.setState({ sessionTags: actionResults.payload, searchingSessionTags: false })
    })
  }

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { params = {} } = newProps
    const newState = { ...this.state }

    // handle fitlers from parameters
    if (!isEqual(params.session, get(oldProps, 'params.session')) && params.session) {
      newState.contextFilters = {
        session: params.session,
      }
      newState.currentFilters = {
        ...newState.contextFilters,
      }
    }

    // Intialization case: restore filters from URL, if any
    if (isEmpty(oldProps)) {
      const { query } = browserHistory.getCurrentLocation()
      // restore possible query parameters
      if (!isEmpty(query)) {
        newState.currentFilters = {
          ...newState.currentFilters,
          state: query.state,
        }
      }
    }

    // Update state on changes
    if (!isEqual(newState, this.state)) {
      this.setState(newState)
    }
  }

  /**
   * User callback: new filters selected
   */
  onApplyFilters = (filters) => {
    const { contextFilters } = this.state
    const currentFilters = { ...filters, ...contextFilters }
    this.setState({ currentFilters })
  }

  /**
   * Callback: on refresh AIP table
   */
  onRefresh = () => {
    const { meta, fetchPage, clearSelection } = this.props
    const { currentFilters } = this.state
    const curentPage = get(meta, 'number', 0)
    clearSelection()
    fetchPage(0, AIPListContainer.PAGE_SIZE * (curentPage + 1), currentFilters)
  }

  /**
   * User callback: retry AIP sroage
   */
  onRetryAIPStorage = (aip) => {
    const { onRetry } = this.props
    Promise.resolve(onRetry(aip)).then((results) => {
      if (!results.error) {
        this.onRefresh()
      }
    })
  }

  /** User callback: back operation (through breadcrumb) */
  onGoBack = (level) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/storage/aip/session`
    browserHistory.push(url)
  }

  /**
   * Builds request body from current filters
   * @return {*} request body
   */
  getAIPRequestBody = () => {
    const {
      selectionMode, areAllSelected, elementsSelected, params,
    } = this.props
    const { currentFilters } = this.state
    const bodyParams = {
      session: params.session,
    }
    if (has(currentFilters, 'state')) {
      bodyParams.state = currentFilters.state
    }
    if (has(currentFilters, 'providerId')) {
      bodyParams.providerId = currentFilters.providerId
    }
    if (has(currentFilters, 'from')) {
      bodyParams.from = currentFilters.from
    }
    if (has(currentFilters, 'to')) {
      bodyParams.to = currentFilters.to
    }
    if (has(currentFilters, 'tags')) {
      bodyParams.tags = currentFilters.tags
    }
    if (elementsSelected && !areAllSelected) {
      if (selectionMode === TableSelectionModes.includeSelected) {
        bodyParams.aipIds = map(elementsSelected, el => get(el, 'content.aip.id'))
      } else {
        bodyParams.aipIdsExcluded = map(elementsSelected, el => get(el, 'content.aip.id'))
      }
    }
    return bodyParams
  }

  /**
   * Fetches common tags for current filters
   */
  fetchCommonTags = () => {
    this.setState({ tags: [], searchingTags: true })
    const bodyParams = this.getAIPRequestBody()
    this.props.fetchCommonTags(bodyParams).then((actionResults) => {
      this.setState({ tags: actionResults.payload, searchingTags: false })
    })
  }

  removeTags = (tags) => {
    const bodyParams = this.getAIPRequestBody()
    bodyParams.tagsToRemove = tags
    return this.props.removeTags(bodyParams)
  }

  addTags = (tags) => {
    const bodyParams = this.getAIPRequestBody()
    bodyParams.tagsToAdd = tags
    return this.props.addTags(bodyParams)
  }


  goToAipFiles = (aipId) => {
    const { params: { project, session } } = this.props
    const encodedSessionName = encodeURIComponent(session)
    const encodedAipId = encodeURIComponent(aipId)
    const url = `/admin/${project}/data/acquisition/oais/aip/${encodedSessionName}/${encodedAipId}/file`
    browserHistory.push(url)
  }

  render() {
    const {
      meta, params: { session }, entitiesLoading, isEmptySelection, dataStorages,
    } = this.props
    const {
      tags, searchingTags, searchingSessionTags, sessionTags,
      currentFilters,
    } = this.state
    return (
      <AIPListComponent
        // Page data
        pageSize={AIPListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        entitiesLoading={entitiesLoading}
        // selection management
        isEmptySelection={isEmptySelection}
        // Tags management
        tags={tags}
        searchingTags={searchingTags}
        sessionTags={sessionTags}
        searchingSessionTags={searchingSessionTags}
        // Filters management
        currentFilters={currentFilters}
        // contextual data
        dataStorages={dataStorages}
        session={session}

        // callbacks
        onGoBack={this.onGoBack}
        onRefresh={this.onRefresh}
        onRetryAIPStorage={this.onRetryAIPStorage}
        onApplyFilters={this.onApplyFilters}
        goToAipFiles={this.goToAipFiles}
        fetchCommonTags={this.fetchCommonTags}
        addTags={this.addTags}
        removeTags={this.removeTags}
      />
    )
  }
}

export default compose(
  connect(AIPListContainer.mapStateToProps, AIPListContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(AIPListContainer)
