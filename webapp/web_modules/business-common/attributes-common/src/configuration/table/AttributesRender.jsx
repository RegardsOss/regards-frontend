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
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { StringArrayValueRender } from '@regardsoss/components'
import AttributeRenderDelegate from '../../render/AttributeRender'

/**
 * Renders attribute / attributes list
 * @author Raphaël Mechali
 */
class AttributesRender extends React.Component {
  static propTypes = {
    entity: AccessShapes.AttributeElementModel,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { entity, attributeModels } = this.props
    const { intl } = this.context
    return (
      <StringArrayValueRender
        value={entity.attributes.map(({ name }) => AttributeRenderDelegate.getRenderLabel(
          DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels), intl))}
      />)
  }
}
export default AttributesRender
