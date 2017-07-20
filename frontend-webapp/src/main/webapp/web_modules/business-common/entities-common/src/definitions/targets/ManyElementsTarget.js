/**
* LICENSE_PLACEHOLDER
**/

/**
 * Runtime target for many elements service
 */
class ManyElementsTarget {

  /**
   * Constructor
   * @param {*} toggledElements toggled elements array
   * @param {*} isInclusive is toggled elements array inclusive.
   * @param {*} initialRequest if toggled elements is exclusive, search request to obtain all selected objets (useless when inclusive)
   */
  constructor(toggledElements, isInclusive, initialRequest = null) {
    this.toggledElements = toggledElements
    this.isInclusive = isInclusive
    this.initialRequest = initialRequest
  }

}

export default {
  ManyElementsTarget,
}
