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

const DATETIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'utc',
}

/**
 * Selected date range facet display component
 * @author Raphaël Mechali
 */
class SelectedDateRangeFacetComponent extends React.Component {
  static propTypes = {
    selectedFacetValue: UIShapes.SelectedDateRangeFacetCriterion.isRequired,
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
    const { selectedFacetValue: { facetLabels, facetValue: { lower, upper }, attribute: { content: { label } } } } = this.props
    const { intl: { locale, formatMessage, formatDate } } = this.context
    const attributeLabel = facetLabels[locale] || label // get configured label for locale or use attribute label if none was found
    if (!upper) {
      if (lower) {
        // positive half infinite range
        return formatMessage({ id: 'search.facets.filter.chip.date.after' }, {
          facetLabel: attributeLabel,
          date: formatDate(lower, DATETIME_OPTIONS),
        })
      }
      // infinite range...
      return ''
    }
    if (!lower) {
      // negative half infinite range
      return formatMessage({ id: 'search.facets.filter.chip.date.before' }, {
        facetLabel: attributeLabel,
        date: formatDate(upper, DATETIME_OPTIONS),
      })
    }
    // bounded range
    if (lower !== upper) {
      return formatMessage({ id: 'search.facets.filter.chip.date.range' }, {
        facetLabel: attributeLabel,
        minDate: formatDate(lower, DATETIME_OPTIONS),
        maxDate: formatDate(upper, DATETIME_OPTIONS),
      })
    }
    // single value
    return formatMessage({ id: 'search.facets.filter.chip.date.value' }, {
      facetLabel: attributeLabel,
      date: formatDate(lower, DATETIME_OPTIONS),
    })
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
export default SelectedDateRangeFacetComponent
