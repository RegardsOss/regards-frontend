/**
 * LICENSE_PLACEHOLDER
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
const hateoasDisplayLogic = (hateoasKey, entityLinks, isInstance, alwaysDisplayforInstanceUser) =>
  ((isInstance && alwaysDisplayforInstanceUser) || (!entityLinks && !hateoasKey) || some(entityLinks, entity => entity.rel === hateoasKey))


export default hateoasDisplayLogic
