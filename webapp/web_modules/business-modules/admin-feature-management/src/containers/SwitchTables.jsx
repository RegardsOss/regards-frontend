/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'
import keys from 'lodash/keys'
import includes from 'lodash/includes'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { FemDomain, UIDomain } from '@regardsoss/domain'
import SwitchComponent from '../components/SwitchComponent'
import { referencesActionsCount, referencesSelectorsCount } from '../clients/ReferencesClient'
import { creationRequestActionsCount, creationRequestSelectorsCount } from '../clients/CreationRequestsClient'
import { deleteRequestActionsCount, deleteRequestSelectorsCount } from '../clients/DeleteRequestsClient'
import { notificationRequestActionsCount, notificationRequestSelectorsCount } from '../clients/NotificationRequestsClient'
import { updateRequestActionsCount, updateRequestSelectorsCount } from '../clients/UpdateRequestsClient'
import { REFERENCES_COLUMN_KEYS } from '../components/ReferencesManagerComponent'
import { REQUESTS_COLUMN_KEYS } from '../components/RequestManagerComponent'

/**
  * Switch between tables
  * @author Théo Lasserre
  */
export class SwitchTables extends React.Component {
  // Setting PAGE_SIZE to 1 prevent flooding network with unnecessary informations.
  // we juste want to retrieve totalElements, we don't care about results sent by backend server.
  static PAGE_SIZE = 1

