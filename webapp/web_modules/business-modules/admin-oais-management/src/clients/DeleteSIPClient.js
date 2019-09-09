/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { IngestClient } from '@regardsoss/client'

/**
 * Redux SIP middleware instance  SIP relaunch
 * @author Kévin Picart
 */

const namespace = 'admin-oais-management/delete-sip'
export const deleteSIPsActions = new IngestClient.DeleteSIPsActions(namespace)
export const deleteSIPsReducer = IngestClient.getDeleteSIPsReducer(namespace)
export const deleteSIPsSelectors = IngestClient.getDeleteSIPsSelectors(['admin', 'acquisition', 'oais', 'delete-sip'])
