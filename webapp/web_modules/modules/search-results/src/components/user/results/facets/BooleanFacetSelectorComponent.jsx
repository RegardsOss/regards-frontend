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
import FacetSelectorComponent from './FacetSelectorComponent'
import { UIFacet } from '../../../../models/facets/FacetShape'

/**
 * Boolean facet selector
 * @author Raphaël Mechali
 */
class BooleanFacetSelectorComponent extends React.Component {
  static propTypes = {
    facet: UIFacet.isRequired, // granted to be a boolean UI facet

    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * @param {boolean} value facet value
   * @return {string} label for boolean value */
  getValueLabel = (value) => {
    const { intl: { formatMessage } } = this.context
    return formatMessage({
      id: value ? 'search.facets.filter.boolean.value.true' : 'search.facets.filter.boolean.value.false',
    })
  }

  /**
   * Formats facet value
   * @param {FacetValue} facetValue as returned by the backend
   * @return {string} value label
   */
  formatFacetValue = ({ value, count }) => {
    const { intl: { formatNumber, formatMessage } } = this.context
    const valueLabel = formatMessage({ id: value ? 'search.facets.filter.boolean.value.true' : 'search.facets.filter.boolean.value.false' })
    return formatMessage({ id: 'search.facets.filter.menu.boolean.value' }, {
      valueLabel,
      count: formatNumber(count),
    })
  }

  render() {
    const { facet, onSelectFacet } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatter={this.formatFacetValue}
        onSelectFacet={onSelectFacet}
      />
    )
  }
}

export default BooleanFacetSelectorComponent
