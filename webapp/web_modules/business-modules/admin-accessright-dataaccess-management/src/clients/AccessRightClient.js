/*
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
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Accessright entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'access-right']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/access-right'

const accessRightReducer = DataManagementClient.getAccessRightReducer(REDUX_ACTION_NAMESPACE)
const accessRightActions = new DataManagementClient.AccessRightActions(REDUX_ACTION_NAMESPACE)
const accessRightSelectors = DataManagementClient.getAccessRightSelectors(ENTITIES_STORE_PATH)


module.exports = {
  accessRightReducer,
  accessRightActions,
  accessRightSelectors,
}