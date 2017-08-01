/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/

/**
 * Parameter model for edition. It provides helper to use instead of the constructor
 * @author Raphaël Mechali
 */
class Parameter {

  static EditorTypes = {
    // Boolean editor
    CHECKBOX: 'CHECKBOX',
    // Editor for bounded inputs (admin set up the choices, input is constrained)
    CHOICE: 'CHOICE',
    // Editor for parsed or free inputs
    TEXTFIELD: 'TEXTFIELD',
  }

  static buildBooleanEditor(name, defaultValue, required) {
    return new Parameter(Parameter.EditorTypes.CHECKBOX, name, defaultValue, null, null, required) // always provided due to edition system
  }

  static buildChoiceEditor(name, defaultValue, choices, required) {
    return new Parameter(Parameter.EditorTypes.CHOICE, name, defaultValue, choices, null, required) // always provided due to edition system
  }

  static buildTextEditor(name, defaultValue, valueValidator, required) {
    return new Parameter(Parameter.EditorTypes.TEXTFIELD, name, defaultValue, null, valueValidator, required)
  }


  /**
   * constructor
   * @param editorType editor type, conditions other parameters
   * @param name field name, required
   * @param defaultValue default value, when it can be computed
   * @param choices value choices when in choice type
   * @param valueValidator value validator for the form (used only by text fields). Note: missing values, when required,
   * are automatically validated
   * @param required is the parameter required? (automatically prevents the user from applying with empty values)
   */
  constructor(editorType, name, defaultValue, choices, valueValidator, required) {
    this.editorType = editorType
    this.name = name
    this.defaultValue = defaultValue
    this.choices = choices
    this.valueValidator = valueValidator
    this.required = required
  }

}

export default {
  Parameter,
}
