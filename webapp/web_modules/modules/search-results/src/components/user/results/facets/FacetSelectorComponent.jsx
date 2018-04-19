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
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import MessageIcon from 'material-ui/svg-icons/action/info-outline'
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
    const { facet: { label, values, others }, facetValueFormatterForMenu } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <DropDownButton
        getLabel={this.getLabel}
        onChange={this.onSelectFacet}
      >
        { // add all facets possible choices
          values.map((facetValue) => {
            const menuLabel = facetValueFormatterForMenu(label, facetValue)
            return (
              <MenuItem key={menuLabel} value={facetValue} primaryText={menuLabel} />
            )
          })
        }
        { // append non exhaustive message when others count is greater than 0
          others ? [
            <Divider key="message.separator" />,
            <MenuItem
              key="others.message"
              disabled
              leftIcon={<MessageIcon />}
              primaryText={formatMessage({ id: 'search.facets.filter.menu.others.message' })}
            />] : null
        }
      </DropDownButton>
    )
  }
}

export default FacetSelectorComponent