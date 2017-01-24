/**
 * LICENSE_PLACEHOLDER
 **/
import { some, includes } from 'lodash'

/**
 * A Display Controller is a pure function which implements the logic for
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
  some(requiredEndpoints, requiredEndpoint => includes(availableEndpoints, requiredEndpoint))
)

export default someMatchHateoasDisplayLogic
