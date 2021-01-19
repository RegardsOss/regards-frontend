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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { attributeModelActions } from './clients/AttributeModelClient'
import { collectionAttributeModelActions } from './clients/CollectionAttributeModelClient'
import { dataAttributeModelActions } from './clients/DataobjectAttributeModelClient'
import { datasetAttributeModelActions } from './clients/DatasetAttributeModelClient'
import { uiSettingsActions } from './clients/UISettingsClient'

/**
 * Dependencies needed to display user page of the module
 * @author Raphaël Mechali
 */
const user = [
  // none: this module dependencies are resolved by the description provider HOC (checks user has rights before showing
  // the option)
]

/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  attributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  collectionAttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  dataAttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  datasetAttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  uiSettingsActions.getDependency(RequestVerbEnum.GET),
]

export default {
  user,
  admin,
}
