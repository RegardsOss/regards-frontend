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
import { UIDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LabelVersionText } from '@regardsoss/attributes-common'
import { EntityTypeIcon } from '@regardsoss/entities-common'
import { DescriptionEntity } from '../../../shapes/DescriptionState'

/**
 * Shows an entity breadcrumb link
 * @author Raphaël Mechali
 */
class BreadcrumbLinkComponent extends React.Component {
  static propTypes = {
    settings: UIShapes.UISettings.isRequired,
    descriptionEntity: DescriptionEntity.isRequired,
    entityIndex: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    // On selected entity index callback (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
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
      intl: { formatMessage },
      moduleTheme: {
        user: {
          header: {
            breadcrumb: { selectedLink, unselectedLink },
          },
        },
      },
    } = this.context
    const { settings, descriptionEntity: { entity }, selected } = this.props
    // Select icon constructor for current entity type
    const IconConstructor = EntityTypeIcon.getIconConstructor(entity,
      UIDomain.isDocumentEntity(settings, entity))
    // Select styles for entity state (selected or not)
    const { root, icon, text } = selected ? selectedLink : unselectedLink
    const label = LabelVersionText.formatLabel(formatMessage, entity, settings)
    return (
      <div style={root} onClick={this.onClick}>
        <IconConstructor style={icon.style} color={icon.color} />
        <div style={text} title={label}>
          {label}
        </div>
      </div>
    )
  }
}
export default BreadcrumbLinkComponent
