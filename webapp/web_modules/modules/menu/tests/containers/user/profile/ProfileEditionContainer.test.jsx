/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ProfileEditionDialogComponent from '../../../../src/components/user/profile/ProfileEditionDialogComponent'
import { ProfileEditionContainer } from '../../../../src/containers/user/profile/ProfileEditionContainer'
import styles from '../../../../src/styles/styles'
import { PROFILE_VIEW_STATE_ENUM } from '../../../../src/domain/ProfileViewStateEnum'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileEditionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionContainer)
  })
  it('should render correctly visible', () => {
    const props = {
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
      dialogState: {
        open: true,
        view: PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE,
      },
      visible: true,
      myUser: null,
      onShowView: () => {},
      onHideDialog: () => {},
      fetchMyUser: () => { },
      updateMyUser: () => { },
      fetchNotificationSettings: () => { },
      updateNotificationSettings: () => { },
    }
    const enzymeWrapper = shallow(<ProfileEditionContainer {...props} />, { context })
    // A - mounting (still loading)
    testSuiteHelpers.assertNotComp(enzymeWrapper, ProfileEditionContainer)
    // B - mounted
    enzymeWrapper.setState({
      isLoading: false,
      userMetadata: [],
    })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProfileEditionDialogComponent, {
      view: props.dialogState.view,
      quotaInfo: props.quotaInfo,
      userMetadata: enzymeWrapper.state().userMetadata,
      notificationSettings: props.notificationSettings,
      onShowView: props.onShowView,
      onEditProfile: enzymeWrapper.instance().onEditProfile,
      onEditNotificationSettings: enzymeWrapper.instance().onEditNotificationSettings,
      onHideDialog: props.onHideDialog,
    })
  })
  it('should render correctly hidden', () => {
    const props = {
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
      dialogState: {
        open: false,
        view: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
      },
      visible: true,
      myUser: null,
      onShowView: () => {},
      onHideDialog: () => {},
      fetchMyUser: () => { },
      updateMyUser: () => { },
      fetchNotificationSettings: () => { },
      updateNotificationSettings: () => { },
    }
    const enzymeWrapper = shallow(<ProfileEditionContainer {...props} />, { context })
    // A - mounting (still loading)
    testSuiteHelpers.assertNotComp(enzymeWrapper, ProfileEditionContainer)
    // B - mounted but not visible
    enzymeWrapper.setState({
      isLoading: false,
      userMetadata: [],
    })
    testSuiteHelpers.assertNotComp(enzymeWrapper, ProfileEditionDialogComponent)
  })
})
