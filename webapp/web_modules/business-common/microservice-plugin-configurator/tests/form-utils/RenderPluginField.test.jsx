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
import {
  buildTestContext, testSuiteHelpers, ReduxFormTestHelper, DumpProvider,
} from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { RenderPluginField } from '../../src/form-utils/RenderPluginField'
import PluginListContainer from '../../src/containers/PluginListContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  RenderPluginField
* @author Sébastien Binda
*/
describe('[MICROSERVICE PLUGIN CONFIGURATOR] Testing  RenderPluginField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderPluginField)
  })
  it('should render correctly', () => {
    const pluginMetaData = DumpProvider.getFirstEntityContent('CommonClient', 'PluginMetaData')
    assert.isDefined(pluginMetaData)
    const props = {
      pluginType: pluginMetaData.pluginClassName,
      microserviceName: 'rs-test',
      input: ReduxFormTestHelper.getInputFieldProps('conf', RenderPluginField.getPluginDefaultConf(pluginMetaData, 'confLabel')),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
    }
    const enzymeWrapper = shallow(<RenderPluginField {...props} />, { context })
    assert.equal(enzymeWrapper.find(PluginListContainer).length, 1, 'There should be a plugin selector rendered (PluginListContainer) ')
    assert.equal(enzymeWrapper.find(Field).length, 0, 'The plugin configurator should not be displayed as no plugin is selected yet')
    enzymeWrapper.instance().handleSelectPluginMetaData(pluginMetaData, false)
    enzymeWrapper.update()
    assert.equal(enzymeWrapper.find(Field).length, 1, 'The plugin configurator should be displayed as a plugin is selected now')
  })
})
