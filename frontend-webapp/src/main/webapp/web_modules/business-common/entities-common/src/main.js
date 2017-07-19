/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DownloadDescriptionClient from './clients/DownloadDescriptionClient'
import DescriptionLevelActions from './model/description/DescriptionLevelActions'
import getDescriptionLevelReducer from './model/description/DescriptionLevelReducer'
import getDescriptionLevelSelectors from './model/description/DescriptionLevelSelectors'
import EntityDescriptionContainer from './containers/description/EntityDescriptionContainer'

import PluginServiceRunModel from './definitions/PluginServiceRunModel'
import OneElementTarget from './definitions/targets/OneElementTarget'
import ManyElementsTarget from './definitions/targets/ManyElementsTarget'


export default {
  DownloadDescriptionClient,
  EntityDescriptionContainer,
  descriptionLevelModel: {
    DescriptionLevelActions,
    getDescriptionLevelReducer,
    getDescriptionLevelSelectors,
  },
  // Services
  ServiceContainer,
  PluginServiceRunModel,
  targets: {
    OneElementTarget,
    ManyElementsTarget,
  },
}
