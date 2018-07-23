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
import { SelectedStringFacet } from '../../../../../models/facets/FacetShape'
import SelectedFacetComponent from './SelectedFacetComponent'

/**
 * Selected boolean facet display component
 * @author Raphaël Mechali
 */
class SelectedStringFacetComponent extends React.Component {
  static propTypes = {
    selectedFacet: SelectedStringFacet.isRequired,
    onUnselectFacet: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Formats this selected facet label
   * @return {string} formatted label to be displayed by the delegate component
   */
  buildLabel = () => {
    const { selectedFacet: { label, value: { word } } } = this.props
    const { intl: { locale, formatMessage } } = this.context
    const attributeLabel = label[locale]
    return formatMessage({ id: 'search.facets.filter.chip.word.value' }, { label: attributeLabel, word })
  }

  render() {
    const { selectedFacet, onUnselectFacet } = this.props
    return (
      <SelectedFacetComponent
        label={this.buildLabel()}
        selectedFacet={selectedFacet}
        onUnselectFacet={onUnselectFacet}
      />
    )
  }
}
export default SelectedStringFacetComponent
