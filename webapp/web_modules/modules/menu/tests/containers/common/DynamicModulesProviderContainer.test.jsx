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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DynamicModulesProviderContainer } from '../../../src/containers/common/DynamicModulesProviderContainer'
import { adminModuleSelectors } from '../../../src/clients/ModulesListClient'
import { adminLayoutSelectors } from '../../../src/clients/LayoutListClient'
import styles from '../../../src/styles'
import { allDefaultConfigDumpModules, modulesWithInactiveAndNonDynamic } from '../../dumps/modules.dump'

const context = buildTestContext(styles)

/** Temp component to test HOC */
const TempComponent = () => <div />

/**
 * Test DynamicModulesProviderContainer
 * @author Raphaël Mechali
 */
describe('[Menu] Testing DynamicModulesProviderContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DynamicModulesProviderContainer)
  })
  it('should render correctly fetching', () => {
    const props = {
      moduleSelectors: adminModuleSelectors,
      layoutSelectors: adminLayoutSelectors,
      keepOnlyActive: true,
      dynamicContainerId: 'I am dynamic',
      modules: [],
      isFetching: true,
    }
    const wrapper = shallow(
      <DynamicModulesProviderContainer {...props}>
        <TempComponent />
      </DynamicModulesProviderContainer>, { context })
    assert.lengthOf(wrapper.find(TempComponent), 0, 'Children should not get mounted while dynamic modules are loading')
  })
  it('should render correctly not fetching', () => {
    const props = {
      moduleSelectors: adminModuleSelectors,
      layoutSelectors: adminLayoutSelectors,
      keepOnlyActive: true,
      dynamicContainerId: 'I am dynamic',
      modules: [],
      isFetching: false,
    }
    const wrapper = shallow(
      <DynamicModulesProviderContainer {...props}>
        <TempComponent />
      </DynamicModulesProviderContainer>, { context })
    assert.lengthOf(wrapper.find(TempComponent), 1, 'Children should be loaded')
  })
  it('should resolve dynamic modules list each time dynamic modules OR dynamic container ID changes', () => {
    // 1 - set up spy on static method
    const savedMethod = DynamicModulesProviderContainer.filterModules
    const spiedData = { count: 0, parameters: null }
    DynamicModulesProviderContainer.filterModules = (modules, dynamicContainerId, keepOnlyActive) => {
      spiedData.count += 1
      spiedData.parameters = { modules, dynamicContainerId, keepOnlyActive }
      return savedMethod(modules, dynamicContainerId, keepOnlyActive)
    }

    // 2 - render instance and test property changes
    const props = {
      moduleSelectors: adminModuleSelectors,
      layoutSelectors: adminLayoutSelectors,
      keepOnlyActive: true,
      dynamicContainerId: 'I am dynamic',
      modules: [],
      isFetching: false,
    }
    const wrapper = shallow(<DynamicModulesProviderContainer {...props} />, { context })
    // When mounting: should have been called once
    assert.equal(spiedData.count, 1, 'Initial call should have been performed')
    assert.deepEqual(spiedData.parameters, {
      modules: props.modules,
      dynamicContainerId: props.dynamicContainerId,
      keepOnlyActive: props.keepOnlyActive,
    }, 'Initial parameters should be valid')

    // should recall when changing dynamic ID (we also change keep only active to test the right value passes through)
    wrapper.setProps({
      ...props,
      dynamicContainerId: 'I am also dynamic!',
      keepOnlyActive: false,
    })
    assert.equal(spiedData.count, 2, 'Should have called modules filter after changing dynamic ID')
    assert.deepEqual(spiedData.parameters, {
      modules: props.modules,
      dynamicContainerId: 'I am also dynamic!',
      keepOnlyActive: false,
    }, 'Parameters should be valid after changing dynamic ID')

    // should recall when changing module lsit
    wrapper.setProps({
      ...props,
      modules: allDefaultConfigDumpModules,
      keepOnlyActive: true,
    })
    assert.equal(spiedData.count, 3, 'Should have called modules filter after changing modules list')
    assert.deepEqual(spiedData.parameters, {
      modules: allDefaultConfigDumpModules,
      dynamicContainerId: props.dynamicContainerId,
      keepOnlyActive: true,
    }, 'Parameters should be valid after changing modules list')

    // 3 - remove spy
    DynamicModulesProviderContainer.filterModules = savedMethod
  })
  it('should resolve the right modules when keepOnlyActive is disabled', () => {
    // 1 - test with only dynamic and active modules (no element should be filtered)
    assert.deepEqual(
      DynamicModulesProviderContainer.filterModules(allDefaultConfigDumpModules, 'dynamic-1', false),
      allDefaultConfigDumpModules, 'No module should be filtered from default configuration modules')
    // 2 - test with inactive and non dynamic modules
    const filtered = DynamicModulesProviderContainer.filterModules(modulesWithInactiveAndNonDynamic, 'dynamic-1', false)
    // we should be able here to retrieve module 1 (dynamic active) and 2 (dynamic disabled)
    assert.lengthOf(filtered, 2, 'Only two modules should pass through filter')
    assert.equal(filtered[0].content.id, 1, 'The module 1 should be successfully filtered (dynamic and active)')
    assert.equal(filtered[1].content.id, 2, 'The module 2 should be successfully filtered (dynamic and disabled)')
  })
  it('should resolve the right modules when keepOnlyActive is enabled', () => {
    // 1 - test with only dynamic and active modules (no element should be filtered)
    assert.deepEqual(
      DynamicModulesProviderContainer.filterModules(allDefaultConfigDumpModules, 'dynamic-1', true),
      allDefaultConfigDumpModules, 'No module should be filtered from default configuration modules')
    // 2 - test with inactive and non dynamic modules
    const filtered = DynamicModulesProviderContainer.filterModules(modulesWithInactiveAndNonDynamic, 'dynamic-1', true)
    // we should be able here to retrieve only module 1 (dynamic active)
    assert.lengthOf(filtered, 1, 'Only one module should pass through filter')
    assert.equal(filtered[0].content.id, 1, 'The module 1 should be successfully filtered (dynamic and active)')
  })
})
