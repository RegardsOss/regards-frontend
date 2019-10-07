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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RelaunchSelectedSIPsComponent from '../../../../src/components/sip/options/RelaunchSelectedSIPsComponent'
import { RelaunchSelectedSIPsContainer } from '../../../../src/containers/sip/options/RelaunchSelectedSIPsContainer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RelaunchSelectedSIPsContainer
 * @author Kévin Picart
 */
describe('[OAIS SIP MANAGEMENT] Testing RelaunchSelectedSIPsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RelaunchSelectedSIPsContainer)
  })
  it('should render correctly', () => {
    const props = {
      onRelaunch: () => {},
      disabled: false,
      toggledSIPs: [],
      selectionMode: 'include.selected',
    }
    const enzymeWrapper = shallow(<RelaunchSelectedSIPsContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(RelaunchSelectedSIPsComponent)
    const wrapperInstance = enzymeWrapper.instance()
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      disabled: false,
      onRelaunch: wrapperInstance.onRelaunch,
    }, 'Component should define the expected properties')
  })
})