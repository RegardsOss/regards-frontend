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
import { i18nContextType } from '@regardsoss/i18n'
import { TableLayout } from '@regardsoss/components'
import { DescriptionEntity } from '../../shapes/DescriptionState'
import HeaderBarComponent from './header/HeaderBarComponent'
import ContentDisplayComponent from './content/ContentDisplayComponent'
import BrowsingTreeComponent from './tree/BrowsingTreeComponent'


/**
 * Main description module component. It show entity description view and breadcrumb in table layout.
 * @author Raphaël Mechali
 */
class MainModuleComponent extends React.Component {
  static propTypes = {
    descriptionEntity: DescriptionEntity.isRequired,
    selectedEntityIndex: PropTypes.number.isRequired,
    descriptionPath: PropTypes.arrayOf(DescriptionEntity).isRequired,
    browsingTreeVisible: PropTypes.bool.isRequired,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CalaogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // Callback: user searched for a word tag (tag:string) => ()
    onSearchWord: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CalaogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
    // Callback: user selected an entity by its index in path (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      descriptionEntity, browsingTreeVisible, isDescriptionAllowed, descriptionPath, selectedEntityIndex,
      onSelectInnerLink, onSelectEntityLink, onSearchWord, onSearchEntity, onSelectEntityIndex,
    } = this.props
    const { moduleTheme: { user: { main: { root } } } } = this.context

    return (
      <TableLayout>
        <HeaderBarComponent
          descriptionEntity={descriptionEntity}
          selectedEntityIndex={selectedEntityIndex}
          descriptionPath={descriptionPath}
          onSelectEntityIndex={onSelectEntityIndex}
          onSearchEntity={onSearchEntity}
        />
        <div style={root}>
          <BrowsingTreeComponent
            browsingTreeVisible={browsingTreeVisible}
            descriptionEntity={descriptionEntity}
            isDescriptionAllowed={isDescriptionAllowed}
            onSelectInnerLink={onSelectInnerLink}
            onSelectEntityLink={onSelectEntityLink}
            onSearchWord={onSearchWord}
            onSearchEntity={onSearchEntity}
          />
          <ContentDisplayComponent
            descriptionEntity={descriptionEntity}
            isDescriptionAllowed={isDescriptionAllowed}
            onSelectInnerLink={onSelectInnerLink}
            onSelectEntityLink={onSelectEntityLink}
            onSearchWord={onSearchWord}
            onSearchEntity={onSearchEntity}
          />
        </div>
      </TableLayout>
    )
  }
}
export default MainModuleComponent
