/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import { StringValueRender } from '@regardsoss/components'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { COMPONENT_TYPE, COMPONENT_TYPE_ENUM } from '../../domain/componentTypes'

/**
  * Table cell render for attribute
  * @author Théo Lasserre
  */
class ReferencedProductsRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([
      AdminShapes.Source,
      AdminShapes.Session,
    ]).isRequired,
    componentType: PropTypes.oneOf(COMPONENT_TYPE),
  }

  /**
   * Builds render label for attribute modelas parameter (shared for different render systems)
   * @param {*} attributeModel attribute model (inside or without content field)
   * @param {intl} intl from context
   * @return string to show as render
   */
  static getReferencedProducts(attributeModel, componentType) {
    const { steps } = attributeModel.content
    const referencingStep = find(steps, (step) => step.type === AdminDomain.STEP_TYPE_ENUM.REFERENCING)
    if (referencingStep) {
      return componentType === COMPONENT_TYPE_ENUM.SOURCE ? referencingStep.totalOut : referencingStep.outputRelated
    }
    return 0
  }

  render() {
    const { entity, componentType } = this.props
    return <StringValueRender value={ReferencedProductsRender.getReferencedProducts(entity, componentType)} />
  }
}
export default ReferencedProductsRender
