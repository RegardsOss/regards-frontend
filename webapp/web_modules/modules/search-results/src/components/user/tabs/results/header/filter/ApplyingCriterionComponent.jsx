/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIShapes } from '@regardsoss/shape'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { themeContextType } from '@regardsoss/theme'

/**
 * Common component to display a currently applying criterion
 * @author Raphaël Mechali
 */
class ApplyingCriterionComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.bool, // display as error?
    // assert basic criterion only (other field are specific to each criterion type).
    // Not mandatory as some feedback elements may use none
    selectedCriterion: UIShapes.BasicCriterion,
    // on delete selected facet value criterion callback: SelectedFacetCriterion => ()
    onUnselectCriterion: PropTypes.func.isRequired,
    // node to show as filter icon
    filterIcon: PropTypes.node.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: user unselected this criterion
   */
  onUnselectCriterion = () => {
    const { selectedCriterion, onUnselectCriterion } = this.props
    onUnselectCriterion(selectedCriterion)
  }

  render() {
    const { error, label, filterIcon } = this.props
    const { moduleTheme: { user: { filters } } } = this.context
    return (
      <Chip
        labelColor={error ? filters.errorColor : null}
        style={filters.style}
        onRequestDelete={this.onUnselectCriterion}
      >
        <Avatar
          color={error ? filters.errorColor : filters.iconColor}
          icon={filterIcon}
        />
        { label }
      </Chip>
    )
  }
}
export default ApplyingCriterionComponent
