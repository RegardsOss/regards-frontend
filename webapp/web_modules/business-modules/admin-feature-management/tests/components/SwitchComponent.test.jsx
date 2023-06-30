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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { FemDomain } from '@regardsoss/domain'
import FlatButton from 'material-ui/FlatButton'
import { RefreshIndicatorComponent } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SwitchComponent from '../../src/components/SwitchComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SwitchComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing SwitchComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SwitchComponent)
  })
  it('should render correctly', () => {
    const props = {
      loading: false,
      pane: '',
      nbElementsInfos: {
        nbElements: 0,
        nbErrors: 0,
      },
      onSwitchToPane: () => { },
      paneType: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
    }
    const enzymeWrapper = shallow(<SwitchComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a FlatButton')

    const indicatorWrapper = enzymeWrapper.find(RefreshIndicatorComponent)
    assert.lengthOf(indicatorWrapper, 1, 'There should a be RefreshIndicatorComponent')
  })
})
