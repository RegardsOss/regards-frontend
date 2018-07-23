/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'

/**
 * Renders attribute as label
 * @author Raphaël Mechali
 */
class AttributeRender extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.AttributeModel.isRequired,
  }

  render() {
    const { entity } = this.props
    return (
      <StringValueRender
        value={DamDomain.AttributeModelController.getAttributeModelFullLabel(entity)}
      />
    )
  }
}
export default AttributeRender
