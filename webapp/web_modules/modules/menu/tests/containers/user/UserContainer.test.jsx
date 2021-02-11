/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UserContainer } from '../../../src/containers/user/UserContainer'
import MainMenuComponent from '../../../src/components/user/MainMenuComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

const commonProps = {
  project: 'any',
  appName: 'any',
  type: 'any',
  userRole: 'bindedRole',
  borrowableRoles: {
    1: {
      content: {
        id: 1,
        name: 'ROLE1',
        parentRole: {
          name: 'PARENT OF ROLE 1',
          id: 2,
        },
      },
    },
  },
  moduleConf: {
    title: 'any',
    contacts: 'any@any.fr',
    displayAuthentication: true,
    displayCartSelector: true,
    displayNotificationsSelector: true,
    displayLocaleSelector: true,
    displayThemeSelector: true,
    projectAboutPage: 'www.any.com',
    previewRole: 'providedRole',
    roleList: {
      3: {
        content: {
          id: 3,
          name: 'ROLE3',
          parentRole: {
            name: 'PARENT OF ROLE 3',
            id: 4,
          },
        },
      },
    },
  },
  fetchBorrowableRoles: () => { },
  flushBorrowableRoles: () => { },
}

describe('[Menu] Testing UserContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserContainer)
  })
  it('should render correctly with complete conf in ADMIN_INSTANCE mode', () => {
    const props = {
      ...commonProps,
      isInstance: true,
      moduleConf: {
        ...commonProps.moduleConf,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_INSTANCE,
      },
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const mainComponent = enzymeWrapper.find(MainMenuComponent)
    assert.lengthOf(mainComponent, 1)
    // Check: properties are correctly reported, borrowable role list comes from binded borrowable roles and user role too
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      moduleConf: props.moduleConf,
      currentRole: props.userRole,
      roleList: props.borrowableRoles, // should come from fetched borrowable roles
      borrowableRoles: props.borrowableRoles,
    })
  })
  it('should render correctly with complete conf in ADMIN_PROJECT mode', () => {
    const props = {
      ...commonProps,
      isInstance: false,
      moduleConf: {
        ...commonProps.moduleConf,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.ADMIN_PROJECT,
      },
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const mainComponent = enzymeWrapper.find(MainMenuComponent)
    assert.lengthOf(mainComponent, 1)
    // Check: properties are correctly reported, borrowable role list comes from binded borrowable roles and user role too
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      moduleConf: props.moduleConf,
      currentRole: props.userRole,
      roleList: props.borrowableRoles, // should come from fetched borrowable roles
      borrowableRoles: props.borrowableRoles,
    })
  })
  it('should render correctly with complete conf in USER mode', () => {
    const props = {
      ...commonProps,
      isInstance: false,
      currentModuleId: 555,
      moduleConf: {
        ...commonProps.moduleConf,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.USER,
      },
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const mainComponent = enzymeWrapper.find(MainMenuComponent)
    assert.lengthOf(mainComponent, 1)
    // Check: properties are correctly reported, borrowable role list comes from binded borrowable roles and user role too
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      moduleConf: props.moduleConf,
      currentRole: props.userRole,
      roleList: props.borrowableRoles, // should come from fetched borrowable roles
      borrowableRoles: props.borrowableRoles,
      currentModuleId: 555,
    })
  })
  it('should render correctly with complete conf in PREVIEW mode', () => {
    const props = {
      ...commonProps,
      isInstance: false,
      moduleConf: {
        ...commonProps.moduleConf,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
      },
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const mainComponent = enzymeWrapper.find(MainMenuComponent)
    assert.lengthOf(mainComponent, 1)
    // Check: properties are correctly reported, borrowable role list comes from binded borrowable roles and user role too
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      moduleConf: props.moduleConf,
      currentRole: props.moduleConf.previewRole, // should come from preview configuration
      roleList: props.moduleConf.roleList, // should come from preview configuration
      borrowableRoles: props.borrowableRoles,
    })
  })
})
