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
import Dialog from 'material-ui/Dialog'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AsynchronousRequestInformationComponent from '../../../../src/components/orders/dialog/AsynchronousRequestInformationComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test AsynchronousRequestInformationComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing AsynchronousRequestInformationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AsynchronousRequestInformationComponent)
  })
  it('should render correctly visible', () => {
    const props = {
      visible: true,
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<AsynchronousRequestInformationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isTrue(dialog.props().open, 'It should be opened')
  })
  it('should render correctly hidden', () => {
    const props = {
      visible: false,
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<AsynchronousRequestInformationComponent {...props} />, { context })
    const dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be a dialog')
    assert.isFalse(dialog.props().open, 'It should be closed')
  })
})
