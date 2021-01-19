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
import flatMap from 'lodash/flatMap'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import FlatButton from 'material-ui/FlatButton'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModeSelectorComponent from '../../../../../../../src/components/user/tabs/results/header/options/ModeSelectorComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ModeSelectorComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ModeSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModeSelectorComponent)
  })

  // test each mode selected and unselected
  flatMap(UIDomain.RESULTS_VIEW_MODES, (mode) => [{ selected: true, mode }, { selected: false, mode }]).forEach(
    ({ selected, mode }) => it(`Should render correctly when ${selected ? 'selected' : 'unselected'} for view mode ${mode}`, () => {
      const props = {
        mode,
        selected,
        onModeSelected: () => {},
      }
      const enzymeWrapper = shallow(<ModeSelectorComponent {...props} />, { context })
      const button = enzymeWrapper.find(FlatButton)
      assert.lengthOf(button, 1)
      testSuiteHelpers.assertWrapperProperties(enzymeWrapper, {
        onClick: props.onModeSelected,
        secondary: selected,
      })
      assert.isOk(button.props().title, 'Some tooltip should be provided')
      assert.isOk(button.props().icon, 'Some icon should be provided')
    }),
  )
})
