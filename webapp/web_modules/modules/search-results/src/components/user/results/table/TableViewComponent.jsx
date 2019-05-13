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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { DataManagementShapes, CommonShapes, UIShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TableColumnBuilder, PageableInfiniteTableContainer } from '@regardsoss/components'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { tableSelectors, tableActions } from '../../../../clients/TableClient'
import { selectors as searchSelectors } from '../../../../clients/SearchEntitiesClient'
import AddElementToCartContainer from '../../../../containers/user/results/common/options/AddElementToCartContainer'
import OneElementServicesContainer from '../../../../containers/user/results/common/options/OneElementServicesContainer'
import EmptyTableComponent from '../common/EmptyTableComponent'
import EntityDescriptionComponent from '../common/options/EntityDescriptionComponent'
import DownloadEntityFileComponent from '../common/options/DownloadEntityFileComponent'
import SearchRelatedEntitiesComponent from '../common/options/SearchRelatedEntitiesComponent'
/**
 * Expected shape for attribute presentation model to be used as column
 */
const ColumnAttributePresentationModel = PropTypes.shape({
  // Fields from UIShapes.AttributePresentationModel
  key: PropTypes.string.isRequired,
  label: PropTypes.shape({
    en: PropTypes.string.isRequired,
    fr: PropTypes.string.isRequired,
  }),
  visible: PropTypes.bool.isRequired,
  attributes: PropTypes.arrayOf(DataManagementShapes.AttributeModel).isRequired,
  enableSorting: PropTypes.bool.isRequired,
  // added fields for sorting information
  sortingOrder: PropTypes.oneOf(CommonDomain.SORT_ORDERS),
  sortIndex: PropTypes.number,
})

/**
 * Shows view when in table mode
 * @author Raphaël Mechali
 */
class TableViewComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    columnPresentationModels: PropTypes.arrayOf(PropTypes.oneOfType([
      ColumnAttributePresentationModel,
      UIShapes.FunctionalPresentationModel,
    ])).isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    onSort: PropTypes.func.isRequired,
    // Description option management
    descriptionAvailable: PropTypes.bool.isRequired,
    onShowDescription: PropTypes.func,
    // Download option management
    enableDownload: PropTypes.bool.isRequired,
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // Basket management
    onAddElementToCart: PropTypes.func,
    // services management
    enableServices: PropTypes.bool.isRequired,
    // Search entity management
    enableSearchEntity: PropTypes.bool.isRequired,
    onSearchEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static RESULTS_PAGE_SIZE = 500

  /** Stores reference on the static empty component */
  static EMPTY_COMPONENT = <EmptyTableComponent />

  /**
   * Builds table columns
   * @param props : props map, to retrieve current properties
   */
  buildTableColumns = () => {
    const {
      columnPresentationModels, onSort,
      descriptionAvailable, onShowDescription,
      enableDownload, accessToken, projectName,
      enableServices, onAddElementToCart,
      enableSearchEntity, onSearchEntity,
    } = this.props
    const { intl: { formatMessage, locale } } = this.context
    // map presentation models, with their current order, onto table columns
    return columnPresentationModels.map((model, index) => {
      switch (model.key) {
        // selection column
        case TableColumnBuilder.selectionColumnKey:
          return new TableColumnBuilder().label(formatMessage({ id: 'results.selection.column.label' }))
            .visible(model.visible)
            .selectionColumn(true, searchSelectors, tableActions, tableSelectors)
            .build()
        // options column
        case TableColumnBuilder.optionsColumnKey:
          return new TableColumnBuilder().label(formatMessage({ id: 'results.options.column.label' }))
            .visible(model.visible)
            .optionsColumn([
              // Download option
              enableDownload ? { OptionConstructor: DownloadEntityFileComponent, optionProps: { accessToken, projectName } } : null,
              // Description option
              descriptionAvailable ? { OptionConstructor: EntityDescriptionComponent, optionProps: { onShowDescription } } : null,
              // Search by tag
              enableSearchEntity ? { OptionConstructor: SearchRelatedEntitiesComponent, optionProps: { onSearchEntity } } : null,
              // Services
              enableServices ? { OptionConstructor: OneElementServicesContainer } : null,
              // Add to cart
              onAddElementToCart ? { OptionConstructor: AddElementToCartContainer, optionProps: { onAddElementToCart } } : null,
            ])
            .build()
        default:
          // attribute column (use helper)
          return AttributeColumnBuilder.buildAttributeColumn(model, onSort, locale)
      }
    })
  }

  render() {
    const { searchActions, type, requestParameters } = this.props
    const { muiTheme } = this.context
    const { lineHeight } = muiTheme.components.infiniteTable
    return (
      <PageableInfiniteTableContainer
        key={type} // unmount the table when change entity type (using key trick)
        // infinite table configuration
        pageActions={searchActions}
        pageSelectors={searchSelectors}
        tableActions={tableActions}

        displayColumnsHeader
        lineHeight={lineHeight}
        columns={this.buildTableColumns()}
        queryPageSize={TableViewComponent.RESULTS_PAGE_SIZE}
        requestParams={requestParameters}
        emptyComponent={TableViewComponent.EMPTY_COMPONENT}
      />
    )
  }
}
export default TableViewComponent
