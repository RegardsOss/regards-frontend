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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { DropDownButton } from '@regardsoss/components'
import { LoggedUserComponent } from '../../../../src/components/user/authentication/LoggedUserComponent'
import ProfileEditionContainer from '../../../../src/containers/user/profile/ProfileEditionContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing LoggedUserComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoggedUserComponent)
  })
  it('should render correctly with all options', () => {
    const props = {
      name: 'Oui-oui',
      currentRole: 'Universe administrator',
      borrowableRoles: {
        1: {
          content: {
            id: 1,
            name: 'Universe administrator',
            parentRole: {
              name: 'Multiverse administrator',
              id: 0,
            },
            isDefault: true,
            isNative: false,
            authorizedAddresses: ['10 Bvd Strasbourg'],
          },
        },
        2: {
          content: {
            id: 2,
            name: 'unwanted user',
            parentRole: {
              name: 'tolerated user',
              id: 3,
            },
            isDefault: false,
            isNative: true,
            authorizedAddresses: ['No where!'],
          },
        },
      },
      showProfileDialog: true,
      quotaInfo: {
        currentQuota: 521,
        maxQuota: 800,
        quotaState: QUOTA_INFO_STATE_ENUM.IDLE,
        currentRate: 2,
        rateLimit: 30,
        rateState: QUOTA_INFO_STATE_ENUM.IDLE,
        downloadDisabled: false,
        inUserApp: true,
      },
      onBorrowRole: () => { },
      onLogout: () => { },
      onShowProfileEdition: () => { },
      onShowQuotaInformation: () => {},
    }
    const enzymeWrapper = shallow(<LoggedUserComponent {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProfileEditionContainer, {
      quotaInfo: props.quotaInfo,
    })
    const dropdown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropdown, 1, 'There should be drop down button')
    // check profile edition menu
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'accountLabel'), 1, 'There should profile edition menu')
    // quota edition
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'quotaInformation'), 1, 'There should be quota edition menu')
    // changeRole
    const changeRoleMenu = dropdown.findWhere((n) => n.props().primaryText === 'changeRole')
    assert.lengthOf(changeRoleMenu, 1, 'There should be change role menu')
    assert.lengthOf(changeRoleMenu.props().menuItems, 2, 'There should be a sub menu for each available role')
    // logout
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'logoutLabel'), 1, 'There should be logout option')
  })
  it('should render correctly without option', () => {
    const props = {
      name: 'Oui-oui',
      currentRole: 'Universe administrator',
      borrowableRoles: {},
      showProfileDialog: false,
      quotaInfo: {
        currentQuota: 3,
        maxQuota: 100,
        quotaState: QUOTA_INFO_STATE_ENUM.IDLE,
        currentRate: 8,
        rateLimit: 10,
        rateState: QUOTA_INFO_STATE_ENUM.WARNING,
        downloadDisabled: false,
        inUserApp: true,
      },
      onBorrowRole: () => { },
      onLogout: () => { },
      onShowProfileEdition: () => { },
      onShowQuotaInformation: () => {},
    }
    const enzymeWrapper = shallow(<LoggedUserComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ProfileEditionContainer), 0, 'Profile edition dialog should be hidden')
    const dropdown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropdown, 1, 'There should be drop down button')
    // check profile edition menu
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'accountLabel'), 0, 'Profile edition menu should be hidden')
    // quota edition
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'quotaInformation'), 0, 'Quota edition menu should be hidden')
    // changeRole
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'changeRole'), 0, 'Change role menu should be hidden')
    // logout
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'logoutLabel'), 1, 'There should be logout option')
  })
  it('should hide quota information option when there is no quota restriction', () => {
    const props = {
      name: 'Oui-oui',
      currentRole: 'Universe administrator',
      borrowableRoles: {},
      showProfileDialog: true,
      quotaInfo: {
        currentQuota: 1050,
        maxQuota: -1,
        quotaState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
        currentRate: 25,
        rateLimit: -1,
        rateState: QUOTA_INFO_STATE_ENUM.UNLIMITED,
        downloadDisabled: false,
        inUserApp: true,
      },
      onBorrowRole: () => { },
      onLogout: () => { },
      onShowProfileEdition: () => { },
      onShowQuotaInformation: () => {},
    }
    const enzymeWrapper = shallow(<LoggedUserComponent {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProfileEditionContainer, {
      quotaInfo: props.quotaInfo,
    })
    const dropdown = enzymeWrapper.find(DropDownButton)
    // quota edition
    assert.lengthOf(dropdown.findWhere((n) => n.props().primaryText === 'quotaInformation'), 0, 'Quota option should be hidden as there is no restriction')
  })
})
