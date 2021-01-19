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
 **/
import LoginIcon from 'mdi-material-ui/AccountCircle'
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { QUOTA_INFO_STATES, QUOTA_INFO_STATE_ENUM } from '@regardsoss/entities-common'
import LoginIconComponent from '../../../../src/components/user/authentication/LoginIconComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test LoginIconComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing LoginIconComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoginIconComponent)
  })

  it('should render correctly for each states or quota and rate combination', () => {
    const combinationsTestsCases = QUOTA_INFO_STATES.reduce((acc, quotaState) => [
      ...acc,
      ...QUOTA_INFO_STATES.map((rateState) => ({
        quotaState,
        rateState,
        shouldDisplayWarningIcon: quotaState === QUOTA_INFO_STATE_ENUM.WARNING || quotaState === QUOTA_INFO_STATE_ENUM.CONSUMED
        || rateState === QUOTA_INFO_STATE_ENUM.WARNING || rateState === QUOTA_INFO_STATE_ENUM.CONSUMED,
      })),
    ], [])

    combinationsTestsCases.forEach(({ quotaState, rateState, shouldDisplayWarningIcon }) => {
      const props = {
        quotaState,
        rateState,
        style: {},
      }
      const enzymeWrapper = shallow(<LoginIconComponent {...props} />, { context })
      // A - main icon
      assert.lengthOf(enzymeWrapper.find(LoginIcon), 1, `There should be main icon (${quotaState}/${rateState})`)
      if (shouldDisplayWarningIcon) {
        assert.lengthOf(enzymeWrapper.find(QuotaStatusIcon), 1, `There should be warning icon (${quotaState}/${rateState})`)
      } else {
        assert.lengthOf(enzymeWrapper.find(QuotaStatusIcon), 0, `Warning icon should not be displayed (${quotaState}/${rateState})`)
      }
    })
  })
})
