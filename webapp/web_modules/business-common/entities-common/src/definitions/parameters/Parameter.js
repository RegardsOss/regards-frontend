/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export class Parameter {
  static EditorTypes = {
    // Boolean editor
    CHECKBOX: 'CHECKBOX',
    // Editor for bounded inputs (admin set up the choices, input is constrained)
    CHOICE: 'CHOICE',
    // Editor for date inputs
    DATE_SELECTOR: 'DATE_SELECTOR',
    // Editor for parsed or free inputs
    TEXTFIELD: 'TEXTFIELD',
  }

  /**
   * Builds a boolean editor
   * @param {string} name field name
   * @param {string|boolean} defaultValue default value (optional)
   * @param {boolean} required is field required
   * @param {string} label optional label (defaults to name when not specified)
   */
  static buildBooleanEditor(name, defaultValue, required, label, description) {
    return new Parameter(Parameter.EditorTypes.CHECKBOX, name, defaultValue, null, null, required, label, description) // always provided due to edition system
  }

  /**
   * Builds a choice editor
   * @param {string} name field name
   * @param {string} defaultValue default value (optional)
   * @param {Array<string>} choices available choices
   * @param {boolean} required is field required
   * @param {string} label optional label (defaults to name when not specified)
   */
  static buildChoiceEditor(name, defaultValue, choices, required, label, description) {
    return new Parameter(Parameter.EditorTypes.CHOICE, name, defaultValue, choices, null, required, label, description) // always provided due to edition system
  }

  /**
   * Builds a date editor
   * @param {string} name field name
   * @param {string} defaultValue default value (optional)
   * @param {boolean} required is field required
   * @param {string} label optional label (defaults to name when not specified)
   */
  static buildDateEditor(name, defaultValue, required, label, description) {
    return new Parameter(Parameter.EditorTypes.DATE_SELECTOR, name, defaultValue, null, null, required, label, description)
  }

  /**
   * Builds a text editor, validating input
   * @param {string} name field name
   * @param {string|boolean} defaultValue default value (optional)
   * @param {function} valueValidator value validator
   * @param {boolean} required is field required
   * @param {string} label optional label (defaults to name when not specified)
   */
  static buildTextEditor(name, defaultValue, valueValidator, required, label, description) {
    return new Parameter(Parameter.EditorTypes.TEXTFIELD, name, defaultValue, null, valueValidator, required, label, description)
  }

  /**
   * constructor
   * @param {string} editorType editor type, conditions other parameters
   * @param {string} name field name, required
   * @param {string|boolean} defaultValue default value, when it can be computed
   * @param {Array<string>} choices value choices when in choice type
   * @param {function} valueValidator value validator for the form (used only by text fields)
   * @param {boolean} required is the parameter required? (automatically prevents the user from applying with empty values)
   * @param {string}label field label, optional (if not specified, defaults to name)
   * @param {string} description field description
   */
  constructor(editorType, name, defaultValue, choices, valueValidator, required, label, description) {
    this.editorType = editorType
    this.name = name
    this.defaultValue = defaultValue
    this.choices = choices
    this.valueValidator = valueValidator
    this.required = required
    this.label = label || name
    this.description = description
  }
}
