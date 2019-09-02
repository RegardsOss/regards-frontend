/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { themeContextType } from '@regardsoss/theme'
import { EntityTypeIcon } from '@regardsoss/entities-common'
import { DescriptionEntity } from '../../../shapes/DescriptionState'

/**
 * Shows an entity breadcrumb link
 * @author Raphaël Mechali
 */
class BreadcrumbLinkComponent extends React.Component {
  static propTypes = {
    descriptionEntity: DescriptionEntity.isRequired,
    entityIndex: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    // On selected entity index callback (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: this entity was seleced
   */
  onClick = () => {
    const { entityIndex, onSelectEntityIndex } = this.props
    onSelectEntityIndex(entityIndex)
  }

  render() {
    const {
      moduleTheme: {
        user: {
          header: {
            breadcrumb: { selectedLink, unselectedLink },
          },
        },
      },
    } = this.context
    const { descriptionEntity, selected } = this.props
    // Select icon constructor for current entity type
    const IconConstructor = EntityTypeIcon.getIconConstructor(descriptionEntity.entity)
    // Select styles for entity state (selected or not)
    const { root, icon, text } = selected ? selectedLink : unselectedLink
    // TODO more styles when testable
    return (
      <div style={root} onClick={this.onClick}>
        <IconConstructor style={icon.style} color={icon.color} />
        <div style={text}>
          {descriptionEntity.entity.content.label}
        </div>
      </div>
    )
  }
}
export default BreadcrumbLinkComponent
