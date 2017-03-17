/**
* LICENSE_PLACEHOLDER
**/
import BasicPageableActions from '../pageable/BasicPageableActions'

/**
 * Actions that are pageable and expose 'facets' field (same level than page metadata)
 */
class BasicFacetsPageableActions extends BasicPageableActions {

  constructor(options) {
    super(options)
    // rename actions to get correct logs
    this.ENTITY_LIST_REQUEST = `${options.namespace}/FACETS_PAGEABLE_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/FACETS_PAGEABLE_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/FACETS_PAGEABLE_LIST_FAILURE`
  }

  /**
    * Normalizes action payload as page or list payload
    * @param json JS object parsed from JSON result
    * @return normalized content
    */
  normalizeEntitiesPagePayload(json) {
    return {
      // let parent provide its content
      ...super.normalizeEntitiesPagePayload(json),
      // add facets
      facets: json.facets,
    }
  }

}

export default BasicFacetsPageableActions
