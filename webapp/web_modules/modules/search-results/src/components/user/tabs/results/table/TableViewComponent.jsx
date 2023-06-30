/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain, DamDomain, UIDomain } from '@regardsoss/domain'
import { DataManagementShapes, CommonShapes, UIShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TableColumnBuilder, PageableInfiniteTableContainer } from '@regardsoss/components'
import { AttributeColumnBuilder } from '@regardsoss/attributes-common'
import { getSelectionClient } from '../../../../../clients/SelectionClient'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'
import AddElementToCartContainer from '../../../../../containers/user/tabs/results/common/options/AddElementToCartContainer'
import OneElementServicesContainer from '../../../../../containers/user/tabs/results/common/options/OneElementServicesContainer'
import EmptyTableContainer from '../../../../../containers/user/tabs/results/common/EmptyTableContainer'
import EntityDescriptionComponent from '../common/options/EntityDescriptionComponent'
import DownloadEntityFileComponent from '../common/options/DownloadEntityFileComponent'
import SearchRelatedEntitiesComponent from '../common/options/SearchRelatedEntitiesComponent'
import ToggleElementComponent from '../header/options/ToggleElementComponent'
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
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
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

  /**
   * Builds table columns
   * @param props : props map, to retrieve current properties
   */
  buildTableColumns = () => {
    const {
      tabType, columnPresentationModels, onSort,
      descriptionAvailable, onShowDescription,
      enableDownload, accessToken, projectName,
      enableServices, onAddElementToCart,
      enableSearchEntity, onSearchEntity,
    } = this.props
    const { intl: { formatMessage, locale } } = this.context
    const { tableActions, tableSelectors } = getSelectionClient(tabType)
    // map presentation models, with their current order, onto table columns
    return columnPresentationModels.map((model) => {
      switch (model.key) {
        // selection column
        case TableColumnBuilder.selectionColumnKey:
          return new TableColumnBuilder(TableColumnBuilder.selectionColumnKey)
            .label(formatMessage({ id: 'results.selection.column.label' }))
            .visible(model.visible)
            .optionsSizing(1)
            .rowCellDefinition({
              Constructor: ToggleElementComponent,
              props: { tableActions, tableSelectors },
            })
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
              enableServices ? { OptionConstructor: OneElementServicesContainer, optionProps: { tabType } } : null,
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
    const {
      searchActions, tabType, type, requestParameters,
    } = this.props
    const { muiTheme } = this.context
    const { lineHeight } = muiTheme.components.infiniteTable
    return (
      <PageableInfiniteTableContainer
        key={type} // unmount the table when change entity type (using key trick)
        pageActions={searchActions}
        pageSelectors={getSearchCatalogClient(tabType).searchSelectors}
        displayColumnsHeader
        lineHeight={lineHeight}
        columns={this.buildTableColumns()}
        queryPageSize={UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]}
        requestParams={requestParameters}
        emptyComponent={<EmptyTableContainer tabType={tabType} />}
      />
    )
  }
}
export default TableViewComponent
