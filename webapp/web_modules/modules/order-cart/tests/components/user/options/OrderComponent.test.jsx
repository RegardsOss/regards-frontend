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
import FlatButton from 'material-ui/FlatButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import OrderComponent from '../../../../src/components/user/options/OrderComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderComponent
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing OrderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderComponent)
  })
  it('should render correctly when empty', () => {
    const props = {
      onOrder: () => { },
      empty: true,
      isFetching: false,
    }
    const enzymeWrapper = shallow(<OrderComponent {...props} />, { context })
    // A - Button
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      disabled: true,
      onClick: enzymeWrapper.instance().onShowDialog,
    }, 'Button properties should be correctly set')

    // B - Dialog
    // const dialogWrapper = enzymeWrapper.find(Dialog)
    // assert.lengthOf(Dialog, 1, 'There should be the dialog')
    // that wont work as enzyme still doesn't support fragment children correctly. (07/09/2020)
  })
  it('should render correctly when fetching', () => {
    const props = {
      onOrder: () => { },
      empty: false,
      isFetching: true,
    }
    const enzymeWrapper = shallow(<OrderComponent {...props} />, { context })
    // A - Button
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      disabled: true,
      onClick: enzymeWrapper.instance().onShowDialog,
    }, 'Button properties should be correctly set')

    // B - Dialog
    // cannot test as enzyme still doesn't support fragment children correctly. (07/09/2020)
  })
  it('should render correctly when not empty nor disabled', () => {
    const props = {
      onOrder: () => { },
      empty: false,
      isFetching: false,
    }
    const enzymeWrapper = shallow(<OrderComponent {...props} />, { context })
    // A - Button
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      disabled: false,
      onClick: enzymeWrapper.instance().onShowDialog,
    }, 'Button properties should be correctly set')

    // B - Dialog
    // cannot test as enzyme still doesn't support fragment children correctly. (07/09/2020)
  })
})
