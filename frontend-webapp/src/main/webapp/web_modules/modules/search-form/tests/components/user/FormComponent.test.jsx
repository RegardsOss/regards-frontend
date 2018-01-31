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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { spy } from 'sinon'
import RaisedButton from 'material-ui/RaisedButton'
import { Container } from '@regardsoss/layout'
import FormComponent from '../../../src/components/user/FormComponent'
import Styles from '../../../src/styles/styles'


const options = {
  context: buildTestContext(Styles),
}
/**
 * Tests form FomComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing Form User component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('Should render form configured layout with given plugins', () => {
    const handleSearchCallback = spy()
    const props = {
      description: 'Test',
      layout: {
        id: 'main',
        type: 'type',
      },
      handleSearch: handleSearchCallback,
    }

    const wrapper = shallow(<FormComponent {...props} />, options)

    const button = wrapper.find(RaisedButton)
    assert.isTrue(wrapper.find(Container).length === 1, 'Form module should render configured layout')
    assert.isTrue(button.length === 1, 'There should be a button to run search')

    assert(handleSearchCallback.notCalled)
    button.simulate('click')
    assert(handleSearchCallback.d)
  })
})

