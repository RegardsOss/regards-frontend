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
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { FemDomain } from '@regardsoss/domain'
import SwitchComponent from '../components/SwitchComponent'
import { referencesActions, referencesSelectors } from '../clients/ReferencesClient'
import { creationRequestActions, creationRequestSelectors } from '../clients/CreationRequestsClient'
import { deleteRequestActions, deleteRequestSelectors } from '../clients/DeleteRequestsClient'
import { extractionRequestActions, extractionRequestSelectors } from '../clients/ExtractionRequestsClient'
import { notificationRequestActions, notificationRequestSelectors } from '../clients/NotificationRequestsClient'
import { updateRequestActions, updateRequestSelectors } from '../clients/UpdateRequestsClient'

/**
  * Switch between tables
  * @author Théo Lasserre
  */
export class SwitchTables extends React.Component {
  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchReferences: (pageIndex, pageSize, pathParams, queryParams) => dispatch(referencesActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchCreationRequests: (pageIndex, pageSize, pathParams, queryParams) => dispatch(creationRequestActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchDeleteRequests: (pageIndex, pageSize, pathParams, queryParams) => dispatch(deleteRequestActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchExtractionRequests: (pageIndex, pageSize, pathParams, queryParams) => dispatch(extractionRequestActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchNotificationRequests: (pageIndex, pageSize, pathParams, queryParams) => dispatch(notificationRequestActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
    fetchUpdateRequests: (pageIndex, pageSize, pathParams, queryParams) => dispatch(updateRequestActions.fetchPagedEntityList(pageIndex, pageSize, pathParams, queryParams)),
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
      extractionMeta: extractionRequestSelectors.getMetaData(state),
      isExtractionFetching: extractionRequestSelectors.isFetching(state),
      extractionInfo: extractionRequestSelectors.getInfo(state),
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
    openedPane: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    // from mapStateToProps
    referencesMeta: CommonShapes.PageMetadata,
    isReferencesFetching: PropTypes.bool.isRequired,
    extractionMeta: CommonShapes.PageMetadata,
    isExtractionFetching: PropTypes.bool.isRequired,
    creationMeta: CommonShapes.PageMetadata,
    isCreationFetching: PropTypes.bool.isRequired,
    updateMeta: CommonShapes.PageMetadata,
    isUpdateFetching: PropTypes.bool.isRequired,
    deleteMeta: CommonShapes.PageMetadata,
    isDeleteFetching: PropTypes.bool.isRequired,
    notificationMeta: CommonShapes.PageMetadata,
    isNotificationFetching: PropTypes.bool.isRequired,
    extractionInfo: CommonShapes.PageInfo,
    creationInfo: CommonShapes.PageInfo,
    updateInfo: CommonShapes.PageInfo,
    deleteInfo: CommonShapes.PageInfo,
    notificationInfo: CommonShapes.PageInfo,
    //from mapDispatchToProps
    fetchReferences: PropTypes.func.isRequired,
    fetchCreationRequests: PropTypes.func.isRequired,
    fetchDeleteRequests: PropTypes.func.isRequired,
    fetchExtractionRequests: PropTypes.func.isRequired,
    fetchNotificationRequests: PropTypes.func.isRequired,
    fetchUpdateRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
      fetchReferences, fetchCreationRequests, fetchDeleteRequests, fetchExtractionRequests, fetchNotificationRequests, fetchUpdateRequests,
      featureManagerFilters,
    } = this.props

    if (oldProps.featureManagerFilters !== newProps.featureManagerFilters) {
      fetchReferences(0, SwitchTables.PAGE_SIZE, {}, { ...featureManagerFilters })
      fetchCreationRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.CREATION }, { ...featureManagerFilters })
      fetchDeleteRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.DELETE }, { ...featureManagerFilters })
      fetchExtractionRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.EXTRACTION }, { ...featureManagerFilters })
      fetchNotificationRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION }, { ...featureManagerFilters })
      fetchUpdateRequests(0, SwitchTables.PAGE_SIZE, { type: FemDomain.REQUEST_TYPES_ENUM.UPDATE }, { ...featureManagerFilters })
    }
  }

  extractInfos = (meta, info = null) => ({
    nbElements: meta ? meta.totalElements : 0,
    nbErrors: info ? info.nbErrors : 0,
  })

  isFetching = (pane) => {
    const {
      isReferencesFetching, isCreationFetching, isDeleteFetching, isUpdateFetching, isNotificationFetching, isExtractionFetching,
    } = this.props
    let isFetching = true
    switch (pane) {
      case FemDomain.REQUEST_TYPES_ENUM.REFERENCES:
        isFetching = isReferencesFetching
        break
      case FemDomain.REQUEST_TYPES_ENUM.EXTRACTION:
        isFetching = isExtractionFetching
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
      referencesMeta, extractionMeta, creationMeta, updateMeta, deleteMeta, notificationMeta,
      extractionInfo, creationInfo, updateInfo, deleteInfo, notificationInfo,
    } = this.props
    let meta = null
    let info = null
    switch (pane) {
      case FemDomain.REQUEST_TYPES_ENUM.REFERENCES:
        meta = referencesMeta
        break
      case FemDomain.REQUEST_TYPES_ENUM.EXTRACTION:
        meta = extractionMeta
        info = extractionInfo
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
      openedPane, onSwitchToPane,
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
            openedPane={openedPane}
            nbElementsInfos={nbElementsInfos}
            onSwitchToPane={onSwitchToPane}
          />)
        })}
      </div>
    )
  }
}

export default connect(SwitchTables.mapStateToProps, SwitchTables.mapDispatchToProps)(SwitchTables)
