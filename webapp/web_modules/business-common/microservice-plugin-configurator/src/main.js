/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginFormContainer from './containers/PluginFormContainer'
import PluginListContainer from './containers/PluginListContainer'
import RenderPluginField from './form-utils/RenderPluginField'
import RenderPluginConfField from './form-utils/RenderPluginConfField'
import PluginDescriptionCard from './components/PluginDescriptionCard'
import PluginDescriptionDialog from './components/PluginDescriptionDialog'
import PluginFormUtils from './tools/PluginFormUtils'

/**
 * Module to handle current project of the interface. Fetch the project and put the information in the store.
 * To use this module just add <ProjectHandler projectName={} /> into your application DOM.
 *
 */
module.exports = {
  PluginFormContainer,
  PluginListContainer,
  RenderPluginField,
  RenderPluginConfField,
  PluginDescriptionCard,
  PluginDescriptionDialog,
  PluginFormUtils,
}
