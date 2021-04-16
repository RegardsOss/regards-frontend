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

export { default as RequestRetryActions } from './request/RequestRetryActions'
export { default as getRequestRetryReducer } from './request/RequestRetryReducer'
export { default as getRequestRetrySelectors } from './request/RequestRetrySelectors'

export { default as ExtractionRequestActions } from './request/ExtractionRequestActions'
export { default as getExtractionRequestReducer } from './request/ExtractionRequestReducer'
export { default as getExtractionRequestSelectors } from './request/ExtractionRequestSelectors'

export { default as CreationRequestActions } from './request/CreationRequestActions'
export { default as getCreationRequestReducer } from './request/CreationRequestReducer'
export { default as getCreationRequestSelectors } from './request/CreationRequestSelectors'

export { default as UpdateRequestActions } from './request/UpdateRequestActions'
export { default as getUpdateRequestReducer } from './request/UpdateRequestReducer'
export { default as getUpdateRequestSelectors } from './request/UpdateRequestSelectors'

export { default as DeleteRequestActions } from './request/DeleteRequestActions'
export { default as getDeleteRequestReducer } from './request/DeleteRequestReducer'
export { default as getDeleteRequestSelectors } from './request/DeleteRequestSelectors'

export { default as NotificationRequestActions } from './request/NotificationRequestActions'
export { default as getNotificationRequestReducer } from './request/NotificationRequestReducer'
export { default as getNotificationRequestSelectors } from './request/NotificationRequestSelectors'
