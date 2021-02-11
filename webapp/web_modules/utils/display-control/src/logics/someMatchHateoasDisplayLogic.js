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
import some from 'lodash/some'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'

/**
 * A display logic is a pure function which implements the logic for
 * displaying or not the passed React component.
 *
 * With this HATEOAS "some match" strategy, at least one required endpoint must be found in the available endpoints in
 * order to accept the the display.
 *
 * @param {String[]} requiredEndpoints The array of endpoints we require in order the component to display
 * @param {String[]} availableEndpoints The array of all available endpoints
 * @return {boolean}
 * @author Xavier-Alexandre Brochard
 */
const someMatchHateoasDisplayLogic = (requiredEndpoints, availableEndpoints) => (
  some(requiredEndpoints, (requiredEndpoint) => includes(availableEndpoints, requiredEndpoint)) || isEmpty(requiredEndpoints)
)

export default someMatchHateoasDisplayLogic
