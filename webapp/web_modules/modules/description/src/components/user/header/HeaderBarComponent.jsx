
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
import { TableHeaderLine, TableHeaderOptionsArea } from '@regardsoss/components'
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
    descriptionEntity: DescriptionEntity.isRequired,
    selectedEntityIndex: PropTypes.number.isRequired,
    descriptionPath: PropTypes.arrayOf(DescriptionEntity).isRequired,
    // On selected entity index callback (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CalaogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
  }

  render() {
    const {
      descriptionEntity, selectedEntityIndex, descriptionPath,
      onSelectEntityIndex, onSearchEntity,
    } = this.props
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <ToggleTreeVisibleOptionContainer />
          <BreadcrumbComponent
            selectedEntityIndex={selectedEntityIndex}
            descriptionPath={descriptionPath}
            onSelectEntityIndex={onSelectEntityIndex}
          />
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea reducible>
          <SearchEntityOptionComponent descriptionEntity={descriptionEntity} onSearchEntity={onSearchEntity} />
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default HeaderBarComponent
