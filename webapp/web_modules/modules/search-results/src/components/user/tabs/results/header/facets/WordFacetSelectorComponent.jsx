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
import { UIFacet } from '../../../../../../shapes/facets/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/**
 * Available word facet selector
 * @author Raphaël Mechali
 */
class WordFacetSelectorComponent extends React.Component {
  static propTypes = {
    facet: UIFacet.isRequired, // granted to be a string UI facet
    // Facet valued selected callback (facet, facetValueQuery, facetValue) => ()
    onSelectFacetValue: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats facet value
   * @param {FacetValue} facetValue as returned by the backend
   * @return {string} value label
   */
  formatFacetValue = ({ word, count }) => {
    const { intl: { formatNumber, formatMessage } } = this.context
    return formatMessage({ id: 'search.facets.filter.menu.word.value' }, {
      word,
      count: formatNumber(count),
    })
  }

  /**
   * Facet value selection callback, locally wrapped to provide facet, query and value to parent
   * @param {*} selectedFacetValue selected facet value
   */
  onSelectFacetValue = (selectedFacetValue) => {
    const { facet, onSelectFacetValue } = this.props
    onSelectFacetValue(facet, selectedFacetValue.openSearchQuery, selectedFacetValue.word)
  }

  render() {
    const { facet } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        facetValueFormatter={this.formatFacetValue}
        onSelectFacetValue={this.onSelectFacetValue}
      />
    )
  }
}

export default WordFacetSelectorComponent
