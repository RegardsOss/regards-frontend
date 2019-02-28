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
import { CatalogDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderLineLoadingAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableHeaderText,
} from '@regardsoss/components'
import { UIFacetArray } from '../../../../models/facets/FacetShape'
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
    // facets array
    facets: UIFacetArray,
    loadedResultsCount: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const {
      showFacets, facets, onSelectFacet,
      loadedResultsCount, resultsCount, isFetching,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      // 1 - results count message and loading
      <TableHeaderLineLoadingAndResults loadedResultsCount={loadedResultsCount} resultsCount={resultsCount} isFetching={isFetching}>
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
                      const selectorProps = { key: facet.model.attributeName, facet, onSelectFacet }
                      switch (facet.model.type) {
                        case CatalogDomain.FACET_TYPES_ENUM.BOOLEAN:
                          return (<BooleanFacetSelectorComponent {...selectorProps} />)
                        case CatalogDomain.FACET_TYPES_ENUM.DATE:
                          return (<DateRangeFacetSelectorComponent {...selectorProps} />)
                        case CatalogDomain.FACET_TYPES_ENUM.NUMBER:
                          return (<NumberRangeFacetSelectorComponent {...selectorProps} />)
                        case CatalogDomain.FACET_TYPES_ENUM.STRING:
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
