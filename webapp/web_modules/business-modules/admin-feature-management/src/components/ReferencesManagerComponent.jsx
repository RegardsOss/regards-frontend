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
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { FemDomain } from '@regardsoss/domain'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableSelectionModes, DateValueRender, NoContentComponent, TableHeaderLine,
  TableHeaderLoadingComponent, TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { referencesActions, referencesSelectors } from '../clients/ReferencesClient'
import messages from '../i18n'
import styles from '../styles'
import { referencesTableSelectors, referencesTableActions } from '../clients/ReferencesTableClient'
import HeaderActionsBarContainer from '../containers/HeaderActionsBarContainer'
import DisseminationTableCustomCellRender from './render/DisseminationTableCustomCellRender'
import ReferenceDetailOption from './options/ReferenceDetailOption'
import ReferenceDeleteOption from './options/ReferenceDeleteOption'
import DeleteDialog from './options/DeleteDialog'
import ReferenceDetailDialog from './options/ReferenceDetailDialog'
import ReferenceNotifyDialog from './options/ReferenceNotifyDialog'
import ReferenceNotifyOption from './options/ReferenceNotifyOption'
import { DIALOG_TYPES } from '../domain/dialogTypes'

/**
* Displays the list of references
* @author Théo Lasserre
*/
export class ReferencesManagerComponent extends React.Component {
  static propTypes = {
    onDeleteRequests: PropTypes.func.isRequired,
    onNotifyRequests: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    pageSize: PropTypes.number,
    paneType: PropTypes.oneOf(FemDomain.REQUEST_TYPES).isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="feature.references.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="feature.references.loading.results"
    Icon={SearchIcon}
  />

  static SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static COLUMN_KEYS = {
    PROVIDER_ID: 'providerId',
    LASTUPDATE: 'lastUpdate',
    VERSION: 'version',
    DISSEMINATION: 'dissemination',
    ACTIONS: 'actions',
  }

  state = {
    [DIALOG_TYPES.DETAIL_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.NOTIFY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  }

  /**
  * Inner callback: Opens dialog corresopnding to request type
  * @param {[*]} entities entities as an array of FemShapes.Reference
  * @param {string} dialogRequestType dialog type for the request to handle, from DIALOG_TYPES
  */
  onOpenActionDialog = (dialogRequestType, entities, mode = TableSelectionModes.includeSelected) => this.setState({
    [dialogRequestType]: {
      open: true,
      mode,
      entities,
    },
  })

  /**
  * Callback: On view detail reference
  * @param {[*]} entities entities as an array of FemShapes.Reference
  */
  onDetail = (entities) => this.onOpenActionDialog(DIALOG_TYPES.DETAIL_DIALOG, entities)

  /**
  * Callback: On delete requests for selection as parameter (shows corresponding dialog)
  * @param {[*]} entities entities as an array of FemShapes.Reference
  */
  onDelete = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, entities, mode)

  /**
  * Callback: On notify requests for selection as parameter (shows corresponding dialog)
  * @param {[*]} entities entities as an array of FemShapes.Reference
  */
  onNotify = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.NOTIFY_DIALOG, entities, mode)

