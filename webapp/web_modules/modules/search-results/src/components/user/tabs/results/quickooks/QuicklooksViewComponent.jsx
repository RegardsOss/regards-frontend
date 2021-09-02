/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { CommonShapes, CatalogShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { InfiniteGalleryContainer } from '@regardsoss/components'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'
import EmptyTableContainer from '../../../../../containers/user/tabs/results/common/EmptyTableContainer'
import QuicklookCellComponent, { SpecificCellProperties } from './QuicklookCellComponent'

/**
 * Component displaying search results as quicklook list
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class QuicklooksViewComponent extends React.Component {
  static propTypes = {
    loadedEntities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    cellProperties: SpecificCellProperties.isRequired,
    embedInMap: PropTypes.bool.isRequired,
    itemOfInterestPicked: PropTypes.number,
    isItemOfInterest: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      tabType, requestParameters, searchActions, cellProperties, embedInMap, loadedEntities,
      itemOfInterestPicked, isItemOfInterest,
    } = this.props
    // Recover column with and gap from theme: map specific theme if embedded in map, quicklooks otherwise
    const searchResultsTheme = this.context.muiTheme.module.searchResults
    const { columnWidth, columnGap } = embedInMap
      ? searchResultsTheme.map.quicklooks
      : searchResultsTheme.quicklooks
    const pageSize = UIDomain.ResultsContextConstants.PAGE_SIZE_FOR[embedInMap ? UIDomain.RESULTS_VIEW_MODES_ENUM.MAP : UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]
    return (
      <InfiniteGalleryContainer
        itemComponent={QuicklookCellComponent}
        loadedEntities={loadedEntities}
        pageActions={searchActions}
        pageSelectors={getSearchCatalogClient(tabType).searchSelectors}
        columnWidth={columnWidth}
        columnGutter={columnGap}
        requestParams={requestParameters}
        queryPageSize={pageSize}
        emptyComponent={<EmptyTableContainer tabType={tabType} />}
        itemProps={cellProperties}
        itemOfInterestPicked={itemOfInterestPicked}
        isItemOfInterest={isItemOfInterest}
      />
    )
  }
}
export default QuicklooksViewComponent
