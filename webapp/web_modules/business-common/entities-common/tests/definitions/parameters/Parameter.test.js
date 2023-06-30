/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { Parameter } from '../../../src/definitions/parameters/Parameter'

/**
* Test Parameter
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing Parameter', () => {
  it('should exists', () => {
    assert.isDefined(Parameter)
  })

  it('Should create a parameter correctly', () => {
    const fakeValidator = () => { }
    const p = new Parameter(Parameter.EditorTypes.CHECKBOX, 'x', 1, [1, 2, 3], fakeValidator, false, 'X')
    assert.isTrue(p instanceof Parameter, 'P should be a parameter')
    assert.equal(p.editorType, Parameter.EditorTypes.CHECKBOX, 'Instance editor type field should be correctly set')
    assert.equal(p.name, 'x', 'Instance editor name field should be correctly set')
    assert.equal(p.defaultValue, 1, 'Instance editor default value field should be correctly set')
    assert.deepEqual(p.choices, [1, 2, 3], 'Instance editor choices field should be correctly set')
    assert.equal(p.valueValidator, fakeValidator, 'Instance editor valueValidator field should be correctly set')
    assert.equal(p.required, false, 'Instance editor required field should be correctly set')
    assert.equal(p.label, 'X', 'Instance editor label field should be correctly set')
  })
  it('Should build a boolean editor correctly', () => {
    const p = Parameter.buildBooleanEditor('x', false, true, 'X')
    assert.isTrue(p instanceof Parameter, 'P should be a parameter')
    assert.equal(p.editorType, Parameter.EditorTypes.CHECKBOX, 'Instance editor type field should be correctly set')
    assert.equal(p.name, 'x', 'Instance editor name field should be correctly set')
    assert.equal(p.defaultValue, false, 'Instance editor default value field should be correctly set')
    assert.equal(p.choices, null, 'Instance editor choices field should be correctly set')
    assert.equal(p.valueValidator, null, 'Instance editor valueValidator field should be correctly set')
    assert.equal(p.required, true, 'Instance editor required field should be correctly set')
    assert.equal(p.label, 'X', 'Instance editor label field should be correctly set')
  })
  it('Should build a choice editor correctly', () => {
    const p = Parameter.buildChoiceEditor('x', 2, [1, 2, 3], false, 'X')
    assert.isTrue(p instanceof Parameter, 'P should be a parameter')
    assert.equal(p.editorType, Parameter.EditorTypes.CHOICE, 'Instance editor type field should be correctly set')
    assert.equal(p.name, 'x', 'Instance editor name field should be correctly set')
    assert.equal(p.defaultValue, 2, 'Instance editor default value field should be correctly set')
    assert.deepEqual(p.choices, [1, 2, 3], 'Instance editor choices field should be correctly set')
    assert.equal(p.valueValidator, null, 'Instance editor valueValidator field should be correctly set')
    assert.equal(p.required, false, 'Instance editor required field should be correctly set')
    assert.equal(p.label, 'X', 'Instance editor label field should be correctly set')
  })
  it('Should build a date editor correctly', () => {
    const p = Parameter.buildDateEditor('x', null, false, 'X')
    assert.isTrue(p instanceof Parameter, 'P should be a parameter')
    assert.equal(p.editorType, Parameter.EditorTypes.DATE_SELECTOR, 'Instance editor type field should be correctly set')
    assert.equal(p.name, 'x', 'Instance editor name field should be correctly set')
    assert.equal(p.defaultValue, null, 'Instance editor default value field should be correctly set')
    assert.equal(p.choices, null, 'Instance editor choices field should be correctly set')
    assert.equal(p.valueValidator, null, 'Instance editor valueValidator field should be correctly set')
    assert.equal(p.required, false, 'Instance editor required field should be correctly set')
    assert.equal(p.label, 'X', 'Instance editor label field should be correctly set')
  })
  it('Should build a text editor correctly', () => {
    const validator = () => { }
    const p = Parameter.buildTextEditor('x', 'abc', validator, true, 'X')
    assert.isTrue(p instanceof Parameter, 'P should be a parameter')
    assert.equal(p.editorType, Parameter.EditorTypes.TEXTFIELD, 'Instance editor type field should be correctly set')
    assert.equal(p.name, 'x', 'Instance editor name field should be correctly set')
    assert.equal(p.defaultValue, 'abc', 'Instance editor default value field should be correctly set')
    assert.equal(p.choices, null, 'Instance editor choices field should be correctly set')
    assert.equal(p.valueValidator, validator, 'Instance editor valueValidator field should be correctly set')
    assert.equal(p.required, true, 'Instance editor required field should be correctly set')
    assert.equal(p.label, 'X', 'Instance editor label field should be correctly set')
  })
})
