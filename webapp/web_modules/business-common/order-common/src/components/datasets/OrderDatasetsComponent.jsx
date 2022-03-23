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
import values from 'lodash/values'
import get from 'lodash/get'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { BasicListSelectors } from '@regardsoss/store-utils'
import {
  InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea,
  TableHeaderContentBox, TableHeaderOptionGroup, TableColumnsVisibilityOption, StorageCapacityRender,
  NoContentComponent,
} from '@regardsoss/components'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import OrderDatasetsCountHeaderMessage from './OrderDatasetsCountHeaderMessage'
import ShowDatasetFilesContainer from '../../containers/datasets/ShowDatasetFilesContainer'
import OrderDatasetsProcessingContainer from '../../containers/datasets/OrderDatasetsProcessingContainer'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'

// column keys
const LABEL_KEY = 'column.label'
const OBJECT_COUNT_KEY = 'column.objects.count'
const FILES_COUNT_KEY = 'column.files.count'
const FILES_SIZE_KEY = 'column.files.size'
const PROCESSING_KEY = 'column.processing'

/**
 * Shows selected order datasets
 * @author Raphaël Mechali
 */
class OrderDatasetsComponent extends React.Component {
  static propTypes = {
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    // currently selected order
    datasets: PropTypes.arrayOf(OrderShapes.DatasetTask).isRequired,
    // orders navigation actions (for sub containers)
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired,
    // processing list selector (for sub container)
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // boolean in order to display or not processing informations
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
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
  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="datasets.list.no.dataset.information.title"
    messageKey="datasets.list.no.dataset.information.message"
  />

  /**
   * Builds table columns
   * @return {*} Table columns
   */
  buildColumns = () => {
    const { columnsVisibility, navigationActions, isProcessingDependenciesExist } = this.props
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
      // 5 - Processing label
      // Check if user have access to processing endpoint
      ...isProcessingDependenciesExist ? [this.buildProcessingColumn()] : [],
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

  buildProcessingColumn() {
    const { columnsVisibility, processingSelectors } = this.props
    const { intl: { formatMessage } } = this.context
    return new TableColumnBuilder(PROCESSING_KEY).titleHeaderCell()
      .rowCellDefinition({
        Constructor: OrderDatasetsProcessingContainer,
        props: { processingSelectors },
      })
      .label(formatMessage({ id: 'datasets.list.column.processing' }))
      .visible(get(columnsVisibility, PROCESSING_KEY, true))
      .build()
  }

  render() {
    const { datasets, onChangeColumnsVisibility, displayMode } = this.props
    const { muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
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
          maxRowCount={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? maxRowCount : null}
          minRowCount={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? minRowCount : null}
        />
      </TableLayout>
    )
  }
}
export default OrderDatasetsComponent
