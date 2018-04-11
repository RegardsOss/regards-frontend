/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Shares tools to init a regards plugin in the application.
 * @author Sebastien Binda
 */

/** Empty messages */
const EMPTY_MESSAGES = { en: {}, fr: {} }

/** Empty styles */
const EMPTY_STYLES = { styles: () => ({}) }

/** @return empty reducers configuration */
const EMPTY_REDUCERS_BUILDER = () => ({})

/**
 * Initializes a plugin in REGARDS environment
 * @param {React.Component} pluginClass React root render class for plugin
 * @param {*} pluginInfo Plugin information (JSON file)
 * @param {*} getReducer (optional) plugin reducers builder on pluginInstanceId like (pluginInstanceId:string) => {key:reducer,...}
 * @param {en: {*}, fr: {*}}} messages (optional) plugin internationalized messages
 */
const initPlugin = (pluginClass, pluginInfo, getReducer, messages, styles) => {
  const event = new CustomEvent('plugin', {
    detail: {
      sourcePath: document.currentScript.src,
      plugin: pluginClass,
      info: pluginInfo,
      getReducer: getReducer || EMPTY_REDUCERS_BUILDER,
      messages: messages || EMPTY_MESSAGES,
      styles: styles || EMPTY_STYLES,
    },
  })
  document.dispatchEvent(event)
}

module.exports = { initPlugin }
