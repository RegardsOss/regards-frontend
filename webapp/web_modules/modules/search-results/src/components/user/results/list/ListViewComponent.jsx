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
import { TableColumnBuilder, PageableInfiniteTableContainer } from '@regardsoss/components'
import { DamDomain } from '@regardsoss/domain'
import { CommonShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { tableActions } from '../../../../clients/TableClient'
import { selectors as searchSelectors } from '../../../../clients/SearchEntitiesClient'
import EmptyTableComponent from '../common/EmptyTableComponent'
import ListCellContainer from '../../../../containers/user/results/list/ListCellContainer'
import { ListAttributeRenderData, ListThumbnailRenderData } from './ListCellComponent'

const RESULTS_PAGE_SIZE = 500

/**
 * Shows view when in list mode
 * @author Raphaël Mechali
 */
class ListViewComponent extends React.Component {
  static propTypes = {
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

  /** Stores reference on the static empty component */
  static EMPTY_COMPONENT = <EmptyTableComponent />

  /**
   * @return [*] Columns array holding the single list column
   */
  buildListColumn = () => {
    const {
      thumbnailRenderData, gridAttributesRenderData,
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
    const { searchActions, type, requestParameters } = this.props
    const { listLineHeight } = this.context.muiTheme.module.searchResults
    return (
      <PageableInfiniteTableContainer
        key={type} // unmount the table when change entity type (using key trick) - TODO: if one compo by type, clear that trick!
        // infinite table configuration
        pageActions={searchActions}
        pageSelectors={searchSelectors}
        tableActions={tableActions}

        displayColumnsHeader={false}
        lineHeight={listLineHeight}
        columns={this.buildListColumn()}
        queryPageSize={RESULTS_PAGE_SIZE}
        requestParams={requestParameters}
        emptyComponent={ListViewComponent.EMPTY_COMPONENT}
      />
    )
  }
}
export default ListViewComponent
