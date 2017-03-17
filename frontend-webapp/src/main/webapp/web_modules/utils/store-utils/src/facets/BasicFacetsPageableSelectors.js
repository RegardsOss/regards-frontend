/**
* LICENSE_PLACEHOLDER
**/
import BasicPageableSelectors from '../pageable/BasicPageableSelectors'

class BasicFacetsPageableSelectors extends BasicPageableSelectors {
  /**
   * @param {*} state redux state
   * @returns {* | undefined} facets for the current result
   */
  getFacets(state) {
    return this.uncombineStore(state).metadata
  }

}

export default BasicFacetsPageableSelectors
