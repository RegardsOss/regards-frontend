/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ShowableAtRender } from '@regardsoss/display-control'
import { TableHeaderLine, TableHeaderContentBox } from '@regardsoss/components'
import SelectedBooleanFacetComponent from './filter/facets/SelectedBooleanFacetComponent'
import SelectedDateRangeFacetComponent from './filter/facets/SelectedDateRangeFacetComponent'
import SelectedNumberRangeFacetComponent from './filter/facets/SelectedNumberRangeFacetComponent'
import SelectedStringFacetComponent from './filter/facets/SelectedStringFacetComponent'
import GeometryCriterionComponent from './filter/GeometryCriterionComponent'
import EntitiesSelectionCriterionComponent from './filter/EntitiesSelectionCriterionComponent'
import TagCriterionComponent from './filter/TagCriterionComponent'

/**
 * Header line to show (and delete) currently applying criteria
 * @author Raphaël Mechali
 */
class ApplyingCriteriaHeaderRowComponent extends React.Component {
  static propTypes = {
    tagsFiltering: PropTypes.arrayOf(UIShapes.TagCriterion).isRequired,
    facetValues: PropTypes.arrayOf(UIShapes.SelectedFacetCriterion).isRequired,
    geometries: PropTypes.arrayOf(UIShapes.GeometryCriterion).isRequired,
    entitiesSelections: PropTypes.arrayOf(UIShapes.EntitiesSelectionCriterion).isRequired,
    onUnselectTagFilter: PropTypes.func.isRequired,
    onUnselectFacetValue: PropTypes.func.isRequired,
    onUnselectGeometry: PropTypes.func.isRequired,
    onUnselectEntitiesSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      tagsFiltering, facetValues, geometries, entitiesSelections,
      onUnselectTagFilter, onUnselectFacetValue, onUnselectGeometry, onUnselectEntitiesSelection,
    } = this.props
    return (
      <ShowableAtRender show={tagsFiltering.length > 0 || facetValues.length > 0 || geometries.length > 0 || entitiesSelections.length > 0}>
        <TableHeaderLine>
          <TableHeaderContentBox>
            {
                [
                  // 1 - Tag criteria
                  ...tagsFiltering.map(tagCriterion => <TagCriterionComponent
                    key={tagCriterion.searchKey}
                    tagCriterion={tagCriterion}
                    onUnselectTagFilter={onUnselectTagFilter}
                  />),
                  // 2 - Facet values
                  ...facetValues.map((selectedFacetValue) => {
                    const selectorProps = { key: selectedFacetValue.attribute.content.jsonPath, selectedFacetValue, onUnselectFacetValue }
                    switch (selectedFacetValue.facetType) {
                      case CatalogDomain.FACET_TYPES_ENUM.BOOLEAN:
                        return (<SelectedBooleanFacetComponent {...selectorProps} />)
                      case CatalogDomain.FACET_TYPES_ENUM.DATE:
                        return (<SelectedDateRangeFacetComponent {...selectorProps} />)
                      case CatalogDomain.FACET_TYPES_ENUM.NUMBER:
                        return (<SelectedNumberRangeFacetComponent {...selectorProps} />)
                      case CatalogDomain.FACET_TYPES_ENUM.STRING:
                        return (<SelectedStringFacetComponent {...selectorProps} />)
                      default:
                        throw new Error(`Unknown facet type ${selectedFacetValue.facetType}`)
                    }
                  }),
                  // 3 - Geometries
                  ...geometries.map((geometryCriterion, index) => <GeometryCriterionComponent
                    // eslint-disable-next-line react/no-array-index-key
                    key={`geometry-${index}`} // no better key here, but it should be 1 always (see MapContainer control function)
                    geometryCriterion={geometryCriterion}
                    onUnselectGeometry={onUnselectGeometry}
                  />),
                  // 4 - Entities selection
                  ...entitiesSelections.map((entitiesSelectionCriterion, index) => <EntitiesSelectionCriterionComponent
                    // eslint-disable-next-line react/no-array-index-key
                    key={`entities-selection-${index}`} // no better key here, but it should be 1 always (see MapContainer control function)
                    entitiesSelectionCriterion={entitiesSelectionCriterion}
                    onUnselectEntitiesSelection={onUnselectEntitiesSelection}
                  />),
                ]
            }
          </TableHeaderContentBox>
        </TableHeaderLine>
      </ShowableAtRender>
    )
  }
}
export default ApplyingCriteriaHeaderRowComponent
