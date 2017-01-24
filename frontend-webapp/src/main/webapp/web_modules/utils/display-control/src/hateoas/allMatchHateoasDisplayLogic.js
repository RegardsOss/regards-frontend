/**
 * LICENSE_PLACEHOLDER
 **/
import { every, includes } from 'lodash'

/**
 * A Display Controller is a pure function which implements the logic for
 * displaying or not the passed React component.
 *
 * With this HATEOAS "all match" strategy, all required endpoint must be found in the available endpoints in order to
 * accept the the display.
 *
 * @param {String[]} requiredEndpoints The array of endpoints we require in order the component to display
 * @param {String[]} availableEndpoints The array of all available endpoints
 * @return {boolean}
 * @author Xavier-Alexandre Brochard
 */
const allMatchHateoasDisplayLogic = (requiredEndpoints, availableEndpoints) => (
  every(requiredEndpoints, requiredEndpoint => includes(availableEndpoints, requiredEndpoint))
)

export default allMatchHateoasDisplayLogic
