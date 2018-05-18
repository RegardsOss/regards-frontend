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
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { OrderClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, AutoRefreshPageableTableHOC, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableHeaderOptionGroup, TableHeaderLoadingComponent,
  TableColumnsVisibilityOption, StorageCapacityRender,
} from '@regardsoss/components'
import FileDownloadContainer from '../../containers/files/FileDownloadContainer'
import DatasetFilesCountHeaderMessage from './DatasetFilesCountHeaderMessage'
import NoFileComponent from './NoFileComponent'
import OrderFileStatusRender from './OrderFileStatusRender'

// Column keys
const NAME_KEY = 'name.column'
const SIZE_KEY = 'size.column'
const TYPE_KEY = 'type.column'
const STATUS_KEY = 'status.column'

/**
 * Displays an order dataset files
 * @author Raphaël Mechali
 */
class DatasetFilesComponent extends React.Component {
  static propTypes = {
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
  static EMPTY_COMPONENT = <NoFileComponent />

  /** Loading component (avoids re-rendering it) */
  static LOADING_COMPONENT = <TableHeaderLoadingComponent />

  /**
   * Returns something that can be used as name for file as parameter
   * @param {OrderFile} file file
   * @param {string}  a usable name
   */
  static getFileName(file) {
    // try using the name, default to URI if undefined
    return get(file, 'content.name', get(file, 'content.uri'))
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
   * Builds table columns
   * @return columns
   */
  buildColumns = () => {
    const { columnsVisibility } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { fixedColumnsWidth } = muiTheme.components.infiniteTable

    return [
      // 1 - Name column
      TableColumnBuilder.buildSimpleColumnWithCell(
        NAME_KEY, formatMessage({ id: 'files.list.column.name' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: DatasetFilesComponent.getFileName }]), 0,
        get(columnsVisibility, NAME_KEY, true),
      ),
      // 2 - size column
      TableColumnBuilder.buildSimplePropertyColumn(
        SIZE_KEY, formatMessage({ id: 'files.list.column.size' }),
        'content.size', 1, get(columnsVisibility, SIZE_KEY, true), StorageCapacityRender,
      ),
      // 3 - MIME type column
      TableColumnBuilder.buildSimplePropertyColumn(
        TYPE_KEY, formatMessage({ id: 'files.list.column.type' }),
        'content.mimeType', 2, get(columnsVisibility, TYPE_KEY, true),
      ),
      // 4 - status column
      TableColumnBuilder.buildSimpleColumnWithCell(
        STATUS_KEY, formatMessage({ id: 'files.list.column.status' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: DatasetFilesComponent.getStatus, RenderConstructor: OrderFileStatusRender }]),
        3, get(columnsVisibility, STATUS_KEY, true),
      ),
      // 5 - options column
      TableColumnBuilder.buildOptionsColumn(formatMessage({ id: 'files.list.column.options' }), [{
        OptionConstructor: FileDownloadContainer, // show download
      }], get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true), fixedColumnsWidth),
    ]
  }

  render() {
    const {
      isFetching, totalFilesCount, onChangeColumnsVisibility, pathParams, orderFilesActions, orderFilesSelectors,
    } = this.props
    const columns = this.buildColumns()

    // render headers and table
    return (
      <TableLayout>
        {/* 0 - Table auto refresh HOC (no graphic) */}
        <AutoRefreshPageableTableHOC
          pageableTableActions={orderFilesActions}
          pageableTableSelectors={orderFilesSelectors}
          pathParams={pathParams}
        />
        <TableHeaderLine>
          {/* 1 - commands count */}
          <TableHeaderContentBox>
            <DatasetFilesCountHeaderMessage totalFilesCount={totalFilesCount} />
          </TableHeaderContentBox >
          {/* 2 - loading */
            isFetching ? DatasetFilesComponent.LOADING_COMPONENT : null
          }
          {/* 3 - table options  */}
          <TableHeaderOptionsArea >
            <TableHeaderOptionGroup>
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea >
        </TableHeaderLine>
        {/* the table itself */}
        <PageableInfiniteTableContainer
          // infinite table configuration
          pageActions={orderFilesActions}
          pageSelectors={orderFilesSelectors}
          pathParams={pathParams}
          columns={columns}
          emptyComponent={DatasetFilesComponent.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default DatasetFilesComponent
