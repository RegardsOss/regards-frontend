/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { PageableInfiniteTableContainer, TableSortOrders } from '@regardsoss/components'
import { DamDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { getTypeRender } from '@regardsoss/attributes-common'
import { searchDataobjectsActions, searchDataobjectsSelectors } from '../../../client/SearchDataobjectsClient'
import SelectionDetailNoDataComponent from './SelectionDetailNoDataComponent'

/**
* Shows details results in a search results table (only the common attributes columns, we cannot have better assertions here)
* @author Raphaël Mechali
*/
class SelectionDetailResultsTableComponent extends React.Component {

  static propTypes = {
    // details object search request
    // eslint-disable-next-line react/no-unused-prop-types
    openSearchRequest: PropTypes.string, // used in onPropertiesChanged
    // parent provided available height, to let this component adjust table size depending on current space
    // eslint-disable-next-line react/no-unused-prop-types
    availableHeight: PropTypes.number.isRequired, // used in onPropertiesChanged
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Table configuration (not dynamic in this component) */
  static TABLE_CONFIGURATION = {
    displayColumnsHeader: true,
    displayCheckbox: false,
    displaySelectAll: false,
    // line height: by default
  }

  /** Table pane configuration (not dynamic in this component) */
  static TABLE_PANE_CONFIGURATION = {
    displayTableHeader: false,
    displaySortFilter: true,
    showParameters: true,
  }

  /**
   * Defines behavior for fixed size coumns (spare some table width)
   */
  static FIXED_COLUMNS_TYPES = [DamDomain.AttributeModelController.ATTRIBUTE_TYPES.THUMBNAIL]

  /** static rendering component (it will update itself with context changes) */
  static NO_DATA_COMPONENT = <SelectionDetailNoDataComponent />

  /** Min page size for table */
  static MIN_TABLE_PAGE_SIZE = 5

  /** Default component state */
  static DEFAULT_STATE = {
    dataobjectsSearchParams: { queryParams: '' },
    // Default values
    pageSize: SelectionDetailResultsTableComponent.MIN_TABLE_PAGE_SIZE,
  }

  /** React lifecycle method: component will mount. Used here to detect properties changed */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /** React lifecycle method: component will receive new props. Used here to detect properties changed */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties changed:
   * recompute and store in state transient values that can be extract from properties but should not be
   * computed at render time for efficiency reasons
   * @param oldProperties old component properties
   * @param newProperties new component properties
   */
  onPropertiesChanged = (oldProperties, newProperties) => {
    const oldState = this.state
    const newState = {
      ...(oldState || SelectionDetailResultsTableComponent.DEFAULT_STATE),
    }
    // 1 - prepare table search dataobjects request
    if (oldProperties.openSearchRequest !== newProperties.openSearchRequest) {
      newState.dataobjectsSearchParams = { queryParams: newProperties.openSearchRequest }
    }
    // 2 - update table rows count to adjust available size
    if (oldProperties.availableHeight !== newProperties.availableHeight) {
      // compute the number of elements that should be visible at same timerow count
      newState.pageSize = this.computePageSize(newProperties.availableHeight)
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  computePageSize(availableHeight) {
    const lineHeight = this.context.muiTheme['components:infinite-table'].lineHeight
    return Math.max(SelectionDetailResultsTableComponent.MIN_TABLE_PAGE_SIZE,
      Math.floor((availableHeight / lineHeight) - 1)) // note: remove one row to take headers line in account
  }

  /**
   * Renders columns
   * @return [*] columns
   */
  renderColumns = () => [
    DamDomain.AttributeModelController.standardAttributes.thumbnail,
    DamDomain.AttributeModelController.standardAttributes.label,
    DamDomain.AttributeModelController.standardAttributes.ipId,
    DamDomain.AttributeModelController.standardAttributes.creationDate,
    DamDomain.AttributeModelController.standardAttributes.lastUpdate,
  ].map(({ label, entityPathName, type }) => { // transform into a column models
    const typeSpecifics = SelectionDetailResultsTableComponent.FIXED_COLUMNS_TYPES.includes(type) ? { // fixed column
      fixed: this.context.muiTheme['components:infinite-table'].fixedColumnsWidth,
      hideLabel: true,
    } : { hideLabel: false } // default column
    // compute renderer
    const customCell = getTypeRender(type)
    // return column model
    return {
      label,
      attributes: [entityPathName],
      sortable: false,
      customCell: customCell ? { component: customCell, props: {} } : undefined,
      // retrieve column sorting in current state
      sortingOrder: TableSortOrders.NO_SORT,
      ...typeSpecifics,
    }
  })

  render() {
    const { dataobjectsSearchParams, pageSize } = this.state
    const minRowCount = this.context.muiTheme['components:infinite-table'].minRowCount
    return (
      <PageableInfiniteTableContainer
        pageActions={searchDataobjectsActions}
        pageSelectors={searchDataobjectsSelectors}
        pageSize={pageSize}
        minRowCount={minRowCount}
        columns={this.renderColumns()}
        requestParams={dataobjectsSearchParams}
        tableConfiguration={SelectionDetailResultsTableComponent.TABLE_CONFIGURATION}
        tablePaneConfiguration={SelectionDetailResultsTableComponent.TABLE_PANE_CONFIGURATION}
        emptyComponent={SelectionDetailResultsTableComponent.NO_DATA_COMPONENT}
      />
    )
  }
}
export default SelectionDetailResultsTableComponent
