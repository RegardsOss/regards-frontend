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
import { CommonShapes } from '@regardsoss/shape'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { InfiniteGalleryContainer } from '@regardsoss/components'
import { selectors as searchSelectors } from '../../../../clients/SearchEntitiesClient'
import EmptyTableComponent from '../common/EmptyTableComponent'
import QuicklookCellComponent, { SpecificCellProperties } from './QuicklookCellComponent'

/** Page size for quicklooks */
const QUICKLOOK_PAGE_SIZE = 100

/**
 * Component displaying search results as quicklook list
 * @author Raphaël Mechali
 */
class QuicklooksViewComponent extends React.Component {
  static propTypes = {
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    cellProperties: SpecificCellProperties.isRequired,
    embedInMap: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Stores reference on the static empty component */
  static EMPTY_COMPONENT = <EmptyTableComponent />

  render() {
    const {
      requestParameters, searchActions, cellProperties, embedInMap,
    } = this.props
    // Recover column with and gap from theme: map specific theme if embedded in map, quicklooks otherwise
    const searchResultsTheme = this.context.muiTheme.module.searchResults
    const { columnWidth, columnGap } = embedInMap
      ? searchResultsTheme.map.quicklooks
      : searchResultsTheme.quicklooks
    return (
      <InfiniteGalleryContainer
        itemComponent={QuicklookCellComponent}
        pageActions={searchActions}
        pageSelectors={searchSelectors}
        columnWidth={columnWidth}
        columnGutter={columnGap}
        requestParams={requestParameters}
        queryPageSize={QUICKLOOK_PAGE_SIZE}
        emptyComponent={QuicklooksViewComponent.EMPTY_COMPONENT}
        itemProps={cellProperties}
      />
    )
  }
}
export default QuicklooksViewComponent