  /**
  * Inner callback: closes dialog corresponding to request type
  * @param {string} dialogRequestType dialog type for the request to handle, from DIALOG_TYPES
  */
  onCloseActionDialog = (dialogRequestType) => this.setState({
    [dialogRequestType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  })

  /**
  * Inner callback: confirms action dialog. It:
  * - Hides corresponding dialog
  * - Converts payload to send server action
  * @param {string} dialogRequestType dialog type for the request to handle, from DIALOG_TYPES
  * @return {*} payload for server action
  */
  onConfirmActionDialog = (dialogRequestType) => {
    const { bodyParameters } = this.props
    const { entities, mode } = this.state[dialogRequestType]
    this.onCloseActionDialog(dialogRequestType)
    return {
      ...bodyParameters,
      featureIdsSelectionMode: mode === TableSelectionModes.includeSelected
        ? ReferencesManagerComponent.SELECTION_MODE.INCLUDE
        : ReferencesManagerComponent.SELECTION_MODE.EXCLUDE,
      featureIds: map(entities, (e) => e.content.id),
    }
  }

  onConfirm = (dialogRequestType) => {
    const { onDeleteRequests, onNotifyRequests, paneType } = this.props
    const payload = this.onConfirmActionDialog(dialogRequestType)
    switch (dialogRequestType) {
      case DIALOG_TYPES.DELETE_DIALOG:
        onDeleteRequests(payload, paneType)
        break
      case DIALOG_TYPES.NOTIFY_DIALOG:
        onNotifyRequests(payload)
        break
      default:
        console.error('Invalid dialog type', dialogRequestType)
    }
  }

  renderDialog = (dialogRequestType) => {
    const { open } = this.state[dialogRequestType]
    if (open) {
      let component = null
      switch (dialogRequestType) {
        case DIALOG_TYPES.DETAIL_DIALOG:
          component = <ReferenceDetailDialog
            reference={this.state[dialogRequestType].entities[0]}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case DIALOG_TYPES.DELETE_DIALOG:
          component = <DeleteDialog
            onConfirmDelete={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case DIALOG_TYPES.NOTIFY_DIALOG:
          component = <ReferenceNotifyDialog
            onConfirmNotify={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        default:
      }
      return (component)
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { tableStyle: { loadingStyle } } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      isFetching, getColumnSortingData, onSort, pageSize, requestParameters, paneType, bodyParameters,
    } = this.props
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const columns = [ // eslint wont fix: API issue
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, referencesSelectors, referencesTableActions, referencesTableSelectors)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.PROVIDER_ID).titleHeaderCell().propertyRenderCell('content.providerId')
        .label(formatMessage({ id: 'feature.references.list.table.headers.providerId' }))
        .sortableHeaderCell(...getColumnSortingData(ReferencesManagerComponent.COLUMN_KEYS.PROVIDER_ID), onSort)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.LASTUPDATE).titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(formatMessage({ id: 'feature.references.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...getColumnSortingData(ReferencesManagerComponent.COLUMN_KEYS.LASTUPDATE), onSort)
        .fixedSizing(200)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.VERSION).titleHeaderCell().propertyRenderCell('content.version')
        .label(formatMessage({ id: 'feature.references.list.table.headers.version' }))
        .sortableHeaderCell(...getColumnSortingData(ReferencesManagerComponent.COLUMN_KEYS.VERSION), onSort)
        .fixedSizing(100)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.DISSEMINATION).titleHeaderCell()
        .label(formatMessage({ id: 'feature.references.list.table.headers.dissemination' }))
        .rowCellDefinition({
          Constructor: DisseminationTableCustomCellRender,
        })
        // .fixedSizing(300)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.ACTIONS).titleHeaderCell()
        .label(formatMessage({ id: 'feature.references.list.filters.actions' }))
        .optionsColumn([{
          OptionConstructor: ReferenceDetailOption,
          optionProps: {
            onReferenceDetail: this.onDetail,
          },
        }, {
          OptionConstructor: ReferenceDeleteOption,
          optionProps: { onDelete: this.onDelete },
        }, {
          OptionConstructor: ReferenceNotifyOption,
          optionProps: { onNotify: this.onNotify },
        }])
        .build(),
    ]
    return (
      <div>
        <TableLayout>
          <TableHeaderLine>
            <HeaderActionsBarContainer
              paneType={paneType}
              onNotify={this.onNotify}
              onDelete={this.onDelete}
            />
          </TableHeaderLine>
          <div style={loadingStyle}>
            <TableHeaderLoadingComponent loading={isFetching} />
          </div>
          <PageableInfiniteTableContainer
            name="feature-management-table"
            pageActions={referencesActions}
            pageSelectors={referencesSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            bodyParams={bodyParameters}
            fetchUsingPostMethod
            requestParams={requestParameters}
            emptyComponent={isFetching ? ReferencesManagerComponent.LOADING_COMPONENT : ReferencesManagerComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
        {this.renderDialog(DIALOG_TYPES.DETAIL_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.NOTIFY_DIALOG)}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(ReferencesManagerComponent))
