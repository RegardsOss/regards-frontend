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
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { DamDomain } from '@regardsoss/domain'
import AttributeLabelRender from '../../../render/AttributeRender'

/**
 * Renders a selected attribute as label from its full qualified name
 * @author Raphaël Mechali
 */
class AttributeRender extends React.Component {
  static propTypes = {
    entity: AccessShapes.AttributeConfigurationData,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
  }

  render() {
    const { entity: { name }, attributeModels, ...remainingProps } = this.props
    return (
      <AttributeLabelRender
        entity={DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels)}
        {...remainingProps}
      />
    )
  }
}
export default AttributeRender
