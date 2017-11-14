/**
* LICENSE_PLACEHOLDER
**/

import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'
import { Facet } from '../../../../models/facets/FacetShape'

/**
* Range facet selector
*/
class FacetSelectorComponent extends React.Component {

  static propTypes = {
    facet: Facet.isRequired,
    // formats the facet value for menu
    facetValueFormatterForMenu: PropTypes.func.isRequired,
    // formats the facet value for filter display
    facetValueFormatterForFilter: PropTypes.func.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    onSelectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onSelectFacet = (facetValue) => {
    // apply filter (compute the label value for it)
    const { onSelectFacet, facetValueFormatterForFilter, facet: { attributeName: filterKey, label } } = this.props
    onSelectFacet(filterKey, facetValueFormatterForFilter(label || filterKey, facetValue), facetValue.openSearchQuery)
  }

  getLabel = () => {
    // label does not change with value
    const { facet: { label, attributeName } } = this.props
    return label || attributeName
  }

  render() {
    const { facet: { label, values }, facetValueFormatterForMenu } = this.props

    return (
      <DropDownButton
        getLabel={this.getLabel}
        onChange={this.onSelectFacet}
      >
        {
          values.map((facetValue) => {
            const menuLabel = facetValueFormatterForMenu(label, facetValue)
            return (
              <MenuItem key={menuLabel} value={facetValue} primaryText={menuLabel} />
            )
          })
        }
      </DropDownButton>
    )
  }
}

export default FacetSelectorComponent
