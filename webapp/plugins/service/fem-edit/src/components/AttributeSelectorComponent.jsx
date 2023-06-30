/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'

/**
 * Common component to display an attribute model
 */
class AttributeSelectorComponent extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    attributeModel: DataManagementShapes.AttributeModel,
    // on delete selected facet value criterion callback: SelectedFacetCriterion => ()
    onClick: PropTypes.func.isRequired,
    // node to show as filter icon
    icon: PropTypes.node.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: user clicked this attribute model
   */
  onClick = () => {
    const { attributeModel, onClick } = this.props
    onClick(attributeModel)
  }

  render() {
    const { label, icon } = this.props
    const { moduleTheme: { filters } } = this.context
    return (
      <Chip style={filters.style} onClick={this.onClick}>
        <Avatar color={filters.iconColor} icon={icon} />
        { label }
      </Chip>
    )
  }
}

export default AttributeSelectorComponent
