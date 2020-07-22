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
    settings: UIShapes.UISettings.isRequired,
    descriptionEntity: DescriptionEntity.isRequired,
    selectedEntityIndex: PropTypes.number.isRequired,
    descriptionPath: PropTypes.arrayOf(DescriptionEntity).isRequired,
    allowSearching: PropTypes.bool,
    browsingTreeVisible: PropTypes.bool.isRequired,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // Callback: user searched for a word tag (tag:string) => ()
    onSearchWord: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CatalogShapes.Entity) => ()
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
      settings, descriptionEntity, allowSearching, browsingTreeVisible, isDescriptionAllowed, descriptionPath,
      selectedEntityIndex, onSelectInnerLink, onSelectEntityLink, onSearchWord, onSearchEntity, onSelectEntityIndex,
    } = this.props
    const { moduleTheme: { user: { main: { root } } } } = this.context
    return (
      <TableLayout>
        <HeaderBarComponent
          settings={settings}
          descriptionEntity={descriptionEntity}
          selectedEntityIndex={selectedEntityIndex}
          descriptionPath={descriptionPath}
          allowSearching={allowSearching}
          onSelectEntityIndex={onSelectEntityIndex}
          onSearchEntity={onSearchEntity}
        />
        <div style={root}>
          <BrowsingTreeComponent
            allowSearching={allowSearching}
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
            allowSearching={allowSearching}
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
