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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ShowDatedItemSelectionDetailComponent from '../../../../src/components/user/options/ShowDatedItemSelectionDetailComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ShowDatedItemSelectionDetailComponent
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing ShowDatedItemSelectionDetailComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowDatedItemSelectionDetailComponent)
  })
  it('should render correctly disabled', () => {
    const props = {
      disabled: true,
      onShowDetail: () => { },
    }
    const enzymeWrapper = shallow(<ShowDatedItemSelectionDetailComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().onClick, props.onShowDetail, 'Callback should be correctly reported')
    assert.isDefined(buttonWrapper.props().title, 'There should be a title')
    assert.isTrue(buttonWrapper.props().disabled, 'Option should be disabled')
  })
  it('should render correctly not disabled', () => {
    const props = {
      disabled: false,
      onShowDetail: () => { },
    }
    const enzymeWrapper = shallow(<ShowDatedItemSelectionDetailComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().onClick, props.onShowDetail, 'Callback should be correctly reported')
    assert.isDefined(buttonWrapper.props().title, 'There should be a title')
    assert.isFalse(buttonWrapper.props().disabled, 'Option should be enabled')
  })
})
