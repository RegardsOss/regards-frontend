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
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableHeaderText,
} from '@regardsoss/components'
import { FacetArray, FacetTypes } from '../../../../models/facets/FacetShape'
import BooleanFacetSelectorComponent from '../facets/BooleanFacetSelectorComponent'
import DateRangeFacetSelectorComponent from '../facets/DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from '../facets/NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from '../facets/WordFacetSelectorComponent'

/**
 * Header line for facets, results count and loading row
 */
class ResultsAndFacetsHeaderRow extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    showFacets: PropTypes.bool.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onAddFilter: PropTypes.func.isRequired,
    // facets array
    facets: FacetArray,
    resultsCount: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const {
      showFacets, facets, onAddFilter, resultsCount, isFetching,
    } = this.props
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
                      const selectorProps = { key: facet.attributeName, facet, onAddFilter }
                      switch (facet.type) {
                        case FacetTypes.Boolean:
                        return (<BooleanFacetSelectorComponent {...selectorProps} />)
                        case FacetTypes.Date:
                          return (<DateRangeFacetSelectorComponent {...selectorProps} />)
                          case FacetTypes.Number:
                          return (<NumberRangeFacetSelectorComponent {...selectorProps} />)
                          case FacetTypes.String:
                            return (<WordFacetSelectorComponent {...selectorProps} />)
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

export default ResultsAndFacetsHeaderRow
