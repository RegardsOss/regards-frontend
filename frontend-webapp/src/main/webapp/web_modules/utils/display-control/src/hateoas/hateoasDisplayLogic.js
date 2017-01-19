/**
 * LICENSE_PLACEHOLDER
 **/
import { every, includes } from 'lodash'

/**
 * A Display Controller is a pure function which implements the logic for
 * displaying or not the passed React component.
 *
 * For HATEOAS, all required endpoints must be found in the provided available.
 *
 * @param {String[]} requiredEndpoints The array of endpoints we require in order the component to display
 * @param {String[]} availableEndpoints The array of all available endpoints
 * @return {boolean}
 * @author Xavier-Alexandre Brochard
 */
const hateoasDisplayLogic = (requiredEndpoints, availableEndpoints) => (
  every(requiredEndpoints, requiredEndpoint => includes(availableEndpoints, requiredEndpoint))
)

export default hateoasDisplayLogic