  static DEFAULT_PAGE_META = {
    number: 0,
    size: SwitchTables.PAGE_SIZE,
    totalElements: 0,
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchReferencesCount: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(referencesActionsCount.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchCreationRequestsCount: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(creationRequestActionsCount.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchDeleteRequestsCount: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(deleteRequestActionsCount.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchNotificationRequestsCount: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(notificationRequestActionsCount.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchUpdateRequestsCount: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(updateRequestActionsCount.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
  })

  /**
     * Redux: map state to props function
     * @param {*} state: current redux state
     * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
  static mapStateToProps(state) {
    return {
      referencesCountMeta: referencesSelectorsCount.getMetaData(state),
      isReferencesCountFetching: referencesSelectorsCount.isFetching(state),
      creationCountMeta: creationRequestSelectorsCount.getMetaData(state),
      isCreationCountFetching: creationRequestSelectorsCount.isFetching(state),
      creationCountInfo: creationRequestSelectorsCount.getInfo(state),
      updateCountMeta: updateRequestSelectorsCount.getMetaData(state),
      isUpdateCountFetching: updateRequestSelectorsCount.isFetching(state),
      updateCountInfo: updateRequestSelectorsCount.getInfo(state),
      deleteCountMeta: deleteRequestSelectorsCount.getMetaData(state),
      isDeleteCountFetching: deleteRequestSelectorsCount.isFetching(state),
      deleteCountInfo: deleteRequestSelectorsCount.getInfo(state),
      notificationCountMeta: notificationRequestSelectorsCount.getMetaData(state),
      isNotificationCountFetching: notificationRequestSelectorsCount.isFetching(state),
      notificationCountInfo: notificationRequestSelectorsCount.getInfo(state),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    onSwitchToPane: PropTypes.func.isRequired,
    paneType: PropTypes.oneOf(FemDomain.REQUEST_TYPES).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    featureManagerFilters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    // from mapStateToProps
    referencesCountMeta: CommonShapes.PageMetadata,
    isReferencesCountFetching: PropTypes.bool.isRequired,
    creationCountMeta: CommonShapes.PageMetadata,
    isCreationCountFetching: PropTypes.bool.isRequired,
    updateCountMeta: CommonShapes.PageMetadata,
    isUpdateCountFetching: PropTypes.bool.isRequired,
    deleteCountMeta: CommonShapes.PageMetadata,
    isDeleteCountFetching: PropTypes.bool.isRequired,
    notificationCountMeta: CommonShapes.PageMetadata,
    isNotificationCountFetching: PropTypes.bool.isRequired,
    creationCountInfo: CommonShapes.PageInfo,
    updateCountInfo: CommonShapes.PageInfo,
    deleteCountInfo: CommonShapes.PageInfo,
    notificationCountInfo: CommonShapes.PageInfo,
    //from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchReferencesCount: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchCreationRequestsCount: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchDeleteRequestsCount: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchNotificationRequestsCount: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchUpdateRequestsCount: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    referencesCountMeta: SwitchTables.DEFAULT_PAGE_META,
    creationCountMeta: SwitchTables.DEFAULT_PAGE_META,
    updateCountMeta: SwitchTables.DEFAULT_PAGE_META,
    deleteCountMeta: SwitchTables.DEFAULT_PAGE_META,
    notificationCountMeta: SwitchTables.DEFAULT_PAGE_META,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    const { paneType } = this.props
    let defaultFilterState = FemDomain.ReferenceFilters.buildDefault()
    if (paneType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES) {
      defaultFilterState = FemDomain.RequestFilters.buildDefault()
    }
    const featureManagerFilters = UIDomain.FiltersPaneHelper.extractFiltersFromURL(defaultFilterState)
    this.onPropertiesUpdated({}, { ...this.props, featureManagerFilters })
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
    const {
      fetchReferencesCount, fetchCreationRequestsCount, fetchDeleteRequestsCount, fetchNotificationRequestsCount, fetchUpdateRequestsCount,
      featureManagerFilters, isReferencesCountFetching, isCreationCountFetching, isDeleteCountFetching, isNotificationCountFetching,
      isUpdateCountFetching,
      paneType,
    } = newProps

    if (!isEqual(oldProps.featureManagerFilters, featureManagerFilters) || !isEqual(oldProps.paneType, paneType)) {
      const requestParameters = { ...pick(featureManagerFilters, 'sort') }
      const bodyParameters = { ...omit(featureManagerFilters, 'sort') }

      // Fetch meta to actualise requests count & errors
      if (!isReferencesCountFetching) {
        const referencesBodyParameters = this.buildBodyParameters(bodyParameters, FemDomain.ReferenceFilters.buildDefault())
        const referencesRequestParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, REFERENCES_COLUMN_KEYS)
        fetchReferencesCount(0, SwitchTables.PAGE_SIZE, {}, referencesRequestParameters, referencesBodyParameters)
      }

      const requestsBodyParameters = this.buildBodyParameters(bodyParameters, FemDomain.RequestFilters.buildDefault())
      const requestsRequestsParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, REQUESTS_COLUMN_KEYS)
      if (!isCreationCountFetching) {
        fetchCreationRequestsCount(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.CREATION }, requestsRequestsParameters, requestsBodyParameters)
      }
      if (!isDeleteCountFetching) {
        fetchDeleteRequestsCount(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.DELETE }, requestsRequestsParameters, requestsBodyParameters)
      }
      if (!isNotificationCountFetching) {
        fetchNotificationRequestsCount(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION }, requestsRequestsParameters, requestsBodyParameters)
      }
      if (!isUpdateCountFetching) {
        fetchUpdateRequestsCount(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.UPDATE }, requestsRequestsParameters, requestsBodyParameters)
      }
    }
  }

  /**
   * Filter bodyParameters to match specified filters state
   * Used to fetch all tabs at once when filters are updated
   * @param {*} bodyParameters
   * @param {*} defaultFiltersState
   */
  buildBodyParameters = (bodyParameters, defaultFiltersState) => {
    const newBodyParameters = reduce(bodyParameters, (acc, value, key) => {
      if (includes(keys(defaultFiltersState), key)) {
        return {
          ...acc,
          [key]: value,
        }
      }
      return acc
    }, {})
    return newBodyParameters
  }

  extractInfos = (meta, info = null) => ({
    nbElements: meta ? meta.totalElements : 0,
    nbErrors: info ? info.nbErrors : 0,
  })

  isFetching = (pane) => {
    const {
      isReferencesCountFetching, isCreationCountFetching, isDeleteCountFetching, isUpdateCountFetching, isNotificationCountFetching,
    } = this.props
    let isFetching = true
    switch (pane) {
      case FemDomain.REQUEST_TYPES_ENUM.REFERENCES:
        isFetching = isReferencesCountFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.CREATION:
        isFetching = isCreationCountFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.UPDATE:
        isFetching = isUpdateCountFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.DELETE:
        isFetching = isDeleteCountFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION:
        isFetching = isNotificationCountFetching
        break
      default:
    }
    return isFetching
  }

  getNbElementsInfos = (pane) => {
    const {
      referencesCountMeta, creationCountMeta, updateCountMeta, deleteCountMeta, notificationCountMeta,
      creationCountInfo, updateCountInfo, deleteCountInfo, notificationCountInfo,
    } = this.props
    let meta = null
    let info = null
    switch (pane) {
      case FemDomain.REQUEST_TYPES_ENUM.REFERENCES:
        meta = referencesCountMeta
        break
      case FemDomain.REQUEST_TYPES_ENUM.CREATION:
        meta = creationCountMeta
        info = creationCountInfo
        break
      case FemDomain.REQUEST_TYPES_ENUM.UPDATE:
        meta = updateCountMeta
        info = updateCountInfo
        break
      case FemDomain.REQUEST_TYPES_ENUM.DELETE:
        meta = deleteCountMeta
        info = deleteCountInfo
        break
      case FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION:
        meta = notificationCountMeta
        info = notificationCountInfo
        break
      default:
    }
    return this.extractInfos(meta, info)
  }

  render() {
    const {
      moduleTheme: {
        switchTable: {
          divStyle,
        },
      },
    } = this.context
    const {
      paneType, onSwitchToPane,
    } = this.props
    return (
      <div style={divStyle}>
        {map(FemDomain.REQUEST_TYPES, (pane) => {
          const nbElementsInfos = this.getNbElementsInfos(pane)
          const isFetching = this.isFetching(pane)
          return (<SwitchComponent
            key={`switch-table-${pane}`}
            loading={isFetching}
            pane={pane}
            paneType={paneType}
            nbElementsInfos={nbElementsInfos}
            onSwitchToPane={onSwitchToPane}
          />)
        })}
      </div>
    )
  }
}

export default connect(SwitchTables.mapStateToProps, SwitchTables.mapDispatchToProps)(SwitchTables)
