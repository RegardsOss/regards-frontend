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
import { CatalogShapes } from '@regardsoss/shape'
import ListSectionPageComponent from '../common/ListSectionPageComponent'
import EntityLinkComponent from './EntityLinkComponent'

/**
 * Entities section page component
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class EntitiesSectionPageComponent extends React.Component {
  static propTypes = {
    entities: PropTypes.arrayOf(CatalogShapes.Entity).isRequired,
    isDescriptionAllowed: PropTypes.func.isRequired,
    allowSearching: PropTypes.bool,
    onSearchEntity: PropTypes.func.isRequired,
    scrollAreaHeight: PropTypes.number,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
  }

  /**
   * Renders an entity
   * @param {*} entity matching CatalogShapes.Entity
   * @return {React.ReactElement} render element
   */
  renderEntity = (entity) => {
    const {
      isDescriptionAllowed, allowSearching, onSelectEntityLink, onSearchEntity,
    } = this.props
    return (
      <EntityLinkComponent
        key={entity.content.id}
        entity={entity}
        isDescriptionAllowed={isDescriptionAllowed}
        allowSearching={allowSearching}
        onSelectEntityLink={onSelectEntityLink}
        onSearchEntity={onSearchEntity}
      />)
  }

  render() {
    const { entities, scrollAreaHeight } = this.props
    return (
      <ListSectionPageComponent
        elements={entities}
        buildElementNode={this.renderEntity}
        scrollAreaHeight={scrollAreaHeight}
      />
    )
  }
}
export default EntitiesSectionPageComponent
