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
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { PageableInfiniteTableContainer, TableLayout, TableHeaderLineLoadingAndResults } from '@regardsoss/components'
import SelectionDetailNoDataComponent from './SelectionDetailNoDataComponent'

/**
* Shows details results in a search results table (only the common attributes columns, we cannot have better assertions here)
* @author Raphaël Mechali
*/
class SelectionDetailResultsTableComponent extends React.Component {
  static propTypes = {
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // request parameters
    pathParams: PropTypes.objectOf(PropTypes.string).isRequired,
    // results information
    resultsCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
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
  ].map(({
    key, label, entityPathName, type,
  }) =>
    ({
      key,
      label,
      attributes: [AccessDomain.AttributeConfigurationController.getStandardAttributeConf(key)],
      enableSorting: false,
    }))

  /** static rendering component (it will update itself with context changes) */
  static NO_DATA_COMPONENT = <SelectionDetailNoDataComponent />

  /** Min page size for table */
  static MIN_TABLE_PAGE_SIZE = 5

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // update table rows count to adjust available size
    if (oldProps.availableHeight !== newProps.availableHeight) {
      // compute the number of elements that should be visible at same timerow count
      this.setState({
        visibleRowsCount: this.computeVisibleRowsCount(newProps.availableHeight),
      })
    }
  }

  computeVisibleRowsCount(availableHeight) {
    const { lineHeight, minHeaderRowHeight } = this.context.muiTheme.components.infiniteTable
    const remainingRowsHeight = availableHeight - (minHeaderRowHeight * 2)
    return Math.floor(remainingRowsHeight / lineHeight)
  }

  /**
   * Renders columns
   * @return [*] columns
   */
  renderColumns = () => {
    const { fixedColumnsWidth } = this.context.muiTheme.components.infiniteTable
    return SelectionDetailResultsTableComponent.DISPLAYED_ATTRIBUTES_MODELS.map(model => AttributeColumnBuilder.buildAttributeColumn(model, true, null, fixedColumnsWidth))
  }

  render() {
    const {
      pageActions, pageSelectors, pathParams, resultsCount, isFetching,
    } = this.props
    const { visibleRowsCount } = this.state
    return (
      <TableLayout>
        <TableHeaderLineLoadingAndResults resultsCount={resultsCount} isFetching={isFetching} />
        <PageableInfiniteTableContainer
          pageActions={pageActions}
          pageSelectors={pageSelectors}
          minRowCount={visibleRowsCount}
          maxRowCount={visibleRowsCount}
          columns={this.renderColumns()}
          pathParams={pathParams}
          emptyComponent={SelectionDetailResultsTableComponent.NO_DATA_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default SelectionDetailResultsTableComponent
