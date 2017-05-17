/**
* LICENSE_PLACEHOLDER
**/
import { i18nContextType } from '@regardsoss/i18n'
import { StringFacet } from '../model/FacetShape'
import FacetSelectorComponent from './FacetSelectorComponent'

/**
* Word facet selector
*/
class WordFacetSelectorComponent extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    facet: StringFacet.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: PropTypes.func.isRequired,
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
    const { label, facet, applyFilter } = this.props
    return (
      <FacetSelectorComponent
        facet={facet}
        label={label}
        facetValueFormatterForMenu={this.formatFacetValueForMenu}
        facetValueFormatterForFilter={this.formatFacetValueForFilter}
        applyFilter={applyFilter}
      />
    )
  }
}

export default WordFacetSelectorComponent
