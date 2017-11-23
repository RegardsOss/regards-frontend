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
import SIPSubmitionSummaryComponent from '../../src/components/SIPSubmitionSummaryComponent'
import SIPSubmitionComponent from '../../src/components/SIPSubmitionComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SIPSubmitionSummaryComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST SIP MANAGEMENT] Testing SIPSubmitionSummaryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPSubmitionSummaryComponent)
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
    const enzymeWrapper = shallow(<SIPSubmitionSummaryComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(SIPSubmitionComponent).length, 2, 'There should have SIPSubmitionComponent for each sip')
  })
})
