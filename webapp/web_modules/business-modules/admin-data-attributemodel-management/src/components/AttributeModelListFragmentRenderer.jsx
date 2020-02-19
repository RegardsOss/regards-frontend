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
import { DataManagementShapes } from '@regardsoss/shape'
import { fragmentSelectors } from '../clients/FragmentClient'

/**
 * Display fragment name for an attribute model
 * @author Sébastien Binda
 */
class AttributeModelListFragmentRenderer extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.AttributeModel,
  }

  render = () => {
    if (this.props.entity.content.fragment.name !== fragmentSelectors.noneFragmentName) {
      return this.props.entity.content.fragment.name
    }
    return ''
  }
}
export default AttributeModelListFragmentRenderer
