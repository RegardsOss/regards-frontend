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
 **/
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TotalQuotaRenderComponent from '../../../src/components/user/TotalQuotaRenderComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TotalQuotaRenderComponent
 * @author Raphaël Mechali
 */
describe('[Order Cart] Testing TotalQuotaRenderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TotalQuotaRenderComponent)
  })

  /** Test infinite / idle / warning / consumed cases */
  const testCases = [{
    label: 'quota infinite status',
    props: {
      totalQuota: 35,
      currentQuota: 150,
      maxQuota: -1,
      quotaWarningCount: 25,
    },
    expectIcon: {
      visible: false,
    },
  }, {
    label: 'quota idle status',
    props: {
      totalQuota: 35,
      currentQuota: 150,
      maxQuota: 500,
      quotaWarningCount: 25,
    },
    expectIcon: {
      visible: false,
    },
  }, {
    label: 'low quota warning status',
    props: {
      totalQuota: 35,
      currentQuota: 150,
      maxQuota: 200,
      quotaWarningCount: 25,
    },
    expectIcon: {
      visible: true,
      style: context.moduleTheme.user.content.table.totalRow.quotaCell.icon.warning,
    },
  }, {
    label: 'quota consumed status',
    props: {
      totalQuota: 35,
      currentQuota: 150,
      maxQuota: 160,
      quotaWarningCount: 25,
    },
    expectIcon: {
      visible: true,
      style: context.moduleTheme.user.content.table.totalRow.quotaCell.icon.consumed,
    },
  }]
  testCases.forEach(({ label, props, expectIcon }) => it(`should render correctly with ${label}`, () => {
    const enzymeWrapper = shallow(<TotalQuotaRenderComponent {...props} />, { context })
    if (expectIcon.visible) {
      testSuiteHelpers.assertCompWithProps(enzymeWrapper, QuotaStatusIcon, { style: expectIcon.style },
        'Status icon should be displayed with expected status style')
    } else {
      testSuiteHelpers.assertNotComp(enzymeWrapper, QuotaStatusIcon, 'Status warning icon should be hidden')
    }
  }))
})
