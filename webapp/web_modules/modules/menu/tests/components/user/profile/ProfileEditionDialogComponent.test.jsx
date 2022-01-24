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
import { List, ListItem } from 'material-ui/List'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATES, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import { PROFILE_VIEW_STATES, PROFILE_VIEW_STATE_ENUM } from '../../../../src/domain/ProfileViewStateEnum'
import ProfileEditionDialogComponent from '../../../../src/components/user/profile/ProfileEditionDialogComponent'
import ProfileEditionFormComponent from '../../../../src/components/user/profile/ProfileEditionFormComponent'
import ProfileNotificationFormComponent from '../../../../src/components/user/profile/ProfileNotificationFormComponent'
import ProfileQuotaInformationComponent from '../../../../src/components/user/profile/ProfileQuotaInformationComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing ProfileEditionDialogComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProfileEditionDialogComponent)
  })

  const testCases = [{
    view: PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE,
    expectedComp: ProfileEditionFormComponent,
  }, {
    view: PROFILE_VIEW_STATE_ENUM.EDIT_NOTIFICATIONS,
    expectedComp: ProfileNotificationFormComponent,
  }, {
    view: PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS,
    expectedComp: ProfileQuotaInformationComponent,
  }]

  testCases.forEach(({ view, expectedComp }) => it(`should render correctly in view mode ${view}`, () => {
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
      view,
      userMetadata: [],
      notificationSettings: {},
      onHideDialog: () => { },
      onEditProfile: () => { },
      onEditNotificationSettings: () => { },
      onShowView: PropTypes.func.isRequired,
    }
    const enzymeWrapper = shallow(<ProfileEditionDialogComponent {...props} />, { context })
    // 1 - Check list and view options
    const listWrapper = enzymeWrapper.find(List)
    assert.lengthOf(listWrapper, 1, 'There should be navigation list')
    assert.lengthOf(listWrapper.find(ListItem), PROFILE_VIEW_STATES.length, 'All items should be enabled')
    // 2 - Check displayed component
    assert.lengthOf(enzymeWrapper.find(expectedComp), 1, 'Displayed component should match current view')
  }))
  it('should display quota information item only when quota and rate are restricted', () => {
    const quotaTestsCases = QUOTA_INFO_STATES.reduce((acc, quotaState) => [
      ...acc,
      ...QUOTA_INFO_STATES.map((rateState) => ({
        quotaState,
        rateState,
        shouldHideQuotaEntry: quotaState === QUOTA_INFO_STATE_ENUM.UNLIMITED && rateState === QUOTA_INFO_STATE_ENUM.UNLIMITED,
      })),
    ], [])

    quotaTestsCases.forEach(({ quotaState, rateState, shouldHideQuotaEntry }) => {
      const props = {
        quotaInfo: {
          currentQuota: 3,
          maxQuota: 100,
          quotaState,
          currentRate: 8,
          rateLimit: 10,
          rateState,
          downloadDisabled: false,
          inUserApp: true,
        },
        view: PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE,
        userMetadata: [],
        notificationSettings: {},
        onHideDialog: () => { },
        onEditProfile: () => { },
        onEditNotificationSettings: () => { },
        onShowView: PropTypes.func.isRequired,
      }
      const enzymeWrapper = shallow(<ProfileEditionDialogComponent {...props} />, { context })
      // 1 - Check list and view options
      const listWrapper = enzymeWrapper.find(List)
      assert.lengthOf(listWrapper, 1, 'There should be navigation list')
      if (shouldHideQuotaEntry) {
        assert.lengthOf(listWrapper.find(ListItem), PROFILE_VIEW_STATES.length - 1, 'Quota information entry should be hidden')
      } else {
        assert.lengthOf(listWrapper.find(ListItem), PROFILE_VIEW_STATES.length, 'Quota information entry should be shown')
      }
    })
  })
})
