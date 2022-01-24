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
import DownloadIcon from 'mdi-material-ui/Download'
import QuotaWarnIcon from 'mdi-material-ui/Alert'
import QuotaConsumedIcon from 'mdi-material-ui/AlertOctagon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { InnerDownloadIconComponent as DownloadIconComponent } from '../../../../src/components/download/quota/DownloadIconComponent'
import { QUOTA_INFO_STATE_ENUM } from '../../../../src/main'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DownloadIconComponent
 * @author Raphaël Mechali
 */
describe('[Entities Common] Testing DownloadIconComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DownloadIconComponent)
  })

  const testCases = [{
    label: 'not constrained by quota (default)',
    constrainedByQuota: false,
    quota: {},
    expectOverlayIcon: null,
  }, {
    label: 'not constrained by quota (warning)',
    constrainedByQuota: false,
    quota: {
      quotaState: QUOTA_INFO_STATE_ENUM.WARNING,
    },
    expectOverlayIcon: null,
  }, {
    label: 'not constrained by quota (consumed)',
    constrainedByQuota: false,
    quota: {
      rateState: QUOTA_INFO_STATE_ENUM.CONSUMED,
    },
    expectOverlayIcon: null,
  }, {
    label: 'constrained by quota (default)',
    constrainedByQuota: true,
    quota: {},
    expectOverlayIcon: null,
  }, {
    label: 'constrained by quota (warning)',
    constrainedByQuota: true,
    quota: {
      rateState: QUOTA_INFO_STATE_ENUM.WARNING,
    },
    expectOverlayIcon: QuotaWarnIcon,
  }, {
    label: 'constrained by quota (consumed)',
    constrainedByQuota: true,
    quota: {
      quotaState: QUOTA_INFO_STATE_ENUM.CONSUMED,
    },
    expectOverlayIcon: QuotaConsumedIcon,
  }]

  testCases.forEach(({
    label, constrainedByQuota, quota, expectOverlayIcon,
  }) => it(`should render correctly when ${label}`, () => {
    const props = {
      constrainedByQuota,
      quotaInfo: { // create a valid default shape.
        currentQuota: 2,
        maxQuota: 1000,
        quotaState: QUOTA_INFO_STATE_ENUM.IDLE,
        currentRate: 8,
        rateLimit: 50,
        rateState: QUOTA_INFO_STATE_ENUM.IDLE,
        downloadDisabled: false,
        inUserApp: true,
        ...quota, // test specific
      },
    }
    const enzymeWrapper = shallow(<DownloadIconComponent {...props} />, { context })
    // A - Check background icon
    assert.lengthOf(enzymeWrapper.find(DownloadIcon), 1, 'There should be background icon')
    if (expectOverlayIcon) {
      assert.lengthOf(enzymeWrapper.find(expectOverlayIcon), 1, 'There should be expected overlay icon')
    } else {
      assert.lengthOf(enzymeWrapper.find(QuotaWarnIcon), 0, 'Warning icon should be hidden')
      assert.lengthOf(enzymeWrapper.find(QuotaConsumedIcon), 0, 'Error icon should be hidden')
    }
  }))
})
