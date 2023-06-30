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
import reduce from 'lodash/reduce'
import every from 'lodash/every'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'

/**
 * A display logic is a pure function which implements the logic for
 * displaying or not the passed React component.
 *
 * With this HATEOAS "some list match" strategy, at least one list of required endpoints must match all required endpoints from the available endpoints in
 * order to accept the the display.
 *
 * example : [['endpoint1'],['endpont2','endpoint3']]
 *           To display you need (endpoint1) or (endpoint2 and endpoint3)
 *
 * @param {String[]} requiredEndpoints The array of endpoints we require in order the component to display
 * @param {String[]} availableEndpoints The array of all available endpoints
 * @return {boolean}
 * @author Sébastien Binda
 */
const someListMatchHateoasDisplayLogic = (arrayOfrequiredEndpoints, availableEndpoints) => reduce(arrayOfrequiredEndpoints, (result, requiredEndpoints) => result || every(requiredEndpoints, (item) => (includes(availableEndpoints, item))) || isEmpty(requiredEndpoints), false)

export default someListMatchHateoasDisplayLogic
