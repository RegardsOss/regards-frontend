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
import get from 'lodash/get'
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableSelectionModes, DateValueRender, NoContentComponent, TableHeaderLine,
  TableHeaderLoadingComponent, TableFilterSortingAndVisibilityContainer,
  withSortTables,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IngestDomain } from '@regardsoss/domain'
import HeaderActionsBarContainer from '../../containers/HeaderActionsBarContainer'
import StorageArrayRender from './StorageArrayRender'
import AIPHistoryOptionContainer from '../../containers/packages/AIPHistoryOptionContainer'
import AIPDetailOption from './AIPDetailOption'
import AIPModifyOption from './AIPModifyOption'
import AIPDeleteOption from './AIPDeleteOption'
import AIPDetailComponent from './AIPDetailComponent'
import AIPModifyDialogContainer from '../../containers/packages/AIPModifyDialogContainer'
import AIPDeleteDialog from './AIPDeleteDialog'
import SIPDetailContainer from '../../containers/packages/SIPDetailContainer'
import AIPPostRequestDialog from './AIPPostRequestDialog'
import AIPTypeRender from './AIPTypeRender'
import AIPStatusRender from './AIPStatusRender'
import { DIALOG_TYPES } from '../../domain/dialogTypes'
import clientByPane from '../../domain/ClientByPane'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * Displays the list of OAIS packages
 * @author Théo Lasserre
 */

export const PACKAGE_COLUMN_KEYS = {
  PROVIDER_ID: 'providerId',
  STATE: 'state',
  LASTUPDATE: 'lastUpdate',
  VERSION: 'version',
  STORAGES: 'storages',
  TYPE: 'type',
  ACTIONS: 'actions',
}

