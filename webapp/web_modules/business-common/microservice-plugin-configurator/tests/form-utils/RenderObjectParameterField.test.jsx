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
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import {
  buildTestContext, testSuiteHelpers, ReduxFormTestHelper, DumpProvider,
} from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import { RenderObjectParameterField } from '../../src/form-utils/RenderObjectParameterField'
import { RenderPluginParameterField } from '../../src/form-utils/RenderPluginParameterField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RenderObjectParameterField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing RenderObjectParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderObjectParameterField)
  })
  it('should render correctly a POJO Plugin parameter', () => {
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const parameters = filter(pluginConf.parameters, (p) => p.type === CommonDomain.PluginParameterTypes.POJO)
    assert.isDefined(parameters)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    forEach(parameters, (parameter) => {
      const props = {
        microserviceName: 'rs-test',
        pluginParameterType: parameter,
        input: ReduxFormTestHelper.getInputFieldProps('conf'),
      }
      const enzymeWrapper = shallow(<RenderObjectParameterField {...props} />, { context })
      const objectNbParameters = parameter.parameters.length
      assert.isTrue(objectNbParameters > 0, 'Invalid parameter configuration. This OBJECT Plugin parameter should have at least one parameter.')
      // Into an object plugin parameter all rendered parameters should not be complex and dynamoc parameter conf should be disabled
      assert.equal(enzymeWrapper.find(Field).find({
        component: RenderPluginParameterField,
        hideDynamicParameterConf: true,
        complexParameter: false,
      }).length, objectNbParameters, `The object to configure contains ${objectNbParameters} parameters so there should be ${objectNbParameters} Field RenderPluginParameterField`)
    })
  })

  it('should render correctly a disabled POJO Plugin parameter', () => {
    const pluginConf = DumpProvider.getEntityContentBy('CommonClient', 'PluginConfiguration', 'content.id', 202)
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getEntityContentBy('CommonClient', 'PluginMetaData', 'content.pluginId', 'FullPluginExample')
    assert.isDefined(pluginMetaData)
    const parameters = filter(pluginMetaData.parameters, (p) => p.type === 'POJO')
    assert.isDefined(parameters)
    assert.isTrue(parameters.length > 0, 'Invalid configuration for tests. There should be at least on parameter of type POJO')
    forEach(parameters, (parameter) => {
      const props = {
        microserviceName: 'rs-test',
        pluginParameterType: parameter,
        disabled: true,
        input: ReduxFormTestHelper.getInputFieldProps('conf'),
      }
      const enzymeWrapper = shallow(<RenderObjectParameterField {...props} />, { context })
      const objectNbParameters = parameter.parameters.length
      assert.isTrue(objectNbParameters > 0, 'Invalid parameter configuration. This POJO Plugin parameter should have at least one parameter.')
      // Into an object plugin parameter all rendered parameters should not be complex and dynamoc parameter conf should be disabled
      assert.equal(enzymeWrapper.find(Field).find({
        component: RenderPluginParameterField,
        hideDynamicParameterConf: true,
        complexParameter: false,
        disabled: true,
      }).length, objectNbParameters, `The object to configure contains ${objectNbParameters} parameters so there should be ${objectNbParameters} Field RenderPluginParameterField`)
    })
  })
})
