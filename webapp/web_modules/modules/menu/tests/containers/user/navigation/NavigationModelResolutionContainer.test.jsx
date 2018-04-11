/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../src/domain/NavigationItemTypes'
import { NavigationModelResolutionContainer } from '../../../../src/containers/user/navigation/NavigationModelResolutionContainer'
import styles from '../../../../src/styles'
import { aNavigationConfiguration, anHomeConfiguration } from '../../../dumps/configuration.dump'
import { allDefaultConfigDumpModules, modulesWithNewAndDeleted } from '../../../dumps/modules.dump'

const context = buildTestContext(styles)

/**
 * Test NavigationModelResolutionContainer
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NavigationModelResolutionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationModelResolutionContainer)
  })
  it('should render correctly, resolving items for children and selection at mounting and on properties changed', () => {
    const props = {
      currentModuleId: 5, // home module ID
      homeConfiguration: anHomeConfiguration, // used only in onPropertiesUpdated
      navigationConfiguration: aNavigationConfiguration,
      dynamicModules: allDefaultConfigDumpModules,
    }
    const enzymeWrapper = shallow(<NavigationModelResolutionContainer {...props} />, { context })

    // initial
    const initialState = enzymeWrapper.state()
    assert.isOk(initialState, 'The component should have a state at initialization')
    assert.lengthOf(initialState.navigationElements, aNavigationConfiguration.length - 1,
      'It should have resolved initially the navigation elements from configuration (removing the final empty section)')
    assert.isTrue(initialState.navigationElements[0].selected, 'It should also resolve initially the selected item (when possible)')
    assert.isFalse(initialState.navigationElements[1].selected, 'And not select all elements by the way...')

    // after selection update
    enzymeWrapper.setProps({
      ...props,
      currentModuleId: 3,
    })
    const afterSelectionUpdateState = enzymeWrapper.state()
    assert.isOk(afterSelectionUpdateState, 'The component should have a state at initialization')
    assert.lengthOf(afterSelectionUpdateState.navigationElements, aNavigationConfiguration.length - 1,
      'It should keep the same resolved list after changin selection BUT update the selection index)')
    assert.isFalse(afterSelectionUpdateState.navigationElements[0].selected, 'Home should no longer be selected')
    assert.isTrue(afterSelectionUpdateState.navigationElements[1].selected, 'First section should be selected as it contains the selected module')
    assert.isTrue(afterSelectionUpdateState.navigationElements[1].children[0].selected, 'First section module should be selected')
    assert.isFalse(afterSelectionUpdateState.navigationElements[1].children[1].selected, 'And not others by the way...')

    // after modules update
    enzymeWrapper.setProps({
      ...props,
      dynamicModules: [],
    })
    const afterModulesUpdateState = enzymeWrapper.state()
    assert.isOk(afterModulesUpdateState, 'The component should have a state after props update')
    assert.lengthOf(afterModulesUpdateState.navigationElements, 0,
      'It should have resolved after update the navigation elements from configuration (no more item)')
  })
  it('should resolve correctly missing and disabled modules, clearing the empty sections', () => {
    // 1 - build a list of modules to match the specific test case:
    // from modulesWithNewAndDeleted (add module 7 and 8, removes 3 and 6)
    // disable modules 2 and 4 (should remove the section [1,2] as it no longer contains any active module)
    const targetModules = modulesWithNewAndDeleted.map(({ content }) => ({
      content: {
        ...content,
        active: !(content.id === 2 || content.id === 4),
      },
    }))

    const props = {
      currentModuleId: 5, // home module ID
      homeConfiguration: anHomeConfiguration, // used only in onPropertiesUpdated
      navigationConfiguration: aNavigationConfiguration,
      dynamicModules: targetModules,
    }
    const enzymeWrapper = shallow(<NavigationModelResolutionContainer {...props} />, { context })
    // initial
    const initialState = enzymeWrapper.state()
    assert.isOk(initialState, 'The component should have a state at initialization')
    const resolvedElements = initialState.navigationElements

    // check resoluting model, element by element, we expect:
    // [M5, S0:[M1], M7, M8] (M3, M4, M2 and M6 should be deleted as not present in dynamic modules OR inactive,
    // S1 and S2 should be deleted as empty)
    assert.lengthOf(resolvedElements, 4, 'There should be 5 root elements (empty section should have been removed, new modules added)')

    // M5
    const r0 = resolvedElements[0]
    assert.equal(r0.key, 'module.5', 'R0 should be the module 5 (home)')
    assert.deepEqual(r0.module, {
      id: 5,
      description: 'Home page',
      type: modulesManager.VisibleModuleTypes.EMBEDDED_HMTL,
    }, 'R0 Module definition should be reported')
    assert.deepEqual(r0.title, props.homeConfiguration.title, 'Home module title should be retrieved from home configuration')

    // S0
    const r1 = resolvedElements[1]
    assert.equal(r1.key, 'section.0', 'R1 should be the section 0')
    assert.deepEqual(r1.title, props.navigationConfiguration[1].title, 'Section configuration should be retrieved from navigation configuration')

    assert.lengthOf(r1.children, 1, 'Children should contain [M1] - (M3 and S1 should be remove)')
    const r1x0 = r1.children[0]
    assert.equal(r1x0.key, 'module.1', 'R1_0 should be the module 1')
    assert.equal(r1x0.type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, 'R1_0 should be a module')
    assert.deepEqual(r1x0.module, {
      id: 1,
      description: 'Form 1',
      type: modulesManager.VisibleModuleTypes.SEARCH_FORM,
    }, 'R1_0 Module definition should be reported')
    assert.deepEqual(r1x0.title, targetModules[0].content.page.title, 'Standard module configuration should be retrieved from dynamic module')

    // M7 (new module)
    const r2 = resolvedElements[2]
    assert.equal(r2.key, 'module.7', 'R2 should be the module 7, added from dynamic list')
    assert.deepEqual(r2.module, {
      id: 7,
      description: 'another search results',
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
    }, 'R2 Module definition should be reported')
    assert.deepEqual(r2.title, targetModules[targetModules.length - 2].content.page.title, 'Standard module configuration should be retrieved from dynamic module')

    // M8 (new module)
    const r3 = resolvedElements[3]
    assert.equal(r3.key, 'module.8', 'R3 should be the module 8, added from dynamic list')
    assert.deepEqual(r3.module, {
      id: 8,
      description: 'another search form',
      type: modulesManager.VisibleModuleTypes.SEARCH_FORM,
    }, 'R2 Module definition should be reported')
    assert.deepEqual(r3.title, targetModules[targetModules.length - 1].content.page.title, 'Standard module configuration should be retrieved from dynamic module')
  })
})
