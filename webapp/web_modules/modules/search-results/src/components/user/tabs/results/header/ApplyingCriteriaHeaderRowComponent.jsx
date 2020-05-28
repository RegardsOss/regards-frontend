/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import filter from 'lodash/filter'
import reject from 'lodash/reject'
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
import SearchCriteriaComponent from './filter/SearchCriteriaComponent'
import StaticParameterCriterionComponent from './filter/StaticParameterCriterionComponent'
import ReactiveStaticParameterCriterionComponent from './filter/ReactiveStaticParameterCriterionComponent'
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
    searchCriteria: PropTypes.arrayOf(UIShapes.BasicCriterion).isRequired,
    staticParameters: PropTypes.arrayOf(UIShapes.StaticParameterCriterion).isRequired,
    onUnselectTagFilter: PropTypes.func.isRequired,
    onUnselectFacetValue: PropTypes.func.isRequired,
    onUnselectGeometry: PropTypes.func.isRequired,
    onUnselectEntitiesSelection: PropTypes.func.isRequired,
    onUnselectSearchCriteria: PropTypes.func.isRequired,
    onToggleStaticParameter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      tagsFiltering, facetValues, geometries,
      entitiesSelections, searchCriteria, staticParameters,
      onUnselectTagFilter, onUnselectFacetValue, onUnselectGeometry,
      onUnselectEntitiesSelection, onUnselectSearchCriteria,
      onToggleStaticParameter,
    } = this.props
    return (
      <ShowableAtRender show={tagsFiltering.length > 0
      || facetValues.length > 0
      || geometries.length > 0
      || entitiesSelections.length > 0
      || staticParameters.length > 0
      || searchCriteria.length > 0}
      >
        <TableHeaderLine>
          <TableHeaderContentBox>
            {
                [
                  // 1 - Static criteria
                  // When unactiveStaticParameters empty, all staticParameters are actives
                  ...filter(staticParameters, sp => sp.active)
                    .map(sp => <StaticParameterCriterionComponent
                      key={sp.label}
                      staticParameter={sp}
                      onUnselectStaticParameter={onToggleStaticParameter}
                    />),
                  // 2 - Tag criteria
                  ...tagsFiltering.map(tagCriterion => <TagCriterionComponent
                    key={tagCriterion.searchKey}
                    tagCriterion={tagCriterion}
                    onUnselectTagFilter={onUnselectTagFilter}
                  />),
                  // 3 - Facet values
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
                  // 4 - Geometries
                  ...geometries.map((geometryCriterion, index) => <GeometryCriterionComponent
                    // eslint-disable-next-line react/no-array-index-key
                    key={`geometry-${index}`} // no better key here, but it should be 1 always (see MapContainer control function)
                    geometryCriterion={geometryCriterion}
                    onUnselectGeometry={onUnselectGeometry}
                  />),
                  // 5 - Entities selection
                  ...entitiesSelections.map((entitiesSelectionCriterion, index) => <EntitiesSelectionCriterionComponent
                    // eslint-disable-next-line react/no-array-index-key
                    key={`entities-selection-${index}`} // no better key here, but it should be 1 always (see MapContainer control function)
                    entitiesSelectionCriterion={entitiesSelectionCriterion}
                    onUnselectEntitiesSelection={onUnselectEntitiesSelection}
                  />),
                  // 6 - Current search
                  searchCriteria.length
                    ? <SearchCriteriaComponent key="search.criteria" onUnselectSearchCriteria={onUnselectSearchCriteria} />
                    : null,

                  // 7 - Reactive static criteria - let the user reactive unactive static criteria
                  ...reject(staticParameters, sp => sp.active)
                    .map(sp => <ReactiveStaticParameterCriterionComponent
                      key={sp.label}
                      staticParameter={sp}
                      onSelectStaticParameter={onToggleStaticParameter}
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
