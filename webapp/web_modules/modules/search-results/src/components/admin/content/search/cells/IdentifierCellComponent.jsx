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

import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from './CriteriaRowsHelper'
import IdentifierGroupCellComponent from './IdentifierGroupCellComponent'
import IdentifierCriterionCellComponent from './IdentifierCriterionCellComponent'
import { PluginMeta } from '../../../../../shapes/form/PluginMeta'

/**
 * Identifier cell component: shows groups / criteria identifier cell
 *
 * @author Raphaël Mechali
 */
class IdentifierCellComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    pluginsMetadata: PropTypes.arrayOf(PluginMeta).isRequired,
    onUpdateCriterionPlugin: PropTypes.func.isRequired,
  }

  render() {
    const { entity, pluginsMetadata, onUpdateCriterionPlugin } = this.props
    return CriteriaRowsHelper.isGroup(entity)
      ? <IdentifierGroupCellComponent entity={entity} />
      : <IdentifierCriterionCellComponent
          entity={entity}
          pluginsMetadata={pluginsMetadata}
          onUpdateCriterionPlugin={onUpdateCriterionPlugin}
      />
  }
}
export default IdentifierCellComponent
