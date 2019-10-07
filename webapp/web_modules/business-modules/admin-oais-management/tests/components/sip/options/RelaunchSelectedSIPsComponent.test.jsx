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
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RelaunchSelectedSIPsComponent from '../../../../src/components/sip/options/RelaunchSelectedSIPsComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RelaunchSelectedSIPsComponent
 * @author Kévin Picart
 */
describe('[OAIS SIP MANAGEMENT] Testing RelaunchSelectedSIPsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RelaunchSelectedSIPsComponent)
  })
  it('should render correctly', () => {
    const props = {
      disabled: true,
      onRelaunch: () => {},
    }
    const enzymeWrapper = shallow(<RelaunchSelectedSIPsComponent {...props} />, { context })
    // Test if there is FlatButton
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1, 'There should be the order display container that displays the button')
    testSuiteHelpers.assertWrapperProperties(button, {
      disabled: true,
      onClick: props.onRelaunch,
    }, 'The button should be correctly configured')
  })
})