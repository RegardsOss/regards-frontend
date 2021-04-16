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
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import { PANE_TYPES_ENUM, PANE_TYPES } from '../domain/PaneTypes'
import { referencesSelectors } from '../clients/ReferencesClient'
import { creationRequestSelectors } from '../clients/CreationRequestsClient'
import { deleteRequestSelectors } from '../clients/DeleteRequestsClient'
import { extractionRequestSelectors } from '../clients/ExtractionRequestsClient'
import { notificationRequestSelectors } from '../clients/NotificationRequestsClient'
import { updateRequestSelectors } from '../clients/UpdateRequestsClient'

/**
  * Switch between tables
  * @author Théo Lasserre
  */
export class SwitchTables extends React.Component {
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
      extractionInfo: extractionRequestSelectors.getInfos(state),
      creationMeta: creationRequestSelectors.getMetaData(state),
      creationInfo: creationRequestSelectors.getInfos(state),
      updateMeta: updateRequestSelectors.getMetaData(state),
      updateInfo: updateRequestSelectors.getInfos(state),
      deleteMeta: deleteRequestSelectors.getMetaData(state),
      deleteInfo: deleteRequestSelectors.getInfos(state),
      notificationMeta: notificationRequestSelectors.getMetaData(state),
      notificationInfo: notificationRequestSelectors.getInfos(state),
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
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  displayIcon = (elementCount) => {
    const {
      moduleTheme: { dashboardStyle: { tableStyle: { overlayStyle } } },
    } = this.context
    return (<div style={{ display: 'flex' }}>
      <IconButton
        disabled
        style={overlayStyle.iconButton.style}
      />
      <div style={overlayStyle.style}>
        <Chip
          labelStyle={overlayStyle.chip.labelStyle}
          style={overlayStyle.chip.style}
        >
          {elementCount}
        </Chip>
        <Alert style={overlayStyle.icon.style} />
      </div>
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
          return (<div key={`switch-table-${pane}`}>
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

export default connect(SwitchTables.mapStateToProps, null)(SwitchTables)
