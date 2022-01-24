/*
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
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Retrieve group & user count.
 *
 * @author Théo Lasserre
 */
const ENTITIES_STORE_PATH = ['admin', 'dataaccess', 'access-group-management', 'groups-count']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-accessgroup-count-management'

export const groupsCountReducer = AdminClient.getGroupsCountReducer(REDUX_ACTION_NAMESPACE)
export const groupsCountActions = new AdminClient.GroupsCountActions(REDUX_ACTION_NAMESPACE)
export const groupsCountSelectors = AdminClient.getGroupsCountSelectors(ENTITIES_STORE_PATH)
