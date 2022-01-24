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
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Field, FieldArray } from '@regardsoss/form-utils'
import {
  buildTestContext, testSuiteHelpers, ReduxFormTestHelper, DumpProvider,
} from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import { RenderPluginParameterField } from '../../src/form-utils/RenderPluginParameterField'
import styles from '../../src/styles/styles'
import { RenderPluginField } from '../../src/form-utils/RenderPluginPluginParameterField'
import { RenderObjectParameterField } from '../../src/form-utils/RenderObjectParameterField'
import { RenderCollectionParameterField } from '../../src/form-utils/RenderCollectionParameterField'
import { RenderMapParameterField } from '../../src/form-utils/RenderMapParameterField'
import { getPrimitiveJavaTypeRenderParameters } from '../../src/form-utils/JavaPrimitiveTypesTool'

const context = buildTestContext(styles)

/**
* Test RenderPluginParameterField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing RenderPluginParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderPluginParameterField)
  })
  const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
  assert.isDefined(pluginConf)
  const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
  assert.isDefined(pluginMetaData)
  forEach(pluginMetaData.parameters, (parameter) => {
    it(`should render correctly field ${parameter.type}`, () => {
      assert.isDefined(parameter)
      const parameterConf = find(pluginConf.parameters, (p) => p.name === parameter.name)
      assert.isDefined(parameterConf, `Parameter configuration does not contains a parameter named ${parameter.name}`)
      const props = {
        microserviceName: 'rs-test',
        pluginParameterType: parameter,
        hideDynamicParameterConf: false,
        disabled: false,
        complexParameter: true,
        input: ReduxFormTestHelper.getInputFieldProps('conf', parameterConf),
        meta: ReduxFormTestHelper.getMetaFieldProps(),
      }
      const enzymeWrapper = shallow(<RenderPluginParameterField {...props} />, { context })
      const primitiveParameters = getPrimitiveJavaTypeRenderParameters(parameter.type)
      switch (parameter.type) {
        case CommonDomain.PluginParameterTypes.STRING:
        case CommonDomain.PluginParameterTypes.INTEGER:
        case CommonDomain.PluginParameterTypes.BYTE:
        case CommonDomain.PluginParameterTypes.SHORT:
        case CommonDomain.PluginParameterTypes.LONG:
        case CommonDomain.PluginParameterTypes.FLOAT:
        case CommonDomain.PluginParameterTypes.DOUBLE:
        case CommonDomain.PluginParameterTypes.BOOLEAN:
          assert.isDefined(primitiveParameters, `Error calculating Field Component parameters for primitive type ${parameter.type}`)
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 1, 'There should be a Field for dynamic configuration defined')
          assert.equal(enzymeWrapper.find(Field).find({ component: primitiveParameters.component }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        case CommonDomain.PluginParameterTypes.PLUGIN:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined. No dynamic conf for OBJECT paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderPluginField }).length, 1, 'There should be a Field for dynamic configuration defined.')
          break
        case CommonDomain.PluginParameterTypes.POJO:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined. No dynamic conf for OBJECT paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderObjectParameterField }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        case CommonDomain.PluginParameterTypes.COLLECTION:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined.No dynamic conf for COLLECTION paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderCollectionParameterField }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        case CommonDomain.PluginParameterTypes.MAP:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined. No dynamic conf for MAP paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderMapParameterField }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        default:
          break
      }
    })
    it(`should render correctly field ${parameter.type} as disabled`, () => {
      assert.isDefined(parameter)
      const parameterConf = find(pluginConf.parameters, (p) => p.name === parameter.name)
      assert.isDefined(parameterConf, `Parameter configuration does not contains a parameter named ${parameter.name}`)
      const props = {
        microserviceName: 'rs-test',
        pluginParameterType: parameter,
        hideDynamicParameterConf: true,
        disabled: true,
        complexParameter: true,
        input: ReduxFormTestHelper.getInputFieldProps('conf', parameterConf),
        meta: ReduxFormTestHelper.getMetaFieldProps(),
      }
      const enzymeWrapper = shallow(<RenderPluginParameterField {...props} />, { context })
      const primitiveParameters = getPrimitiveJavaTypeRenderParameters(parameter.type)
      switch (parameter.type) {
        case CommonDomain.PluginParameterTypes.STRING:
        case CommonDomain.PluginParameterTypes.INTEGER:
        case CommonDomain.PluginParameterTypes.BYTE:
        case CommonDomain.PluginParameterTypes.SHORT:
        case CommonDomain.PluginParameterTypes.LONG:
        case CommonDomain.PluginParameterTypes.FLOAT:
        case CommonDomain.PluginParameterTypes.DOUBLE:
        case CommonDomain.PluginParameterTypes.BOOLEAN:
          assert.isDefined(primitiveParameters, `Error calculating Field Component parameters for primitive type ${parameter.type}`)
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not be a Field for dynamic configuration defined as the prop hideDynamicParameterConf is true')
          assert.equal(enzymeWrapper.find(Field).find({ component: primitiveParameters.component, disabled: true }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        case CommonDomain.PluginParameterTypes.PLUGIN:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not be a Field for dynamic configuration defined as the prop hideDynamicParameterConf is true')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderPluginField, disabled: true }).length, 1, 'There should be a Field for dynamic configuration defined.')
          break
        case CommonDomain.PluginParameterTypes.POJO:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined. No dynamic conf for OBJECT paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderObjectParameterField, disabled: true }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        case CommonDomain.PluginParameterTypes.COLLECTION:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined.No dynamic conf for COLLECTION paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderCollectionParameterField, disabled: true }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        case CommonDomain.PluginParameterTypes.MAP:
          assert.equal(enzymeWrapper.find(FieldArray).length, 0, 'There should not be a FieldArray defined as the parameter is not configured as dynamic')
          assert.equal(enzymeWrapper.find(Field).find({ name: 'conf.dynamic' }).length, 0, 'There should not have a Field for dynamic configuration defined. No dynamic conf for MAP paramters.')
          assert.equal(enzymeWrapper.find(Field).find({ component: RenderMapParameterField, disabled: true }).length, 1, 'There should be a Field for dynamic configuration defined')
          break
        default:
          break
      }
    })
  })
})
