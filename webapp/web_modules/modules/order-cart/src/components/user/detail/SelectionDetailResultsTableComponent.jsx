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
import { DamDomain } from '@regardsoss/domain'
import { BasicPageableActions, BasicPageableSelectors } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import {
  PageableInfiniteTableContainer, TableLayout, TableHeaderLineLoadingAndResults, NoContentComponent,
} from '@regardsoss/components'

/**
* Shows details results in a search results table (only the common attributes columns, we cannot have better assertions here)
* @author Raphaël Mechali
*/
class SelectionDetailResultsTableComponent extends React.Component {
  static propTypes = {
    pageActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // request parameters (object of any as it is a POST request)
    requestParams: PropTypes.objectOf(PropTypes.any),
    // results information
    resultsCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** List of attributes presentation models (easier to use with table) */
  static DISPLAYED_ATTRIBUTES_MODELS = [
    DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.thumbnail),
    DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.label),
    DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.id),
    DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId),
  ].map(attribute => ({
    key: attribute.content.name,
    label: { // XXX-WAIT-DM (corresponds with another PM): this is an emulated behavior for non internationalized attributes
      fakeLocale: attribute.content.label,
    },
    visible: true,
    attributes: [attribute],
    enableSorting: false,
  }))

  /** static rendering component (it will update itself with context changes) */
  static NO_DATA_COMPONENT = <NoContentComponent
    titleKey="order-cart.module.basket.items.group.selection.detail.no.data.title"
    messageKey="order-cart.module.basket.items.group.selection.detail.no.data.message"
  />

  /** Min page size for table */
  static MIN_TABLE_PAGE_SIZE = 5

  computeVisibleRowsCount(availableHeight) {
    const { lineHeight, minHeaderRowHeight } = this.context.muiTheme.components.infiniteTable
    const remainingRowsHeight = availableHeight - (minHeaderRowHeight * 2)
    return Math.floor(remainingRowsHeight / lineHeight)
  }

  /**
   * Renders columns
   * @return [*] columns
   */
  renderColumns = () => SelectionDetailResultsTableComponent.DISPLAYED_ATTRIBUTES_MODELS.map(
    // XXX-WAIT-DM (corresponds with another PM): this is an emulated behavior for non internationalized attributes
    model => AttributeColumnBuilder.buildAttributeColumn(model, null, 'fakeLocale'))

  render() {
    const {
      pageActions, pageSelectors, requestParams, resultsCount, isFetching,
    } = this.props
    return (
      <TableLayout>
        <TableHeaderLineLoadingAndResults resultsCount={resultsCount} isFetching={isFetching} />
        <PageableInfiniteTableContainer
          pageActions={pageActions}
          pageSelectors={pageSelectors}
          columns={this.renderColumns()}
          requestParams={requestParams}
          emptyComponent={SelectionDetailResultsTableComponent.NO_DATA_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default SelectionDetailResultsTableComponent
