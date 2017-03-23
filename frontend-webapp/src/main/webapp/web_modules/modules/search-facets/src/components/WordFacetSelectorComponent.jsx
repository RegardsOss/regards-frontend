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
    label: React.PropTypes.string,
    facet: StringFacet.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }


  formatFacetValue = ({ word, count }) => {
    const { intl: { formatNumber, formatMessage } } = this.context
    return formatMessage({ id: 'search.facets.filter.word.value' }, {
      word,
      count: formatNumber(count),
    })
  }

  render() {
    const { label, facet, applyFilter } = this.props
    return (
      <FacetSelectorComponent
        label={label}
        facetValueFormatter={this.formatFacetValue}
        facet={facet}
        applyFilter={applyFilter}
      />
    )
  }
}

export default WordFacetSelectorComponent
