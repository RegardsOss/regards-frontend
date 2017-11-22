/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import getAbstractEntityDescription from './getAbstractEntityDescription'
import getFullQualifiedAttributeName from './getFullQualifiedAttributeName'
import { ENTITY_TYPES, ENTITY_TYPES_ENUM } from './EntityTypes'

import MODEL_ATTR_TYPES from './ModelAttrTypes'
import FRAGMENT_NONE from './FragmentNone'
import AttributeModelController from './AttributeModelController'
import {
  ATTRIBUTE_MODEL_RESTRICTIONS_TYPES,
  ATTRIBUTE_MODEL_RESTRICTIONS_ENUM,
} from './AttributeModelResctrictionEnum'

import DATASOURCE_REFRESH_RATE from './DatasourceRefreshRate'

module.exports = {
  getAbstractEntityDescription,
  getFullQualifiedAttributeName,

  ENTITY_TYPES,
  ENTITY_TYPES_ENUM,

  ATTRIBUTE_MODEL_RESTRICTIONS_TYPES,
  ATTRIBUTE_MODEL_RESTRICTIONS_ENUM,

  MODEL_ATTR_TYPES,

  FRAGMENT_NONE,
  DEFAULT_FRAGMENT: FRAGMENT_NONE,

  AttributeModelController,

  DATASOURCE_REFRESH_RATE,
}
