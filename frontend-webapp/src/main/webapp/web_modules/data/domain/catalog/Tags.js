/**
* LICENSE_PLACEHOLDER
**/
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'

/** URN tag pattern */
const URN_PATTERN = /^URN:/

/** Is an URN tag?
 * @param tag tag
 * @return true if tag is an URN, false otherwise
 */
export function isURNTag(tag) {
  return URN_PATTERN.test(tag)
}

/**
 * Locally defined tag types: a simple word or any entity type
 */
export const TagTypes = {
  WORD: 'tag.word',
  ...ENTITY_TYPES_ENUM,
}
