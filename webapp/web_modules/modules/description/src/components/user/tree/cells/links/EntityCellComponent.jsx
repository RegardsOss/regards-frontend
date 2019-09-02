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
import DescriptionIcon from 'material-ui/svg-icons/action/info-outline'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import TreeLinkComponent from './TreeLinkComponent'

/**
 * Displays an entity cell
 * @author Raphaël Mechali
 */
class EntityCellComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CalaogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User clicked this link: propage show entity description request to parent
   */
  onClick = () => {
    const { entity, onSelectEntityLink } = this.props
    onSelectEntityLink(entity)
  }

  render() {
    const { entity, isDescriptionAllowed } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <TreeLinkComponent
        text={entity.content.label}
        tooltip={formatMessage({ id: 'module.description.common.search.entity.tooltip' })}
        selected={false} // cannot be selected
        disabled={!isDescriptionAllowed(entity)}
        onClick={this.onClick}
        IconConstructor={DescriptionIcon}
        section={false}
      />)
  }
}
export default EntityCellComponent
