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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import {
  buildTestContext, testSuiteHelpers, ReduxFormTestHelper, DumpProvider,
} from '@regardsoss/tests-helpers'
import { RenderPluginConfField } from '../../src/form-utils/RenderPluginConfField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RenderPluginConfField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing RenderPluginConfField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderPluginConfField)
  })
  it('should render correctly', () => {
    const pluginConf = DumpProvider.getFirstEntityContent('CommonClient', 'PluginConfiguration')
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getFirstEntityContent('CommonClient', 'PluginMetaData')
    assert.isDefined(pluginMetaData)
    const props = {
      microserviceName: 'rs-test',
      pluginMetaData,
      hideGlobalParameterConf: false,
      hideDynamicParameterConf: false,
      disabled: false,
      input: ReduxFormTestHelper.getInputFieldProps('conf', pluginConf),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
    }
    const numberOfParameters = 6 + (pluginMetaData.parameters.length || 0)
    const enzymeWrapper = shallow(<RenderPluginConfField {...props} />, { context })
    assert.equal(enzymeWrapper.find(Field).length, numberOfParameters, `There should be ${numberOfParameters} Field for this plugin configurator form. (6 global parameter + ${pluginMetaData.parameters.length || 0} specific parameter) `)
    assert.equal(enzymeWrapper.find(Field).find({ disabled: true }).length, 2, 'Only two fields should be disabled')
  })
  it('should render correctly without global configuration', () => {
    const pluginConf = DumpProvider.getFirstEntityContent('CommonClient', 'PluginConfiguration')
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getFirstEntityContent('CommonClient', 'PluginMetaData')
    assert.isDefined(pluginMetaData)
    const props = {
      microserviceName: 'rs-test',
      pluginMetaData,
      hideGlobalParameterConf: true,
      hideDynamicParameterConf: false,
      disabled: false,
      input: ReduxFormTestHelper.getInputFieldProps('conf', pluginConf),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
    }
    const numberOfParameters = pluginMetaData.parameters.length || 0
    const enzymeWrapper = shallow(<RenderPluginConfField {...props} />, { context })
    assert.equal(enzymeWrapper.find(Field).length, numberOfParameters, `There should be ${numberOfParameters} Field for this plugin configurator form. (0 global parameter + ${pluginMetaData.parameters.length || 0} specific parameter) `)
    assert.equal(enzymeWrapper.find(Field).find({ disabled: true }).length, 0, 'No field should be disabled')
  })
  it('should render correctly as view mode (all fields disabled', () => {
    const pluginConf = DumpProvider.getFirstEntityContent('CommonClient', 'PluginConfiguration')
    assert.isDefined(pluginConf)
    const pluginMetaData = DumpProvider.getFirstEntityContent('CommonClient', 'PluginMetaData')
    assert.isDefined(pluginMetaData)
    const props = {
      microserviceName: 'rs-test',
      pluginMetaData,
      hideGlobalParameterConf: false,
      hideDynamicParameterConf: false,
      disabled: true,
      input: ReduxFormTestHelper.getInputFieldProps('conf', pluginConf),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
    }
    const numberOfParameters = 6 + (pluginMetaData.parameters.length || 0)
    const enzymeWrapper = shallow(<RenderPluginConfField {...props} />, { context })
    assert.equal(enzymeWrapper.find(Field).find({ disabled: true }).length, numberOfParameters, 'All fields should be disabled')
  })
})
