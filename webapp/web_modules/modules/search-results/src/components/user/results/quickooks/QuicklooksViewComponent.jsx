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
import { InfiniteGalleryContainer } from '@regardsoss/components'
import { selectors as searchSelectors } from '../../../../clients/SearchEntitiesClient'
import EmptyTableComponent from '../common/EmptyTableComponent'
import QuicklookCellComponent, { SpecificCellProperties } from './QuicklookCellComponent'

/** Page size for quicklooks */
const QUICKLOOK_PAGE_SIZE = 60

/**
 * Component displaying search results as quicklook list
 * @author Raphaël Mechali
 */
class QuicklooksViewComponent extends React.Component {
  static propTypes = {
    requestParameters: CommonShapes.RequestParameters.isRequired,
    searchActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    columnWidth: PropTypes.number,
    columnGutter: PropTypes.number,
    cellProperties: SpecificCellProperties.isRequired,
  }

  static defaultProps = {
    columnWidth: 400,
    columnGutter: 20,
  }

  /** Stores reference on the static empty component */
  static EMPTY_COMPONENT = <EmptyTableComponent />

  render() {
    const {
      requestParameters, searchActions,
      columnWidth, columnGutter,
      cellProperties,
    } = this.props
    return (
      <InfiniteGalleryContainer
        itemComponent={QuicklookCellComponent}
        pageActions={searchActions}
        pageSelectors={searchSelectors}
        columnWidth={columnWidth}
        columnGutter={columnGutter}
        requestParams={requestParameters}
        queryPageSize={QUICKLOOK_PAGE_SIZE}
        emptyComponent={QuicklooksViewComponent.EMPTY_COMPONENT}
        itemProps={cellProperties}
      />
    )
  }
}
export default QuicklooksViewComponent
