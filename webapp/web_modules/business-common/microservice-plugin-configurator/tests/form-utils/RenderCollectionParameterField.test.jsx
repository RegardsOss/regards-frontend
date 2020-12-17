/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import filter from 'lodash/filter'
import forEach from 'lodash/forEach'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { FieldArray, RenderArrayObjectField, RenderArrayTextField } from '@regardsoss/form-utils'
import {
  buildTestContext, testSuiteHelpers, ReduxFormTestHelper, DumpProvider,
} from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import { RenderCollectionParameterField } from '../../src/form-utils/RenderCollectionParameterField'
import RenderObjectParameterField from '../../src/form-utils/RenderObjectParameterField'
import { getPrimitiveJavaTypeRenderParameters } from '../../src/form-utils/JavaPrimitiveTypesTool'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RenderCollectionParameterField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing RenderCollectionParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderCollectionParameterField)
  })
  it('should render correctly a COLLECTION Plugin parameter', () => {
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    const parameters = filter(pluginMetaData.parameters, (p) => p.type === CommonDomain.PluginParameterTypes.COLLECTION)
    assert.isDefined(parameters)
    assert.isTrue(parameters.length > 0, 'Invalid configuration for tests. There should be at least on parameter of type COLLECTION')
    forEach(parameters, (parameter) => {
      // Calculate if the parameterized type is pritive or object
      const primitiveParameters = getPrimitiveJavaTypeRenderParameters(get(parameter, 'parameterizedSubTypes', [undefined])[0])

      const microserviceName = 'rs-test'
      const input = ReduxFormTestHelper.getInputFieldProps('conf', parameter)
      const props = {
        microserviceName,
        pluginParameterType: parameter,
        disabled: false,
        input,
      }
      // Render
      const enzymeWrapper = shallow(<RenderCollectionParameterField {...props} />, { context })
      enzymeWrapper.update()
      if (primitiveParameters) {
        assert.equal(enzymeWrapper.find(FieldArray).find({
          component: RenderArrayTextField,
          disabled: false,
        }).length, 1, 'There should be a FieldArray for for primitive COLLECTION')
      } else {
        assert.equal(enzymeWrapper.find(FieldArray).find({
          component: RenderArrayObjectField,
          fieldComponent: RenderObjectParameterField,
          fieldProps: {
            microserviceName,
            pluginParameterType: parameter,
            complexParameter: false,
            disabled: false,
            input,
          },
          disabled: false,
        }).length, 1, 'There should be a FieldArray RenderArrayObjectField for for COLLECTION of objects ')
      }
    })
  })
  it('should render correctly a disabled COLLECTION Plugin parameter', () => {
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    const parameters = filter(pluginMetaData.parameters, (p) => p.type === CommonDomain.PluginParameterTypes.COLLECTION)
    assert.isDefined(parameters)
    assert.isTrue(parameters.length > 0, 'Invalid configuration for tests. There should be at least on parameter of type COLLECTION')
    forEach(parameters, (parameter) => {
      // Calculate if the parameterized type is pritive or object
      const primitiveParameters = getPrimitiveJavaTypeRenderParameters(get(parameter, 'parameterizedSubTypes', [undefined])[0])

      const input = ReduxFormTestHelper.getInputFieldProps('conf', parameter)
      const microserviceName = 'rs-test'
      const props = {
        microserviceName,
        pluginParameterType: parameter,
        disabled: true,
        input,
      }
      // Render
      const enzymeWrapper = shallow(<RenderCollectionParameterField {...props} />, { context })
      if (primitiveParameters) {
        assert.equal(enzymeWrapper.find(FieldArray).find({
          component: RenderArrayTextField,
          disabled: true,
        }).length, 1, 'There should be a FieldArray for for primitive COLLECTION')
      } else {
        assert.equal(enzymeWrapper.find(FieldArray).find({
          component: RenderArrayObjectField,
          fieldComponent: RenderObjectParameterField,
          fieldProps: {
            microserviceName,
            pluginParameterType: parameter,
            complexParameter: false,
            disabled: true,
            input,
          },
          disabled: true,
        }).length, 1, 'There should be a FieldArray RenderArrayObjectField for for COLLECTION of objects ')
      }
    })
  })
})
