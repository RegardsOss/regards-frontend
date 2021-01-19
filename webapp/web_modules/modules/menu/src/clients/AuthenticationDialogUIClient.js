/*
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
 */
import { UIClient } from '@regardsoss/client'

/**
 * Client to manage common authentication dialog. No reducer, the reducer is registered by the global user module.
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['user', 'authenticationDialog']
const REDUX_ACTION_NAMESPACE = 'user-authentication-dialog'

export const authenticationDialogActions = new UIClient.AuthenticationDialogActions(REDUX_ACTION_NAMESPACE)
export const authenticationDialogSelectors = UIClient.getAuthenticationDialogSelectors(ENTITIES_STORE_PATH)
