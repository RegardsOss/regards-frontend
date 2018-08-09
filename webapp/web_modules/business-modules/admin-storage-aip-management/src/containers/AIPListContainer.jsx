/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { TableSelectionModes } from '@regardsoss/components'
import { browserHistory } from 'react-router'
import AIPListComponent from '../components/monitoring/aip/AIPListComponent'
import { aipActions, aipSelectors } from '../clients/AIPClient'
import { tableSelectors } from '../clients/TableClient'
import { aipTagActions } from '../clients/AIPTagClient'

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
      isEmptySelection: tableSelectors.isEmptySelection(state, aipSelectors),
      selectionMode: tableSelectors.getSelectionMode(state),
      elementsSelected: tableSelectors.getToggledElements(state),
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
    deleteAIPByIpId: aip => dispatch(aipActions.deleteEntityWithPayloadResponse(aip.id)),
    fetchPage: (pageIndex, pageSize, requestParams) => dispatch(aipActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
    fetchCommonTags: requestParams => dispatch(aipTagActions.fetchCommonTags(requestParams)),
    removeTags: body => dispatch(aipTagActions.removeTags(body)),
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
    // from mapDistpathToProps
    deleteAIPByIpId: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    fetchCommonTags: PropTypes.func.isRequired,
    addTags: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
    // from mapStateToProps
    entitiesLoading: PropTypes.bool.isRequired,
    isEmptySelection: PropTypes.bool.isRequired,
    selectionMode: PropTypes.string,
    elementsSelected: PropTypes.objet,
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
    urlFilters: {},
    // Store tags for delete dialog
    tags: [],
    searchingTags: false,
    // Store all tags related to current session
    sessionTags: [],
    searchingSessionTags: true,
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
    this.initializeContextFilters(this.props)
  }

  componentDidMount() {
    const bodyParams = this.prepareAIPRequest({})
    this.props.fetchCommonTags(bodyParams).then((actionResults) => {
      this.setState({ sessionTags: actionResults.payload, searchingSessionTags: false })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.session !== this.props.params.session) {
      this.initializeContextFilters(nextProps)
    }
  }

  onRefresh = (currentFilters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    fetchPage(0, AIPListContainer.PAGE_SIZE * (curentPage + 1), currentFilters)
  }

  handleGoBack = (level) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/storage/aip/session`
    browserHistory.push(url)
  }

  initializeContextFilters = (props) => {
    const { params: { session } } = props
    const contextFilters = {}
    if (session) {
      contextFilters.session = session
    }
    this.setState({ contextFilters })
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ urlFilters: query })
    }
  }

  prepareAIPRequest = (currentFilters) => {
    const {
      selectionMode, areAllSelected, elementsSelected, params,
    } = this.props
    const bodyParams = {
      session: params.session,
    }
    if (has(currentFilters, 'state')) {
      bodyParams.state = currentFilters.state
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
        bodyParams.aipIds = map(elementsSelected, el => el.content.id)
      } else {
        bodyParams.aipIdsExcluded = map(elementsSelected, el => el.content.id)
      }
    }
    return bodyParams
  }

  fetchCommonTags = (currentFilters) => {
    this.setState({ tags: [], searchingTags: true })
    const bodyParams = this.prepareAIPRequest(currentFilters)
    this.props.fetchCommonTags(bodyParams).then((actionResults) => {
      this.setState({ tags: actionResults.payload, searchingTags: false })
    })
  }

  removeTags = (currentFilters, tags) => {
    const bodyParams = this.prepareAIPRequest(currentFilters)
    bodyParams.tagsToRemove = tags
    return this.props.removeTags(bodyParams)
  }

  addTags = (currentFilters, tags) => {
    const bodyParams = this.prepareAIPRequest(currentFilters)
    bodyParams.tagsToAdd = tags
    return this.props.addTags(bodyParams)
  }


  goToAipFiles = (aipId) => {
    const { params: { project, session } } = this.props
    const encodedSessionName = encodeURIComponent(session)
    const encodedAipId = encodeURIComponent(aipId)
    const url = `/admin/${project}/data/acquisition/storage/aip/${encodedSessionName}/${encodedAipId}/file`
    browserHistory.push(url)
  }

  render() {
    const {
      meta, fetchPage, deleteAIPByIpId, params: { session }, entitiesLoading, isEmptySelection,
    } = this.props
    const {
      urlFilters, contextFilters, tags, searchingTags, searchingSessionTags, sessionTags,
    } = this.state
    return (
      <AIPListComponent
        tags={tags}
        searchingTags={searchingTags}
        sessionTags={sessionTags}
        searchingSessionTags={searchingSessionTags}
        session={session}
        isEmptySelection={isEmptySelection}
        pageSize={AIPListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        contextFilters={contextFilters}
        initialFilters={urlFilters}
        entitiesLoading={entitiesLoading}
        handleFilter={this.handleFilter}
        onBack={this.handleGoBack}
        onRefresh={this.onRefresh}
        onDeleteByIpId={deleteAIPByIpId}
        fetchPage={fetchPage}
        goToAipFiles={this.goToAipFiles}
        fetchCommonTags={this.fetchCommonTags}
        addTags={this.addTags}
        removeTags={this.removeTags}
      />
    )
  }
}

export default connect(AIPListContainer.mapStateToProps, AIPListContainer.mapDispatchToProps)(AIPListContainer)
