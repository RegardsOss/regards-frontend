/**
* LICENSE_PLACEHOLDER
**/
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import { TableHeaderLine, TableHeaderContentBox } from '@regardsoss/components'

import { FilterListShape } from '../../../../models/facets/FilterShape'
import SelectedFacetComponent from './SelectedFacetComponent'

/**
 * Header line for facets and results count row
 */
class SelectedFacetsHeaderRow extends React.Component {

  static propTypes = {
    showingFacettes: PropTypes.bool.isRequired,
    filters: FilterListShape,
    onDeleteFilter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    resultsCount: 0,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { showingFacettes, filters, onDeleteFilter } = this.props
    return (
      <ShowableAtRender show={showingFacettes && !!filters.length}>
        <TableHeaderLine>
          <TableHeaderContentBox>
            {
              filters.map(filter => (<SelectedFacetComponent
                key={filter.filterKey}
                filter={filter}
                onDeleteFilter={onDeleteFilter}
              />))
            }
          </TableHeaderContentBox>
        </TableHeaderLine>
      </ShowableAtRender>
    )
  }

}
export default SelectedFacetsHeaderRow
