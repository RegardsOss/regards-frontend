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

import values from 'lodash/values'

export const DATA_PROVIDER_FILES_PROPERTIES_ENUM = {
  FILES_ACQUIRED: 'filesAcquired',
  FILES_INVALID: 'filesInvalid',
}

export const DATA_PROVIDER_FILES_PROPERTIES = values(DATA_PROVIDER_FILES_PROPERTIES_ENUM)

export const DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM = {
  GENERATED_PRODUCTS: 'generatedProducts',
  INCOMPLETE: 'incomplete',
  INVALID: 'invalid',
  PRODUCTS_ERRORS: 'productsErrors',
  PRODUCTS_CANCELED: 'productsCanceled',
}

export const DATA_PROVIDER_PRODUCTS_PROPERTIES = values(DATA_PROVIDER_PRODUCTS_PROPERTIES_ENUM)
