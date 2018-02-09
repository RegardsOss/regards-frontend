/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SIPSubmissionSummaryComponent from '../../src/components/submission/SIPSubmissionSummaryComponent'
import SIPSubmissionComponent from '../../src/components/submission/SIPSubmissionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SIPsubmissionSummaryComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST SIP MANAGEMENT] Testing SIPsubmissionSummaryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPSubmissionSummaryComponent)
  })
  it('should render correctly', () => {
    const props = {
      submitedSips: [
        {
          id: 'firstOne',
          state: 'CREATED',
        },
        {
          id: 'secondOne',
          state: 'REJECTED',
          rejectionCauses: [
            'first reason',
            'second reason',
          ],
        },
      ],
      onBack: () => { },
    }
    const enzymeWrapper = shallow(<SIPSubmissionSummaryComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(SIPSubmissionComponent).length, 2, 'There should have SIPsubmissionComponent for each sip')
  })
})
