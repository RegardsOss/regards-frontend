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
import get from 'lodash/get'
import values from 'lodash/values'
import FlatButton from 'material-ui/FlatButton'
import RefreshCircle from 'mdi-material-ui/RefreshCircle'
import NoFileIcon from 'mdi-material-ui/FolderOutline'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { OrderClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, AutoRefreshPageableTableHOC, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableHeaderOptionGroup, TableHeaderLoadingComponent,
  TableColumnsVisibilityOption, StorageCapacityRender, NoContentComponent, StringValueRender,
} from '@regardsoss/components'
import FileDownloadContainer from '../../containers/files/FileDownloadContainer'
import OrderDatasetsCountHeaderMessage from './OrderDatasetsCountHeaderMessage'
import OrderFileStatusRender from './OrderFileStatusRender'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'

// Column keys
const NAME_KEY = 'name.column'
const SIZE_KEY = 'size.column'
const TYPE_KEY = 'type.column'
const STATUS_KEY = 'status.column'
const SOURCE_KEY = 'source.column'

/**
 * Displays an order dataset files
 * @author Raphaël Mechali
 */
class DatasetFilesComponent extends React.Component {
  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    // is fetching?
    isFetching: PropTypes.bool,
    // total order count
    totalFilesCount: PropTypes.number.isRequired,
    // request related
    pathParams: PropTypes.objectOf(PropTypes.any).isRequired,
    orderFilesActions: PropTypes.instanceOf(OrderClient.OrderDatasetFilesActions).isRequired,
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // columns visibility, like (string: columnKey):(boolean: column visible)
    columnsVisibility: PropTypes.objectOf(PropTypes.bool).isRequired,
    // columns configuration callback
    onChangeColumnsVisibility: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** No data component (avoids re-rendering it) */
  static EMPTY_COMPONENT = <NoContentComponent
    Icon={NoFileIcon}
    titleKey="files.list.no.file.information.title"
    messageKey="files.list.no.file.information.message"
  />

  /**
   * Returns something that can be used as name for file as parameter
   * @param {OrderFile} file file
   * @param {string}  a usable name
   */
  static getFileName(file) {
    // try using the name, default to URI if undefined
    return get(file, 'content.filename', get(file, 'content.uri'))
  }

  /**
   * Returns something that can be used as name for file as parameter
   * @param {OrderFile} file file
   * @param {string} file state
   */
  static getStatus(file) {
    return get(file, 'content.state')
  }

  /**
   * Return source of file. A processing for example
   */
  static getSource(file) {
    return get(file, 'content.source')
  }

  state = {
    isAutoRefreshEnabled: true,
  }

  onToggleAutoRefresh = () => {
    this.setState({
      isAutoRefreshEnabled: !this.state.isAutoRefreshEnabled,
    })
  }

  /**
   * Builds table columns
   * @return columns
   */
  buildColumns = () => {
    const { columnsVisibility, displayMode } = this.props
    const { intl: { formatMessage } } = this.context
    const columns = [
      // 1 - Name column
      new TableColumnBuilder(NAME_KEY).titleHeaderCell().visible(get(columnsVisibility, NAME_KEY, true))
        .label(formatMessage({ id: 'files.list.column.name' }))
        .valuesRenderCell([{ getValue: DatasetFilesComponent.getFileName }])
        .build(),
      // 2 - size column
      new TableColumnBuilder(SIZE_KEY).titleHeaderCell().visible(get(columnsVisibility, SIZE_KEY, true))
        .label(formatMessage({ id: 'files.list.column.size' }))
        .propertyRenderCell('content.filesize', StorageCapacityRender)
        .build(),
      // 3 - MIME type column
      new TableColumnBuilder(TYPE_KEY).titleHeaderCell().visible(get(columnsVisibility, TYPE_KEY, true))
        .label(formatMessage({ id: 'files.list.column.type' }))
        .propertyRenderCell('content.mimeType')
        .build(),
      // 4 - status column
      new TableColumnBuilder(STATUS_KEY).titleHeaderCell().visible(get(columnsVisibility, STATUS_KEY, true))
        .label(formatMessage({ id: 'files.list.column.status' }))
        .valuesRenderCell([{ getValue: DatasetFilesComponent.getStatus, RenderConstructor: OrderFileStatusRender }])
        .build(),
      // 5 - source column (either file or processing)
      new TableColumnBuilder(SOURCE_KEY).titleHeaderCell().visible(get(columnsVisibility, SOURCE_KEY, true))
        .label(formatMessage({ id: 'files.list.column.source' }))
        .valuesRenderCell([{ getValue: DatasetFilesComponent.getSource, RenderConstructor: StringValueRender }])
        .build(),
    ]
    if (displayMode === ORDER_DISPLAY_MODES.USER) {
      columns.push(new TableColumnBuilder().visible(get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true))
        .label(formatMessage({ id: 'files.list.column.options' }))
        .optionsColumn([{
          OptionConstructor: FileDownloadContainer, // show download
        }])
        .build())
    }
    return columns
  }

  render() {
    const {
      isFetching, totalFilesCount, onChangeColumnsVisibility, pathParams, orderFilesActions, orderFilesSelectors,
      displayMode,
    } = this.props
    const { isAutoRefreshEnabled } = this.state
    const { muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = this.buildColumns()

    // render headers and table
    return (
      <TableLayout>
        {/* 0 - Table auto refresh HOC (no graphic) */}
        <AutoRefreshPageableTableHOC
          pageableTableActions={orderFilesActions}
          pageableTableSelectors={orderFilesSelectors}
          pathParams={pathParams}
          enableAutoRefresh={isAutoRefreshEnabled}
        />
        <TableHeaderLine>
          {/* 1 - commands count */}
          <TableHeaderContentBox>
            <OrderDatasetsCountHeaderMessage totalFilesCount={totalFilesCount} />
          </TableHeaderContentBox>
          {/* 2 - loading */}
          <TableHeaderLoadingComponent loading={isFetching} />
          {/* 3 - table options  */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              <FlatButton
                icon={<RefreshCircle />}
                label={this.context.intl.formatMessage({ id: 'order.list.refresh.auto.label' })}
                secondary={!isAutoRefreshEnabled}
                onClick={this.onToggleAutoRefresh}
              />
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        {/* the table itself */}
        <PageableInfiniteTableContainer
        // infinite table configuration
          pageActions={orderFilesActions}
          pageSelectors={orderFilesSelectors}
          pathParams={pathParams}
          columns={columns}
          emptyComponent={DatasetFilesComponent.EMPTY_COMPONENT}
          maxRowCount={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? maxRowCount : null}
          minRowCount={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? minRowCount : null}
        />
      </TableLayout>
    )
  }
}
export default DatasetFilesComponent
