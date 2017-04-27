/**
* LICENSE_PLACEHOLDER
**/
import Chip from 'material-ui/Chip'
import { themeContextType } from '@regardsoss/theme'
import { filterShape } from '../model/FilterShape'

/**
* Filter display component
*/
class FilterDisplayComponent extends React.Component {

  static propTypes = {
    filter: filterShape.isRequired,
    // deletes a current filter (key:string)
    deleteFilter: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  onDelete = () => {
    const { deleteFilter, filter: { filterKey } } = this.props
    deleteFilter(filterKey)
  }

  render() {
    const { filter: { filterLabel } } = this.props
    const { moduleTheme: { filtersInformation: { infoChip } } } = this.context
    return (
      <Chip
        onRequestDelete={this.onDelete}
        style={infoChip.styles}
      >
        {filterLabel}
      </Chip>
    )
  }
}
export default FilterDisplayComponent
