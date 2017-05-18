/**
* LICENSE_PLACEHOLDER
**/

/**
 * A dynamic service parameter definition
 */
export default class DynamicServiceParameter {

  constructor(name, required, id = null, choices = []) {
    this.id = id || name
    this.name = name
    this.required = required
    this.choices = choices
  }

  isTextParameter() {
    // edit as text when there is no name
    return !this.choices.length
  }

}

