/**
 * LICENSE_PLACEHOLDER
 **/
import reduce from 'lodash/reduce'
import every from 'lodash/every'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'

/**
 * A Display Controller is a pure function which implements the logic for
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
 * @author Xavier-Alexandre Brochard
 */
const someListMatchHateoasDisplayLogic = (arrayOfrequiredEndpoints, availableEndpoints) =>
  reduce(arrayOfrequiredEndpoints, (result, requiredEndpoints) => result || every(requiredEndpoints, item => (includes(availableEndpoints, item))) || isEmpty(requiredEndpoints), false)

export default someListMatchHateoasDisplayLogic
