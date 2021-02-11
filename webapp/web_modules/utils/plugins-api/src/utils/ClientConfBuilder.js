/*
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
 */

/**
 * Redux client builder for plugins
 * As plugin receive their pluginInstanceId on runtime, the namespace
 * of these actions are also build on runtime. This ensures each action
 * will be reduced by only one reducer, yours.
 * @author Léo Mieulet
 */
export default class ClientConfBuilder {
  /**
   * Redux client builder constructor
   * @param {string} pluginName plugin name to use on store path and namespace. Must be the same as in plugin-info.json
   * @param {string} storeKey this reducer store key, used by selector
   */
  constructor(pluginName, storeKey) {
    this.pluginName = pluginName
    this.storeKey = storeKey
  }

  /**
   * Save the Action build function
   */
  setActionsBuilder(actionsBuilder) {
    this.actionsBuilder = actionsBuilder
    return this
  }

  /**
   * Save the Selector build function
   */
  setSelectorsBuilder(selectorsBuilder) {
    this.selectorsBuilder = selectorsBuilder
    return this
  }

  /**
   * Save the Reducer build function
   */
  setReducerBuilder(reducerBuilder) {
    this.reducerBuilder = reducerBuilder
    return this
  }

  /**
   * @param {*} pluginInstanceId runtime plugin id
   * @returns the client to wire on container
   */
  getClient(pluginInstanceId) {
    return {
      actions: this.getActions(pluginInstanceId),
      selectors: this.getSelectors(pluginInstanceId),
    }
  }

  /**
   * Build a new reducer instance using pluginInstanceId
   * @param {*} pluginInstanceId runtime plugin id
   * @returns the reducer to wire on plugin reducer
   */
  getReducer(pluginInstanceId) {
    const namespace = this.getNamespace(pluginInstanceId)
    return this.reducerBuilder(namespace)
  }

  /**
   * Build an new Actions instance using pluginInstanceId
   * @param {*} pluginInstanceId runtime plugin id
   * @returns the reducer to wire on plugin reducer
   */
  getActions(pluginInstanceId) {
    const namespace = this.getNamespace(pluginInstanceId)
    return this.actionsBuilder(namespace)
  }

  /**
   * Build a new Selectors instance using pluginInstanceId
   * @param {*} pluginInstanceId runtime plugin id
   * @returns the selector to select inside redux state
   */
  getSelectors(pluginInstanceId) {
    const storePath = this.getStorePath(pluginInstanceId)
    return this.selectorsBuilder(storePath)
  }

  /**
   * Get the namespace used by actions and reducer
   * @param {String} pluginInstanceId runtime plugin id
   */
  getNamespace(pluginInstanceId) {
    return `${this.pluginName}/requests/${pluginInstanceId}`
  }

  /**
   * Get the store path used by selectors
   * @param {String} pluginInstanceId runtime plugin id
   */
  getStorePath(pluginInstanceId) {
    return [`plugins.${this.pluginName}.${pluginInstanceId}`, this.storeKey]
  }
}
