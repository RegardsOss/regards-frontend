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
import DeleteSelectedAIPsOnAllStoragesOptionComponent from '../../../../src/components/aip/options/DeleteSelectedAIPsOnAllStoragesOptionComponent'
import styles from '../../../../src/styles'


const context = buildTestContext(styles)

/**
 * Test DeleteSelectedAIPsOnAllStoragesOptionComponent
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing DeleteSelectedAIPsOnAllStoragesOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteSelectedAIPsOnAllStoragesOptionComponent)
  })
  it('should render correctly disabled', () => {
    const props = {
      disabled: true,
      onDelete: () => {},
    }
    const enzymeWrapper = shallow(<DeleteSelectedAIPsOnAllStoragesOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      disabled: true,
      onClick: props.onDelete,
    })
  })
  it('should render correctly enabled', () => {
    const props = {
      disabled: false,
      onDelete: () => {},
    }
    const enzymeWrapper = shallow(<DeleteSelectedAIPsOnAllStoragesOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      disabled: false,
      onClick: props.onDelete,
    })
  })
})
