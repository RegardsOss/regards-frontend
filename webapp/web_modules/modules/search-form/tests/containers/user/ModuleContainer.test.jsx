/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { ModuleContainer } from '../../../src/containers/user/ModuleContainer'
import FormComponent from '../../../src/components/user/FormComponent'
import PluginsConfigurationProvider from '../../../src/containers/user/PluginsConfigurationProvider'

import Styles from '../../../src/styles/styles'
import { conf1 } from '../../dump/configuration.dump'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext(Styles)
  it('render and resolve correctly the plugins attributes', () => {
    const props = {
      project: 'test',
      appName: 'test',
      type: 'any',
      description: 'Test',
      moduleConf: conf1,
      dispatchCollapseForm: () => { },
      dispatchExpandResults: () => { },
      dispatchInitializeWithOpenedResults: () => { },
    }
    const wrapper = shallow(<ModuleContainer
      {...props}
    />, { context })

    // Check parameters passed to FormComponent
    const formComponent = wrapper.find(FormComponent)
    assert.lengthOf(formComponent, 1, 'There should be one FormComponent rendered')

    // Check parameters passed to PluginsConfiguration provider
    const pluginConfProvider = wrapper.find(PluginsConfigurationProvider)
    assert.lengthOf(pluginConfProvider, 1, 'There should be the plugin configuration provider')
    testSuiteHelpers.assertWrapperProperties(pluginConfProvider, {
      criteria: props.moduleConf.criterion,
      initialQuery: wrapper.instance().getInitialQuery(),
      authentication: props.authentication,
    }, 'PluginsConfigurationProvider properties should be correctly provided ')

    // Check results are rendered
    const resultsModule = wrapper.find(LazyModuleComponent)
    assert.lengthOf(resultsModule, 1, 'There should be the results module')
    assert.equal(resultsModule.props().module.type, modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS, 'Its type should be correctly set up')
  })
})