export class OAISPackageManagerComponent extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pageSize: PropTypes.number,
    onDeleteRequests: PropTypes.func.isRequired,
    onModifyAip: PropTypes.func.isRequired,
    paneType: PropTypes.oneOf(IngestDomain.REQUEST_TYPES).isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="oais.packages.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="oais.packages.loading.results"
    Icon={SearchIcon}
  />

  state = {
    [DIALOG_TYPES.AIP_DETAIL_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.SIP_DETAIL_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.MODIFY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.POST_REQUEST_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
      deletionErrors: [],
      modifyErrors: [],
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

  onViewAIPDetail = (entity) => this.onOpenActionDialog(DIALOG_TYPES.AIP_DETAIL_DIALOG, [entity])

  onViewSIPDetail = (entity) => this.onOpenActionDialog(DIALOG_TYPES.SIP_DETAIL_DIALOG, [entity])

  onDeleteSelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, entities, mode)

  onDeleteProduct = (entity) => this.onDeleteSelection([entity])

  onModifySelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.MODIFY_DIALOG, entities, mode)

  onModifyProduct = (entity) => this.onModifySelection([entity])

  updatePostDialogState = (actionResult) => {
    if (actionResult.error) {
      this.setState({
        [DIALOG_TYPES.POST_REQUEST_DIALOG]: {
          ...[DIALOG_TYPES.POST_REQUEST_DIALOG],
          modifyErrors: actionResult.error,
        },
      })
    }
  }

  onConfirmDelete = (deletionMode) => {
    const { bodyParameters, paneType } = this.props
    this.onCloseActionDialog(DIALOG_TYPES.DELETE_DIALOG)
    const { mode, entities } = this.state[DIALOG_TYPES.DELETE_DIALOG]
    const { onDeleteRequests } = this.props
    const payload = {
      ...bodyParameters,
      deletionMode,
      ...this.getActionPayload(entities, mode),
    }
    onDeleteRequests(payload, paneType, this.updatePostDialogState)
  }

  onConfirmModify = (modifyParameters) => {
    const { bodyParameters, onModifyAip } = this.props
    this.onCloseActionDialog(DIALOG_TYPES.MODIFY_DIALOG)
    const { mode, entities } = this.state[DIALOG_TYPES.MODIFY_DIALOG]
    const finalModifyPayload = {
      addTags: modifyParameters.tags.toAdd,
      removeTags: modifyParameters.tags.toDelete,
      addCategories: modifyParameters.categories.toAdd,
      removeCategories: modifyParameters.categories.toDelete,
      removeStorages: modifyParameters.storages.toDelete,
      criteria: {
        ...bodyParameters,
        ...this.getActionPayload(entities, mode),
      },
    }
    onModifyAip(finalModifyPayload, this.updatePostDialogState)
  }

  getActionPayload = (entities, mode) => {
    const aipIds = map(entities, (e) => get(e, 'content.aipId', ''))
    const selectionMode = mode === TableSelectionModes.includeSelected ? TableSelectionModes.INCLUDE : TableSelectionModes.EXCLUDE
    return IngestDomain.AipFilters.builder().withAipIds(aipIds, selectionMode).build()
  }

  renderDialog = (dialogRequestType) => {
    const { open, mode, entities } = this.state[dialogRequestType]
    const { bodyParameters } = this.props
    if (open) {
      let component = null
      switch (dialogRequestType) {
        case DIALOG_TYPES.MODIFY_DIALOG:
          component = <AIPModifyDialogContainer
            onConfirmModify={this.onConfirmModify}
            contextRequestBodyParameters={{ ...bodyParameters, ...this.getActionPayload(entities, mode) }}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case DIALOG_TYPES.POST_REQUEST_DIALOG:
          component = <AIPPostRequestDialog
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
            deletionErrors={this.state[dialogRequestType].deletionErrors}
            modifyErrors={this.state[dialogRequestType].modifyErrors}
          />
          break
        case DIALOG_TYPES.DELETE_DIALOG:
          component = <AIPDeleteDialog
            onConfirmDelete={this.onConfirmDelete}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case DIALOG_TYPES.SIP_DETAIL_DIALOG:
          component = <SIPDetailContainer
            sipId={get(entities[0], 'content.aip.sipId')}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case DIALOG_TYPES.AIP_DETAIL_DIALOG:
          component = <AIPDetailComponent
            aip={entities[0]}
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
      pageSize, isLoading, paneType, bodyParameters,
      getColumnSortingData, onSort, requestParameters,
    } = this.props
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const columns = [ // eslint wont fix: API issue
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].selectors, clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].tableActions, clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].tableSelectors)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.PROVIDER_ID).titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .sortableHeaderCell(...getColumnSortingData(PACKAGE_COLUMN_KEYS.PROVIDER_ID), onSort)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.TYPE).titleHeaderCell().propertyRenderCell('content.aip.ipType', AIPTypeRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.STATE).titleHeaderCell().propertyRenderCell('content.state', AIPStatusRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .sortableHeaderCell(...getColumnSortingData(PACKAGE_COLUMN_KEYS.STATE), onSort)
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.LASTUPDATE).titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...getColumnSortingData(PACKAGE_COLUMN_KEYS.LASTUPDATE), onSort)
        .fixedSizing(200)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.VERSION).titleHeaderCell().propertyRenderCell('content.version')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.version' }))
        .sortableHeaderCell(...getColumnSortingData(PACKAGE_COLUMN_KEYS.VERSION), onSort)
        .fixedSizing(100)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.STORAGES).titleHeaderCell().propertyRenderCell('content.storages', StorageArrayRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.data.storages' }))
        .fixedSizing(300)
        .build(),
      new TableColumnBuilder(PACKAGE_COLUMN_KEYS.ACTIONS).titleHeaderCell()
        .label(formatMessage({ id: 'oais.packages.list.filters.actions' }))
        .optionsColumn([{
          OptionConstructor: AIPHistoryOptionContainer,
        }, {
          OptionConstructor: AIPDetailOption,
          optionProps: {
            onViewAIPDetail: this.onViewAIPDetail,
            onViewSIPDetail: this.onViewSIPDetail,
          },
        }, {
          OptionConstructor: AIPModifyOption,
          optionProps: { onModify: this.onModifyProduct },
        }, {
          OptionConstructor: AIPDeleteOption,
          optionProps: { onDelete: this.onDeleteProduct },
        }])
        .build(),
    ]
    return (
      <div>
        <TableLayout>
          <TableHeaderLine>
            <div style={loadingStyle}>
              <TableHeaderLoadingComponent loading={isLoading} />
            </div>
            <HeaderActionsBarContainer
              paneType={paneType}
              onModify={this.onModifySelection}
              onDelete={this.onDeleteSelection}
            />
          </TableHeaderLine>
          <PageableInfiniteTableContainer
            name="package-management-table"
            pageActions={clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].actions}
            pageSelectors={clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].selectors}
            tableActions={clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].tableActions}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={requestParameters}
            bodyParams={bodyParameters}
            emptyComponent={isLoading ? OAISPackageManagerComponent.LOADING_COMPONENT : OAISPackageManagerComponent.EMPTY_COMPONENT}
            fetchUsingPostMethod
          />
        </TableLayout>
        {this.renderDialog(DIALOG_TYPES.AIP_DETAIL_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.SIP_DETAIL_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.MODIFY_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.POST_REQUEST_DIALOG)}
      </div>
    )
  }
}

export default withSortTables(PACKAGE_COLUMN_KEYS)(withModuleStyle(styles)(withI18n(messages)(OAISPackageManagerComponent)))
