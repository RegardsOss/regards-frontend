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
import sum from 'lodash/sum'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { StringValueRender } from '@regardsoss/components'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'

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
    entityType: PropTypes.string,
  }

  static getSum = (steps, property) => sum(map(steps, (step) => step[property]))

  /**
   * Builds render label for attribute modelas parameter (shared for different render systems)
   * @param {*} attributeModel attribute model (inside or without content field)
   * @param {intl} intl from context
   * @return string to show as render
   */
  static getReferencedProducts(attributeModel, entityType) {
    const { steps } = attributeModel.content
    const referencingSteps = filter(steps, (step) => step.type === AdminDomain.STEP_TYPE_ENUM.REFERENCING)
    if (referencingSteps) {
      return entityType === AdminDomain.SOURCE_FILTER_PARAMS.SELECTED_SOURCE ? ReferencedProductsRender.getSum(referencingSteps, 'totalOut') : ReferencedProductsRender.getSum(referencingSteps, 'outputRelated')
    }
    return 0
  }

  render() {
    const { entity, entityType } = this.props
    return <StringValueRender value={ReferencedProductsRender.getReferencedProducts(entity, entityType)} />
  }
}
export default ReferencedProductsRender
