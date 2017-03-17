/**
* LICENSE_PLACEHOLDER
**/
import BasicPageableSelectors from '../pageable/BasicPageableSelectors'

export default class extends BasicPageableSelectors {
  /**
   * @param {*} state redux state
   * @returns {* | undefined} facets for the current result
   */
  getFacets(state) {
    return this.uncombineStore(state).metadata
  }

}
