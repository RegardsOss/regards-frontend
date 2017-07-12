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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import { NavigationContainer } from '../../../../src/containers/user/navigation/NavigationContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationContainer)
  })
  it('should render correctly', () => {
    const props = {
      displayDatasets: true,
      levels: [NavigationLevel.buildSearchTagLevel('xxx')],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(NavigationComponent), 1, 'The corresponding component should be rendered')
  })
  it('should hide dataset level when not displaying dataset', () => {
    const props = {
      displayDatasets: false,
      levels: [NavigationLevel.buildSearchTagLevel('xxx'), NavigationLevel.buildDatasetLevel('xxx', 'xxx')],
      gotoLevel: () => { },
    }
    const enzymeWrapper = shallow(<NavigationContainer {...props} />, { context })
    const navCompoWrapper = enzymeWrapper.find(NavigationComponent)
    assert.lengthOf(navCompoWrapper, 1, 'The corresponding component should be rendered')
    const renderLevels = navCompoWrapper.props().navigationLevels
    assert.lengthOf(renderLevels, 1, 'There should be 1 render levels')
    assert.isNotOk(NavigationLevel.getDatasetLevel(renderLevels), 'The dataset level should not be present in render levels')
  })
})
