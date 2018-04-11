/**
* LICENSE_PLACEHOLDER
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
