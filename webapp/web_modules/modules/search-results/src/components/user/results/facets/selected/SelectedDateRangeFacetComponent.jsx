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
import { SelectedDateRangeFacet } from '../../../../../models/facets/FacetShape'
import SelectedFacetComponent from './SelectedFacetComponent'

const DATETIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

/**
 * Selected date range facet display component
 * @author Raphaël Mechali
 */
class SelectedDateRangeFacetComponent extends React.Component {
  static propTypes = {
    selectedFacet: SelectedDateRangeFacet.isRequired,
    onUnselectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats this selected facet label
   * @return {string} formatted label to be displayed by the delegate component
   */
  buildLabel = () => {
    const { selectedFacet: { label, value: { lowerBound, upperBound } } } = this.props
    const { intl: { locale, formatMessage, formatDate } } = this.context
    const attributeLabel = label[locale]
    if (!upperBound) {
      if (lowerBound) {
        // positive half infinite range
        return formatMessage({ id: 'search.facets.filter.chip.date.after' }, {
          label: attributeLabel,
          date: formatDate(lowerBound, DATETIME_OPTIONS),
        })
      }
      // infinite range...
      return ''
    }
    if (!lowerBound) {
      // negative half infinite range
      return formatMessage({ id: 'search.facets.filter.chip.date.before' }, {
        label: attributeLabel,
        date: formatDate(upperBound, DATETIME_OPTIONS),
      })
    }
    // bounded range
    if (lowerBound !== upperBound) {
      return formatMessage({ id: 'search.facets.filter.chip.date.range' }, {
        label: attributeLabel,
        minDate: formatDate(lowerBound, DATETIME_OPTIONS),
        maxDate: formatDate(upperBound, DATETIME_OPTIONS),
      })
    }
    // single value
    return formatMessage({ id: 'search.facets.filter.chip.date.value' }, {
      label: attributeLabel,
      date: formatDate(lowerBound, DATETIME_OPTIONS),
    })
  }

  render() {
    const { selectedFacet, onUnselectFacet } = this.props
    return (
      <SelectedFacetComponent
        label={this.buildLabel()}
        selectedFacet={selectedFacet}
        onUnselectFacet={onUnselectFacet}
      />
    )
  }
}
export default SelectedDateRangeFacetComponent
