/**
 * LICENSE_PLACEHOLDER
 **/


import values from 'lodash/values'

/**
 * List of possible types for entities
 * @type {{COLLECTION: string, DATASET: string, DOCUMENT: string, DATAOBJECT: string}}
 */
const ENTITY_TYPES_ENUM = {
  COLLECTION: 'COLLECTION',
  DATASET: 'DATASET',
  DOCUMENT: 'DOCUMENT',
  DATA: 'DATA',
}

/**
 * Return an array of Entity types
 */
const ENTITY_TYPES = values(ENTITY_TYPES_ENUM)


export default {
  ENTITY_TYPES,
  ENTITY_TYPES_ENUM,
}
