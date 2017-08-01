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
import { ENTITY_TYPES } from '@regardsoss/domain/dam'
import { TargetTypes } from '../definitions/ServiceTarget'

/**
 * Service target shape definition
 * @author Raphaël Mechali
 */

const ONE_ELEMENT_TARGET = PropTypes.shape({
  type: PropTypes.oneOf([TargetTypes.ONE]).isRequired, // enumerated type
  entity: PropTypes.string.isRequired, // entity IP ID
})

const MANY_ELEMENTS_TARGET = PropTypes.shape({
  type: PropTypes.oneOf([TargetTypes.MANY]), // enumerated type
  entities: PropTypes.arrayOf(PropTypes.string).isRequired, // entities list
})

const QUERY_ELEMENTS_TARGET = PropTypes.shape({
  type: PropTypes.oneOf([TargetTypes.QUERY]), // enumerated type
  q: PropTypes.string.isRequired, // entities list
  entityType: PropTypes.oneOf(ENTITY_TYPES).isRequired,
})

const ServiceTargetShape = PropTypes.oneOfType([
  ONE_ELEMENT_TARGET,
  MANY_ELEMENTS_TARGET,
  QUERY_ELEMENTS_TARGET,
])


export default {
  ServiceTargetShape,
}
