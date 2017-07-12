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
import { Breadcrumb } from '@regardsoss/components'
import NavigationComponent from '../../../../src/components/user/navigation/NavigationComponent'
import NavigationLevel from '../../../../src/models/navigation/NavigationLevel'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing NavigationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationComponent)
  })
  it('should render properly', () => {
    const levels = [
      NavigationLevel.buildDatasetLevel('oki', 'doki'),
      NavigationLevel.buildSearchTagLevel('styles:patatoes'),
    ]
    const props = {
      navigationLevels: levels,
      onLevelSelected: () => { },
    }
    const enzymeWrapper = shallow(<NavigationComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(Breadcrumb), 1, 'There should be a breadcrumb component')
  })
})
