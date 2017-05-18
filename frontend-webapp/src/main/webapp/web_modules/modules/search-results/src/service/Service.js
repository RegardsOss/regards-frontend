/**
* LICENSE_PLACEHOLDER
**/

/**
 * A common service API for front end services
 */
export default class Service {

  /**
   * Constructor
   * @param label service label
   * @param icon service icon (if any)
   * @param dynamicParameters (optional) ServiceParameter array
   */
  constructor(label, icon, dynamicParameters = []) {
    this.label = label
    this.icon = icon
    this.dynamicParameters = dynamicParameters
  }

}
