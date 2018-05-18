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
import { StringFacet } from '../../../../models/facets/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/**
 * Word facet selector
 */
class WordFacetSelectorComponent extends React.Component {
  static propTypes = {
    facet: StringFacet.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  formatFacetValueForFilter = (label, { word }) => {
    const { intl: { formatMessage } } = this.context
    return formatMessage({ id: 'search.facets.filter.chip.word.value' }, { label, word })
  }

  formatFacetValueForMenu = (label, { word, count }) => {
    const { intl: { formatNumber, formatMessage } } = this.context
    return formatMessage({ id: 'search.facets.filter.menu.word.value' }, {
      word,
      count: formatNumber(count),
    })
  }

  render() {
    const { facet, onSelectFacet } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatterForMenu={this.formatFacetValueForMenu}
        facetValueFormatterForFilter={this.formatFacetValueForFilter}
        onSelectFacet={onSelectFacet}
      />
    )
  }
}

export default WordFacetSelectorComponent
