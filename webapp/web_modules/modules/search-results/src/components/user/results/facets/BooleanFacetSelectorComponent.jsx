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
import { BooleanFacet } from '../../../../models/facets/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/**
 * Boolean facet selector
 */
class BooleanFacetSelectorComponent extends React.Component {
  static propTypes = {
    facet: BooleanFacet.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onAddFilter: PropTypes.func.isRequired,
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

  formatFacetValueForFilter = (label, { value }) => {
    const { intl: { formatMessage } } = this.context
    const valueLabel = this.getValueLabel(value)
    return formatMessage({ id: 'search.facets.filter.chip.boolean.value' }, { label, valueLabel })
  }

  formatFacetValueForMenu = (label, { value, count }) => {
    const { intl: { formatNumber, formatMessage } } = this.context
    const valueLabel = this.getValueLabel(value)
    return formatMessage({ id: 'search.facets.filter.menu.boolean.value' }, { valueLabel, count: formatNumber(count) })
  }

  render() {
    const { facet, onAddFilter } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatterForMenu={this.formatFacetValueForMenu}
        facetValueFormatterForFilter={this.formatFacetValueForFilter}
        onAddFilter={onAddFilter}
      />
    )
  }
}

export default BooleanFacetSelectorComponent
