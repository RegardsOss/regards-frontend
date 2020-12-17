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
import find from 'lodash/find'
import { BasicListSelectors } from '@regardsoss/store-utils'

/**
 * Redux store Selectors for Layout entities
 */
class LayoutsSelector extends BasicListSelectors {
  constructor() {
    super(['user', 'layout'])
  }

  getDynamicContainer(state, app) {
    const layout = this.getById(state, app)
    const mainContainer = layout.content.layout
    if (mainContainer) {
      return this.findDynamic(mainContainer)
    }
    return null
  }

  findDynamic(container) {
    if (!container.dynamicContent) {
      return find(container.containers, (lcontainer) => this.findDynamic(lcontainer))
    }
    return container
  }
}

const instance = new LayoutsSelector()
export default instance
