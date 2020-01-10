/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Validates a JSON objects
 * @author Raphaël Mechali
 */

/**
 * Source code from:https://github.com/facebook/react/issues/5676  (workaround for recursive structures)
 */
function lazyFunction(f, ...args) {
  return function () {
    return f().apply(this, args)
  }
}

/** Recursive JSON definition */
export const JSONObject = PropTypes.objectOf(
  PropTypes.oneOfType([
    // Simple values
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    // lazy evaluated recursive structure
    lazyFunction(() => JSONObject),
  ]),
)
