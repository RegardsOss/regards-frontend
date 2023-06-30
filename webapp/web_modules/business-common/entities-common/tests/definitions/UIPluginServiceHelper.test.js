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
import isDate from 'lodash/isDate'
import { AccessDomain } from '@regardsoss/domain'
import {
  resolveParameter, resolveParameters, packRuntimeConfiguration,
} from '../../src/definitions/UIPluginServiceHelper'
import { Parameter } from '../../src/definitions/parameters/Parameter'

/**
* Test  UIPluginServiceHelper
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing UIPluginServiceHelper', () => {
  // test basic types without pre-entered choices and check field model
  const basicTypesTests = [
    {
      type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL, correspondingFieldType: Parameter.EditorTypes.CHECKBOX, name: 'field1', label: 'label 1',
    },
    {
      type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, name: 'field2', validator: true, label: 'label 2', required: true,
    },
    { type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE, correspondingFieldType: Parameter.EditorTypes.DATE_SELECTOR, defaultValue: '1994-11-05T08:15:30-05:00 ' },
    { type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    { type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    { type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD },
  ]
  basicTypesTests.map(({
    type, correspondingFieldType, validator = false, name = 'common.field', defaultValue = null, label = 'common.label', required = false,
  }) => it(`should convert correctly a basic type "${type}" parameter`, () => {
    const resolved = resolveParameter(name, defaultValue, { label, type, required })
    assert.isNotNull(resolved, 'the parameter should be converted')
    assert.equal(resolved.name, name, 'The parameter name should be correctly reported')
    assert.equal(resolved.label, label, 'The parameter name should be correctly reported')
    assert.equal(resolved.editorType, correspondingFieldType, 'The parameter editor type is erroneous')
    assert.equal(resolved.defaultValue, defaultValue, 'The parameter default value is erroneous')
    assert.equal(resolved.required, required, 'The parameter required value is erroneous')
    if (validator) {
      assert.isNotNull(resolved.valueValidator, 'There should be a validator')
    } else {
      assert.isNull(resolved.valueValidator, 'There should be no validator')
    }
  }))

  it('should fail converting unknown  types', () => {
    assert.throws(
      () => resolveParameter('x', null, { label: 'X', type: 'anything*', required: false }), Error,
      /.*/, 'Unknown type should\'nt be handled',
    )
  })
  it('should resolve only dynamic parameters and retrieve the admin value specified, if any', () => {
    // light plugin instance
    const pluginInstance = {
      info: {
        conf: {
          static: {
            p1: { label: 'P1', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: false },
            p2: { label: 'P2', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: true },
          },
          dynamic: { // those only shold be converted
            p3: { label: 'P3', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: false },
            p4: { label: 'P4', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL, required: true },
          },
        },
      },
    }
    // light plugin conf
    const pluginConf = {
      content: {
        conf: {
          dynamic: { p3: 'abc' },
        },
      },
    }
    const resolvedParameters = resolveParameters(pluginConf, pluginInstance)
    assert.lengthOf(resolvedParameters, 2, 'Only dynamic parameters should be retrieved')
    const resolvedP3 = resolvedParameters.find((p) => p.name === 'p3')
    assert.isDefined(resolvedP3, 'The dynamic parameter p3 should be defined')
    assert.equal(resolvedP3.label, 'P3', 'P3 label should be reported')
    assert.equal(resolvedP3.defaultValue, 'abc', 'P3 default value should be reported')
    const resolvedP4 = resolvedParameters.find((p) => p.name === 'p4')
    assert.isDefined(resolvedP4, 'The dynamic parameter p3 should be defined')
    assert.equal(resolvedP4.label, 'P4', 'P4 label should be reported')
    assert.equal(resolvedP4.defaultValue, null, 'P4 default value should be specified')
  })

  it('Should resolve runtime configuration, overriding the configuration values and ensuring types', () => {
    // light plugin instance
    const pluginInstance = {
      info: {
        conf: {
          static: { // admin configuration
            pStatic1: { label: 'P1', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL, required: false },
            pStatic2: { label: 'P2', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR, required: true },
            pStatic3: { label: 'P3', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE, required: true },
            pStatic4: { label: 'P4', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT, required: true },
            pStatic5: { label: 'P5', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT, required: true },
            pStatic6: { label: 'P6', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: true },
            // that one will be undefined
            pStatic7: { label: 'P7', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: false },
          },
          dynamic: { // those only shold be converted
            pDynamic1: { label: 'P1', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL, required: false },
            pDynamic2: { label: 'P2', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR, required: true },
            pDynamic3: { label: 'P3', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE, required: true },
            pDynamic4: { label: 'P4', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT, required: true },
            pDynamic5: { label: 'P5', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT, required: true },
            pDynamic6: { label: 'P6', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: true },
            // that one will be undefined
            pDynamic7: { label: 'P7', type: AccessDomain.UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING, required: false },
          },
        },
      },
    }
    // light plugin conf
    const pluginConf = {
      content: {
        conf: {
          static: {
            pStatic1: true, pStatic2: 'a', pStatic3: new Date(), pStatic4: 1.5, pStatic5: 42, pStatic6: 'Hello',
          },
          // this part SHOULD BE IGNORED (user changed values)
          dynamic: {
            pDynamic1: false, pDynamic2: 'b', pDynamic3: null, pDynamic4: 2.5, pDynamic7: 'Nope',
          },
        },
      },
    }
    const userValues = {
      pDynamic1: 'true', pDynamic2: 'a', pDynamic3: '1994-11-05T08:15:30-05:00', pDynamic4: '1.5', pDynamic5: 42, pDynamic6: 'Hello',
    }
    const resolved = packRuntimeConfiguration(pluginConf, pluginInstance, userValues)
    // test at same time values and types
    assert.deepEqual(resolved.static, pluginConf.content.conf.static, 'static configuration should be correctly reported') // no value conversion, that should be a strict equality

    // for dynamic values, make sure conversion was performed when required
    assert.isBoolean(resolved.dynamic.pDynamic1, 'The boolean parameter type should be enforced')
    assert.equal(resolved.dynamic.pDynamic1, true, 'The boolean value should be the one specified by user')

    assert.isString(resolved.dynamic.pDynamic2, 'The char parameter type should be enforced')
    assert.equal(resolved.dynamic.pDynamic2, 'a', 'The char value should be the one specified by user')

    assert.isTrue(isDate(resolved.dynamic.pDynamic3), 'The date parameter type should be enforced')
    assert.equal(
      resolved.dynamic.pDynamic3.getTime(), new Date('1994-11-05T08:15:30-05:00').getTime(),
      'The date value should be the one specified by user',
    )

    assert.isNumber(resolved.dynamic.pDynamic4, 'The float parameter type should be enforced')
    assert.equal(resolved.dynamic.pDynamic4, 1.5, 'The float value should be the one specified by user')

    assert.isNumber(resolved.dynamic.pDynamic5, 'The integer parameter type should be enforced')
    assert.equal(resolved.dynamic.pDynamic5, 42, 'The integer value should be the one specified by user')

    assert.isString(resolved.dynamic.pDynamic6, 'The string parameter type should be enforced')
    assert.equal(resolved.dynamic.pDynamic6, 'Hello', 'The string value should be the one specified by user')

    assert.isUndefined(resolved.dynamic.pDynamic7, 'The dynamic parameter 7 should not be retrieved (user removed it)')
  })
})
