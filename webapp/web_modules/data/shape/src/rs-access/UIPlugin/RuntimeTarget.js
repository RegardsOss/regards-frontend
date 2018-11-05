/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RuntimeTargetTypes } from '@regardsoss/domain/access'


/**
 * Shapes that describe the application target provided to an UI plugin RUNTIME instance.
 * @author Raphaël Mechali
 */
const oneEntityTarget = PropTypes.shape({
  type: PropTypes.oneOf([RuntimeTargetTypes.ONE]).isRequired,
  entity: PropTypes.string.isRequired, // entity ID (URN)
  entitiesCount: PropTypes.number.isRequired, // total count of entities
  // method to build fetch action: () => [dispatchable action object] that should resolve with an entity wrapped in { content: <entity>, links: <links> }
  getFetchAction: PropTypes.func.isRequired,
  // method to apply a treatment on each entity (applier: func, initValue: *) => Promise. The promise will resolve with the applier result
  // the applier has a reducer shape: (accumulator, entity: <entity unwrapped> )
  getReducePromise: PropTypes.func.isRequired,
})
const manyEntitiesTarget = PropTypes.shape({
  type: PropTypes.oneOf([RuntimeTargetTypes.MANY]).isRequired,
  entities: PropTypes.arrayOf(PropTypes.string).isRequired, // entities ID array (URN)
  entitiesCount: PropTypes.number.isRequired, // total count of entities
  // method to build fetch action: (entityId) => [dispatchable action object]
  getFetchAction: PropTypes.func.isRequired,
  // method to apply a treatment on each entity (dispatchMethod: func, applier: func, initValue: *) => Promise (see comment above)
  getReducePromise: PropTypes.func.isRequired,
})
const queryTarget = PropTypes.shape({
  type: PropTypes.oneOf([RuntimeTargetTypes.QUERY]).isRequired,
  q: PropTypes.string.isRequired, // entities list
  entityType: PropTypes.oneOf(ENTITY_TYPES).isRequired,
  entitiesCount: PropTypes.number.isRequired, // total count of entities
  excludedIDs: PropTypes.arrayOf(PropTypes.string).isRequired, // excluded entities IDs (URN)
  // method to build fetch action: (pageIndex, pageSize) => [dispatchable action object]
  getFetchAction: PropTypes.func.isRequired,
  // method to apply a treatment on each entity (applier: func, initValue: (optional) *, pageSize: (optional) number) => Promise (see comment above)
  getReducePromise: PropTypes.func.isRequired,
})

export const RuntimeTarget = PropTypes.oneOfType([oneEntityTarget, manyEntitiesTarget, queryTarget])
