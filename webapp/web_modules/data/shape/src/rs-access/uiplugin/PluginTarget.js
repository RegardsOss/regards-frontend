/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { SearchContext } from '../../rs-catalog/SearchContext'
import { Entity } from '../../rs-catalog/entity/Entity'

/**
 * Plugin service target shape
 * Note: if the entity passed is invalid, the error
 *      Error: Warning: Failed prop type: Invalid prop `target` supplied to `ExampleContainer`
 * would mean one subkey is failing validation
 * @author Raphaël Mechali
 */
export const OneElementTarget = PropTypes.shape({
  type: PropTypes.oneOf([AccessDomain.RuntimeTargetTypes.ONE]).isRequired, // enumerated type
  searchContext: SearchContext.isRequired,
  entitiesCount: PropTypes.number.isRequired,
  entityType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
  entity: Entity.isRequired,
})

export const SelectionTarget = PropTypes.shape({
  type: PropTypes.oneOf([AccessDomain.RuntimeTargetTypes.MANY]), // enumerated type
  searchContext: SearchContext.isRequired,
  entitiesCount: PropTypes.number.isRequired,
  entityType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
  entities: PropTypes.arrayOf(Entity).isRequired, // entities list
})

export const QueryTarget = PropTypes.shape({
  type: PropTypes.oneOf([AccessDomain.RuntimeTargetTypes.QUERY]), // enumerated type
  searchContext: SearchContext.isRequired,
  entitiesCount: PropTypes.number.isRequired,
  entityType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
  excludedEntities: PropTypes.arrayOf(Entity).isRequired, // excluded entities list
})

export const PluginTarget = PropTypes.oneOfType([
  OneElementTarget,
  SelectionTarget,
  QueryTarget,
])
