/**
* LICENSE_PLACEHOLDER
**/
import Divider from 'material-ui/Divider'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/components'
import { FacetArray, FacetTypes } from '../model/FacetShape'
import { filterListShape } from '../model/FilterShape'
import FilterDisplayComponent from './FilterDisplayComponent'
import DateRangeFacetSelectorComponent from './DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from './NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from './WordFacetSelectorComponent'


/**
* Root search facets module display component, used by corresponding container
*/
class ModuleContentComponent extends React.Component {

  static propTypes = {
    facetLabels: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    // current filters array
    filters: filterListShape.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: React.PropTypes.func.isRequired,
    // deletes a current filter (key:string)
    deleteFilter: React.PropTypes.func.isRequired,
    // facets array
    facets: FacetArray,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { facets, facetLabels, filters, applyFilter, deleteFilter } = this.props
    const { moduleTheme } = this.context

    return (
      <div>
        <div style={moduleTheme.filterSelectors.styles}>
          {
            facets.map((facet) => {
              const selectorProps = { key: facet.attributeName, label: facetLabels[facet.attributeName], facet, applyFilter }
              switch (facet.type) {
                case FacetTypes.String:
                  return (<WordFacetSelectorComponent {...selectorProps} />)
                case FacetTypes.Number:
                  return (<NumberRangeFacetSelectorComponent {...selectorProps} />)
                case FacetTypes.Date:
                  return (<DateRangeFacetSelectorComponent {...selectorProps} />)
                default:
                  throw new Error(`Unknown facet type ${facet.type}`)
              }
            })
          }
        </div>
        <ShowableAtRender show={!!filters.length}>
          <Divider />
          <div style={moduleTheme.filtersInformation.styles}>
            {
              filters.map(filter => (
                <FilterDisplayComponent key={filter.filterKey} filter={filter} deleteFilter={deleteFilter} />
              ))
            }
          </div>
        </ShowableAtRender>
      </div>
    )
  }

}
export default ModuleContentComponent
