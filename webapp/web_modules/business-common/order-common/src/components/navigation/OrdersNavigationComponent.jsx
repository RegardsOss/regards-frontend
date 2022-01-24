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
import get from 'lodash/get'
import { OrderShapes } from '@regardsoss/shape'
import { Breadcrumb } from '@regardsoss/components'

/**
 * Orders context navigation component
 * @author Raphaël Mechali
 */
class OrdersNavigationComponent extends React.Component {
  /** Marks root element */
  static ROOT_MARKER = { id: 'root' }

  static propTypes = {
    title: PropTypes.string.isRequired,
    rootIcon: PropTypes.node,
    navigationPath: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({ id: PropTypes.string.isRequired }), // context level 0 (root dummy marker)
      OrderShapes.OrderWithContent, // context level 1
      OrderShapes.DatasetTask, // context level 2
    ])).isRequired,
    // on reset to level parent callback like (index) => ()
    onResetTolevel: PropTypes.func.isRequired,
  }

  /**
   * On user clicked a level (adapt for parent, to provide only level index)
   * @param {ROOT_MARKER|OrderWithContent|DatasetTask} element element clicked
   * @param {number} index level index clicked
   */
  onLevelAction = (element, index) => this.props.onResetTolevel(index)

  /**
   * Returns label for path element as parameter
   * @param {ROOT_MARKER|OrderWithContent|DatasetTask} element level element
   * @param {number} index level index clicked
   * @return {string} level label
   */
  getLabel = (element, index) => {
    const { title } = this.props
    switch (index) {
      case 0:
        // level 0: root, format according with calling module mode
        return title
      case 1:
        // level 1: order DTO
        return get(element, 'content.label')
      case 2:
        // level 2: dataset tasks
        return get(element, 'datasetLabel')
      default:
        throw new Error(`Unknown level index ${index}`)
    }
  }

  render() {
    const { navigationPath, rootIcon } = this.props
    return (
      <Breadcrumb
        elements={navigationPath}
        labelGenerator={this.getLabel}
        onAction={this.onLevelAction}
        rootIcon={rootIcon}
      />
    )
  }
}
export default OrdersNavigationComponent
