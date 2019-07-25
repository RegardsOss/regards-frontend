/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - Dataset label
      new TableColumnBuilder(LABEL_KEY).titleHeaderCell().propertyRenderCell('datasetLabel')
        .label(formatMessage({ id: 'datasets.list.column.label' }))
        .visible(get(columnsVisibility, LABEL_KEY, true))
        .build(),
      // 2 - Objects count
      new TableColumnBuilder(OBJECT_COUNT_KEY).titleHeaderCell().propertyRenderCell('objectsCount')
        .label(formatMessage({ id: 'datasets.list.column.objects.count' }))
        .visible(get(columnsVisibility, OBJECT_COUNT_KEY, true))
        .build(),
      // 3 - Files count
      new TableColumnBuilder(FILES_COUNT_KEY).titleHeaderCell().propertyRenderCell('filesCount')
        .label(formatMessage({ id: 'datasets.list.column.files.count' }))
        .visible(get(columnsVisibility, FILES_COUNT_KEY, true))
        .build(),
      // 4 - Files size
      new TableColumnBuilder(FILES_SIZE_KEY).titleHeaderCell().propertyRenderCell('filesSize', StorageCapacityRender)
        .label(formatMessage({ id: 'datasets.list.column.files.size' }))
        .visible(get(columnsVisibility, FILES_SIZE_KEY, true))
        .build(),
      // 5 - Options
      new TableColumnBuilder().visible(get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true))
        .label(formatMessage({ id: 'datasets.list.column.options' }))
        .optionsColumn([{
          OptionConstructor: ShowDatasetFilesContainer, // show dataset files
          optionProps: { navigationActions },
        }])
        .build(),
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
          </TableHeaderContentBox>
          {/* 2 - table options  */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
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
