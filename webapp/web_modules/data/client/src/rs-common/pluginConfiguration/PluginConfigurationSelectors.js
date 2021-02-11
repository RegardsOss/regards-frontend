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
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpsortBy from 'lodash/fp/sortBy'
import filter from 'lodash/filter'
import pickBy from 'lodash/pickBy'
import { BasicListSelectors } from '@regardsoss/store-utils'

class PluginConfigurationSelectors extends BasicListSelectors {
  getListByPluginClassName(state, pluginClassName) {
    return filter(this.getList(state), (item) => item.content.pluginClassName === pluginClassName)
  }

  getListByPluginId(state, pluginId) {
    return pickBy(this.getList(state), (item) => item.content.pluginId === pluginId)
  }

  getListActiveAndSorted(state) {
    return flow(
      fpfilter((pluginConfiguration) => pluginConfiguration.content.active),
      fpsortBy((pluginConfiguration) => -1 * pluginConfiguration.content.priorityOrder),
    )(this.getList(state))
  }

  getListInactiveAndSorted(state) {
    return flow(
      fpfilter((pluginConfiguration) => !pluginConfiguration.content.active),
      fpsortBy((pluginConfiguration) => -1 * pluginConfiguration.content.priorityOrder),
    )(this.getList(state))
  }
}

const getPluginConfigurationSelectors = (storePath) => new PluginConfigurationSelectors(storePath)
export default getPluginConfigurationSelectors
