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
import { WorkerDomain } from '@regardsoss/domain'

/**
  * @author Théo Lasserre
  */
export const tableSelectionData = [{
  content: {
    id: 0,
    requestId: 'requestId0',
    creationDate: '2021-11-09T23:00:00.229Z',
    contentType: 'contentType0',
    source: 'source0',
    session: 'session0',
    status: WorkerDomain.REQUEST_STATUS_ENUM.DISPATCHED,
    dispatchedWorkerType: 'dispatchedWorkerType0',
    error: 'error0',
  },
  links: [
    {
      rel: 'retry',
    },
    {
      rel: 'delete',
    },
  ],
}]
