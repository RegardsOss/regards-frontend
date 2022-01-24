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
import { DamDomain, UIDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { TableColumnBuilder, PageableInfiniteTableContainer } from '@regardsoss/components'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'
import ListCellContainer from '../../../../../containers/user/tabs/results/list/ListCellContainer'
import EmptyTableContainer from '../../../../../containers/user/tabs/results/common/EmptyTableContainer'
import { ListAttributeRenderData, ListThumbnailRenderData } from './ListCellComponent'

/**
 * Shows view when in list mode
 * @author Raphaël Mechali
 */
class ListViewComponent extends React.Component {
  static propTypes = {
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    // attributes render data
    thumbnailRenderData: ListThumbnailRenderData, // no thumbnail when not provided
    gridAttributesRenderData: PropTypes.arrayOf(ListAttributeRenderData).isRequired,
    // Selection management
    enableSelection: PropTypes.bool.isRequired,
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
  }

  /**
   * @return [*] Columns array holding the single list column
   */
  buildListColumn = () => {
    const {
      tabType, thumbnailRenderData, gridAttributesRenderData,
      enableSelection, descriptionAvailable, onShowDescription,
      enableDownload, accessToken, projectName,
      onAddElementToCart, enableServices,
      enableSearchEntity, onSearchEntity,
    } = this.props
    return [
      // build column. Note: label is ignored here as the columns button will get removed
      new TableColumnBuilder('single.list.column').rowCellDefinition({
        Constructor: ListCellContainer,
        props: {
          tabType,
          thumbnailRenderData,
          gridAttributesRenderData,
          enableSelection,
          descriptionAvailable,
          onShowDescription,
          enableDownload,
          accessToken,
          projectName,
          onAddElementToCart,
          enableServices,
          enableSearchEntity,
          onSearchEntity,
        },
      }).build(),
    ]
  }

  render() {
    const {
      searchActions, tabType, type, requestParameters,
    } = this.props
    const { lineHeight } = this.context.muiTheme.module.searchResults.list
    return (
      <PageableInfiniteTableContainer
        key={type} // unmount the table when change entity type (using key trick)
        pageActions={searchActions}
        pageSelectors={getSearchCatalogClient(tabType).searchSelectors}
        displayColumnsHeader={false}
        lineHeight={lineHeight}
        columns={this.buildListColumn()}
        queryPageSize={UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[UIDomain.RESULTS_VIEW_MODES_ENUM.LIST]}
        requestParams={requestParameters}
        emptyComponent={<EmptyTableContainer tabType={tabType} />}
      />
    )
  }
}
export default ListViewComponent
