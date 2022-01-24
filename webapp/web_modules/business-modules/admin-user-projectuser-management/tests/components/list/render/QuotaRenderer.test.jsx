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
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import QuotaRenderer from '../../../../src/components/list/render/QuotaRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test QuotaRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing QuotaRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(QuotaRenderer)
  })

  const testCases = [{
    label: 'an unlimited quota',
    props: {
      userQuota: { currentQuota: 2546, maxQuota: -1 },
    },
    expected: {
      message: 'projectUser.list.table.unlimited.quota.message',
      icon: { visible: false },
    },
  }, {
    label: 'an idle quota',
    props: {
      userQuota: { currentQuota: 1000, maxQuota: 6500 },
      uiSettings: {
        quotaWarningCount: 200,
      },
    },
    expected: {
      message: 'projectUser.list.table.current.quota.message',
      icon: { visible: false },
    },
  }, {
    label: 'a low quota warning',
    props: {
      userQuota: { currentQuota: 1000, maxQuota: 1100 },
      uiSettings: {
        quotaWarningCount: 200,
      },
    },
    expected: {
      message: 'projectUser.list.table.current.quota.message',
      icon: { visible: true, style: context.moduleTheme.usersList.quotaCell.icon.warning },
    },
  }, {
    label: 'a consumed quota',
    props: {
      userQuota: { currentQuota: 255, maxQuota: 250 },
      uiSettings: {
        quotaWarningCount: 200,
      },
    },
    expected: {
      message: 'projectUser.list.table.current.quota.message',
      icon: { visible: true, style: context.moduleTheme.usersList.quotaCell.icon.consumed },
    },
  }]
  testCases.forEach(({ label, props: { userQuota = {}, uiSettings = {} }, expected }) => it(`should render correctly with ${label}`, () => {
    const aUser = DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')
    const props = {
      entity: {
        ...aUser,
        content: {
          ...aUser.content,
          ...userQuota,
        },
      },
      uiSettings: {
        ...UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
        ...uiSettings,
      },
    }
    const enzymeWrapper = shallow(<QuotaRenderer {...props} />, { context })
    // 1 - check message
    assert.include(enzymeWrapper.debug(), expected.message)
    // 2 - check warning
    if (expected.icon.visible) {
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, QuotaStatusIcon, {
        style: expected.icon.style,
      })
    } else {
      testSuiteHelpers.assertNotComp(enzymeWrapper, QuotaStatusIcon)
    }
  }))
})
