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

import values from 'lodash/values'

export const FEM_REQUESTS_PROPERTIES_ENUM = {
  REFERENCING_REQUESTS: 'referencingRequests',
  DELETE_REQUESTS: 'deleteRequests',
  DENIED_REFERENCING_REQUESTS: 'deniedReferencingRequests',
  UPDATE_REQUESTS: 'updateRequests',
  NOTIFY_REQUESTS: 'notifyRequests',
  REQUESTS_ERRORS: 'requestsErrors',
}

export const FEM_REQUESTS_PROPERTIES = values(FEM_REQUESTS_PROPERTIES_ENUM)

export const FEM_PRODUCTS_PROPERTIES_ENUM = {
  REFERENCED_PRODUCTS: 'referencedProducts',
  DELETED_PRODUCTS: 'deletedProducts',
  UPDATED_PRODUCTS: 'updatedProducts',
  NOTIFY_PRODUCTS: 'notifyProducts',
}

export const FEM_PRODUCTS_PROPERTIES = values(FEM_PRODUCTS_PROPERTIES_ENUM)
