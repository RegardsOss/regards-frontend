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
import { SelectLocaleContainer } from '@regardsoss/i18n-ui'
import { SelectThemeContainer } from '@regardsoss/theme-ui'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NavigationMenuContainer from '../../../src/containers/user/navigation/NavigationMenuContainer'
import AuthenticationContainer from '../../../src/containers/user/authentication/AuthenticationContainer'
import CartSelectorContainer from '../../../src/containers/user/CartSelectorContainer'
import ProjectAboutPageLinkContainer from '../../../src/containers/user/ProjectAboutPageLinkContainer'
import MainMenuComponent from '../../../src/components/user/MainMenuComponent'
import ContactComponent from '../../../src/components/user/ContactComponent'
import AppTitleComponent from '../../../src/components/user/title/AppTitleComponent'
import styles from '../../../src/styles'
import { aModuleCompleteConfiguration } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test MainMenuComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MainMenuComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainMenuComponent)
  })
  it('should render correctly in user mode (by default, when display mode is not provided)', () => {
    const props = {
      currentModuleId: 5,
      appName: 'any1',
      project: 'any2',
      type: 'menu',
      authenticationName: 'AUTH',
      currentRole: 'ROLE1',
      borrowableRoles: { 1: { content: { name: 'ROLE1' } } },
      roleList: { 2: { content: { name: 'ROLE2' } } },
      isInstance: false,
      moduleConf: aModuleCompleteConfiguration,
    }
    const enzymeWrapper = shallow(<MainMenuComponent {...props} />, { context })
    // check current mode elements
    assert.lengthOf(enzymeWrapper.find(AppTitleComponent), 0, 'Title should not be displayed in this mode')

    const navigationContainer = enzymeWrapper.find(NavigationMenuContainer)
    assert.lengthOf(navigationContainer, 1, 'The navigation container should be added')
    testSuiteHelpers.assertWrapperProperties(navigationContainer, {
      currentModuleId: props.currentModuleId,
      project: props.project,
      currentRole: props.currentRole,
      roleList: props.roleList,
      homeConfiguration: props.moduleConf.home,
      navigationConfiguration: props.moduleConf.navigation,
    }, 'Navigation container properties should be correctly provided')
    assert.equal(navigationContainer.props().project, props.project, 'NavigationMenuContainer should have right project prop')
    assert.equal(navigationContainer.props().displayMode, UIDomain.MENU_DISPLAY_MODES_ENUM.USER, 'NavigationMenuContainer should have right displayMode prop')
    assert.equal(navigationContainer.props().currentModuleId, props.currentModuleId, 'NavigationMenuContainer should have right currentModuleId prop')
    assert.deepEqual(navigationContainer.props().homeConfiguration, props.moduleConf.home, 'NavigationMenuContainer should have right homeConfiguration prop')
    assert.deepEqual(navigationContainer.props().navigationConfiguration, props.moduleConf.navigation, 'NavigationMenuContainer should have right project prop')

    const authenticationContainer = enzymeWrapper.find(AuthenticationContainer)
    assert.lengthOf(authenticationContainer, 1, 'AuthenticationContainer should be added')
    testSuiteHelpers.assertWrapperProperties(authenticationContainer, {
      appName: props.appName,
      project: props.project,
      authenticationName: props.authenticationName,
      currentRole: props.currentRole,
      borrowableRoles: props.borrowableRoles,
      isInstance: props.isInstance,
    }, 'Authentication container properties should be correctly reported')

    const cartSelectorContainer = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartSelectorContainer, 1, 'CartSelectorContainer should be added')
    assert.equal(cartSelectorContainer.props().project, props.project, 'CartSelectorContainer should have right project prop')

    const contactComponent = enzymeWrapper.find(ContactComponent)
    assert.lengthOf(contactComponent, 1, 'ContactComponent should be added')
    assert.equal(contactComponent.props().contacts, props.moduleConf.contacts, 'ContactComponent should have right contacts prop')

    const projectAboutPageLinkContainer = enzymeWrapper.find(ProjectAboutPageLinkContainer)
    assert.lengthOf(projectAboutPageLinkContainer, 1, 'ProjectAboutPageLinkContainer should be added')
    assert.equal(projectAboutPageLinkContainer.props().appName, props.appName, 'ProjectAboutPageLinkContainer should have right appName prop')
    assert.equal(projectAboutPageLinkContainer.props().project, props.project, 'ProjectAboutPageLinkContainer should have right project prop')
    assert.equal(projectAboutPageLinkContainer.props().projectAboutPage, props.moduleConf.projectAboutPage, 'ProjectAboutPageLinkContainer should have right projectAboutPage prop')

    assert.lengthOf(enzymeWrapper.find(SelectThemeContainer), 1, 'SelectThemeContainer should be added')
    assert.lengthOf(enzymeWrapper.find(SelectLocaleContainer), 1, 'SelectLocaleContainer should be added')
  })
  it('should render correctly in preview mode', () => {
    const props = {
      currentModuleId: null,
      appName: 'any1',
      project: 'any2',
      type: 'menu',
      authenticationName: 'AUTH',
      currentRole: 'ROLE1',
      borrowableRoles: { 1: { content: { name: 'ROLE1' } } },
      roleList: { 2: { content: { name: 'ROLE2' } } },
      isInstance: false,
      moduleConf: {
        ...aModuleCompleteConfiguration,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
      },
    }

    const enzymeWrapper = shallow(<MainMenuComponent {...props} />, { context })
    // check current mode elements
    assert.lengthOf(enzymeWrapper.find(AppTitleComponent), 0, 'Title should not be displayed in this mode')

    const navigationContainer = enzymeWrapper.find(NavigationMenuContainer)
    assert.lengthOf(navigationContainer, 1, 'The navigation container should be added')
    testSuiteHelpers.assertWrapperProperties(navigationContainer, {
      displayMode: props.moduleConf.displayMode,
      currentModuleId: props.currentModuleId,
      project: props.project,
      currentRole: props.currentRole,
      roleList: props.roleList,
      homeConfiguration: props.moduleConf.home,
      navigationConfiguration: props.moduleConf.navigation,
    }, 'Navigation container properties should be correctly provided')

    const authenticationContainer = enzymeWrapper.find(AuthenticationContainer)
    assert.lengthOf(authenticationContainer, 1, 'AuthenticationContainer should be added')
    testSuiteHelpers.assertWrapperProperties(authenticationContainer, {
      appName: props.appName,
      project: props.project,
      authenticationName: props.authenticationName,
      currentRole: props.currentRole,
      borrowableRoles: props.borrowableRoles,
      isInstance: props.isInstance,
    }, 'Authentication container properties should be correctly reported')

    const cartSelectorContainer = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartSelectorContainer, 1, 'CartSelectorContainer should be added')
    assert.equal(cartSelectorContainer.props().project, props.project, 'CartSelectorContainer should have right project prop')

    const contactComponent = enzymeWrapper.find(ContactComponent)
    assert.lengthOf(contactComponent, 1, 'ContactComponent should be added')
    assert.equal(contactComponent.props().contacts, props.moduleConf.contacts, 'ContactComponent should have right contacts prop')

    const projectAboutPageLinkContainer = enzymeWrapper.find(ProjectAboutPageLinkContainer)
    assert.lengthOf(projectAboutPageLinkContainer, 1, 'ProjectAboutPageLinkContainer should be added')
    assert.equal(projectAboutPageLinkContainer.props().appName, props.appName, 'ProjectAboutPageLinkContainer should have right appName prop')
    assert.equal(projectAboutPageLinkContainer.props().project, props.project, 'ProjectAboutPageLinkContainer should have right project prop')
    assert.equal(projectAboutPageLinkContainer.props().projectAboutPage, props.moduleConf.projectAboutPage, 'ProjectAboutPageLinkContainer should have right projectAboutPage prop')

    assert.lengthOf(enzymeWrapper.find(SelectThemeContainer), 1, 'SelectThemeContainer should be added')
    assert.lengthOf(enzymeWrapper.find(SelectLocaleContainer), 1, 'SelectLocaleContainer should be added')
  })
  it('should render correctly in admin project mode', () => {
    const props = {
      currentModuleId: null,
      appName: 'any1',
      project: 'any2',
      type: 'menu',
      authenticationName: 'AUTH',
      currentRole: 'ROLE1',
      borrowableRoles: { 1: { content: { name: 'ROLE1' } } },
      roleList: { 2: { content: { name: 'ROLE2' } } },
      isInstance: false,
      moduleConf: {
        ...aModuleCompleteConfiguration,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_PROJECT,
      },
    }
    const enzymeWrapper = shallow(<MainMenuComponent {...props} />, { context })
    // check current mode elements
    const appTitleComponent = enzymeWrapper.find(AppTitleComponent)
    assert.lengthOf(appTitleComponent, 1, 'Title should be displayed in this mode')
    assert.equal(appTitleComponent.props().project, props.project, 'AppTitleComponent should have right project prop')
    assert.equal(appTitleComponent.props().displayMode, props.moduleConf.displayMode, 'AppTitleComponent should have right displayMode prop')

    assert.lengthOf(enzymeWrapper.find(NavigationMenuContainer), 0, 'The navigation container should be not be displayed in this mode')

    const authenticationContainer = enzymeWrapper.find(AuthenticationContainer)
    assert.lengthOf(authenticationContainer, 1, 'AuthenticationContainer should be added')
    testSuiteHelpers.assertWrapperProperties(authenticationContainer, {
      appName: props.appName,
      project: props.project,
      authenticationName: props.authenticationName,
      currentRole: props.currentRole,
      borrowableRoles: props.borrowableRoles,
      isInstance: props.isInstance,
    }, 'Authentication container properties should be correctly reported')

    const cartSelectorContainer = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartSelectorContainer, 1, 'CartSelectorContainer should be added')
    assert.equal(cartSelectorContainer.props().project, props.project, 'CartSelectorContainer should have right project prop')

    const contactComponent = enzymeWrapper.find(ContactComponent)
    assert.lengthOf(contactComponent, 1, 'ContactComponent should be added')
    assert.equal(contactComponent.props().contacts, props.moduleConf.contacts, 'ContactComponent should have right contacts prop')

    const projectAboutPageLinkContainer = enzymeWrapper.find(ProjectAboutPageLinkContainer)
    assert.lengthOf(projectAboutPageLinkContainer, 1, 'ProjectAboutPageLinkContainer should be added')
    assert.equal(projectAboutPageLinkContainer.props().appName, props.appName, 'ProjectAboutPageLinkContainer should have right appName prop')
    assert.equal(projectAboutPageLinkContainer.props().project, props.project, 'ProjectAboutPageLinkContainer should have right project prop')
    assert.equal(projectAboutPageLinkContainer.props().projectAboutPage, props.moduleConf.projectAboutPage, 'ProjectAboutPageLinkContainer should have right projectAboutPage prop')

    assert.lengthOf(enzymeWrapper.find(SelectThemeContainer), 1, 'SelectThemeContainer should be added')
    assert.lengthOf(enzymeWrapper.find(SelectLocaleContainer), 1, 'SelectLocaleContainer should be added')
  })
  it('should render correctly in admin instance mode', () => {
    const props = {
      currentModuleId: null,
      appName: 'any1',
      project: 'any2',
      type: 'menu',
      authenticationName: 'AUTH',
      currentRole: 'ROLE1',
      borrowableRoles: { 1: { content: { name: 'ROLE1' } } },
      roleList: { 2: { content: { name: 'ROLE2' } } },
      isInstance: true,
      moduleConf: {
        ...aModuleCompleteConfiguration,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_INSTANCE,
      },
    }

    const enzymeWrapper = shallow(<MainMenuComponent {...props} />, { context })
    // check current mode elements
    const appTitleComponent = enzymeWrapper.find(AppTitleComponent)
    assert.lengthOf(appTitleComponent, 1, 'Title should be displayed in this mode')
    assert.equal(appTitleComponent.props().project, props.project, 'AppTitleComponent should have right project prop')
    assert.equal(appTitleComponent.props().displayMode, props.moduleConf.displayMode, 'AppTitleComponent should have right displayMode prop')

    assert.lengthOf(enzymeWrapper.find(NavigationMenuContainer), 0, 'The navigation container should be not be displayed in this mode')

    const authenticationContainer = enzymeWrapper.find(AuthenticationContainer)
    assert.lengthOf(authenticationContainer, 1, 'AuthenticationContainer should be added')
    testSuiteHelpers.assertWrapperProperties(authenticationContainer, {
      appName: props.appName,
      project: props.project,
      authenticationName: props.authenticationName,
      currentRole: props.currentRole,
      borrowableRoles: props.borrowableRoles,
      isInstance: props.isInstance,
    }, 'Authentication container properties should be correctly reported')

    const cartSelectorContainer = enzymeWrapper.find(CartSelectorContainer)
    assert.lengthOf(cartSelectorContainer, 1, 'CartSelectorContainer should be added')
    assert.equal(cartSelectorContainer.props().project, props.project, 'CartSelectorContainer should have right project prop')

    const contactComponent = enzymeWrapper.find(ContactComponent)
    assert.lengthOf(contactComponent, 1, 'ContactComponent should be added')
    assert.equal(contactComponent.props().contacts, props.moduleConf.contacts, 'ContactComponent should have right contacts prop')

    const projectAboutPageLinkContainer = enzymeWrapper.find(ProjectAboutPageLinkContainer)
    assert.lengthOf(projectAboutPageLinkContainer, 1, 'ProjectAboutPageLinkContainer should be added')
    assert.equal(projectAboutPageLinkContainer.props().appName, props.appName, 'ProjectAboutPageLinkContainer should have right appName prop')
    assert.equal(projectAboutPageLinkContainer.props().project, props.project, 'ProjectAboutPageLinkContainer should have right project prop')
    assert.equal(projectAboutPageLinkContainer.props().projectAboutPage, props.moduleConf.projectAboutPage, 'ProjectAboutPageLinkContainer should have right projectAboutPage prop')

    assert.lengthOf(enzymeWrapper.find(SelectThemeContainer), 1, 'SelectThemeContainer should be added')
    assert.lengthOf(enzymeWrapper.find(SelectLocaleContainer), 1, 'SelectLocaleContainer should be added')
  })
})
