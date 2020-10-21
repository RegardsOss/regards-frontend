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
import { AccessDomain } from '@regardsoss/domain'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { modulesManager } from '@regardsoss/modules'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../src/domain/NavigationItemTypes'
import { NavigationModelResolutionContainer } from '../../../../src/containers/user/navigation/NavigationModelResolutionContainer'
import styles from '../../../../src/styles'
import { aNavigationConfiguration, anHomeConfiguration } from '../../../dumps/configuration.dump'
import { allDefaultConfigDumpModules, modulesWithNewAndDeleted } from '../../../dumps/modules.dump'
import { VISIBILITY_MODES_ENUM } from '../../../../src/domain/VisibilityModes'

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
      roleList: { 1: { content: { name: 'R1' } } },
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
      'It should have resolved initially the navigation elements from configuration (removing the final empty section but keeping all items as they are ALWAYS visible)')
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
      roleList: { 1: { content: { name: 'R1' } } },
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
    // [M5, M7, M8] (M3, M4, M2 and M6 should be deleted as not present in dynamic modules OR inactive,
    // S0, S1 and S2 should be deleted as empty after filtering (or holding only empty sections))
    assert.lengthOf(resolvedElements, 3, 'There should be 3 root elements (empty section should have been removed, new modules added)')

    // M5
    const r0 = resolvedElements[0]
    assert.equal(r0.key, 'module.5', 'R0 should be the module 5 (home)')
    assert.deepEqual(r0.module, {
      id: 5,
      description: 'Home page',
      type: modulesManager.VisibleModuleTypes.EMBEDDED_HMTL,
    }, 'R0 Module definition should be reported')
    assert.deepEqual(r0.title, props.homeConfiguration.title, 'Home module title should be retrieved from home configuration')

    // M7 (new module)
    const r1 = resolvedElements[1]
    assert.equal(r1.key, 'module.7', 'R1 should be the module 7, added from dynamic list')
    assert.deepEqual(r1.module, {
      id: 7,
      description: 'another search results',
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
    }, 'R1 Module definition should be reported')
    assert.deepEqual(r1.title, targetModules[targetModules.length - 2].content.page.title, 'Standard module configuration should be retrieved from dynamic module')

    // M8 (new module)
    const r2 = resolvedElements[2]
    assert.equal(r2.key, 'module.8', 'R3 should be the module 8, added from dynamic list')
    assert.deepEqual(r2.module, {
      id: 8,
      description: 'another search results 2',
      type: modulesManager.VisibleModuleTypes.SEARCH_RESULTS,
    }, 'R2 Module definition should be reported')
    assert.deepEqual(r2.title, targetModules[targetModules.length - 1].content.page.title, 'Standard module configuration should be retrieved from dynamic module')
  })
  it('should hide modules and section based on user role and provided configuration', () => {
    // rigths management:
    // INSTANCE_ADMIN | PROJECT_ADMIN | R2 -> R1 -> PUBLIC
    // we create here a custom configuration where
    // M1 module is PUBLIC (always visible for everyone)
    // M2 module is R1
    // S1 section is R1
    // S1.M3 module is R2
    // S1.M4 module is never visible (should always be removed)
    // S1.M5 module is visible for a non existing role: only project admin and instance admin should see it
    const configWithRoles = [
      { // M1: Home module
        id: 1,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        visibilityMode: VISIBILITY_MODES_ENUM.FOR_ROLE,
        visibleForRole: 'PUBLIC',
      },
      { // M2b
        id: 2,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        visibilityMode: VISIBILITY_MODES_ENUM.FOR_ROLE,
        visibleForRole: 'R1',
      },
      { // S1
        id: 0,
        type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
        visibilityMode: VISIBILITY_MODES_ENUM.FOR_ROLE,
        visibleForRole: 'R1',
        icon: {
          type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM,
          url: './cocorico.svg',
        },
        title: {
          en: 'aSection',
          fr: 'uneSection',
        },
        children: [{ // S1.M3
          id: 3,
          type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
          visibilityMode: VISIBILITY_MODES_ENUM.FOR_ROLE,
          visibleForRole: 'R2',
        }, { // S1.M4
          id: 4,
          type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
          visibilityMode: VISIBILITY_MODES_ENUM.NEVER,
        }],
      },
      { // M5
        id: 5,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        visibilityMode: VISIBILITY_MODES_ENUM.FOR_ROLE,
        visibleForRole: 'NON_EXISTING',
      },
    ]

    // provide role linked list
    const roleList = {
      PUBLIC: {
        content: {
          name: 'PUBLIC',
        },
      },
      PROJECT_ADMIN: {
        content: {
          name: 'PROJECT_ADMIN',
        },
      },
    }
    roleList.R1 = {
      content: {
        name: 'R1',
        parentRole: roleList.PUBLIC.content,
      },
    }
    roleList.R2 = {
      content: {
        name: 'R2',
        parentRole: roleList.R1.content,
      },
    }
    // provide dynamic modules (only IDs are changed here)
    const dynamicModules = [1, 2, 3, 4, 5].map(id => ({
      content: {
        id,
        active: true,
        type: `type.${id}`,
        container: 'dyn1',
        description: `description-${id}`,
        page: {
          iconType: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE,
          title: { en: `title-${id}-en`, fr: `title-${id}-fr` },
          home: id === 1,
        },
        conf: {},
      },
    }))

    const props = {
      currentModuleId: 1,
      roleList,
      homeConfiguration: anHomeConfiguration,
      navigationConfiguration: configWithRoles,
      dynamicModules,
    }
    // 1 - test for non logged user: should have only PUBLIC elements
    const enzymeWrapper = shallow(<NavigationModelResolutionContainer {...props} />)
    let { navigationElements } = enzymeWrapper.state()
    assert.lengthOf(navigationElements, 1, '[NOT LOGGED] Only public module should be allowed')
    assert.equal(navigationElements[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[NOT LOGGED] First element should be of type module')
    assert.equal(navigationElements[0].module.id, 1, '[NOT LOGGED] First element should be the module M2a')

    // 2 - test for non logged user: should have only PUBLIC elements
    enzymeWrapper.setProps({ ...props, currentRole: 'PUBLIC' })
    navigationElements = enzymeWrapper.state().navigationElements
    assert.lengthOf(navigationElements, 1, '[PUBLIC] Only first module should be allowed for non logged user')
    assert.equal(navigationElements[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[PUBLIC] First element should be of type module')
    assert.equal(navigationElements[0].module.id, 1, '[PUBLIC] First element should be the module M1')

    // 3 - test for logged user with role R1: M1 and M2 should be visible, but S1 should be hidden as it has no visible module
    enzymeWrapper.setProps({ ...props, currentRole: 'R1' })
    navigationElements = enzymeWrapper.state().navigationElements
    assert.lengthOf(navigationElements, 2, '[R1] M1 and M2 shoud be allowed ')
    assert.equal(navigationElements[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[R1] [0] Expected module type')
    assert.equal(navigationElements[0].module.id, 1, '[R1] [0] Expected M1 ID')
    assert.equal(navigationElements[1].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[R1] [1] Expected module type')
    assert.equal(navigationElements[1].module.id, 2, '[R1] [1] Expected M2 ID')

    // 4 - test for logged user with role R2: M1, M2, S1 and S1.M3 should be visible
    enzymeWrapper.setProps({ ...props, currentRole: 'R2' })
    navigationElements = enzymeWrapper.state().navigationElements
    assert.lengthOf(navigationElements, 3, '[R2] M1, M2 and S1 shoud be allowed ')
    assert.equal(navigationElements[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[R2] [0] Expected module type')
    assert.equal(navigationElements[0].module.id, 1, '[R2] [0] Expected M1 ID')
    assert.equal(navigationElements[1].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[R2] [1] Expected module type')
    assert.equal(navigationElements[1].module.id, 2, '[R2] [1] Expected M2 ID')
    let navigationSection = navigationElements[2]
    assert.equal(navigationSection.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, '[R2] [2] Expected section type')
    assert.lengthOf(navigationSection.children, 1, '[R2] [2] section should have one module')
    assert.equal(navigationSection.children[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[R2] [2][0] Expected module type')
    assert.equal(navigationSection.children[0].module.id, 3, '[R2] [2][0] Expected M3 ID')

    // 5 - test for logged user with role PROJECT_ADMIN: all modules but M4 visible (VISIBILITY mode NEVER cannot be overpassed by rights)
    enzymeWrapper.setProps({ ...props, currentRole: 'PROJECT_ADMIN' })
    navigationElements = enzymeWrapper.state().navigationElements
    assert.lengthOf(navigationElements, 4, '[PROJECT_ADMIN] all root items should be visible ')
    navigationSection = navigationElements[2]
    assert.equal(navigationSection.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, '[PROJECT_ADMIN] [2] Expected section type')
    assert.lengthOf(navigationSection.children, 1, '[PROJECT_ADMIN] [2] section should have one module')
    assert.equal(navigationSection.children[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[PROJECT_ADMIN] [2][0] Expected module type')
    assert.equal(navigationSection.children[0].module.id, 3, '[PROJECT_ADMIN] [2][0] Expected M3 ID')

    // 6 - test for logged user with role INSTANCE_ADMIN
    enzymeWrapper.setProps({ ...props, currentRole: 'INSTANCE_ADMIN' })
    navigationElements = enzymeWrapper.state().navigationElements
    assert.lengthOf(navigationElements, 4, '[INSTANCE_ADMIN] all root items should be visible ')
    navigationSection = navigationElements[2]
    assert.equal(navigationSection.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, '[INSTANCE_ADMIN] [2] Expected section type')
    assert.lengthOf(navigationSection.children, 1, '[INSTANCE_ADMIN] [2] section should have one module')
    assert.equal(navigationSection.children[0].type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '[INSTANCE_ADMIN] [2][0] Expected module type')
    assert.equal(navigationSection.children[0].module.id, 3, '[INSTANCE_ADMIN] [2][0] Expected M3 ID')
  })
})
