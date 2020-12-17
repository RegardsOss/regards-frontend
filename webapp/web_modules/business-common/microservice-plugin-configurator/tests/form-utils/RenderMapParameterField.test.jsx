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
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { RenderMapField } from '@regardsoss/form-utils'
import {
  buildTestContext, testSuiteHelpers, DumpProvider, ReduxFormTestHelper,
} from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import { getPrimitiveJavaTypeRenderParameters } from '../../src/form-utils/JavaPrimitiveTypesTool'
import { RenderMapParameterField } from '../../src/form-utils/RenderMapParameterField'
import RenderObjectParameterField from '../../src/form-utils/RenderObjectParameterField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RenderMapParameterField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing RenderMapParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const microserviceName = 'rs-test'

  it('should exists', () => {
    assert.isDefined(RenderMapParameterField)
  })
  it('should render correctly a MAP Plugin parameter', () => {
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    const parameters = filter(pluginMetaData.parameters, (p) => p.type === CommonDomain.PluginParameterTypes.MAP)
    assert.isDefined(parameters)
    assert.isTrue(parameters.length > 0, 'Invalid configuration for tests. There should be at least on parameter of type MAP')
    forEach(parameters, (parameter) => {
      // Calculate if the parameterized type is primitive or object
      const primitiveParameters = getPrimitiveJavaTypeRenderParameters(get(parameter, 'parameterizedSubTypes', [undefined])[1])

      const input = ReduxFormTestHelper.getInputFieldProps('conf', parameter)
      const meta = ReduxFormTestHelper.getMetaFieldProps()
      const props = {
        microserviceName,
        pluginParameterType: parameter,
        input,
        meta,
      }
      const enzymeWrapper = shallow(<RenderMapParameterField {...props} />, { context })
      if (primitiveParameters) {
        assert.equal(enzymeWrapper.find(RenderMapField).find({
          mapValueFieldComponent: primitiveParameters.component,
          mapValueFieldProps: {
            type: primitiveParameters.type,
          },
          disabled: false,
          input,
          meta,
        }).length, 1, 'There should be a RenderMapField for for primitive MAP.')
      } else {
        assert.equal(enzymeWrapper.find(RenderMapField).find({
          mapValueFieldComponent: RenderObjectParameterField,
          mapValueFieldProps: {
            microserviceName,
            pluginParameterType: parameter,
            complexParameter: false,
          },
          disabled: false,
          input,
          meta,
        }).length, 1, 'There should be a RenderMapField for for an object parameterized MAP.')
      }
    })
  })
  it('should render correctly a disabled MAP Plugin parameter', () => {
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    const parameters = filter(pluginMetaData.parameters, (p) => p.type === CommonDomain.PluginParameterTypes.MAP)
    assert.isDefined(parameters)
    assert.isTrue(parameters.length > 0, 'Invalid configuration for tests. There should be at least on parameter of type MAP')
    forEach(parameters, (parameter) => {
      // Calculate if the parameterized type is primitive or object
      const primitiveParameters = getPrimitiveJavaTypeRenderParameters(get(parameter, 'parameterizedSubTypes', [undefined])[1])

      const input = ReduxFormTestHelper.getInputFieldProps('conf', parameter)
      const meta = ReduxFormTestHelper.getMetaFieldProps()
      const props = {
        microserviceName,
        pluginParameterType: parameter,
        disabled: true,
        input,
        meta,
      }
      const enzymeWrapper = shallow(<RenderMapParameterField {...props} />, { context })
      if (primitiveParameters) {
        assert.equal(enzymeWrapper.find(RenderMapField).find({
          mapValueFieldComponent: primitiveParameters.component,
          mapValueFieldProps: {
            type: primitiveParameters.type,
            disabled: true,
          },
          disabled: true,
          input,
          meta,
        }).length, 1, 'There should be a RenderMapField for for primitive MAP.')
      } else {
        assert.equal(enzymeWrapper.find(RenderMapField).find({
          mapValueFieldComponent: RenderObjectParameterField,
          mapValueFieldProps: {
            microserviceName,
            pluginParameterType: parameter,
            complexParameter: false,
            disabled: true,
          },
          disabled: true,
          input,
          meta,
        }).length, 1, 'There should be a RenderMapField for for an object parameterized MAP.')
      }
    })
  })
})
