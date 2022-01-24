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
import SearchIcon from 'mdi-material-ui/Magnify'
import DescriptionIcon from 'mdi-material-ui/InformationOutline'
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import PageElement from '../common/PageElement'
import PageLinkCellComponent from '../common/PageLinkCellComponent'
import PageElementOption from '../common/PageElementOption'

/**
 * Display an entity as link, or simple text when it has no description, and corresponding search option in entities list page
 * @author Raphaël Mechali
 */
class EntityLinkComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity.isRequired,
    isDescriptionAllowed: PropTypes.func.isRequired,
    allowSearching: PropTypes.bool,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // on search word tag
    onSearchEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * User callback: On search entity clicked. Search for related entities
   */
  onSearchEntity = () => {
    const { entity, onSearchEntity } = this.props
    onSearchEntity(entity)
  }

  /**
   * User callback: on entity link clicked. Show entity description
   */
  onSelectEntityLink = () => {
    const { entity, onSelectEntityLink } = this.props
    onSelectEntityLink(entity)
  }

  render() {
    const { entity, isDescriptionAllowed, allowSearching } = this.props
    const { intl: { formatMessage } } = this.context
    const descriptionAllowed = isDescriptionAllowed(entity)
    const { content: { label } } = entity
    return (
      <PageElement>
        <PageLinkCellComponent
          text={entity.content.label}
          tooltip={formatMessage({ id: 'module.description.common.show.entity.description.tootlip' }, { entityLabel: label })}
          LinkIconConstructor={DescriptionIcon}
          disabled={!descriptionAllowed}
          onClick={this.onSelectEntityLink}
        />
        { allowSearching ? (
          <PageElementOption
            IconConstructor={SearchIcon}
            title={formatMessage({ id: 'module.description.common.search.entity.tooltip' }, { entityLabel: label })}
            onClick={this.onSearchEntity}
          />) : null}
      </PageElement>)
  }
}
export default EntityLinkComponent
