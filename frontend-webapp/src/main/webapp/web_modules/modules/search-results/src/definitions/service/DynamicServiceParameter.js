/**
* LICENSE_PLACEHOLDER
**/


/**
 * A dynamic service parameter definition
 */
export default class DynamicServiceParameter {

  /** possible UI PluginConf parmeter types (model should not be imported) */
  static ParameterType = {
    STRING: 'string',
    NUMBER: 'numerical',
    DATE: 'temporal',
    CHOICE: 'choice', // runtime type only: a string with choices
  }

  constructor(name, type, required, id = null, choices = []) {
    this.id = id
    this.type = type
    this.name = name
    this.required = required
    this.choices = choices
  }

}

