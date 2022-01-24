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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NavigationLayoutComponent from '../../../../src/components/user/navigation/NavigationLayoutComponent'
import DynamicModulesProviderContainer from '../../../../src/containers/common/DynamicModulesProviderContainer'
import { NavigationMenuContainer } from '../../../../src/containers/user/navigation/NavigationMenuContainer'
import NavigationModelResolutionContainer from '../../../../src/containers/user/navigation/NavigationModelResolutionContainer'
import { adminModuleSelectors } from '../../../../src/clients/ModulesListClient'
import { adminLayoutSelectors } from '../../../../src/clients/LayoutListClient'
import styles from '../../../../src/styles'
import { aNavigationConfiguration, anHomeConfiguration } from '../../../dumps/configuration.dump'

const context = buildTestContext(styles)

/** Simple role list dump */
const roleList = {
  1: {
    content: {
      name: 'AROLE',
    },
  },
}

/**
 * Test NavigationMenuContainer
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NavigationMenuContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationMenuContainer)
  })
  it('should render correctly in USER mode', () => {
    const props = {
      project: 'any',
      currentModuleId: 5,
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.USER,
      homeConfiguration: anHomeConfiguration,
      navigationConfiguration: aNavigationConfiguration,
      roleList,
      currentRole: 'TESTROLE',
    }
    const enzymeWrapper = shallow(<NavigationMenuContainer {...props} />, { context })

    // check dynamic modules provider properties
    const dynamicModulesProvider = enzymeWrapper.find(DynamicModulesProviderContainer)
    assert.lengthOf(dynamicModulesProvider, 1, 'There should be the dynamic modules provider')
    assert.isTrue(dynamicModulesProvider.props().keepOnlyActive, 'In navigation view, only active modules should be considered')
    // in user mode, common user selectors should be used, not admin one
    assert.notEqual(dynamicModulesProvider.props().layoutSelectors, adminLayoutSelectors, 'Layout selectors should not be used from admin client but from common client')
    assert.notEqual(dynamicModulesProvider.props().moduleSelectors, adminModuleSelectors, 'Module selectors should not be used from admin client but from common client')

    // check navigation resolution container properties
    const navResolutionContainer = enzymeWrapper.find(NavigationModelResolutionContainer)
    assert.lengthOf(navResolutionContainer, 1, 'There should be the navigation resolution container')
    testSuiteHelpers.assertWrapperProperties(navResolutionContainer, {
      homeConfiguration: props.homeConfiguration,
      navigationConfiguration: props.navigationConfiguration,
      currentModuleId: props.currentModuleId,
      currentRole: props.currentRole,
      roleList: props.roleList,
    }, 'Navigation resolution properties should be correctly reported')

    const componentWrapper = enzymeWrapper.find(NavigationLayoutComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.equal(componentWrapper.props().buildLinkURL, enzymeWrapper.instance().buildLinkURL, 'buildLinkURL callback should be correctly reported')
    assert.equal(componentWrapper.props().locale, props.locale, 'The right locale should be reported')
  })
  it('should render correctly in PREVIEW mode', () => {
    const props = {
      project: 'any',
      currentModuleId: 5,
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
      homeConfiguration: anHomeConfiguration,
      navigationConfiguration: aNavigationConfiguration,
      roleList,
      currentRole: 'TESTROLE',
    }
    const enzymeWrapper = shallow(<NavigationMenuContainer {...props} />, { context })

    // check dynamic modules provider properties
    const dynamicModulesProvider = enzymeWrapper.find(DynamicModulesProviderContainer)
    assert.lengthOf(dynamicModulesProvider, 1, 'There should be the dynamic modules provider')
    assert.isTrue(dynamicModulesProvider.props().keepOnlyActive, 'In navigation view, only active modules should be considered')
    // in preview mode, admin selectors should be used
    assert.equal(dynamicModulesProvider.props().layoutSelectors, adminLayoutSelectors, 'Layout selectors should not be used from admin client but from common client')
    assert.equal(dynamicModulesProvider.props().moduleSelectors, adminModuleSelectors, 'Module selectors should not be used from admin client but from common client')

    // check navigation resolution container properties
    const navResolutionContainer = enzymeWrapper.find(NavigationModelResolutionContainer)
    assert.lengthOf(navResolutionContainer, 1, 'There should be the navigation resolution container')
    testSuiteHelpers.assertWrapperProperties(navResolutionContainer, {
      homeConfiguration: props.homeConfiguration,
      navigationConfiguration: props.navigationConfiguration,
      currentModuleId: props.currentModuleId,
      currentRole: props.currentRole,
      roleList: props.roleList,
    }, 'Navigation resolution properties should be correctly reported')

    const componentWrapper = enzymeWrapper.find(NavigationLayoutComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.equal(componentWrapper.props().buildLinkURL, enzymeWrapper.instance().buildLinkURL, 'buildLinkURL callback should be correctly reported')
  })
  it('should provide an URL for modules in user mode and none for undefined modules (sections)', () => {
    // render only to get instance
    const props = {
      project: 'my-project',
      currentModuleId: 5,
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.USER,
      homeConfiguration: anHomeConfiguration,
      navigationConfiguration: aNavigationConfiguration,
      roleList,
      currentRole: 'TESTROLE',
    }
    const enzymeWrapper = shallow(<NavigationMenuContainer {...props} />, { context })

    const instance = enzymeWrapper.instance()
    // test module
    const builtURL = instance.buildLinkURL({ id: 5, type: 'my-module' })
    assert.equal(builtURL, '/user/my-project/modules/5', 'It should build the right module URL')
    // test anything else
    const anotherURL = instance.buildLinkURL()
    assert.isNotOk(anotherURL, 'It should not build URL when parameter is not provided')
  })
  it('should block URL building when in PREVIEW mode (to remove links)', () => {
    // render only to get instance
    const props = {
      project: 'my-project',
      currentModuleId: 5,
      displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
      homeConfiguration: anHomeConfiguration,
      navigationConfiguration: aNavigationConfiguration,
      roleList,
      currentRole: 'TESTROLE',
    }
    const enzymeWrapper = shallow(<NavigationMenuContainer {...props} />, { context })

    const instance = enzymeWrapper.instance()
    // test module
    const builtURL = instance.buildLinkURL({ id: 5, type: 'my-module' })
    assert.isNotOk(builtURL, 'It should prevent building URL for modules in preview')
    // test anything else
    const anotherURL = instance.buildLinkURL()
    assert.isNotOk(anotherURL, 'It should not build URL when parameter is not provided')
  })
})
