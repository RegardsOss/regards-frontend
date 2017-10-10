/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'

const DATASET_TYPE_URL = 'datasets'
const COLLECTION_TYPE_URL = 'collections'
const typeToURL = {
  [ENTITY_TYPES_ENUM.COLLECTION]: `${STATIC_CONF.MSERVICES.DAM}/${COLLECTION_TYPE_URL}`,
  [ENTITY_TYPES_ENUM.DATASET]: `${STATIC_CONF.MSERVICES.CATALOG}/${DATASET_TYPE_URL}`,
}

/**
   * Returns download URL, for both direct download or partial (ie: with path replacement). Each variable that is not provided is
   * replaced with pathVariable like {VAR_NAME}. It does not take into account the authentication state (added by getDirectDownloadURL)
   * @param entityType object type URL, one of DATASET_TYPE_URL or COLLECTION_TYPE_URL (none for path variable)
   * @param id: entity id (none for path variable)
   * @return download URL
   */
const getDownloadURL = (entityType, id = '{id}') =>
  `${GATEWAY_HOSTNAME}/${API_URL}/${typeToURL[entityType]}/${id}/file`

/**
 * This module provides common variables to access file description downloads
 */
export default {
  MARKDOWN_MIMETYPE: 'text/markdown', // warn: no mime type standard, most commonly accepted type
  /**
   * Returns the relative path to download file for entity type as parameter, or undefined if the entity type as parameter
   * has no description file
   * @param entityType entity type
   * @return found download URL part or undefined
   */
  getEntityTypeDownloadURLPart: entityType => typeToURL[entityType],

  /**
   * Returns download URL for actions (that provide ID later and do not require authentication)
   * @param entityType: entity type (collection or dataset, from CatalogEntityType)
   * @return action download URL for description file
   */
  getActionDownloadURL: entityType => getDownloadURL(entityType),

  /**
   * Direct download URL, to be used for instance by inner frame. It adds the authentication information
   * @param entityType: entity type (collection or dataset, from CatalogEntityType)
   * @param id entity ID
   * @param token
   * @return action download URL for description file
   */
  getDirectDownloadURL: (entityType, id, token) => {
    const downloadURL = getDownloadURL(entityType, id)
    // add request origin for X-Frame-Options bypass. WARN: bad security workaround
    const requestOrigin = `${root.location.protocol}//${root.location.host}`
    return encodeURI(`${downloadURL}?origin=${requestOrigin}${token ? `&token=${token}` : ''}`)
  },


}
