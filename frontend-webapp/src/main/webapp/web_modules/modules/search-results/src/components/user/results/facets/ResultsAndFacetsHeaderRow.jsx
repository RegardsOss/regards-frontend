/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableHeaderText,
} from '@regardsoss/components'

import { FacetArray, FacetTypes } from '../../../../models/facets/FacetShape'
import DateRangeFacetSelectorComponent from './DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from './NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from './WordFacetSelectorComponent'
import messages from '../../../../i18n'

/**
 * Header line for facets, results count and loading row
 */
export class ResultsAndFacetsHeaderRow extends React.Component {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    showFacets: PropTypes.bool.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
    // facets array
    facets: FacetArray,
    resultsCount: PropTypes.number.isRequired,
  }

  static defaultProps = {
    resultsCount: 0,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { showFacets, facets, onSelectFacet, resultsCount, isFetching } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      // 1 - results count message and loading
      <TableHeaderLineLoadingAndResults resultsCount={resultsCount} isFetching={isFetching} >
        {
          // Render the facets component through an IIF as follow:
          (() => {
            if (isFetching || !showFacets) {
              // don't show anything while fetching or not filtering, but keep the room for layout to be stable
              return <div />
            }
            if (!facets.length) {
              // No facet while filtering is enabled: inform the user
              return (
                <TableHeaderContentBox>
                  <TableHeaderText
                    text={formatMessage({ id: 'search.facets.no.facet.found' })}
                  />
                </TableHeaderContentBox>
              )
            }
            // enabled and facets available: provide facets selectors in a table header options group
            return (
              <TableHeaderOptionsArea reducible>
                <TableHeaderOptionGroup show={showFacets}>
                  {
                    facets.map((facet) => {
                      const selectorProps = { key: facet.attributeName, facet, onSelectFacet }
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
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>)
          })()
        }
      </TableHeaderLineLoadingAndResults>)
  }

}

export default withI18n(messages)(ResultsAndFacetsHeaderRow)
