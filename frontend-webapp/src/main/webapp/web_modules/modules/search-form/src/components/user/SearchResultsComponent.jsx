/**
 * LICENSE_PLACEHOLDER
 **/
import { FixedTableContainer } from '@regardsoss/components'
import CatalogEntitySelector from '../../models/catalog/CatalogEntitySelector'
import CatalogEntityActions from '../../models/catalog/CatalogEntityActions'
import ResulsTypeButtons from './ResultsTypeButtons'

/**
 * React container to manage search requests and display results.
 * Search queries are generated by the FormComponent and used by this container.
 * @author Sébastien binda
 */
class SearchResultsComponent extends React.Component {

  static propTypes = {
    searchQuery: React.PropTypes.string,
  }

  resultSelection = (selectedEntities) => {
    console.log('Selected entities', selectedEntities)
  }


  render() {
    return (
      <div>
        <ResulsTypeButtons />
        <div style={{ marginRight: 50, marginLeft: 60 }}>
          <FixedTableContainer
            PageActions={CatalogEntityActions}
            PageSelector={CatalogEntitySelector}
            pageSize={17}
            displayCheckbox
            onSelectionChange={this.resultSelection}
            requestParams={{ queryParams: this.props.searchQuery }}
          />
        </div>
      </div>
    )
  }
}

export default SearchResultsComponent
