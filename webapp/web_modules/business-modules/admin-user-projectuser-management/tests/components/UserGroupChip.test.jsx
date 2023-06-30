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
import Chip from 'material-ui/Chip'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import UserGroupChip from '../../src/components/UserGroupChip'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test UserGroupChip
 * @author Raphaël Mechali
 */
describe('[ADMIN USER PROJECTUSER MANAGEMENT] Testing UserGroupChip', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserGroupChip)
  })
  it('should render correctly', () => {
    const props = {
      groupName: 'myGroup',
      isAdded: false,
      onRemoveGroup: () => {},
    }
    const enzymeWrapper = shallow(<UserGroupChip {...props} />, { context })
    const chip = enzymeWrapper.find(Chip)
    assert.equal(chip.props().onRequestDelete, enzymeWrapper.instance().onRemoveGroup)
    assert.include(chip.debug(), props.groupName)
  })
})
