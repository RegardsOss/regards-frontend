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
import some from 'lodash/some'

/**
 * A display logic is a pure function which implements the logic for
 * displaying or not the passed React component.
 *
 * With this "hateoas"" strategy, a component should be displayed if:
 * - the hateoasKey can be found in the entityLinks
 * - the use is instance and the prop 'alwaysDisplayforInstanceUser' is true
 * - no entityLinks nor hateoasKey was given
 *
 * @return {boolean}
 * @author Xavier-Alexandre Brochard
 */
const hateoasDisplayLogic = (hateoasKey, entityLinks, isInstance, alwaysDisplayforInstanceUser) => ((isInstance && alwaysDisplayforInstanceUser) || (!entityLinks && !hateoasKey) || some(entityLinks, (entity) => entity.rel === hateoasKey))

export default hateoasDisplayLogic
