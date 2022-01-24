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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import FlatButton from 'material-ui/FlatButton'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapViewModeOption from '../../../../../../../src/components/user/tabs/results/map/options/MapViewModeOption'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MapViewModeOption
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing MapViewModeOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapViewModeOption)
  })

  UIDomain.MAP_VIEW_MODES.forEach((viewMode) => {
    [true, false].forEach((selected) => it(`Should render correctly for mode ${viewMode} when ${selected ? 'selected' : 'unselected'}`, () => {
      const props = {
        selected,
        viewMode,
        onToggleViewMode: () => {},
        index: 0,
        addStylingOption: false,
        availableModeListLenght: 2,
      }
      const enzymeWrapper = shallow(<MapViewModeOption {...props} />, { context })
      const button = enzymeWrapper.find(FlatButton)

      testSuiteHelpers.assertWrapperProperties(button, {
        onClick: enzymeWrapper.instance().onClicked,
        title: `results.map.tools.tooltip.for.${viewMode}`,
        secondary: selected,
      }, 'Button properties should be correctly set')
      assert.isOk(button.props().icon, 'There should be an icon')
    }))
  })
})
