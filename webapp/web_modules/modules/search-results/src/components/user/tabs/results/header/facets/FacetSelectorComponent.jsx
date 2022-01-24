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
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import MessageIcon from 'mdi-material-ui/InformationOutline'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DropDownButton } from '@regardsoss/components'
import { UIFacet } from '../../../../../../shapes/facets/FacetShape'

/**
 * Facet selector abstraction (to be used as delegate by all facet type selectors)
 */
class FacetSelectorComponent extends React.Component {
  static propTypes = {
    facet: UIFacet.isRequired,
    // formats the facet value for menu
    facetValueFormatter: PropTypes.func.isRequired,
    // Facet valued selected callback (facetValue) => ()
    onSelectFacetValue: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: a facet value was selected
   * @param {*} facetValue selected facet value
   */
  onSelectFacetValue = (facetValue) => this.props.onSelectFacetValue(facetValue)

  /**
   * @return {string} drop down button label, using facet label
   */
  getLabel = () => {
    const { facet: { facetLabels } } = this.props
    const { intl: { locale } } = this.context
    return facetLabels[locale]
  }

  render() {
    const { facet: { model: { values, others } }, facetValueFormatter } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <DropDownButton
        getLabel={this.getLabel}
        onChange={this.onSelectFacetValue}
      >
        { // add all facets possible choices
          values.map((facetValue) => {
            const menuLabel = facetValueFormatter(facetValue)
            return (
              <MenuItem key={menuLabel} value={facetValue} primaryText={menuLabel} />
            )
          })
        }
        { // append non exhaustive message when others count is defined and greater than 0
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
