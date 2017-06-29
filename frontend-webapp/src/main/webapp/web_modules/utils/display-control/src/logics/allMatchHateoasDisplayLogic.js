/**
 * LICENSE_PLACEHOLDER
 **/
import every from 'lodash/every'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'

/**
 * A display logic is a pure function which implements the logic for
 * displaying or not the passed React component.
 *
 * With this HATEOAS "all match" strategy, all required endpoint must be found in the available endpoints in order to
 * accept the the display.
 *
 * @param {String[]} requiredEndpoints The array of endpoints as "resource@verb" strings we require in order to allow the component to display
 * @param {String[]} availableEndpoints The array of all available endpoints as "resource@verb" strings
 * @return {boolean}
 * @author Xavier-Alexandre Brochard
 */
const allMatchHateoasDisplayLogic = (requiredEndpoints, availableEndpoints) =>
  every(requiredEndpoints, item => (includes(availableEndpoints, item))) || isEmpty(requiredEndpoints)


export default allMatchHateoasDisplayLogic
