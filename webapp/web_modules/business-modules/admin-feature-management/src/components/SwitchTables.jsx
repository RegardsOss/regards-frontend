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
import FlatButton from 'material-ui/FlatButton'
import Alert from 'mdi-material-ui/AlertCircleOutline'
import Chip from 'material-ui/Chip'
import { PANE_TYPES_ENUM, PANE_TYPES } from '../domain/PaneTypes'
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
      extractionMeta: extractionRequestSelectors.getMetaData(state),
      extractionInfo: extractionRequestSelectors.getInfo(state),
      creationMeta: creationRequestSelectors.getMetaData(state),
      creationInfo: creationRequestSelectors.getInfo(state),
      updateMeta: updateRequestSelectors.getMetaData(state),
      updateInfo: updateRequestSelectors.getInfo(state),
      deleteMeta: deleteRequestSelectors.getMetaData(state),
      deleteInfo: deleteRequestSelectors.getInfo(state),
      notificationMeta: notificationRequestSelectors.getMetaData(state),
      notificationInfo: notificationRequestSelectors.getInfo(state),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
    }),
    onSwitchToPane: PropTypes.func.isRequired,
    openedPane: PropTypes.string,
    // from mapStateToProps
    referencesMeta: CommonShapes.PageMetadata,
    extractionMeta: CommonShapes.PageMetadata,
    creationMeta: CommonShapes.PageMetadata,
    updateMeta: CommonShapes.PageMetadata,
    deleteMeta: CommonShapes.PageMetadata,
    notificationMeta: CommonShapes.PageMetadata,
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

  UNSAFE_componentWillMount = () => {
    const {
      fetchReferences, fetchCreationRequests, fetchDeleteRequests, fetchExtractionRequests, fetchNotificationRequests, fetchUpdateRequests,
    } = this.props
    fetchReferences(0, STATIC_CONF.TABLE.PAGE_SIZE)
    fetchCreationRequests(0, STATIC_CONF.TABLE.PAGE_SIZE)
    fetchDeleteRequests(0, STATIC_CONF.TABLE.PAGE_SIZE)
    fetchExtractionRequests(0, STATIC_CONF.TABLE.PAGE_SIZE)
    fetchNotificationRequests(0, STATIC_CONF.TABLE.PAGE_SIZE)
    fetchUpdateRequests(0, STATIC_CONF.TABLE.PAGE_SIZE)
  }

  displayIcon = (elementCount) => {
    const {
      moduleTheme: { tableStyle: { overlayStyle } },
    } = this.context
    return (
      <div style={overlayStyle.style}>
        <Alert style={overlayStyle.icon.style} />
        <Chip
          labelStyle={overlayStyle.chip.labelStyle}
          style={overlayStyle.chip.style}
        >
          {elementCount}
        </Chip>
      </div>)
  }

  extractInfos = (meta, info = null) => ({
    nbElements: meta ? meta.totalElements : 0,
    nbErrors: info ? info.nbErrors : 0,
  })

  getNbElementsInfos = (pane) => {
    const {
      referencesMeta, extractionMeta, creationMeta, updateMeta, deleteMeta, notificationMeta,
      extractionInfo, creationInfo, updateInfo, deleteInfo, notificationInfo,
    } = this.props
    let meta = null
    let info = null
    switch (pane) {
      case PANE_TYPES_ENUM.REFERENCES:
        meta = referencesMeta
        break
      case PANE_TYPES_ENUM.EXTRACTION:
        meta = extractionMeta
        info = extractionInfo
        break
      case PANE_TYPES_ENUM.CREATION:
        meta = creationMeta
        info = creationInfo
        break
      case PANE_TYPES_ENUM.UPDATE:
        meta = updateMeta
        info = updateInfo
        break
      case PANE_TYPES_ENUM.DELETE:
        meta = deleteMeta
        info = deleteInfo
        break
      case PANE_TYPES_ENUM.NOTIFICATION:
        meta = notificationMeta
        info = notificationInfo
        break
      default:
    }
    return this.extractInfos(meta, info)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { switchButton } } = this.context
    const {
      openedPane, onSwitchToPane,
    } = this.props
    return (
      <div style={{ display: 'flex' }}>
        {map(PANE_TYPES, (pane) => {
          const nbElementsInfos = this.getNbElementsInfos(pane)
          return (<div key={`switch-table-${pane}`} style={{ display: 'flex' }}>
            <FlatButton
              label={formatMessage({ id: `feature.references.switch-to.${pane}.label` }, { productsNb: nbElementsInfos.nbElements })}
              title={formatMessage({ id: `feature.references.switch-to.${pane}.title` })}
              onClick={() => onSwitchToPane(pane)}
              style={openedPane === pane ? switchButton : null}
              disabled={openedPane === pane}
            />
            {nbElementsInfos.nbErrors !== 0 ? this.displayIcon(nbElementsInfos.nbErrors) : null}
          </div>)
        })}
      </div>
    )
  }
}

export default connect(SwitchTables.mapStateToProps, SwitchTables.mapDispatchToProps)(SwitchTables)
