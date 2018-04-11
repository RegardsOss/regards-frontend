/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea,
  TableHeaderContentBox, TableHeaderOptionGroup, TableColumnsVisibilityOption, StorageCapacityRender,
} from '@regardsoss/components'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import NoDatasetComponent from './NoDatasetComponent'
import OrderDatasetsCountHeaderMessage from './OrderDatasetsCountHeaderMessage'
import ShowDatasetFilesContainer from '../../containers/datasets/ShowDatasetFilesContainer'

// column keys
const LABEL_KEY = 'column.label'
const OBJECT_COUNT_KEY = 'column.objects.count'
const FILES_COUNT_KEY = 'column.files.count'
const FILES_SIZE_KEY = 'column.files.size'

/**
 * Shows selected order datasets
 * @author Raphaël Mechali
 */
class OrderDatasetsComponent extends React.Component {
  static propTypes = {
    // currently selected order
    datasets: PropTypes.arrayOf(OrderShapes.DatasetTask).isRequired,
    // orders navigation actions (for sub containers)
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired,
    // columns visibility, like (string: columnKey):(boolean: column visible)
    columnsVisibility: PropTypes.objectOf(PropTypes.bool).isRequired,
    // callback: on change columns visibility
    onChangeColumnsVisibility: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** No data component (avoids re-rendering it) */
  static EMPTY_COMPONENT = <NoDatasetComponent />

  /**
   * Builds table columns
   * @return {*} Table columns
   */
  buildColumns = () => {
    const { columnsVisibility, navigationActions } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { fixedColumnsWidth } = muiTheme.components.infiniteTable
    return [
      // 1 - Dataset label
      TableColumnBuilder.buildSimplePropertyColumn(
        LABEL_KEY, formatMessage({ id: 'datasets.list.column.label' }),
        'datasetLabel', 0, get(columnsVisibility, LABEL_KEY, true),
      ),
      // 2 - Objects count
      TableColumnBuilder.buildSimplePropertyColumn(
        OBJECT_COUNT_KEY, formatMessage({ id: 'datasets.list.column.objects.count' }),
        'objectsCount', 1, get(columnsVisibility, OBJECT_COUNT_KEY, true),
      ),
      // 3 - Files count
      TableColumnBuilder.buildSimplePropertyColumn(
        FILES_COUNT_KEY, formatMessage({ id: 'datasets.list.column.files.count' }),
        'filesCount', 2, get(columnsVisibility, FILES_COUNT_KEY, true),
      ),
      // 4 - Files size
      TableColumnBuilder.buildSimplePropertyColumn(
        FILES_SIZE_KEY, formatMessage({ id: 'datasets.list.column.files.size' }),
        'filesSize', 3, get(columnsVisibility, FILES_SIZE_KEY, true), StorageCapacityRender,
      ),
      // 5 - Options
      TableColumnBuilder.buildOptionsColumn(formatMessage({ id: 'datasets.list.column.options' }), [{
        OptionConstructor: ShowDatasetFilesContainer, // show dataset files
        optionProps: { navigationActions },
      }], get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true), fixedColumnsWidth),
    ]
  }


  render() {
    const { datasets, onChangeColumnsVisibility } = this.props
    const columns = this.buildColumns()
    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - commands count */}
          <TableHeaderContentBox>
            <OrderDatasetsCountHeaderMessage totalDatasetsCount={datasets.length} />
          </TableHeaderContentBox >
          {/* 2 - table options  */}
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
        <InfiniteTableContainer
          columns={columns}
          emptyComponent={OrderDatasetsComponent.EMPTY_COMPONENT}
          entities={datasets}
        />
      </TableLayout>
    )
  }
}
export default OrderDatasetsComponent
