/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import NewLinkOption from '../../../../../src/components/admin/navigation/options/NewLinkOption'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NewLinkOption
 * @author Théo Lasserre
 */
describe('[Menu] Testing NewLinkOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NewLinkOption)
  })
  it('should render correctly', () => {
    const props = {
      onCreateLink: () => { },
    }
    const enzymeWrapper = shallow(<NewLinkOption {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.equal(button.props().onClick, props.onCreateLink, 'The component should set up the right callback')
  })
})
