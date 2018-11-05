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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataAttributeModelActions } from './clients/DataobjectAttributeModelClient'
import { DatasetAttributeModelActions } from './clients/DatasetAttributeModelClient'
import { DocumentAttributeModelActions } from './clients/DocumentAttributeModelClient'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  // none: displayed directly by the module to show appropriate messages
]

/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  DataAttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  DatasetAttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  DocumentAttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
