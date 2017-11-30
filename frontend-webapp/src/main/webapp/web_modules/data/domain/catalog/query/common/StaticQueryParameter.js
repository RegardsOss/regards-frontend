/**
* LICENSE_PLACEHOLDER
**/

/**
 * A static query parameter model (sometimes used for backend computed URL parts)
 */
export default class StaticQueryParameter {
  constructor(text = '') {
    this.text = text
  }

  /**
   * Returns query string for this parameter or empty string if this parameter has no value
   * @return query parameter string or empty string if it has no value
   */
  toQueryString() {
    return this.text || ''
  }
}
