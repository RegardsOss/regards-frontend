/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * FCUD : Fetch Create Update Delete project user client
 */
import { AccessProjectClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/project-user-fcud'

export const projectUserFCUDActions = new AccessProjectClient.ProjectUserFCUDActions(namespace)
export const projectUserFCUDReducer = AccessProjectClient.getProjectUserFCUDReducer(namespace)
export const projectUserFCUDSelectors = AccessProjectClient.getProjectUserFCUDSelectors(['admin', 'user-management', 'project-user-management', 'projectUserFCUD'])
