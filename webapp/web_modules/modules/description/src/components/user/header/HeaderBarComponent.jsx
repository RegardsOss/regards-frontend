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
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { TableHeaderLine, TableHeaderOptionsSeparator } from '@regardsoss/components'
import ToggleTreeVisibleOptionContainer from '../../../containers/user/header/ToggleTreeVisibleOptionContainer'
import { DescriptionEntity } from '../../../shapes/DescriptionState'
import SearchEntityOptionComponent from './SearchEntityOptionComponent'
import BreadcrumbComponent from './BreadcrumbComponent'

/**
 * Description header bar displaying component (mimics infinite table styles)
 * @author Raphaël Mechali
 */
class HeaderBarComponent extends React.Component {
  static propTypes = {
    settings: UIShapes.UISettings.isRequired,
    descriptionEntity: DescriptionEntity.isRequired,
    selectedEntityIndex: PropTypes.number.isRequired,
    descriptionPath: PropTypes.arrayOf(DescriptionEntity).isRequired,
    allowSearching: PropTypes.bool,
    // On selected entity index callback (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CatalogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
    toggleTreeButton: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      settings, descriptionEntity, selectedEntityIndex, descriptionPath,
      allowSearching, onSelectEntityIndex, onSearchEntity, toggleTreeButton,
    } = this.props
    const { moduleTheme: { user: { header: { leftGroup, rightGroup } } } } = this.context
    return (
      <TableHeaderLine>
        <div style={leftGroup}>
          <ToggleTreeVisibleOptionContainer toggleTreeButton={toggleTreeButton} />
          <TableHeaderOptionsSeparator />
          <BreadcrumbComponent
            settings={settings}
            selectedEntityIndex={selectedEntityIndex}
            descriptionPath={descriptionPath}
            onSelectEntityIndex={onSelectEntityIndex}
          />
        </div>
        <div style={rightGroup}>
          {allowSearching ? (
            <SearchEntityOptionComponent descriptionEntity={descriptionEntity} onSearchEntity={onSearchEntity} />)
            : null}
        </div>
      </TableHeaderLine>
    )
  }
}
export default HeaderBarComponent
