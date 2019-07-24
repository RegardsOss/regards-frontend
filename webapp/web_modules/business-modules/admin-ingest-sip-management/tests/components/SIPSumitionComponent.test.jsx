/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardHeader, CardText } from 'material-ui/Card'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SIPSubmissionComponent } from '../../src/components/submission/SIPSubmissionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SIPsubmissionComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST SIP MANAGEMENT] Testing SIPsubmissionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPSubmissionComponent)
  })
  it('should render correctly a valid SIP', () => {
    const props = {
      sip: {
        id: 'TestSip',
        state: SIPSubmissionComponent.VALID_STATE,
      },
    }
    const enzymeWrapper = shallow(<SIPSubmissionComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(CardHeader).length, 1, 'There should have a CardHeader.')
    assert.equal(enzymeWrapper.find(CardText).length, 0, 'There should not have errors displayed when SIP is in CREATE State.')
  })
  it('should render correctly a rejected SIP', () => {
    const props = {
      sip: {
        id: 'TestSip',
        state: 'REJECTED',
        rejectionCauses: [
          'first reason',
          'second reason',
        ],
      },
    }
    const enzymeWrapper = shallow(<SIPSubmissionComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(CardHeader).length, 1, 'There should have a CardHeader.')
    assert.equal(enzymeWrapper.find(CardText).length, 1, 'There should have errors displayed when SIP is in REJECTED State.')
  })
})
