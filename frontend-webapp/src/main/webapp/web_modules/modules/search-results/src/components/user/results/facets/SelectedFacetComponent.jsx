/**
 * LICENSE_PLACEHOLDER
 **/
import Chip from 'material-ui/Chip'
import { themeContextType } from '@regardsoss/theme'
import { FilterShape } from '../../../../models/facets/FilterShape'

/**
* Displays a selected facet with delete option (== filter)
*/
class SelectedFacetComponent extends React.Component {
  static propTypes = {
    filter: FilterShape.isRequired,
    // on delete filter
    onDeleteFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  onDelete = () => {
    const { onDeleteFilter, filter } = this.props
    onDeleteFilter(filter)
  }

  render() {
    const { filter: { filterLabel } } = this.props
    const { moduleTheme: { user: { filters } } } = this.context
    return (
      <Chip style={filters.style} onRequestDelete={this.onDelete} >
        {filterLabel}
      </Chip>
    )
  }
}


export default SelectedFacetComponent
