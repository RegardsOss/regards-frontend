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
 */

/**
 * Index for all fem microservice clients.
 * @author Théo Lasserre
 */
export { default as ReferenceActions } from './reference/ReferenceActions'
export { default as getReferenceReducer } from './reference/ReferenceReducer'
export { default as getReferenceSelectors } from './reference/ReferenceSelectors'

export { default as ReferenceDeleteActions } from './reference/ReferenceDeleteActions'
export { default as getReferenceDeleteReducer } from './reference/ReferenceDeleteReducer'
export { default as getReferenceDeleteSelectors } from './reference/ReferenceDeleteSelectors'

export { default as ReferenceNotifyActions } from './reference/ReferenceNotifyActions'
export { default as getReferenceNotifyReducer } from './reference/ReferenceNotifyReducer'
export { default as getReferenceNotifySelectors } from './reference/ReferenceNotifySelectors'

export { default as RequestDeleteActions } from './request/RequestDeleteActions'
export { default as getRequestDeleteReducer } from './request/RequestDeleteReducer'
export { default as getRequestDeleteSelectors } from './request/RequestDeleteSelectors'

export { default as RequestForceErrorActions } from './request/RequestForceErrorActions'

export { default as RequestRetryActions } from './request/RequestRetryActions'
export { default as getRequestRetryReducer } from './request/RequestRetryReducer'
export { default as getRequestRetrySelectors } from './request/RequestRetrySelectors'

export { default as RequestActions } from './request/RequestActions'
export { default as getRequestReducer } from './request/RequestReducer'
export { default as getRequestSelectors } from './request/RequestSelectors'

export { default as ExtractionRequestRetryActions } from './request/ExtractionRequestRetryActions'
export { default as getExtractionRequestRetryReducer } from './request/ExtractionRequestRetryReducer'
export { default as getExtractionRequestRetrySelectors } from './request/ExtractionRequestRetrySelectors'

export { default as SettingsActions } from './settings/SettingsActions'
export { default as getSettingsReducer } from './settings/SettingsReducer'
export { default as getSettingsSelectors } from './settings/SettingsSelectors'
