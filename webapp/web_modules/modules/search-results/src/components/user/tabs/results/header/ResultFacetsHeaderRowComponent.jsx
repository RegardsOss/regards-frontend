/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import {
  TableHeaderLineLoadingSelectAllAndResults, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableHeaderText,
} from '@regardsoss/components'
import { UIFacetArray } from '../../../../../shapes/facets/FacetShape'
import BooleanFacetSelectorComponent from './facets/BooleanFacetSelectorComponent'
import DateRangeFacetSelectorComponent from './facets/DateRangeFacetSelectorComponent'
import NumberRangeFacetSelectorComponent from './facets/NumberRangeFacetSelectorComponent'
import WordFacetSelectorComponent from './facets/WordFacetSelectorComponent'
import TableHeaderSelectAllContainer from '../../../../../containers/user/tabs/results/header/TableHeaderSelectAllContainer'

/**
 * Result facets header row: shows results selectable facets, count and loading row
 * @author Raphaël Mechali
 */
class ResultFacetsHeaderRowComponent extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    loadedResultsCount: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    facetsEnabled: PropTypes.bool.isRequired,
    facets: UIFacetArray.isRequired,
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    selectionEnabled: PropTypes.bool.isRequired,
    // Facet valued selected callback (facet, facetValueQuery, facetValue) => ()
    onSelectFacetValue: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const {
      facetsEnabled, facets, onSelectFacetValue, tabType, selectionEnabled,
      loadedResultsCount, resultsCount, isFetching,
    } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      // 1 - results count message, select all and loading
      <TableHeaderSelectAllContainer tabType={tabType} selectionEnabled={selectionEnabled}>
        <TableHeaderLineLoadingSelectAllAndResults loadedResultsCount={loadedResultsCount} resultsCount={resultsCount} isFetching={isFetching}>
          {
            // Render the facets component through an IIF as follow:
            (() => {
              if (isFetching || !facetsEnabled) {
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
                  <TableHeaderOptionGroup show={facetsEnabled}>
                    {
                      facets.map((facet) => {
                        const selectorProps = { key: facet.attribute.content.jsonPath, facet, onSelectFacetValue }
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
        </TableHeaderLineLoadingSelectAllAndResults>
      </TableHeaderSelectAllContainer>)
  }
}

export default ResultFacetsHeaderRowComponent
