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
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { PageableInfiniteTableContainer, TableLayout } from '@regardsoss/components'
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

  /** List of attributes presentation models (easier to use with table) */
  static DISPLAYED_ATTRIBUTES_MODELS = [
    DamDomain.AttributeModelController.standardAttributes.thumbnail,
    DamDomain.AttributeModelController.standardAttributes.label,
    DamDomain.AttributeModelController.standardAttributes.ipId,
    DamDomain.AttributeModelController.standardAttributes.creationDate,
    DamDomain.AttributeModelController.standardAttributes.lastUpdate,
  ].map(({ key, label, entityPathName, type }) => ({
    key,
    label,
    attributes: [AccessDomain.AttributeConfigurationController.getStandardAttributeConf(key)],
    enableSorting: false,
  }))

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
      newState.visibleRowsCount = this.computeVisibleRowsCount(newProperties.availableHeight)
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  computeVisibleRowsCount(availableHeight) {
    const lineHeight = this.context.muiTheme['components:infinite-table'].lineHeight
    const remainingRowsHeight = availableHeight - this.context.muiTheme['components:infinite-table'].minHeaderRowHeight
    return Math.max(SelectionDetailResultsTableComponent.MIN_TABLE_PAGE_SIZE,
      Math.floor((remainingRowsHeight / lineHeight) - 1)) // note: remove one row to take headers line in account
  }

  /**
   * Renders columns
   * @return [*] columns
   */
  renderColumns = () => {
    const fixedColumnWidth = this.context.muiTheme['components:infinite-table'].fixedColumnsWidth
    return SelectionDetailResultsTableComponent.DISPLAYED_ATTRIBUTES_MODELS.map(
      model => AttributeColumnBuilder.buildAttributeColumn(model, true, null, fixedColumnWidth))
  }

  render() {
    const { dataobjectsSearchParams, visibleRowsCount } = this.state
    return (
      <TableLayout>
        <PageableInfiniteTableContainer
          pageActions={searchDataobjectsActions}
          pageSelectors={searchDataobjectsSelectors}
          displayedRowsCount={visibleRowsCount}
          columns={this.renderColumns()}
          requestParams={dataobjectsSearchParams}
          emptyComponent={SelectionDetailResultsTableComponent.NO_DATA_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default SelectionDetailResultsTableComponent
