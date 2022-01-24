/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import { assert } from 'chai'
import { PluginParameterTypes } from '@regardsoss/domain/common'
import { convertParameter, resolveParametersWithTypes } from '../../src/definitions/CatalogPluginServiceHelper'
import { Parameter } from '../../src/definitions/parameters/Parameter'

const getConfigParameter = (name, dynamicsValues, defaultValue = undefined, dynamic = true) => ({
  name, dynamicsValues, value: defaultValue, dynamic,
})

const getMetaDataParameter = (name, type, defaultValue, optional = false) => ({
  name: 'common.field', type, defaultValue, optional,
})

/**
* Test  CatalogPluginServiceHelper
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing CatalogPluginServiceHelper', () => {
  // test basic types without pre-entered choices and check field model
  const basicTypesTests = [
    // boolean type isn't validated (not a text field).
    {
      type: PluginParameterTypes.BOOLEAN, correspondingFieldType: Parameter.EditorTypes.CHECKBOX, name: 'field1', validator: false,
    },
    {
      type: PluginParameterTypes.BYTE, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, name: 'field2', validator: true,
    },
    {
      type: PluginParameterTypes.CHARACTER, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, defaultValue: 'Z', validator: true,
    },
    { type: PluginParameterTypes.DOUBLE, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    { type: PluginParameterTypes.FLOAT, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    { type: PluginParameterTypes.INTEGER, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    { type: PluginParameterTypes.LONG, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    { type: PluginParameterTypes.SHORT, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: true },
    // string type isn't validated (textfield input is always a valid string)
    { type: PluginParameterTypes.STRING, correspondingFieldType: Parameter.EditorTypes.TEXTFIELD, validator: false },
  ]
  basicTypesTests.map(({
    type, correspondingFieldType, validator, name = 'common.field',
  }) => it(`should convert correctly a Java primitive "${type}" parameter`, () => {
    const configParam = getConfigParameter(name)
    const metaParam = getMetaDataParameter(name, type)
    const resolved = convertParameter(configParam, metaParam)
    assert.isNotNull(resolved, 'the parameter should be converted')
    assert.equal(resolved.name, name, 'The parameter name should be correctly reported')
    assert.equal(resolved.editorType, correspondingFieldType, 'The parameter editor type is erroneous')
    if (validator) {
      assert.isNotNull(resolved.valueValidator, 'There should be a validator')
    } else {
      assert.isNull(resolved.valueValidator, 'There should be no validator')
    }
  }))

  const choiceTests = [
    { type: PluginParameterTypes.CHARACTER, dynamicsValues: ['Z', 'A'] },
    { type: PluginParameterTypes.DOUBLE, dynamicsValues: [1.5, 3.2] },
    { type: PluginParameterTypes.STRING, dynamicsValues: ['aaa', 'zzz'] },
  ]
  choiceTests.map(({ type, dynamicsValues, validator }) => it(`should convert any type (here ${type}) into a choice when dynamic values are provided`, () => {
    const configParam = getConfigParameter('common.field', dynamicsValues)
    const metaParam = getMetaDataParameter('common.field', type)
    const resolved = convertParameter(configParam, metaParam)
    assert.isNotNull(resolved, 'the parameter should be converted')
    assert.equal(resolved.name, 'common.field', 'The parameter name should be correctly reported')
    assert.equal(resolved.editorType, Parameter.EditorTypes.CHOICE, 'The parameter editor type is erroneous')
    assert.equal(resolved.defaultValue, dynamicsValues[0], 'Default value, when it s not specified by the administrator nor the plugin developper, should be first choice')
  }))

  it('Should select initial values respecting priority: admin value if specified, plugin developper value if specified, default type value if specified', () => {
    const initValueTest = [
      // test admin value selection
      {
        name: 't1', type: PluginParameterTypes.STRING, configValue: 'a', metaValue: 'b', expectedValue: 'a',
      },
      // test dev value selection (no admin)
      {
        name: 't2', type: PluginParameterTypes.BOOLEAN, metaValue: true, expectedValue: true,
      },
      // test default value selection (no admin nor dev, with default value for boolean type)
      { name: 't3', type: PluginParameterTypes.BOOLEAN, expectedValue: false },
      // test default value selection (no admin nor dev, no default value for string editable type)
      { name: 't4', type: PluginParameterTypes.INTEGER, expectedValue: undefined },
      // test default value selection (no admin nor dev, with default value for choice type)
      {
        name: 't5', type: PluginParameterTypes.INTEGER, dynamicsValues: [1, 2], expectedValue: 1,
      },
    ]
    initValueTest.forEach(({
      name, type, configValue, metaValue, dynamicsValues, expectedValue,
    }) => {
      const configParam = getConfigParameter('common.field', dynamicsValues, configValue)
      const metaParam = getMetaDataParameter('common.field', type, metaValue)
      const resolved = convertParameter(configParam, metaParam)
      assert.equal(resolved.defaultValue, expectedValue, `The selected default value for field "${name}" should be ${expectedValue}`)
    })
  })
  it('Should report optional when convering the parameter', () => {
    const tests = flatMap([PluginParameterTypes.STRING, PluginParameterTypes.BOOLEAN], (type) => [{ type, optional: true }, { type, optional: false }])
    tests.forEach(({ type, optional }) => {
      const configParam = getConfigParameter('common.field')
      const metaParam = getMetaDataParameter('common.field', type, PluginParameterTypes.STRING, optional)
      const resolved = convertParameter(configParam, metaParam)
      assert.equal(resolved.required, !optional, 'The optional field value should be added')
    })
  })

  it('should fail converting other types than basic parameter types', () => {
    // should throw when plugin type
    const configParam = getConfigParameter('common.field')
    let metaParam = getMetaDataParameter('common.field', null, undefined, PluginParameterTypes.PLUGIN)
    assert.throws(() => convertParameter(configParam, metaParam), Error, /.*/, 'Plugin parameter type should\'nt be handled')
    // should throw when undefined / null
    metaParam = getMetaDataParameter('common.field', null, undefined, null)
    assert.throws(() => convertParameter(configParam, metaParam), Error, /.*/, 'Empty parameter type should\'nt be handled')
    // should throw when unknown
    metaParam = getMetaDataParameter('common.field', null, undefined, 'aWholeNewType')
    assert.throws(() => convertParameter(configParam, metaParam), Error, /.*/, 'Unkown parameter type should\'nt be handled')
  })
  it('should fail converting unknown primitive types', () => {
    // should throw when undefined / null
    const configParam = getConfigParameter('common.field')
    let metaParam = getMetaDataParameter('common.field', null)
    assert.throws(() => convertParameter(configParam, metaParam), Error, /.*/, 'Empty type should\'nt be handled')
    // should throw when unknown
    metaParam = getMetaDataParameter('common.field', 'java.lang.XCryptedTVDecoder')
    assert.throws(() => convertParameter(configParam, metaParam), Error, /.*/, 'Unknown type should\'nt be handled')
  })
  it('should resolve parameters using both configuration and metadata', () => {
    const configuration = {
      content: {
        id: 1,
        label: 'service1',
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
        priorityOrder: 0,
        active: true,
        parameters: [
          {
            id: 8, name: 'A bool', value: '', dynamic: true,
          },
          {
            id: 2, name: 'A string', value: '', dynamic: true,
          },
          {
            id: 1, name: 'A string choice', value: '1/1', dynamic: true, dynamicsValues: [{ value: '1/1' }, { value: '1/5' }, { value: '1/10' }],
          },
        ],
      },
    }
    const metaData = {
      content: {
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
        author: 'REGARDS Team',
        description: 'Sample plugin test',
        url: 'https://github.com/RegardsOss',
        contact: 'regards@c-s.fr',
        owner: 'CSSI',
        licence: 'LGPLv3.0',
        parameters: [
          {
            name: 'A bool', type: 'BOOLEAN', optional: false,
          },
          {
            name: 'A string', type: 'STRING', defaultValue: 'Default val', optional: false,
          },
          {
            name: 'A string choice', type: 'STRING', defaultValue: 'v', optional: false,
          },
        ],
      },
    }
    const resolved = resolveParametersWithTypes(configuration, metaData)
    assert.lengthOf(resolved, 3, 'The three parameters should have been resolved, none should be filtered')
    assert.isDefined(resolved.find(({ name }) => name === 'A bool'), 'First parameter should be retrieved')
    assert.isDefined(resolved.find(({ name }) => name === 'A string'), 'Second parameter should be retrieved')
    assert.isDefined(resolved.find(({ name }) => name === 'A string choice'), 'Third parameter should be retrieved')
  })
  it('should ignore non dynamic parameters', () => {
    const configuration = {
      content: {
        id: 1,
        label: 'service1',
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
        priorityOrder: 0,
        active: true,
        parameters: [
          {
            id: 8, name: 'Ignored parameter', value: '', dynamic: false,
          },
        ],
      },
    }
    const metaData = {
      content: {
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
        author: 'REGARDS Team',
        description: 'Sample plugin test',
        url: 'https://github.com/RegardsOss',
        contact: 'regards@c-s.fr',
        owner: 'CSSI',
        licence: 'LGPLv3.0',
        parameters: [
          {
            name: 'Ignored parameter', type: 'BOOLEAN', optional: false,
          },
        ],
      },
    }
    const resolved = resolveParametersWithTypes(configuration, metaData)
    assert.lengthOf(resolved, 0, 'The parameter, as it is not dynamic, should have been filtered')
  })
  it('should fail converting parameters when metadata does\'nt match configuration', () => {
    const configuration = {
      content: {
        id: 1,
        label: 'service1',
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
        priorityOrder: 0,
        active: true,
        parameters: [
          {
            id: 8, name: 'Non resolved parameter', value: '', dynamic: true,
          },
        ],
      },
    }
    const metaData = {
      content: {
        pluginId: 'aSamplePlugin',
        version: '0.0.1',
        pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
        interfaceNames: ['fr.cnes.regards.framework.plugins.ISamplePlugin'],
        author: 'REGARDS Team',
        description: 'Sample plugin test',
        url: 'https://github.com/RegardsOss',
        contact: 'regards@c-s.fr',
        owner: 'CSSI',
        licence: 'LGPLv3.0',
        parameters: [], // no matching parameter
      },
    }
    assert.throws(() => resolveParametersWithTypes(configuration, metaData), Error, /.*/, 'The resolution should fail since the parameter definition cannot be retrieved')
  })
})
