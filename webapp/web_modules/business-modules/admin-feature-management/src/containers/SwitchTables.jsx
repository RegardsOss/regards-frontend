/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { referencesActions, referencesSelectors } from '../clients/ReferencesClient'
import { creationRequestActions, creationRequestSelectors } from '../clients/CreationRequestsClient'
import { deleteRequestActions, deleteRequestSelectors } from '../clients/DeleteRequestsClient'
import { notificationRequestActions, notificationRequestSelectors } from '../clients/NotificationRequestsClient'
import { updateRequestActions, updateRequestSelectors } from '../clients/UpdateRequestsClient'
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
    fetchReferences: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(referencesActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchCreationRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(creationRequestActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchDeleteRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(deleteRequestActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchNotificationRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(notificationRequestActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
    fetchUpdateRequests: (pageIndex, pageSize, pathParams, queryParams, bodyParam) => dispatch(updateRequestActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParam)),
  })

  /**
     * Redux: map state to props function
     * @param {*} state: current redux state
     * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
  static mapStateToProps(state) {
    return {
      referencesMeta: referencesSelectors.getMetaData(state),
      isReferencesFetching: referencesSelectors.isFetching(state),
      creationMeta: creationRequestSelectors.getMetaData(state),
      isCreationFetching: creationRequestSelectors.isFetching(state),
      creationInfo: creationRequestSelectors.getInfo(state),
      updateMeta: updateRequestSelectors.getMetaData(state),
      isUpdateFetching: updateRequestSelectors.isFetching(state),
      updateInfo: updateRequestSelectors.getInfo(state),
      deleteMeta: deleteRequestSelectors.getMetaData(state),
      isDeleteFetching: deleteRequestSelectors.isFetching(state),
      deleteInfo: deleteRequestSelectors.getInfo(state),
      notificationMeta: notificationRequestSelectors.getMetaData(state),
      isNotificationFetching: notificationRequestSelectors.isFetching(state),
      notificationInfo: notificationRequestSelectors.getInfo(state),
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
    referencesMeta: CommonShapes.PageMetadata,
    isReferencesFetching: PropTypes.bool.isRequired,
    creationMeta: CommonShapes.PageMetadata,
    isCreationFetching: PropTypes.bool.isRequired,
    updateMeta: CommonShapes.PageMetadata,
    isUpdateFetching: PropTypes.bool.isRequired,
    deleteMeta: CommonShapes.PageMetadata,
    isDeleteFetching: PropTypes.bool.isRequired,
    notificationMeta: CommonShapes.PageMetadata,
    isNotificationFetching: PropTypes.bool.isRequired,
    creationInfo: CommonShapes.PageInfo,
    updateInfo: CommonShapes.PageInfo,
    deleteInfo: CommonShapes.PageInfo,
    notificationInfo: CommonShapes.PageInfo,
    //from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchReferences: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchCreationRequests: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchDeleteRequests: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchNotificationRequests: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchUpdateRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    referencesMeta: SwitchTables.DEFAULT_PAGE_META,
    creationMeta: SwitchTables.DEFAULT_PAGE_META,
    updateMeta: SwitchTables.DEFAULT_PAGE_META,
    deleteMeta: SwitchTables.DEFAULT_PAGE_META,
    notificationMeta: SwitchTables.DEFAULT_PAGE_META,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

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
      fetchReferences, fetchCreationRequests, fetchDeleteRequests, fetchNotificationRequests, fetchUpdateRequests,
      featureManagerFilters, isReferencesFetching, isCreationFetching, isDeleteFetching, isNotificationFetching,
      isUpdateFetching,
    } = newProps

    if (!isEqual(oldProps.featureManagerFilters, featureManagerFilters)) {
      const requestParameters = { ...pick(featureManagerFilters, 'sort') }
      const bodyParameters = { ...omit(featureManagerFilters, 'sort') }

      if (!isReferencesFetching) {
        const referencesBodyParameters = this.buildBodyParameters(bodyParameters, FemDomain.ReferenceFilters.buildDefault())
        const referencesRequestParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, REFERENCES_COLUMN_KEYS)
        fetchReferences(0, SwitchTables.PAGE_SIZE, {}, referencesRequestParameters, referencesBodyParameters)
      }

      const requestsBodyParameters = this.buildBodyParameters(bodyParameters, FemDomain.RequestFilters.buildDefault())
      const requestsRequestsParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, REQUESTS_COLUMN_KEYS)
      if (!isCreationFetching) {
        fetchCreationRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.CREATION }, requestsRequestsParameters, requestsBodyParameters)
      }
      if (!isDeleteFetching) {
        fetchDeleteRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.DELETE }, requestsRequestsParameters, requestsBodyParameters)
      }
      if (!isNotificationFetching) {
        fetchNotificationRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION }, requestsRequestsParameters, requestsBodyParameters)
      }
      if (!isUpdateFetching) {
        fetchUpdateRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.UPDATE }, requestsRequestsParameters, requestsBodyParameters)
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
      isReferencesFetching, isCreationFetching, isDeleteFetching, isUpdateFetching, isNotificationFetching,
    } = this.props
    let isFetching = true
    switch (pane) {
      case FemDomain.REQUEST_TYPES_ENUM.REFERENCES:
        isFetching = isReferencesFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.CREATION:
        isFetching = isCreationFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.UPDATE:
        isFetching = isUpdateFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.DELETE:
        isFetching = isDeleteFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION:
        isFetching = isNotificationFetching
        break
      default:
    }
    return isFetching
  }

  getNbElementsInfos = (pane) => {
    const {
      referencesMeta, creationMeta, updateMeta, deleteMeta, notificationMeta,
      creationInfo, updateInfo, deleteInfo, notificationInfo,
    } = this.props
    let meta = null
    let info = null
    switch (pane) {
      case FemDomain.REQUEST_TYPES_ENUM.REFERENCES:
        meta = referencesMeta
        break
      case FemDomain.REQUEST_TYPES_ENUM.CREATION:
        meta = creationMeta
        info = creationInfo
        break
      case FemDomain.REQUEST_TYPES_ENUM.UPDATE:
        meta = updateMeta
        info = updateInfo
        break
      case FemDomain.REQUEST_TYPES_ENUM.DELETE:
        meta = deleteMeta
        info = deleteInfo
        break
      case FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION:
        meta = notificationMeta
        info = notificationInfo
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
