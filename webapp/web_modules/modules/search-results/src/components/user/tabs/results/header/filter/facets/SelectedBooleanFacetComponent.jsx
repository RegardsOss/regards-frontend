/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIShapes } from '@regardsoss/shape'
import SelectedFacetComponent from './SelectedFacetComponent'

/**
 * Selected boolean facet display component
 * @author Raphaël Mechali
 */
class SelectedBooleanFacetComponent extends React.Component {
  static propTypes = {
    selectedFacetValue: UIShapes.SelectedBooleanFacetCriterion.isRequired,
    // on delete selected facet value criterion callback: SelectedFacetCriterion => ()
    onUnselectFacetValue: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats this selected facet label
   * @return {string} formatted label to be displayed by the delegate component
   */
  buildLabel = () => {
    const { selectedFacetValue: { facetLabels, facetValue, attribute: { content: { label } } } } = this.props
    const { intl: { locale, formatMessage } } = this.context
    const attributeLabel = facetLabels[locale] || label // get configured label for locale or use attribute label if none was found
    const valueLabel = formatMessage({
      id: facetValue
        ? 'search.facets.filter.boolean.value.true'
        : 'search.facets.filter.boolean.value.false',
    })
    return formatMessage({ id: 'search.facets.filter.chip.boolean.value' }, { facetLabel: attributeLabel, valueLabel })
  }

  render() {
    const { selectedFacetValue, onUnselectFacetValue } = this.props
    return (
      <SelectedFacetComponent
        label={this.buildLabel()}
        selectedFacetValue={selectedFacetValue}
        onUnselectFacetValue={onUnselectFacetValue}
      />
    )
  }
}
export default SelectedBooleanFacetComponent
