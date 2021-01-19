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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UserModuleContainer } from '../../../src/containers/user/UserModuleContainer'
import OrderHistoryComponent from '../../../src/components/user/OrderHistoryComponent'

import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test UserModuleContainer
* @author Raphaël Mechali
*/
describe('[Order History] Testing UserModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserModuleContainer)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'z',
      description: 'Some module name',
      fetchProcessingList: () => { },
      availableDependencies: [],
    }
    const wrapper = shallow(<UserModuleContainer name {...props} />, { context })
    assert.lengthOf(wrapper.find(OrderHistoryComponent), 1, 'It should render main module component')
  })
})
