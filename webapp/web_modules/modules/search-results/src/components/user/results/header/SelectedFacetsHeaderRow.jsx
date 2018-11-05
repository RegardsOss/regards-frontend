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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import { TableHeaderLine, TableHeaderContentBox } from '@regardsoss/components'
import { SelectedFacetArray } from '../../../../models/facets/FacetShape'
import SelectedBooleanFacetComponent from '../facets/selected/SelectedBooleanFacetComponent'
import SelectedDateRangeFacetComponent from '../facets/selected/SelectedDateRangeFacetComponent'
import SelectedNumberRangeFacetComponent from '../facets/selected/SelectedNumberRangeFacetComponent'
import SelectedStringFacetComponent from '../facets/selected/SelectedStringFacetComponent'

/**
 * Header line for facets and results count row
 */
class SelectedFacetsHeaderRow extends React.Component {
  static propTypes = {
    showingFacettes: PropTypes.bool.isRequired,
    selectedFacets: SelectedFacetArray.isRequired,
    onUnselectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { showingFacettes, selectedFacets, onUnselectFacet } = this.props
    return (
      <ShowableAtRender show={showingFacettes && !!selectedFacets.length}>
        <TableHeaderLine>
          <TableHeaderContentBox>
            {
              selectedFacets.map((selectedFacet) => {
                const selectorProps = { key: selectedFacet.model.attributeName, selectedFacet, onUnselectFacet }
                switch (selectedFacet.model.type) {
                  case CatalogDomain.FACET_TYPES_ENUM.BOOLEAN:
                    return (<SelectedBooleanFacetComponent {...selectorProps} />)
                  case CatalogDomain.FACET_TYPES_ENUM.DATE:
                    return (<SelectedDateRangeFacetComponent {...selectorProps} />)
                  case CatalogDomain.FACET_TYPES_ENUM.NUMBER:
                    return (<SelectedNumberRangeFacetComponent {...selectorProps} />)
                  case CatalogDomain.FACET_TYPES_ENUM.STRING:
                    return (<SelectedStringFacetComponent {...selectorProps} />)
                  default:
                    throw new Error(`Unknown facet type ${selectedFacet.type}`)
                }
              })
            }
          </TableHeaderContentBox>
        </TableHeaderLine>
      </ShowableAtRender>
    )
  }
}
export default SelectedFacetsHeaderRow
