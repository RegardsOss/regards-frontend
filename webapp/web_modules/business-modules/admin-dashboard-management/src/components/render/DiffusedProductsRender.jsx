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
import sum from 'lodash/sum'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { StringValueRender } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { AdminDomain } from '@regardsoss/domain'
import { ENTITY, ENTITY_ENUM } from '../../domain/entityTypes'
import { DISSEMINATION_TYPE } from '../../domain/disseminationTypes'

/**
   * Table cell render for attribute
   * @author Théo Lasserre
   */
class DiffusedProductsRender extends React.Component {
  static propTypes = {
    entity: PropTypes.oneOfType([
      AdminShapes.Source,
      AdminShapes.Session,
    ]).isRequired,
    entityType: PropTypes.oneOf(ENTITY),
  }

  static getSum = (steps, property) => sum(map(steps, (step) => step[property]))

  /**
   * Builds render label for attribute modelas parameter (shared for different render systems)
   * @param {*} attributeModel attribute model (inside or without content field)
   * @param {intl} intl from context
   * @return string to show as render
   */
  static getDiffusedProducts(attributeModel, entityType) {
    const { steps } = attributeModel.content
    const diffusionSteps = filter(steps, (step) => step.type === AdminDomain.STEP_TYPE_ENUM.DISSEMINATION)
    if (diffusionSteps) {
      if (entityType === ENTITY_ENUM.SOURCE) {
        return DiffusedProductsRender.getSum(diffusionSteps, 'totalOut')
      }
      const catalogSteps = filter(diffusionSteps, (step) => step.stepId === DISSEMINATION_TYPE.CATALOG)
      if (catalogSteps) {
        return DiffusedProductsRender.getSum(diffusionSteps, 'outputRelated')
      }
    }
    return 0
  }

  render() {
    const { entity, entityType } = this.props
    return <StringValueRender value={DiffusedProductsRender.getDiffusedProducts(entity, entityType)} />
  }
}
export default DiffusedProductsRender
